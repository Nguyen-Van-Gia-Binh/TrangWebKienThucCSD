"use client";

import type { InputPanelProps } from "@/lib/types";
import type { QueueOp } from "./generateSteps";
import { ArrayInputPanel } from "../common/ArrayInputPanel";

export function InputPanel(props: InputPanelProps<QueueOp[]>) {
  return (
    <ArrayInputPanel<QueueOp>
      {...props}
      supportedOps={[
        { type: "enqueue", label: "enqueue", needsValue: true },
        { type: "dequeue", label: "dequeue" },
        { type: "peek", label: "peek" },
      ]}
      opLabel={(op) => (op.type === "enqueue" ? `enqueue(${op.value})` : `${op.type}()`)}
    />
  );
}
