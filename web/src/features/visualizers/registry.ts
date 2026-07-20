import type { AnyVisualizerModule } from "@/lib/types";
import { stackVisualizer } from "./stack/meta";

export const visualizers: AnyVisualizerModule[] = [stackVisualizer];

export function getVisualizer(slug: string): AnyVisualizerModule | undefined {
  return visualizers.find((v) => v.slug === slug);
}
