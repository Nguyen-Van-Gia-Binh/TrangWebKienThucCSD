"use client";

import { motion } from "framer-motion";
import type { CanvasProps } from "@/lib/types";
import { getHighlightKind } from "@/lib/types";
import type { GraphState } from "./generateSteps";
import clsx from "clsx";

const NODE_RADIUS = 25;

// Hardcoded layout for the 7-node fixed graph
const LAYOUT: Record<string, { x: number; y: number }> = {
  A: { x: 0, y: -100 },
  B: { x: -100, y: 0 },
  C: { x: 100, y: 0 },
  D: { x: -150, y: 100 },
  E: { x: -50, y: 100 },
  F: { x: 50, y: 100 },
  G: { x: 150, y: 100 },
};

export function Canvas({ step }: CanvasProps<GraphState>) {
  const { nodes, edges, visited, queueOrStack, currentNode } = step.state;

  return (
    <div className="relative flex h-full w-full min-h-[400px] flex-col items-center justify-start overflow-hidden p-4">
      <div className="flex w-full justify-between items-start mb-4">
        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
          {step.action}
        </p>
        {step.note && (
          <span
            className={clsx(
              "rounded-full px-2.5 py-1 text-xs font-semibold",
              {
                "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200": step.note.tone === "info",
                "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200": step.note.tone === "success",
                "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200": step.note.tone === "danger",
              }
            )}
          >
            {step.note.text}
          </span>
        )}
      </div>

      {/* Queue/Stack State */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
        <span className="text-xs font-bold text-neutral-500 uppercase">Queue/Stack</span>
        <div className="flex gap-2 min-h-[36px]">
          {queueOrStack.map((node, idx) => (
            <motion.div
              key={`${node}-${idx}`}
              layoutId={`qs-${node}-${idx}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="flex h-8 w-8 items-center justify-center rounded border-2 border-indigo-200 bg-indigo-50 font-mono text-sm font-bold text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-900/30 dark:text-indigo-300"
            >
              {node}
            </motion.div>
          ))}
          {queueOrStack.length === 0 && (
            <div className="flex h-8 items-center justify-center rounded border-2 border-dashed border-neutral-200 px-3 text-sm text-neutral-400 dark:border-neutral-800">
              Empty
            </div>
          )}
        </div>
      </div>
      
      <div className="relative mt-24 h-full w-full min-h-[300px]">
        {/* Draw edges */}
        <svg className="pointer-events-none absolute left-1/2 top-0 h-full w-full overflow-visible">
          <g>
            {edges.map(([u, v], idx) => {
              const start = LAYOUT[u];
              const end = LAYOUT[v];
              if (!start || !end) return null;
              
              // Highlight edge if it connects the currentNode and the target neighbor
              const isComparing = step.highlights?.some(h => 
                h.kind === "compare" && h.ids.includes(v)
              );
              const isActiveEdge = currentNode === u && isComparing;

              return (
                <motion.line
                  key={`${u}-${v}-${idx}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke={isActiveEdge ? "#8b5cf6" : "currentColor"}
                  strokeWidth={isActiveEdge ? 4 : 2}
                  className={clsx(
                    "transition-colors duration-300",
                    isActiveEdge ? "text-violet-500 z-10" : "text-neutral-300 dark:text-neutral-700"
                  )}
                />
              );
            })}
          </g>
        </svg>

        {/* Draw nodes */}
        <div className="absolute left-1/2 top-0 h-full w-full overflow-visible">
          {nodes.map((nodeId) => {
            const pos = LAYOUT[nodeId];
            if (!pos) return null;

            const highlight = getHighlightKind(step, nodeId);
            const isSuccess = highlight === "success";
            const isActive = highlight === "active";
            const isCompare = highlight === "compare";

            // If it's already in visited, we might want to color it differently
            const isVisited = visited.includes(nodeId);

            return (
              <motion.div
                key={nodeId}
                layoutId={nodeId}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: pos.x - NODE_RADIUS,
                  y: pos.y - NODE_RADIUS,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                className={clsx(
                  "absolute flex items-center justify-center rounded-full border-2 text-sm font-bold shadow-sm transition-colors z-20",
                  {
                    "border-neutral-300 bg-white text-neutral-700 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200": !highlight && !isVisited,
                    "border-violet-300 bg-violet-100 text-violet-700 dark:border-violet-700 dark:bg-violet-900/40 dark:text-violet-300": !highlight && isVisited,
                    "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200": isActive,
                    "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200": isSuccess,
                    "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200": isCompare,
                  }
                )}
                style={{
                  width: NODE_RADIUS * 2,
                  height: NODE_RADIUS * 2,
                }}
              >
                {nodeId}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
