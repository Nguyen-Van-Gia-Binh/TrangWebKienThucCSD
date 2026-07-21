import { Injectable, BadRequestException } from '@nestjs/common';
import { generateSteps as bstGenerateSteps } from './algorithms/bst.generateSteps';
import { generateSteps as stackGenerateSteps } from './algorithms/stack.generateSteps';
import { generateSteps as queueLinearGenerateSteps } from './algorithms/queue-linear.generateSteps';
import { generateSteps as queueCircularGenerateSteps } from './algorithms/queue-circular.generateSteps';
import { generateSteps as sllGenerateSteps } from './algorithms/sll.generateSteps';
import { generateSteps as recursionGenerateSteps } from './algorithms/recursion.generateSteps';
import { generateSteps as avlGenerateSteps } from './algorithms/avl.generateSteps';
import { generateSteps as graphGenerateSteps } from './algorithms/graph.generateSteps';
import { generateSteps as dijkstraGenerateSteps } from './algorithms/dijkstra.generateSteps';
import { generateSteps as kruskalGenerateSteps } from './algorithms/kruskal.generateSteps';

type StepGenerator = (ops: any[]) => any;

const generators: Record<string, StepGenerator> = {
  'kruskal': kruskalGenerateSteps,
  'dijkstra': dijkstraGenerateSteps,
  'graph': graphGenerateSteps,
  'avl': avlGenerateSteps,
  'recursion': recursionGenerateSteps,
  'bst': bstGenerateSteps,
  'sll': sllGenerateSteps,
  'stack': stackGenerateSteps,
  'stack-push-pop': stackGenerateSteps,
  'queue-linear': queueLinearGenerateSteps,
  'queue-circular': queueCircularGenerateSteps,
};

@Injectable()
export class VisualizerService {
  generateSteps(algorithm: string, ops: any[]) {
    const generator = generators[algorithm];
    if (!generator) {
      throw new BadRequestException('Unknown algorithm');
    }
    return generator(ops);
  }
}
