"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { CanvasProps } from "@/lib/types";
import type { RecursionState } from "./generateSteps";

export function Canvas({ step }: CanvasProps<RecursionState>) {
  const { callStack } = step.state;

  return (
    <div className="h-full w-full bg-neutral-50/50 p-8 flex justify-center items-center overflow-hidden dark:bg-neutral-900/50">
      <div className="flex flex-col-reverse items-center justify-start gap-3 h-full max-h-[500px] w-full max-w-md p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-y-auto">
        {callStack.length === 0 && (
          <div className="my-auto text-neutral-400 font-medium italic">Call Stack rỗng</div>
        )}
        <AnimatePresence mode="popLayout">
          {callStack.map((frame, i) => {
            const isTop = i === callStack.length - 1;
            const highlight = step.highlights?.find((h) => h.ids.includes(frame.id));
            
            return (
              <motion.div
                key={frame.id}
                layoutId={frame.id}
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, x: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`
                  w-full rounded-xl border-2 p-4 transition-colors relative
                  ${
                    frame.status === "running"
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                      : frame.status === "returned"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30"
                      : "border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800"
                  }
                  ${highlight?.kind === "active" ? "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-neutral-900" : ""}
                  ${highlight?.kind === "success" ? "ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-neutral-900" : ""}
                  ${highlight?.kind === "compare" ? "ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-neutral-900" : ""}
                `}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-mono font-bold ${frame.status === "running" ? "text-indigo-700 dark:text-indigo-300" : "text-neutral-600 dark:text-neutral-400"}`}>
                    {frame.funcName}({frame.args.n})
                  </span>
                  <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full
                    ${frame.status === "running" ? "bg-indigo-200 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200" : 
                      frame.status === "waiting" ? "bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200" : 
                      "bg-emerald-200 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200"}
                  `}>
                    {frame.status}
                  </span>
                </div>
                
                {frame.returnValue !== null && frame.returnValue !== undefined && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 pt-2 border-t border-emerald-200 dark:border-emerald-800/50"
                  >
                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                      Trả về (Return): {frame.returnValue}
                    </span>
                  </motion.div>
                )}
                
                {isTop && frame.status === "running" && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-8 bg-indigo-500 rounded-r-md"
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
