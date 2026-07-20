import type { Step, StepHighlight, StepNote } from "@/lib/types";

export type SLLOp =
  | { type: "insertHead"; value: number }
  | { type: "insertTail"; value: number }
  | { type: "deleteHead" }
  | { type: "deleteTail" }
  | { type: "search"; value: number };

export interface SLLNode {
  id: string;
  value: number;
  next: string | null;
}

export interface SLLState {
  nodes: SLLNode[];
  head: string | null;
  targetValue?: number | null;
  targetAction?: string | null;
}
