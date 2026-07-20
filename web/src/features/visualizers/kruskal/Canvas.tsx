"use client";

import { motion } from "framer-motion";
import type { CanvasProps } from "@/lib/types";
import { getHighlightKind } from "@/lib/types";
import type { KruskalState } from "./generateSteps";
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

export function Canvas({ step }: CanvasProps<KruskalState>) {
  const { nodes, edges, mst, rejectedEdges, currentEdge } = step.state;

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
        {/* Edge List */}
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Danh sách cạnh (đã sắp xếp)</span>
          <div className="flex flex-col gap-1.5 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
            {edges.map((edge, idx) => {
              const [u, v, weight] = edge;
              
              // Check if edge is MST, Rejected, or Current
              const isMST = mst.some(e => e[0] === u && e[1] === v);
              const isRejected = rejectedEdges.some(e => e[0] === u && e[1] === v);
              const isCurrent = currentEdge?.[0] === u && currentEdge?.[1] === v;

              return (
                <motion.div
                  key={`${u}-${v}-${idx}`}
                  className={clsx(
                    "flex items-center justify-between min-w-[120px] rounded-lg border-2 px-3 py-1.5 shadow-sm transition-all",
                    {
                      "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-900/30": isMST,
                      "border-rose-200 bg-rose-50 opacity-60 dark:border-rose-900/50 dark:bg-rose-900/30": isRejected,
                      "border-violet-400 bg-violet-100 scale-105 shadow-md dark:border-violet-600 dark:bg-violet-900/50": isCurrent,
                      "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900": !isMST && !isRejected && !isCurrent,
                    }
                  )}
                >
                  <span className={clsx(
                    "font-bold",
                    isMST ? "text-emerald-700 dark:text-emerald-300" :
                    isRejected ? "text-rose-700 dark:text-rose-300 line-through" :
                    isCurrent ? "text-violet-700 dark:text-violet-300" :
                    "text-neutral-700 dark:text-neutral-300"
                  )}>
                    {u} - {v}
                  </span>
                  <span className={clsx(
                    "font-mono text-sm",
                    isMST ? "text-emerald-600 dark:text-emerald-400" :
                    isRejected ? "text-rose-600 dark:text-rose-400 line-through" :
                    isCurrent ? "text-violet-600 dark:text-violet-400" :
                    "text-neutral-500 dark:text-neutral-400"
                  )}>
                    {weight}
                  </span>
                  
                  {/* Status indicator */}
                  {isMST && <span className="ml-2 text-emerald-500">✓</span>}
                  {isRejected && <span className="ml-2 text-rose-500">×</span>}
                  {isCurrent && <span className="ml-2 text-violet-500">?</span>}
                </motion.div>
              );
            })}
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
              
              const isMST = mst.some(e => e[0] === u && e[1] === v);
              const isRejected = rejectedEdges.some(e => e[0] === u && e[1] === v);
              const isCurrent = currentEdge?.[0] === u && currentEdge?.[1] === v;

              const midX = (start.x + end.x) / 2;
              const midY = (start.y + end.y) / 2;

              return (
                <g key={`${u}-${v}-${idx}`}>
                  <motion.line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={
                      isCurrent ? "#8b5cf6" : 
                      isMST ? "#10b981" : 
                      isRejected ? "transparent" : // We could hide rejected edges or make them very faint
                      "currentColor"
                    }
                    strokeWidth={isCurrent || isMST ? 4 : 2}
                    className={clsx(
                      "transition-colors duration-300",
                      isCurrent ? "text-violet-500 z-10" : 
                      isMST ? "text-emerald-500 z-10" : 
                      isRejected ? "text-rose-200/30 dark:text-rose-900/30" : 
                      "text-neutral-300 dark:text-neutral-700"
                    )}
                  />
                  {/* If rejected, draw a red X on the edge */}
                  {isRejected && (
                    <g className="text-rose-500">
                      <line x1={midX - 6} y1={midY - 6} x2={midX + 6} y2={midY + 6} stroke="currentColor" strokeWidth={3} />
                      <line x1={midX + 6} y1={midY - 6} x2={midX - 6} y2={midY + 6} stroke="currentColor" strokeWidth={3} />
                    </g>
                  )}
                  
                  {/* Weight label background */}
                  {!isRejected && (
                    <>
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
                          isCurrent ? "fill-violet-600 dark:fill-violet-400" : 
                          isMST ? "fill-emerald-600 dark:fill-emerald-400" : 
                          "fill-neutral-500 dark:fill-neutral-400"
                        )}
                      >
                        {weight}
                      </text>
                    </>
                  )}
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
                    "border-neutral-300 bg-white text-neutral-700 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200": !highlight,
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
