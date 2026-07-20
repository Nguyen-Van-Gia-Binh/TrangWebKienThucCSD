import { Controller, Post, Param, Body } from '@nestjs/common';
import { VisualizerService } from './visualizer.service';

@Controller('visualize')
export class VisualizerController {
  constructor(private readonly visualizerService: VisualizerService) {}

  @Post(':algorithm/generate')
  generateSteps(@Param('algorithm') algorithm: string, @Body() body: { ops: any[] }) {
    return this.visualizerService.generateSteps(algorithm, body.ops || []);
  }
}
