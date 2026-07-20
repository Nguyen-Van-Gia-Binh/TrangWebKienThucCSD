import type { VisualizerModule } from "@/lib/types";
import type { KruskalOp, KruskalState } from "./generateSteps";
import { pseudocode } from "./pseudocode";
import { Canvas } from "./Canvas";
import { InputPanel } from "./InputPanel";

const defaultInput: KruskalOp[] = [
  { type: "kruskal" }
];

export const kruskalVisualizer: VisualizerModule<KruskalOp[], KruskalState> = {
  slug: "kruskal",
  title: "Cây khung nhỏ nhất (Kruskal)",
  description:
    "Thuật toán Kruskal tìm Cây khung nhỏ nhất (Minimum Spanning Tree) của đồ thị vô hướng có trọng số bằng cách chọn lần lượt các cạnh nhỏ nhất sao cho không tạo thành chu trình.",
  chapter: "graphs-3",
  badge: "Graph",
  pseudocode: pseudocode.split("\n"),
  defaultInput,
  generateSteps: () => [], // Handled by API
  Canvas,
  InputPanel,
};
