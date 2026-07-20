import { Module } from '@nestjs/common';
import { VisualizerModule } from './visualizer/visualizer.module';
import { RagModule } from './rag/rag.module';

@Module({
  imports: [VisualizerModule, RagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
