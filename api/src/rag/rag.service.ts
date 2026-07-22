import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
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

  onModuleInit() {
    this.logger.log('Initializing RAG Vector Store in background...');
    // Run initialization asynchronously so NestJS starts immediately & binds to PORT
    setTimeout(() => {
      this.initVectorStore();
    }, 100);
  }

  private async initVectorStore() {
    try {
      // 1. Read all markdown files from the knowledge base
      let theoriesDir = path.join(__dirname, '..', '..', '..', 'web', 'src', 'content', 'theories');
      if (!fs.existsSync(theoriesDir)) {
        const fallbackPaths = [
          path.join(process.cwd(), '..', 'web', 'src', 'content', 'theories'),
          path.join(process.cwd(), 'theories'),
          path.join(process.cwd(), 'src', 'content', 'theories'),
        ];
        for (const p of fallbackPaths) {
          if (fs.existsSync(p)) {
            theoriesDir = p;
            break;
          }
        }
      }
      
      const files = fs.existsSync(theoriesDir) 
        ? fs.readdirSync(theoriesDir).filter(f => f.endsWith('.md'))
        : [];

      // 2. Process and Chunk files
      const allTextChunks: { id: string; topic: string; text: string }[] = [];
      for (const file of files) {
        const filePath = path.join(theoriesDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const topicName = file.replace('.md', '');

        const textChunks = content.split(/\n## |\n### /).filter(c => c.trim().length > 50);

        for (let i = 0; i < textChunks.length; i++) {
          allTextChunks.push({
            id: `${topicName}-${i}`,
            topic: topicName,
            text: textChunks[i].trim()
          });
        }
      }

      // 3. Attempt local embedding with Transformers.js (Memory Safe)
      try {
        const { pipeline } = await import('@xenova/transformers');
        this.logger.log('Loading Xenova/paraphrase-multilingual-MiniLM-L12-v2 embedding model...');
        this.extractor = await pipeline('feature-extraction', 'Xenova/paraphrase-multilingual-MiniLM-L12-v2', {
          quantized: true,
        });

        const BATCH_SIZE = 16;
        for (let i = 0; i < allTextChunks.length; i += BATCH_SIZE) {
          const batch = allTextChunks.slice(i, i + BATCH_SIZE);
          const texts = batch.map(b => b.text);
          const output = await this.extractor(texts, { pooling: 'mean', normalize: true });
          const flatData = Array.from(output.data) as number[];
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
      } catch (embedError) {
        this.logger.warn('Embedding model load skipped (low RAM mode), falling back to keyword context matching: ', embedError);
        // Fallback for low RAM environments: store text chunks for keyword search
        this.chunks = allTextChunks.map(c => ({ ...c, vector: [] }));
      }
      
    } catch (error) {
      this.logger.error('Failed to initialize RAG store: ', error);
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
    if (this.chunks.length === 0) return [];

    if (!this.extractor) {
      // Fallback keyword search for low RAM environments
      const queryLower = query.toLowerCase();
      const keywords = queryLower.split(/\s+/).filter(k => k.length > 2);
      
      const scored = this.chunks.map(chunk => {
        const textLower = chunk.text.toLowerCase();
        let score = 0;
        for (const kw of keywords) {
          if (textLower.includes(kw)) score += 1;
        }
        return { chunk, score };
      });
      
      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, topK).map(s => s.chunk);
    }

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

      // 3. Gọi Groq Cloud API (Stream via Llama 3.1 8B Instant)
      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        throw new Error('Chưa cấu hình GROQ_API_KEY trong file .env');
      }

      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages,
          stream: true,
          temperature: 0.3,
          max_tokens: 500,
        }),
      });

      if (!groqResponse.ok || !groqResponse.body) {
        const errText = await groqResponse.text();
        throw new Error(`Groq API Error (${groqResponse.status}): ${errText}`);
      }

      const reader = (groqResponse.body as any).getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(':')) continue;
          if (trimmed === 'data: [DONE]') break;
          if (trimmed.startsWith('data: ')) {
            try {
              const json = JSON.parse(trimmed.slice(6));
              const content = json.choices?.[0]?.delta?.content;
              if (content) {
                const textChunk = JSON.stringify(content);
                res.write(`0:${textChunk}\n`);
              }
            } catch {
              // ignore parse errors for partial lines
            }
          }
        }
      }
      res.end();
    } catch (error) {
      this.logger.error('Chat stream error: ', error);
      if (!res.headersSent) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');
      }
      const errorMsg = JSON.stringify(`\n\n*(Lỗi kết nối Groq AI: ${error instanceof Error ? error.message : 'Unknown error'})*`);
      res.write(`0:${errorMsg}\n`);
      res.end();
    }
  }
}
