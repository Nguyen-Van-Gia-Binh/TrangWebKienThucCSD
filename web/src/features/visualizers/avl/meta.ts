import type { VisualizerModule } from "@/lib/types";
import type { AVLOp, AVLState } from "./generateSteps";
import { pseudocode } from "./pseudocode";
import { Canvas } from "./Canvas";
import { InputPanel } from "./InputPanel";

const defaultInput: AVLOp[] = [
  { type: "insert", value: 10 },
  { type: "insert", value: 20 },
  { type: "insert", value: 30 },
  { type: "insert", value: 40 },
  { type: "insert", value: 50 },
  { type: "insert", value: 25 },
];

export const avlVisualizer: VisualizerModule<AVLOp[], AVLState> = {
  slug: "avl",
  title: "Cây AVL (AVL Tree)",
  description:
    "Cây AVL là cây nhị phân tìm kiếm tự cân bằng. Chênh lệch chiều cao giữa cây con trái và phải (Balance Factor) không bao giờ vượt quá 1.",
  chapter: "trees-2",
  badge: "Tree",
  pseudocode: pseudocode.split("\n"),
  defaultInput,
  generateSteps: () => [], // Handled by API
  Canvas,
  InputPanel,
};
