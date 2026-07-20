"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { CanvasProps } from "@/lib/types";
import { getHighlightKind } from "@/lib/types";
import type { BSTState, BSTNode } from "./generateSteps";
import clsx from "clsx";

const NODE_RADIUS = 20;
const LEVEL_HEIGHT = 60;
const MIN_NODE_SPACING = 50;

function calculateLayout(nodes: Record<string, BSTNode>, rootId: string | null) {
  const layout: Record<string, { x: number; y: number }> = {};
  if (!rootId) return layout;

  const positions: { id: string; level: number; offset: number }[] = [];

  // In-order traversal to determine X offset
  let currentOffset = 0;
  const traverse = (id: string, level: number) => {
    const node = nodes[id];
    if (node.left) traverse(node.left, level + 1);
    positions.push({ id, level, offset: currentOffset++ });
    if (node.right) traverse(node.right, level + 1);
  };

  traverse(rootId, 0);

  // Center the tree
  const minOffset = Math.min(...positions.map((p) => p.offset));
  const maxOffset = Math.max(...positions.map((p) => p.offset));
  const centerOffset = (minOffset + maxOffset) / 2;

  positions.forEach((p) => {
    layout[p.id] = {
      x: (p.offset - centerOffset) * MIN_NODE_SPACING,
      y: p.level * LEVEL_HEIGHT,
    };
  });

  return layout;
}

export function Canvas({ step }: CanvasProps<BSTState>) {
  const { nodes, rootId, targetValue, targetAction } = step.state;
  const layout = useMemo(() => calculateLayout(nodes, rootId), [nodes, rootId]);

  let targetNodePos = null;
  if (targetValue !== null && targetValue !== undefined) {
    const activeId = step.highlights?.find(h => h.kind === "compare" || h.kind === "active" || h.kind === "danger")?.ids?.[0];
    if (activeId && layout[activeId]) {
      targetNodePos = layout[activeId];
    }
  }

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
      
      <div className="relative mt-8 h-full w-full min-h-[300px]">
        {/* Draw edges */}
        <svg className="pointer-events-none absolute left-1/2 top-0 h-full w-[2px] overflow-visible">
          <g>
            {Object.values(nodes).map((node) => {
              const start = layout[node.id];
              if (!start) return null;
              
              return (
                <g key={`edges-${node.id}`}>
                  {node.left && layout[node.left] && (
                    <motion.line
                      layoutId={`edge-${node.id}-${node.left}`}
                      x1={start.x}
                      y1={start.y}
                      x2={layout[node.left].x}
                      y2={layout[node.left].y}
                      stroke="currentColor"
                      strokeWidth={2}
                      className="text-neutral-300 dark:text-neutral-700"
                    />
                  )}
                  {node.right && layout[node.right] && (
                    <motion.line
                      layoutId={`edge-${node.id}-${node.right}`}
                      x1={start.x}
                      y1={start.y}
                      x2={layout[node.right].x}
                      y2={layout[node.right].y}
                      stroke="currentColor"
                      strokeWidth={2}
                      className="text-neutral-300 dark:text-neutral-700"
                    />
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Draw nodes */}
        <div className="absolute left-1/2 top-0 h-full w-full overflow-visible">
          {/* Draw target value if present */}
          {targetValue !== null && targetValue !== undefined && (
            <motion.div
              layoutId="bst-target-value"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: targetNodePos ? targetNodePos.x + 28 : -32,
                y: targetNodePos ? targetNodePos.y - 32 : -40,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              className={clsx(
                "absolute z-10 flex w-16 flex-col items-center justify-center rounded-lg border-2 py-1 shadow-md backdrop-blur-md",
                {
                  "border-indigo-500 bg-indigo-100/90 text-indigo-700 dark:bg-indigo-900/80 dark:text-indigo-200": targetAction === "insert",
                  "border-amber-500 bg-amber-100/90 text-amber-700 dark:bg-amber-900/80 dark:text-amber-200": targetAction === "search",
                  "border-rose-500 bg-rose-100/90 text-rose-700 dark:bg-rose-900/80 dark:text-rose-200": targetAction === "delete",
                }
              )}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                {targetAction}
              </span>
              <span className="text-lg font-bold leading-none">{targetValue}</span>
            </motion.div>
          )}

          {Object.values(nodes).map((node) => {
            const pos = layout[node.id];
            if (!pos) return null;

            const highlight = getHighlightKind(step, node.id);
            const isSuccess = highlight === "success";
            const isDanger = highlight === "danger";
            const isActive = highlight === "active";
            const isCompare = highlight === "compare";

            return (
              <motion.div
                key={node.id}
                layoutId={node.id}
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
                  "absolute flex items-center justify-center rounded-full border-2 text-sm font-bold shadow-sm transition-colors",
                  {
                    "border-neutral-300 bg-white text-neutral-700 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200": !highlight,
                    "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200": isActive,
                    "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200": isSuccess,
                    "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/50 dark:text-rose-200": isDanger,
                    "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200": isCompare,
                  }
                )}
                style={{
                  width: NODE_RADIUS * 2,
                  height: NODE_RADIUS * 2,
                }}
              >
                {node.value}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
