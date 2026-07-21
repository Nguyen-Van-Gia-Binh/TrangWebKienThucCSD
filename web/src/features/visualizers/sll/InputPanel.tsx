"use client";

import { useState } from "react";
import type { InputPanelProps } from "@/lib/types";
import type { SLLOp } from "./generateSteps";

export function InputPanel({ defaultInput, onRun }: InputPanelProps<SLLOp[]>) {
  const [ops, setOps] = useState<SLLOp[]>(defaultInput);
  const [headValue, setHeadValue] = useState("");
  const [tailValue, setTailValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleInsertHead = () => {
    const v = Number.parseInt(headValue, 10);
    if (Number.isNaN(v)) return;
    setOps([...ops, { type: "insertHead", value: v }]);
    setHeadValue("");
  };

  const handleInsertTail = () => {
    const v = Number.parseInt(tailValue, 10);
    if (Number.isNaN(v)) return;
    setOps([...ops, { type: "insertTail", value: v }]);
    setTailValue("");
  };

  const handleSearch = () => {
    const v = Number.parseInt(searchValue, 10);
    if (Number.isNaN(v)) return;
    setOps([...ops, { type: "search", value: v }]);
    setSearchValue("");
  };

  const handleDeleteHead = () => {
    setOps([...ops, { type: "deleteHead" }]);
  };

  const handleDeleteTail = () => {
    setOps([...ops, { type: "deleteTail" }]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-4">
        {/* Insert Head */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Insert Head</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={headValue}
              onChange={(e) => setHeadValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInsertHead()}
              className="w-24 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-800 dark:bg-neutral-900"
              placeholder="e.g. 10"
            />
            <button
              onClick={handleInsertHead}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              + Head
            </button>
          </div>
        </div>

        {/* Insert Tail */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Insert Tail</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={tailValue}
              onChange={(e) => setTailValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInsertTail()}
              className="w-24 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-800 dark:bg-neutral-900"
              placeholder="e.g. 20"
            />
            <button
              onClick={handleInsertTail}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              + Tail
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Search</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-24 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-800 dark:bg-neutral-900"
              placeholder="e.g. 20"
            />
            <button
              onClick={handleSearch}
              className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-700"
            >
              Search
            </button>
          </div>
        </div>

        {/* Delete Head / Tail */}
        <div className="flex flex-col gap-1 ml-auto">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Delete</label>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDeleteHead}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700"
            >
              - Head
            </button>
            <button
              onClick={handleDeleteTail}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700"
            >
              - Tail
            </button>
            <button
              onClick={() => onRun(ops)}
              className="ml-4 flex h-[38px] items-center gap-2 rounded-lg bg-emerald-600 px-6 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
            >
              Run
            </button>
          </div>
        </div>
      </div>

      {/* Op chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {ops.map((op, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <span className="font-mono text-neutral-600 dark:text-neutral-400">
              {op.type === "insertHead" ? `insertHead(${op.value})` :
               op.type === "insertTail" ? `insertTail(${op.value})` :
               op.type === "search" ? `search(${op.value})` :
               op.type === "deleteHead" ? `deleteHead()` : `deleteTail()`}
            </span>
            <button
              onClick={() => setOps(ops.filter((_, idx) => idx !== i))}
              className="text-neutral-400 transition-colors hover:text-rose-500"
            >
              ×
            </button>
          </div>
        ))}
        {ops.length > 0 && (
          <button
            onClick={() => setOps([])}
            className="px-3 py-1.5 text-sm font-medium text-neutral-500 hover:text-rose-600 dark:hover:text-rose-400"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
