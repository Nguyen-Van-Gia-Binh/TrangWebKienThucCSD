"use client";

import { AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import type { HighlightKind } from "@/lib/types";
import { NodeBox } from "./NodeBox";
import { PointerArrow } from "./PointerArrow";

export interface ArrayTrackCell {
  id: string;
  content: ReactNode;
}

export interface ArrayTrackPointer {
  index: number;
  label: string;
}

const STRIDE = 56;

export function ArrayTrack({
  cells,
  pointers,
  highlightOf,
  baseLabel = "đáy",
}: {
  cells: (ArrayTrackCell | null)[];
  pointers: ArrayTrackPointer[];
  highlightOf?: (id: string) => HighlightKind | undefined;
  baseLabel?: string;
}) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="inline-flex flex-col">
        <div className="flex gap-2">
          <div className="flex h-4 w-12 items-center justify-center" />
          {cells.map((_, i) => (
            <div
              key={i}
              className="flex h-4 w-12 items-center justify-center font-mono text-[11px] text-neutral-400 dark:text-neutral-500"
            >
              {i}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 text-[10px] text-neutral-400 dark:border-neutral-700 dark:text-neutral-500">
            {baseLabel}
          </div>
          {cells.map((cell, i) => (
            <div
              key={i}
              className="h-12 w-12 rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <AnimatePresence mode="popLayout">
                {cell && (
                  <NodeBox
                    key={cell.id}
                    id={cell.id}
                    highlight={highlightOf?.(cell.id)}
                  >
                    {cell.content}
                  </NodeBox>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <div className="relative mt-1 h-9">
          {pointers.map((p) => (
            <PointerArrow
              key={p.label}
              x={(p.index + 1) * STRIDE}
              label={p.label}
              muted={p.index < 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
