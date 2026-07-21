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
      const allTextChunks: { id: string; topic: string; text: string }[] = [];
      for (const file of files) {
        const filePath = path.join(theoriesDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const topicName = file.replace('.md', '');

        // Simple chunking strategy: split by double newline or headers
        const textChunks = content.split(/\n## |\n### /).filter(c => c.trim().length > 50);

        for (let i = 0; i < textChunks.length; i++) {
          allTextChunks.push({
            id: `${topicName}-${i}`,
            topic: topicName,
            text: textChunks[i].trim()
          });
        }
      }

      // 4. Batch Embeddings
      const BATCH_SIZE = 16;
      for (let i = 0; i < allTextChunks.length; i += BATCH_SIZE) {
        const batch = allTextChunks.slice(i, i + BATCH_SIZE);
        const texts = batch.map(b => b.text);
        
        // Generate vector embeddings for the batch
        const output = await this.extractor(texts, { pooling: 'mean', normalize: true });
        
        // Convert flattened tensor data to array of vectors
        const flatData = Array.from(output.data) as number[];
        const batchSize = output.dims[0];
        const embedDim = output.dims[1];

        for (let j = 0; j < batch.length; j++) {
          const vector = flatData.slice(j * embedDim, (j + 1) * embedDim);
          this.chunks.push({
            ...batch[j],
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

    try {
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
    } catch (error) {
      this.logger.error('Failed to retrieve context chunks: ', error);
      return [];
    }
  }

  async chatStream(query: string, history: any[], res: Response) {
    try {
      // 1. Retrieve Context
      const contextChunks = await this.retrieve(query, 3);
      const contextText = contextChunks.map(c => `[Chủ đề: ${c.topic}]\n${c.text}`).join('\n\n---\n\n');

      // 2. Build Prompt
      const systemPrompt = `Bạn là trợ lý ảo môn Cấu trúc dữ liệu và Giải thuật (CSD201) tại Đại học FPT.
Nhiệm vụ của bạn là giải đáp thắc mắc của sinh viên DỰA VÀO phần KIẾN THỨC NỀN TẢNG được cung cấp bên dưới.

QUY TẮC NGHIÊM NGẶT (RẤT QUAN TRỌNG):
1. Bạn CHỈ ĐƯỢC PHÉP trả lời các câu hỏi liên quan đến môn học Cấu trúc dữ liệu, Giải thuật và lập trình cơ bản.
2. Nếu sinh viên hỏi về các chủ đề ngoài lề (như lịch sử, chính trị, địa lý, thể thao, hoặc các yêu cầu không liên quan đến lập trình), bạn PHẢI TỪ CHỐI trả lời một cách lịch sự và yêu cầu họ hỏi đúng trọng tâm môn học CSD201.
3. TUYỆT ĐỐI KHÔNG được sử dụng kiến thức có sẵn của bạn để trả lời những câu hỏi ngoài lề này.

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
        { 
          role: 'user', 
          content: `Câu hỏi: ${query}\n\n[LƯU Ý QUAN TRỌNG: Nếu câu hỏi trên KHÔNG CÓ BẤT KỲ LIÊN QUAN NÀO đến môn học Cấu trúc dữ liệu và giải thuật (CSD201) hoặc lập trình, hãy từ chối trả lời ngay lập tức bằng tiếng Việt. Tuyệt đối không cung cấp thông tin ngoài lề.]`
        }
      ];

      // Cấu hình Header cho luồng Streaming
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Transfer-Encoding', 'chunked');

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
      this.logger.error('Chat stream error: ', error);
      if (!res.headersSent) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');
      }
      const errorMsg = JSON.stringify('\n\n*(Lỗi: Không thể kết nối đến Ollama. Vui lòng đảm bảo bạn đã chạy `ollama run llama3`)*');
      res.write(`0:${errorMsg}\n`);
      res.end();
    }
  }
}
