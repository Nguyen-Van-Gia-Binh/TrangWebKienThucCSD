import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Ollama } from 'ollama';
import { Response } from 'express';

// Lớp đại diện cho 1 đoạn văn bản và Vector của nó
interface DocumentChunk {
  id: string;
  topic: string;
  text: string;
  vector: number[];
}

@Injectable()
export class RagService implements OnModuleInit {
  private readonly logger = new Logger(RagService.name);
  private chunks: DocumentChunk[] = [];
  private extractor: any = null;
  private ollama: Ollama;

  constructor() {
    this.ollama = new Ollama({ host: 'http://localhost:11434' });
  }

  async onModuleInit() {
    this.logger.log('Initializing Local RAG Vector Store...');
    
    try {
      // 1. Load the embedding model locally (No API key!)
      // Note: Transformers.js is ESM, so we use dynamic import
      const { pipeline, env } = await import('@xenova/transformers');
      
      // Disable remote models if needed, but for first run it needs to download weights
      // env.allowLocalModels = false; 
      
      this.logger.log('Loading Xenova/paraphrase-multilingual-MiniLM-L12-v2 embedding model...');
      this.extractor = await pipeline('feature-extraction', 'Xenova/paraphrase-multilingual-MiniLM-L12-v2', {
        quantized: true, // Use quantized for faster CPU inference
      });

      // 2. Read all markdown files from the knowledge base
      const theoriesDir = path.join(__dirname, '..', '..', '..', 'web', 'src', 'content', 'theories');
      const files = fs.readdirSync(theoriesDir).filter(f => f.endsWith('.md'));

      // 3. Process and Chunk files
      for (const file of files) {
        const filePath = path.join(theoriesDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const topicName = file.replace('.md', '');

        // Simple chunking strategy: split by double newline or headers
        const textChunks = content.split(/\n## |\n### /).filter(c => c.trim().length > 50);

        for (let i = 0; i < textChunks.length; i++) {
          const text = textChunks[i].trim();
          
          // Generate vector embedding
          const output = await this.extractor(text, { pooling: 'mean', normalize: true });
          const vector = Array.from(output.data) as number[];

          this.chunks.push({
            id: `${topicName}-${i}`,
            topic: topicName,
            text,
            vector,
          });
        }
      }
      this.logger.log(`RAG initialized: Embedded ${this.chunks.length} chunks from ${files.length} files.`);
      
    } catch (error) {
      this.logger.error('Failed to initialize RAG embeddings: ', error);
    }
  }

  // Calculate Cosine Similarity between two vectors
  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  // Retrieve top K most similar chunks
  private async retrieve(query: string, topK: number = 3): Promise<DocumentChunk[]> {
    if (!this.extractor) return [];
    
    // Embed the query
    const output = await this.extractor(query, { pooling: 'mean', normalize: true });
    const queryVector = Array.from(output.data) as number[];

    // Calculate similarities
    const scoredChunks = this.chunks.map(chunk => ({
      chunk,
      score: this.cosineSimilarity(queryVector, chunk.vector)
    }));

    // Sort by descending score
    scoredChunks.sort((a, b) => b.score - a.score);
    
    // Return top K
    return scoredChunks.slice(0, topK).map(sc => sc.chunk);
  }

  async chatStream(query: string, history: any[], res: Response) {
    // 1. Retrieve Context
    const contextChunks = await this.retrieve(query, 3);
    const contextText = contextChunks.map(c => `[Chủ đề: ${c.topic}]\n${c.text}`).join('\n\n---\n\n');

    // 2. Build Prompt
    const systemPrompt = `Bạn là trợ lý ảo môn Cấu trúc dữ liệu và Giải thuật (CSD201) tại Đại học FPT. 
Bạn được tích hợp trong hệ thống RAG (Retrieval-Augmented Generation).
Nhiệm vụ của bạn là giải đáp thắc mắc của sinh viên DỰA VÀO phần KIẾN THỨC NỀN TẢNG được cung cấp bên dưới.
Nếu câu hỏi nằm ngoài phạm vi kiến thức được cung cấp, hãy nói rằng bạn không chắc chắn nhưng có thể đưa ra lời khuyên chung.
Luôn trả lời bằng Tiếng Việt, thân thiện và dễ hiểu. Sử dụng định dạng Markdown nếu cần thiết (ví dụ: bôi đậm, danh sách).

KIẾN THỨC NỀN TẢNG TRÍCH XUẤT ĐƯỢC:
${contextText}
`;

    // Chuẩn bị Messages format của Ollama
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: query }
    ];

    // Cấu hình Header cho luồng Streaming
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    try {
      // 3. Gọi Ollama API (Stream)
      const stream = await this.ollama.chat({
        model: 'llama3', // Chuyển sang llama3 hoặc qwen2 vì phi3 quá yếu Tiếng Việt
        messages,
        stream: true,
        options: {
          temperature: 0.3, // Giảm temperature để tránh hallucination (nói nhảm)
          top_p: 0.9,
          num_predict: 500, // Giới hạn token trả về để tránh vòng lặp vô tận
        }
      });

      // Bơm từng chữ về cho Client theo chuẩn Vercel AI SDK (Data Stream Protocol)
      for await (const chunk of stream) {
        if (chunk.message?.content) {
          const textChunk = JSON.stringify(chunk.message.content);
          res.write(`0:${textChunk}\n`);
        }
      }
      res.end();
    } catch (error) {
      this.logger.error('Ollama Error: ', error);
      const errorMsg = JSON.stringify('\n\n*(Lỗi: Không thể kết nối đến Ollama. Vui lòng đảm bảo bạn đã chạy `ollama run phi3`)*');
      res.write(`0:${errorMsg}\n`);
      res.end();
    }
  }
}
