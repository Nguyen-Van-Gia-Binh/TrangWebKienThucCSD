"use client";

import { motion } from "framer-motion";
import type { CanvasProps } from "@/lib/types";
import type { QueueCircularState } from "./generateSteps";

export function Canvas({ step }: CanvasProps<QueueCircularState>) {
  const { cells, front, rear } = step.state;

  return (
    <div className="flex h-full min-h-[300px] w-full items-center justify-center overflow-x-auto p-4 sm:p-8">
      <div className="flex items-center gap-2">
        {cells.map((cell, idx) => {
          const isFront = front === idx;
          const isRear = rear === idx;

          return (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Pointers: front and rear */}
              <div className="absolute -top-12 flex flex-col items-center gap-1">
                {isFront && (
                  <motion.div
                    layoutId="queue-circ-front-pointer"
                    className="flex flex-col items-center text-rose-500 dark:text-rose-400"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">
                      front
                    </span>
                    <span className="text-lg leading-none">↓</span>
                  </motion.div>
                )}
              </div>

              {/* Box */}
              <div
                className={`relative flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16 ${
                  cell ? "border-b-4 border-indigo-500" : "border-b-4 border-neutral-200 dark:border-neutral-700"
                } border-l border-r border-t border-neutral-300 bg-white text-xl font-semibold shadow-sm sm:text-2xl dark:border-neutral-700 dark:bg-neutral-900`}
              >
                {cell ? (
                  <motion.div
                    layoutId={cell.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    className="absolute inset-0 flex items-center justify-center bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
                  >
                    {cell.value}
                  </motion.div>
                ) : (
                  <span className="text-neutral-300 dark:text-neutral-700">
                    -
                  </span>
                )}
              </div>
              <div className="mt-2 text-xs text-neutral-400">[{idx}]</div>
              
              <div className="absolute -bottom-12 flex flex-col items-center gap-1">
                {isRear && (
                  <motion.div
                    layoutId="queue-circ-rear-pointer"
                    className="flex flex-col items-center text-blue-500 dark:text-blue-400"
                  >
                    <span className="text-lg leading-none">↑</span>
                    <span className="text-xs font-bold uppercase tracking-wider">
                      rear
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
