import type { Step, StepHighlight, StepNote } from "@/lib/types";

export type AVLOp =
  | { type: "insert"; value: number }
  | { type: "search"; value: number };

export interface AVLNode {
  id: string;
  value: number;
  left: string | null;
  right: string | null;
  height: number;
  balance: number;
}

export interface AVLState {
  nodes: AVLNode[];
  root: string | null;
}
