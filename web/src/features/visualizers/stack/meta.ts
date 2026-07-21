import type { VisualizerModule } from "@/lib/types";
import type { StackOp, StackState } from "./generateSteps";
import { pseudocode } from "./pseudocode";
import { Canvas } from "./Canvas";
import { InputPanel } from "./InputPanel";

// Kịch bản mặc định lấy từ slide 2A-Stacks (trang 4)
const defaultInput: StackOp[] = [
  { type: "push", value: 10 },
  { type: "push", value: 5 },
  { type: "pop" },
  { type: "push", value: 15 },
  { type: "push", value: 7 },
  { type: "pop" },
  { type: "peek" },
];

export const stackVisualizer: VisualizerModule<StackOp[], StackState> = {
  slug: "stack-push-pop",
  title: "Stack — push / pop / peek",
  description:
    "Ngăn xếp LIFO cài đặt bằng mảng: theo dõi con trỏ top, cơ chế grow() khi mảng đầy và lỗi underflow khi pop lúc rỗng.",
  chapter: "stacks-queues",
  badge: "Stack",
  pseudocode,
  defaultInput,
  generateSteps: () => [], // Handled by API
  Canvas,
  InputPanel,
};
