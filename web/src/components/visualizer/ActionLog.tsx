"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

export function ActionLog({
  actions,
  currentIndex,
}: {
  actions: string[];
  currentIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [currentIndex]);

  return (
    <div className="rounded-xl border border-neutral-200/80 bg-white/50 shadow-lg backdrop-blur-sm dark:border-neutral-800/80 dark:bg-neutral-900/50">
      <div className="border-b border-neutral-200/50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:border-neutral-800/50 dark:text-neutral-400 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        Diễn giải từng bước
      </div>
      <div ref={ref} className="max-h-40 overflow-y-auto p-3 text-sm custom-scrollbar">
        {actions.slice(0, currentIndex + 1).map((action, i) => (
          <div
            key={i}
            className={clsx(
              "rounded-lg px-3 py-1.5 mb-1 transition-all duration-300",
              i === currentIndex
                ? "bg-gradient-to-r from-indigo-50 to-violet-50 font-semibold text-indigo-800 shadow-sm dark:from-indigo-900/30 dark:to-violet-900/30 dark:text-indigo-200 scale-[1.01]"
                : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
            )}
          >
            <span className={clsx(
              "mr-2 font-mono text-xs",
              i === currentIndex ? "text-indigo-400" : "text-neutral-400 dark:text-neutral-600"
            )}>
              {i}.
            </span>
            {action}
          </div>
        ))}
      </div>
    </div>
  );
}
