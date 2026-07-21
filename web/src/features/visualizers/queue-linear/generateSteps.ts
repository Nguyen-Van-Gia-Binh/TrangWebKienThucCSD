import type { Step, StepHighlight, StepNote } from "@/lib/types";

export type QueueOp =
  | { type: "enqueue"; value: number }
  | { type: "dequeue" }
  | { type: "peek" };

export interface QueueItem {
  id: string;
  value: number;
}

export interface QueueLinearState {
  cells: (QueueItem | null)[];
  front: number;
  rear: number;
  capacity: number;
}
