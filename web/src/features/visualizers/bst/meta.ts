import type { VisualizerModule } from "@/lib/types";
import type { BSTOp, BSTState } from "./generateSteps";
import { pseudocode } from "./pseudocode";
import { Canvas } from "./Canvas";
import { InputPanel } from "./InputPanel";

const defaultInput: BSTOp[] = [
  { type: "insert", value: 50 },
  { type: "insert", value: 30 },
  { type: "insert", value: 70 },
  { type: "insert", value: 20 },
  { type: "insert", value: 40 },
  { type: "insert", value: 60 },
  { type: "insert", value: 80 },
  { type: "search", value: 60 },
  { type: "delete", value: 30 },
];

export const bstVisualizer: VisualizerModule<BSTOp[], BSTState> = {
  slug: "bst",
  title: "Binary Search Tree (Cây nhị phân tìm kiếm)",
  description:
    "Cây nhị phân tìm kiếm (BST) là cây nhị phân mà mọi node ở cây con trái đều nhỏ hơn node hiện tại, và mọi node ở cây con phải đều lớn hơn node hiện tại.",
  chapter: "trees-1",
  badge: "Tree",
  pseudocode: pseudocode.split("\n"),
  defaultInput,
  generateSteps: () => [], // Handled by API
  Canvas,
  InputPanel,
};
