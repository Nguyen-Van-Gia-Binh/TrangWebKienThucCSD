import type { AnyVisualizerModule } from "@/lib/types";
import { stackVisualizer } from "./stack/meta";
import { queueLinearVisualizer } from "./queue-linear/meta";
import { queueCircularVisualizer } from "./queue-circular/meta";
import { bstVisualizer } from "./bst/meta";
import { sllVisualizer } from "./sll/meta";
import { recursionVisualizer } from "./recursion/meta";
import { avlVisualizer } from "./avl/meta";
import { graphVisualizer } from "./graph/meta";
import { dijkstraVisualizer } from "./dijkstra/meta";
import { kruskalVisualizer } from "./kruskal/meta";

export const visualizers: AnyVisualizerModule[] = [
  kruskalVisualizer,
  dijkstraVisualizer,
  graphVisualizer,
  avlVisualizer,
  sllVisualizer,
  recursionVisualizer,
  stackVisualizer,
  queueLinearVisualizer,
  queueCircularVisualizer,
  bstVisualizer,
];

export function getVisualizer(slug: string): AnyVisualizerModule | undefined {
  return visualizers.find((v) => v.slug === slug);
}
