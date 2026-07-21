import type { VisualizerModule } from "@/lib/types";
import type { QueueOp, QueueLinearState } from "./generateSteps";
import { pseudocode } from "./pseudocode";
import { Canvas } from "./Canvas";
import { InputPanel } from "./InputPanel";

const defaultInput: QueueOp[] = [
  { type: "enqueue", value: 10 },
  { type: "enqueue", value: 5 },
  { type: "dequeue" },
  { type: "enqueue", value: 15 },
  { type: "enqueue", value: 7 },
  { type: "dequeue" },
  { type: "peek" },
];

export const queueLinearVisualizer: VisualizerModule<QueueOp[], QueueLinearState> = {
  slug: "queue-linear",
  title: "Queue (Mảng tuyến tính)",
  description:
    "Hàng đợi cài đặt bằng mảng tuyến tính (Linear Queue). Sử dụng hai con trỏ front và rear. Gặp hiện tượng False Full (mảng đầy giả) khi rear chạm cuối mảng dù đầu mảng còn trống.",
  chapter: "stacks-queues",
  badge: "Queue",
  pseudocode: pseudocode.split('\n'),
  defaultInput,
  generateSteps: () => [], // Handled by API
  Canvas,
  InputPanel,
};
