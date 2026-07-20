"use client";

import { useState } from "react";
import type { InputPanelProps } from "@/lib/types";
import type { DijkstraOp } from "./generateSteps";
import { Play } from "lucide-react";

export function InputPanel({ defaultInput, onRun }: InputPanelProps<DijkstraOp[]>) {
  const [startNode, setStartNode] = useState("A");

  const handleRun = () => {
    onRun([{ type: "dijkstra", startNode }]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider dark:text-neutral-400">
            Đỉnh xuất phát
          </label>
          <select
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
            className="w-24 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-800"
          >
            {["A", "B", "C", "D", "E", "F", "G"].map(node => (
              <option key={node} value={node}>{node}</option>
            ))}
          </select>
        </div>

        <div className="ml-auto flex flex-col gap-2">
          <button
            onClick={handleRun}
            className="flex h-[38px] items-center gap-2 rounded-lg bg-emerald-600 px-6 font-semibold text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
          >
            <Play className="h-4 w-4" fill="currentColor" /> Chạy thuật toán
          </button>
        </div>
      </div>
    </div>
  );
}
