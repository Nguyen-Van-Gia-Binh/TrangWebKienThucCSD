"use client";

import { useState } from "react";
import type { InputPanelProps } from "@/lib/types";
import type { GraphOp } from "./generateSteps";
import { Play } from "lucide-react";

export function InputPanel({ defaultInput, onRun }: InputPanelProps<GraphOp[]>) {
  const [opType, setOpType] = useState<"bfs" | "dfs">("bfs");
  const [startNode, setStartNode] = useState("A");

  const handleRun = () => {
    onRun([{ type: opType, startNode }]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider dark:text-neutral-400">
            Thuật toán
          </label>
          <select
            value={opType}
            onChange={(e) => setOpType(e.target.value as "bfs" | "dfs")}
            className="w-32 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <option value="bfs">BFS (Breadth-First)</option>
            <option value="dfs">DFS (Depth-First)</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider dark:text-neutral-400">
            Đỉnh bắt đầu
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
            <Play className="h-4 w-4" fill="currentColor" /> Chạy
          </button>
        </div>
      </div>
    </div>
  );
}
