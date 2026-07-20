"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";

export function PseudocodePanel({
  lines,
  activeLine,
}: {
  lines: string[];
  activeLine?: number;
}) {
  const containerRef = useRef<HTMLPreElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      const container = containerRef.current;
      const element = activeLineRef.current;
      
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const containerBottom = containerTop + containerHeight;
      
      const elementTop = element.offsetTop;
      const elementHeight = element.clientHeight;
      const elementBottom = elementTop + elementHeight;

      if (elementTop < containerTop || elementBottom > containerBottom) {
        // Only scroll the specific container, NOT the whole window
        const scrollTo = elementTop - containerHeight / 2 + elementHeight / 2;
        container.scrollTo({ top: scrollTo, behavior: "smooth" });
      }
    }
  }, [activeLine]);

  return (
    <div className="rounded-xl border border-neutral-200/80 bg-[#1e1e2e] shadow-xl overflow-hidden dark:border-neutral-800/80 flex flex-col">
      {/* Mac Window Header */}
      <div className="flex items-center px-4 py-3 bg-[#181825] border-b border-[#313244]/50 shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f38ba8] shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-[#f9e2af] shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-[#a6e3a1] shadow-sm"></div>
        </div>
        <div className="mx-auto text-xs font-semibold uppercase tracking-widest text-[#a6adc8]">
          Pseudocode
        </div>
      </div>
      
      <pre 
        ref={containerRef}
        className="overflow-x-auto overflow-y-auto max-h-[350px] p-4 font-mono text-sm leading-6 custom-scrollbar"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            ref={i === activeLine ? activeLineRef : null}
            className={clsx(
              "rounded px-3 py-0.5 whitespace-pre transition-all duration-200",
              i === activeLine
                ? "bg-[#cba6f7]/20 text-[#cba6f7] border-l-2 border-[#cba6f7] font-bold drop-shadow-[0_0_8px_rgba(203,166,247,0.3)]"
                : "text-[#cdd6f4] hover:bg-[#313244]/30 border-l-2 border-transparent",
            )}
          >
            {line || " "}
          </div>
        ))}
      </pre>
    </div>
  );
}
