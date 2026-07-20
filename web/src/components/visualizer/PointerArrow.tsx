"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import clsx from "clsx";

export function PointerArrow({
  x,
  label,
  muted = false,
}: {
  x: number;
  label: string;
  muted?: boolean;
}) {
  return (
    <motion.div
      animate={{ x }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className={clsx(
        "absolute left-0 top-0 flex w-12 flex-col items-center",
        muted ? "text-neutral-400 dark:text-neutral-600" : "text-indigo-600 dark:text-indigo-400",
      )}
    >
      <ArrowUp size={16} strokeWidth={2.5} />
      <span className="text-[11px] font-bold">{label}</span>
    </motion.div>
  );
}
