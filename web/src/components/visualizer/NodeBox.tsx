"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";
import type { HighlightKind } from "@/lib/types";

const KIND_CLASS: Record<HighlightKind, string> = {
  compare: "ring-2 ring-amber-400 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/50 dark:to-amber-900/80 text-amber-900 dark:text-amber-100 shadow-[0_0_15px_rgba(251,191,36,0.4)]",
  active: "ring-2 ring-violet-400 bg-gradient-to-br from-indigo-100 to-violet-200 dark:from-indigo-900/60 dark:to-violet-900/60 text-indigo-900 dark:text-indigo-100 shadow-[0_0_15px_rgba(139,92,246,0.4)]",
  success: "ring-2 ring-emerald-400 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-900/80 text-emerald-900 dark:text-emerald-100 shadow-[0_0_15px_rgba(52,211,153,0.4)]",
  danger: "ring-2 ring-rose-400 bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900/50 dark:to-rose-900/80 text-rose-900 dark:text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.4)]",
};

export function NodeBox({
  id,
  highlight,
  children,
}: {
  id: string;
  highlight?: HighlightKind;
  children: ReactNode;
}) {
  return (
    <motion.div
      layoutId={id}
      initial={{ opacity: 0, y: -24, scale: 0.7 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.7 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={clsx(
        "flex h-full w-full items-center justify-center rounded-lg font-mono text-sm font-semibold",
        highlight
          ? KIND_CLASS[highlight]
          : "bg-gradient-to-b from-white to-neutral-50 text-neutral-800 shadow-[0_4px_10px_rgba(0,0,0,0.05)] ring-1 ring-neutral-200 dark:from-neutral-800 dark:to-neutral-900 dark:text-neutral-200 dark:ring-neutral-700 dark:shadow-[0_4px_10px_rgba(0,0,0,0.4)]",
      )}
    >
      {children}
    </motion.div>
  );
}
