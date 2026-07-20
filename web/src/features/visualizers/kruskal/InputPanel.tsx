"use client";

import type { InputPanelProps } from "@/lib/types";
import type { KruskalOp } from "./generateSteps";
import { Play } from "lucide-react";

export function InputPanel({ onRun }: InputPanelProps<KruskalOp[]>) {
  const handleRun = () => {
    onRun([{ type: "kruskal" }]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Thuật toán Kruskal tự động chạy trên toàn bộ đồ thị để tìm ra Cây khung nhỏ nhất.
          </p>
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
