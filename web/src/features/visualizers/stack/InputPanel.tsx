"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import type { InputPanelProps } from "@/lib/types";
import type { StackOp } from "./generateSteps";

const MAX_OPS = 30;

function opLabel(op: StackOp): string {
  return op.type === "push" ? `push(${op.value})` : `${op.type}()`;
}

export function InputPanel({ defaultInput, onRun }: InputPanelProps<StackOp[]>) {
  const [ops, setOps] = useState<StackOp[]>(defaultInput);
  const [value, setValue] = useState("10");

  const addOp = (op: StackOp) =>
    setOps((prev) => (prev.length >= MAX_OPS ? prev : [...prev, op]));

  const smallBtn =
    "rounded-lg border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800";

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-20 rounded-lg border border-neutral-200 bg-transparent px-2 py-1.5 font-mono text-sm dark:border-neutral-700"
          aria-label="Giá trị push"
        />
        <button
          type="button"
          className={smallBtn}
          onClick={() => {
            const v = Number.parseInt(value, 10);
            if (!Number.isNaN(v)) addOp({ type: "push", value: v });
          }}
        >
          + push
        </button>
        <button type="button" className={smallBtn} onClick={() => addOp({ type: "pop" })}>
          + pop
        </button>
        <button type="button" className={smallBtn} onClick={() => addOp({ type: "peek" })}>
          + peek
        </button>
        <span className="mx-1 h-5 w-px bg-neutral-200 dark:bg-neutral-700" />
        <button type="button" className={smallBtn} onClick={() => setOps(defaultInput)}>
          Ví dụ trong slide
        </button>
        <button type="button" className={smallBtn} onClick={() => setOps([])}>
          Xóa hết
        </button>
        <button
          type="button"
          onClick={() => onRun([...ops])}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          <Play size={14} /> Chạy
        </button>
      </div>

      <div className="flex min-h-9 flex-wrap items-center gap-1.5 rounded-lg bg-neutral-50 p-2 dark:bg-neutral-950">
        {ops.length === 0 && (
          <span className="px-1 text-sm text-neutral-400 dark:text-neutral-600">
            Thêm thao tác push / pop / peek rồi bấm Chạy…
          </span>
        )}
        {ops.map((op, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 font-mono text-xs text-neutral-700 ring-1 ring-neutral-200 dark:bg-neutral-900 dark:text-neutral-200 dark:ring-neutral-700"
          >
            {opLabel(op)}
            <button
              type="button"
              onClick={() => setOps((prev) => prev.filter((_, j) => j !== i))}
              className="text-neutral-400 transition-colors hover:text-rose-500"
              aria-label={`Xóa ${opLabel(op)}`}
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
