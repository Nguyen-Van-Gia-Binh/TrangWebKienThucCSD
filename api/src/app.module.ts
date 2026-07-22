import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VisualizerModule } from './visualizer/visualizer.module';
import { RagModule } from './rag/rag.module';

@Module({
  imports: [VisualizerModule, RagModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
