import type { VisualizerModule } from "@/lib/types";
import type { SLLOp, SLLState } from "./generateSteps";
import { pseudocode } from "./pseudocode";
import { Canvas } from "./Canvas";
import { InputPanel } from "./InputPanel";

const defaultInput: SLLOp[] = [
  { type: "insertHead", value: 10 },
  { type: "insertTail", value: 20 },
  { type: "insertTail", value: 30 },
  { type: "insertHead", value: 5 },
  { type: "search", value: 20 },
  { type: "deleteTail" },
  { type: "deleteHead" },
];

export const sllVisualizer: VisualizerModule<SLLOp[], SLLState> = {
  slug: "sll",
  title: "Singly Linked List (Danh sách liên kết đơn)",
  description:
    "Danh sách liên kết đơn (Singly Linked List) là một cấu trúc dữ liệu tuyến tính, trong đó các phần tử không được lưu trữ ở các vị trí bộ nhớ liền kề nhau.",
  chapter: "lists",
  badge: "List",
  pseudocode: pseudocode.split("\n"),
  defaultInput,
  generateSteps: () => [], // Handled by API
  Canvas,
  InputPanel,
};
