import { Module } from '@nestjs/common';
import { VisualizerController } from './visualizer.controller';
import { VisualizerService } from './visualizer.service';

@Module({
  controllers: [VisualizerController],
  providers: [VisualizerService],
})
export class VisualizerModule {}
