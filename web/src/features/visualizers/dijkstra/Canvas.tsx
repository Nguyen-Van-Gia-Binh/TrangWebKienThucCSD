"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { CanvasProps } from "@/lib/types";
import { getHighlightKind } from "@/lib/types";
import type { DijkstraState } from "./generateSteps";
import clsx from "clsx";

const NODE_RADIUS = 25;

const LAYOUT: Record<string, { x: number; y: number }> = {
  A: { x: 0, y: -100 },
  B: { x: -100, y: 0 },
  C: { x: 100, y: 0 },
  D: { x: -150, y: 100 },
  E: { x: -50, y: 100 },
  F: { x: 50, y: 100 },
  G: { x: 150, y: 100 },
};

export function Canvas({ step }: CanvasProps<DijkstraState>) {
  const { nodes, edges, distances, settled, pq, currentNode, currentNeighbor } = step.state;

  return (
    <div className="relative flex h-full w-full min-h-[500px] flex-col items-center justify-start overflow-hidden p-4">
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

      <div className="absolute top-4 right-4 flex flex-col items-end gap-6 z-30">
        {/* Priority Queue */}
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Priority Queue</span>
          <div className="flex flex-col gap-2 min-w-[120px]">
            <AnimatePresence>
              {pq.map((item, idx) => (
                <motion.div
                  key={`${item.node}-${idx}-${item.dist}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center justify-between rounded-lg border-2 border-indigo-200 bg-indigo-50 px-3 py-1.5 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-900/30"
                >
                  <span className="font-bold text-indigo-700 dark:text-indigo-300">{item.node}</span>
                  <span className="font-mono text-sm text-indigo-600 dark:text-indigo-400">{item.dist}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {pq.length === 0 && (
              <div className="flex h-[36px] items-center justify-center rounded-lg border-2 border-dashed border-neutral-200 px-3 text-sm text-neutral-400 dark:border-neutral-800">
                Empty
              </div>
            )}
          </div>
        </div>

        {/* Distance Table */}
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Distances</span>
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <table className="min-w-[140px] text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
                  <th className="px-3 py-2 text-left font-semibold text-neutral-600 dark:text-neutral-400">Node</th>
                  <th className="px-3 py-2 text-right font-semibold text-neutral-600 dark:text-neutral-400">Dist</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map(node => {
                  const dist = distances[node];
                  const isInf = dist === null || dist === undefined || dist === Infinity;
                  const isSettled = settled.includes(node);
                  return (
                    <tr key={node} className={clsx(
                      "border-b border-neutral-100 last:border-0 dark:border-neutral-800/50",
                      isSettled ? "bg-emerald-50/50 dark:bg-emerald-900/10" : ""
                    )}>
                      <td className="px-3 py-1.5 font-bold text-neutral-700 dark:text-neutral-300">
                        {node}
                        {isSettled && <span className="ml-1 text-emerald-500">✓</span>}
                      </td>
                      <td className="px-3 py-1.5 text-right font-mono text-neutral-600 dark:text-neutral-400">
                        {isInf ? "∞" : dist}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="relative mt-24 h-full w-full min-h-[300px]">
        {/* Draw edges */}
        <svg className="pointer-events-none absolute left-1/2 top-0 h-full w-full overflow-visible">
          <g>
            {edges.map(([u, v, weight], idx) => {
              const start = LAYOUT[u];
              const end = LAYOUT[v];
              if (!start || !end) return null;
              
              const isComparing = (currentNode === u && currentNeighbor === v) || (currentNode === v && currentNeighbor === u);

              const midX = (start.x + end.x) / 2;
              const midY = (start.y + end.y) / 2;

              return (
                <g key={`${u}-${v}-${idx}`}>
                  <motion.line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={isComparing ? "#8b5cf6" : "currentColor"}
                    strokeWidth={isComparing ? 4 : 2}
                    className={clsx(
                      "transition-colors duration-300",
                      isComparing ? "text-violet-500 z-10" : "text-neutral-300 dark:text-neutral-700"
                    )}
                  />
                  {/* Weight label background */}
                  <rect
                    x={midX - 10}
                    y={midY - 10}
                    width="20"
                    height="20"
                    rx="4"
                    className="fill-white dark:fill-neutral-900"
                  />
                  {/* Weight text */}
                  <text
                    x={midX}
                    y={midY}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className={clsx(
                      "text-xs font-bold transition-colors duration-300",
                      isComparing ? "fill-violet-600 dark:fill-violet-400" : "fill-neutral-500 dark:fill-neutral-400"
                    )}
                  >
                    {weight}
                  </text>
                </g>
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

            const isSettled = settled.includes(nodeId);

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
                    "border-neutral-300 bg-white text-neutral-700 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200": !highlight && !isSettled,
                    "border-violet-300 bg-violet-100 text-violet-700 dark:border-violet-700 dark:bg-violet-900/40 dark:text-violet-300": !highlight && isSettled,
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
