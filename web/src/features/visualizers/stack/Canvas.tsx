"use client";

import clsx from "clsx";
import type { CanvasProps } from "@/lib/types";
import { getHighlightKind } from "@/lib/types";
import { ArrayTrack } from "@/components/visualizer/ArrayTrack";
import type { StackState } from "./generateSteps";

const NOTE_CLASS = {
  info: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  danger: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
};

export function Canvas({ step }: CanvasProps<StackState>) {
  const { cells, top, capacity } = step.state;
  const size = top + 1;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
          size = {size}
        </span>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
          capacity = {capacity}
        </span>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
          top = {top}
        </span>
        {step.note && (
          <span
            className={clsx(
              "rounded-full px-2.5 py-1 font-semibold",
              NOTE_CLASS[step.note.tone],
            )}
          >
            {step.note.text}
          </span>
        )}
      </div>

      <ArrayTrack
        cells={cells.map((c) =>
          c ? { id: c.id, content: c.value } : null,
        )}
        pointers={[{ index: top, label: "top" }]}
        highlightOf={(id) => getHighlightKind(step, id)}
      />

      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        {step.action}
      </p>
    </div>
  );
}
