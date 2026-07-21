import type { VisualizerModule } from "@/lib/types";
import type { QueueOp, QueueCircularState } from "./generateSteps";
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
  { type: "enqueue", value: 20 },
  { type: "enqueue", value: 25 },
  { type: "enqueue", value: 30 },
  { type: "enqueue", value: 35 },
  { type: "enqueue", value: 40 },
  { type: "dequeue" },
];

export const queueCircularVisualizer: VisualizerModule<QueueOp[], QueueCircularState> = {
  slug: "queue-circular",
  title: "Queue (Mảng vòng - Circular)",
  description:
    "Hàng đợi cài đặt bằng mảng vòng (Circular Queue). Sử dụng phép toán modulo (%) để quay vòng con trỏ rear và front khi chạm cuối mảng, giải quyết triệt để lỗi False Full.",
  chapter: "stacks-queues",
  badge: "Queue",
  pseudocode: pseudocode.split('\n'),
  defaultInput,
  generateSteps: () => [], // Handled by API
  Canvas,
  InputPanel,
};
