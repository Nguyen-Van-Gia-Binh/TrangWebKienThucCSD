"use client";

import type { InputPanelProps } from "@/lib/types";
import type { StackOp } from "./generateSteps";
import { ArrayInputPanel } from "../common/ArrayInputPanel";

export function InputPanel(props: InputPanelProps<StackOp[]>) {
  return (
    <ArrayInputPanel<StackOp>
      {...props}
      supportedOps={[
        { type: "push", label: "push", needsValue: true },
        { type: "pop", label: "pop" },
        { type: "peek", label: "peek" },
      ]}
      opLabel={(op) => (op.type === "push" ? `push(${op.value})` : `${op.type}()`)}
    />
  );
}
