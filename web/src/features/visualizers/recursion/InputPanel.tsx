"use client";

import { useState } from "react";
import type { InputPanelProps } from "@/lib/types";
import type { RecursionOp } from "./generateSteps";

export function InputPanel({ defaultInput, onRun }: InputPanelProps<RecursionOp[]>) {
  const [val, setVal] = useState("");

  const handleRun = () => {
    if (!val.trim()) return;
    const n = parseInt(val, 10);
    if (n < 0 || n > 10) return; // limit to 10 to avoid too many frames
    onRun([{ type: "factorial", value: n }]);
    setVal("");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Calculate Factorial(n)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={10}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRun()}
              className="w-24 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-800 dark:bg-neutral-900"
              placeholder="0-10"
            />
            <button
              onClick={handleRun}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Run
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
