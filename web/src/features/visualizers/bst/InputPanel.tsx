"use client";

import { useState } from "react";
import type { InputPanelProps } from "@/lib/types";
import type { BSTOp } from "./generateSteps";
import { Play, Plus, Trash2, Search } from "lucide-react";

export function InputPanel({ defaultInput, onRun }: InputPanelProps<BSTOp[]>) {
  const [ops, setOps] = useState<BSTOp[]>(defaultInput);
  const [insertValue, setInsertValue] = useState("10");
  const [deleteValue, setDeleteValue] = useState("10");
  const [searchValue, setSearchValue] = useState("10");

  const addOp = (op: BSTOp) => setOps((prev) => [...prev, op]);
  const removeOp = (idx: number) =>
    setOps((prev) => prev.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider dark:text-neutral-400">
            Insert
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={insertValue}
              onChange={(e) => setInsertValue(e.target.value)}
              className="w-24 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-800"
            />
            <button
              onClick={() => {
                if (insertValue) addOp({ type: "insert", value: parseInt(insertValue, 10) });
              }}
              className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            >
              <Plus className="h-4 w-4" /> Insert
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider dark:text-neutral-400">
            Delete
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={deleteValue}
              onChange={(e) => setDeleteValue(e.target.value)}
              className="w-24 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-800"
            />
            <button
              onClick={() => {
                if (deleteValue) addOp({ type: "delete", value: parseInt(deleteValue, 10) });
              }}
              className="flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider dark:text-neutral-400">
            Search
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-24 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-800"
            />
            <button
              onClick={() => {
                if (searchValue) addOp({ type: "search", value: parseInt(searchValue, 10) });
              }}
              className="flex items-center gap-1 rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            >
              <Search className="h-4 w-4" /> Search
            </button>
          </div>
        </div>

        <div className="ml-auto flex flex-col gap-2">
          <button
            onClick={() => onRun(ops)}
            className="flex h-[38px] items-center gap-2 rounded-lg bg-emerald-600 px-6 font-semibold text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
          >
            <Play className="h-4 w-4" fill="currentColor" /> Run
          </button>
        </div>
      </div>

      {ops.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {ops.map((op, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-2 rounded-lg border border-neutral-200 bg-white py-1.5 pl-3 pr-1.5 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            >
              <span className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                {op.type}({op.value})
              </span>
              <button
                onClick={() => removeOp(idx)}
                className="rounded-md p-1 text-neutral-400 opacity-0 transition-all hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => setOps([])}
            className="text-xs text-neutral-500 hover:text-rose-600 dark:text-neutral-400 dark:hover:text-rose-400 ml-2 font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
