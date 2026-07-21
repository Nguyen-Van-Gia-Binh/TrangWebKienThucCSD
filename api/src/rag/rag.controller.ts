import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { RagService } from './rag.service';

@Controller('chat')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Post()
  async chat(@Body('messages') messages: any[], @Res() res: Response) {
    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: 'Messages are required' });
    }

    const latestMessage = messages[messages.length - 1]?.content;
    if (typeof latestMessage !== 'string' || !latestMessage.trim()) {
      return res.status(400).json({ error: 'Last message must have non-empty text content' });
    }

    const history = messages.slice(0, -1);

    // Stream the response back to Next.js
    await this.ragService.chatStream(latestMessage, history, res);
  }
}
