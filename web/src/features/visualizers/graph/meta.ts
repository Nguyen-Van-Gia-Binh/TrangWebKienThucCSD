import type { VisualizerModule } from "@/lib/types";
import type { GraphOp, GraphState } from "./generateSteps";
import { pseudocode } from "./pseudocode";
import { Canvas } from "./Canvas";
import { InputPanel } from "./InputPanel";

const defaultInput: GraphOp[] = [
  { type: "bfs", startNode: "A" }
];

export const graphVisualizer: VisualizerModule<GraphOp[], GraphState> = {
  slug: "graph",
  title: "Đồ thị cơ bản (BFS / DFS)",
  description:
    "Đồ thị (Graph) gồm các đỉnh (Vertices) và cạnh (Edges). Có 2 cách duyệt đồ thị phổ biến: Duyệt theo chiều rộng (BFS - Breadth First Search) và Duyệt theo chiều sâu (DFS - Depth First Search).",
  chapter: "graphs-1",
  badge: "Graph",
  pseudocode: pseudocode.split("\n"),
  defaultInput,
  generateSteps: () => [], // Handled by API
  Canvas,
  InputPanel,
};
