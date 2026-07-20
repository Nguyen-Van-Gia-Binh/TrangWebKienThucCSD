import type { VisualizerModule } from "@/lib/types";
import type { DijkstraOp, DijkstraState } from "./generateSteps";
import { pseudocode } from "./pseudocode";
import { Canvas } from "./Canvas";
import { InputPanel } from "./InputPanel";

const defaultInput: DijkstraOp[] = [
  { type: "dijkstra", startNode: "A" }
];

export const dijkstraVisualizer: VisualizerModule<DijkstraOp[], DijkstraState> = {
  slug: "dijkstra",
  title: "Đường đi ngắn nhất (Dijkstra)",
  description:
    "Thuật toán Dijkstra tìm đường đi ngắn nhất từ một đỉnh bắt đầu tới tất cả các đỉnh còn lại trong đồ thị có trọng số không âm.",
  chapter: "graphs-2",
  badge: "Graph",
  pseudocode: pseudocode.split("\n"),
  defaultInput,
  generateSteps: () => [], // Handled by API
  Canvas,
  InputPanel,
};
