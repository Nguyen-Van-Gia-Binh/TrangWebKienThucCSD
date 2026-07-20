import type { VisualizerModule } from "@/lib/types";
import type { RecursionOp, RecursionState } from "./generateSteps";
import { pseudocode } from "./pseudocode";
import { Canvas } from "./Canvas";
import { InputPanel } from "./InputPanel";

const defaultInput: RecursionOp[] = [
  { type: "factorial", value: 5 },
];

export const recursionVisualizer: VisualizerModule<RecursionOp[], RecursionState> = {
  slug: "recursion",
  title: "Recursion (Đệ quy - Tính Giai thừa)",
  description:
    "Đệ quy là phương pháp hàm tự gọi lại chính nó. Mô phỏng Call Stack khi gọi hàm đệ quy tính Giai thừa (Factorial).",
  chapter: "recursion",
  badge: "Recursion",
  pseudocode: pseudocode.split("\n"),
  defaultInput,
  generateSteps: () => [], // Handled by API
  Canvas,
  InputPanel,
};
