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
    <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        Diễn giải từng bước
      </div>
      <div ref={ref} className="max-h-40 overflow-y-auto p-2 text-sm">
        {actions.slice(0, currentIndex + 1).map((action, i) => (
          <div
            key={i}
            className={clsx(
              "rounded px-2 py-0.5",
              i === currentIndex
                ? "bg-indigo-50 font-semibold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200"
                : "text-neutral-500 dark:text-neutral-400",
            )}
          >
            <span className="mr-2 font-mono text-xs text-neutral-400 dark:text-neutral-600">
              {i}.
            </span>
            {action}
          </div>
        ))}
      </div>
    </div>
  );
}
