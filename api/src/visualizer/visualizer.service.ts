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

@Injectable()
export class VisualizerService {
  generateSteps(algorithm: string, ops: any[]) {
    switch(algorithm) {
      case 'kruskal':
        return kruskalGenerateSteps(ops);
      case 'dijkstra':
        return dijkstraGenerateSteps(ops);
      case 'graph':
        return graphGenerateSteps(ops);
      case 'avl':
        return avlGenerateSteps(ops);
      case 'recursion':
        return recursionGenerateSteps(ops);
      case 'bst':
        return bstGenerateSteps(ops);
      case 'sll':
        return sllGenerateSteps(ops);
      case 'stack-push-pop':
      case 'stack':
        return stackGenerateSteps(ops);
      case 'queue-linear':
        return queueLinearGenerateSteps(ops);
      case 'queue-circular':
        return queueCircularGenerateSteps(ops);
      default:
        throw new BadRequestException('Unknown algorithm');
    }
  }
}
