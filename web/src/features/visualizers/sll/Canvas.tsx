"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { CanvasProps } from "@/lib/types";
import type { SLLState } from "./generateSteps";
import { MoveRight } from "lucide-react";

export function Canvas({ step }: CanvasProps<SLLState>) {
  const { nodes, head } = step.state;

  // Build ordered list from head
  const orderedNodes = [];
  let curr = head;
  while (curr) {
    const node = nodes.find((n) => n.id === curr);
    if (!node) break;
    orderedNodes.push(node);
    curr = node.next;
  }

  // Find floating nodes (not connected to head yet, but in nodes array)
  // E.g., a newly created node before it's linked
  const connectedIds = new Set(orderedNodes.map((n) => n.id));
  const floatingNodes = nodes.filter((n) => !connectedIds.has(n.id));

  return (
    <div className="relative h-full w-full bg-neutral-50/50 dark:bg-neutral-900/50 p-8 flex flex-col justify-center items-center overflow-x-auto">
      {/* Container for linked list */}
      <div className="flex items-center gap-2 min-w-max">
        {/* Head pointer indicator */}
        <div className="flex flex-col items-center justify-end h-16 mr-2">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Head</span>
          <MoveRight size={20} className="text-neutral-400" />
        </div>

        <AnimatePresence mode="popLayout">
          {orderedNodes.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-neutral-400 font-medium italic"
            >
              null
            </motion.div>
          )}
          
          {orderedNodes.map((node, i) => {
            const isLast = i === orderedNodes.length - 1;
            const highlight = step.highlights?.find(h => h.ids.includes(node.id));
            
            return (
              <motion.div
                key={node.id}
                layoutId={`node-${node.id}`}
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex items-center gap-2"
              >
                {/* Node Box */}
                <div 
                  className={`
                    flex h-16 min-w-16 items-center justify-center rounded-xl border-2 text-lg font-bold shadow-sm transition-colors
                    ${
                      highlight?.kind === "active"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                        : highlight?.kind === "success"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : highlight?.kind === "danger"
                        ? "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                        : highlight?.kind === "compare"
                        ? "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                        : "border-neutral-200 bg-white text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                    }
                  `}
                >
                  {node.value}
                </div>

                {/* Arrow to next */}
                <div className="flex w-10 items-center justify-center">
                  {isLast ? (
                    <span className="text-neutral-400 font-medium italic">null</span>
                  ) : (
                    <MoveRight 
                      size={24} 
                      className={`
                        transition-colors
                        ${highlight?.kind === "active" ? "text-indigo-400" : "text-neutral-300 dark:text-neutral-600"}
                      `} 
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Floating nodes (e.g. creating a new node before linking it) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4">
        <AnimatePresence>
          {floatingNodes.map(node => {
            const highlight = step.highlights?.find(h => h.ids.includes(node.id));
            return (
              <motion.div
                key={node.id}
                layoutId={`node-${node.id}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">New Node</span>
                <div 
                  className={`
                    flex h-16 min-w-16 items-center justify-center border-2 border-dashed rounded-xl text-lg font-bold shadow-sm transition-colors
                    ${
                      highlight?.kind === "active"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                        : highlight?.kind === "success"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                    }
                  `}
                >
                  {node.value}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
