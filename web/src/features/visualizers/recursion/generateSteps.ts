import type { Step, StepHighlight, StepNote } from "@/lib/types";

export type RecursionOp = { type: "factorial"; value: number };

export interface CallFrame {
  id: string;
  funcName: string;
  args: { n: number };
  status: "running" | "waiting" | "returned";
  returnValue?: number | null;
}

export interface RecursionState {
  callStack: CallFrame[];
}
