"use client";

import clsx from "clsx";

export function PseudocodePanel({
  lines,
  activeLine,
}: {
  lines: string[];
  activeLine?: number;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        Mã giả (pseudocode)
      </div>
      <pre className="overflow-x-auto p-2 font-mono text-xs leading-5">
        {lines.map((line, i) => (
          <div
            key={i}
            className={clsx(
              "rounded px-2 whitespace-pre transition-colors",
              i === activeLine
                ? "bg-indigo-600 text-white dark:bg-indigo-500"
                : "text-neutral-700 dark:text-neutral-300",
            )}
          >
            {line || " "}
          </div>
        ))}
      </pre>
    </div>
  );
}
