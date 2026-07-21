import type { Step, StepHighlight, StepNote } from "@/lib/types";

export type BSTOp =
  | { type: "insert"; value: number }
  | { type: "delete"; value: number }
  | { type: "search"; value: number };

export interface BSTNode {
  id: string;
  value: number;
  left: string | null;
  right: string | null;
}

export interface BSTState {
  nodes: Record<string, BSTNode>;
  rootId: string | null;
  targetValue?: number | null;
  targetAction?: string | null;
}
