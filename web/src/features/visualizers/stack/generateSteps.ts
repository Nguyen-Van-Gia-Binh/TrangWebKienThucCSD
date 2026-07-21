import type { Step, StepHighlight, StepNote } from "@/lib/types";

export type StackOp =
  | { type: "push"; value: number }
  | { type: "pop" }
  | { type: "peek" };

export interface StackItem {
  id: string;
  value: number;
}

export interface StackState {
  cells: (StackItem | null)[];
  top: number;
  capacity: number;
}
