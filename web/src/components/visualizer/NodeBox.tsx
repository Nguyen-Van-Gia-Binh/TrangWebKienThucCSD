"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";
import type { HighlightKind } from "@/lib/types";

const KIND_CLASS: Record<HighlightKind, string> = {
  compare: "ring-2 ring-amber-500 bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-100",
  active: "ring-2 ring-sky-500 bg-sky-100 dark:bg-sky-950 text-sky-900 dark:text-sky-100",
  success: "ring-2 ring-emerald-500 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100",
  danger: "ring-2 ring-rose-500 bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-100",
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
          : "bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100 ring-1 ring-indigo-300 dark:ring-indigo-800",
      )}
    >
      {children}
    </motion.div>
  );
}
