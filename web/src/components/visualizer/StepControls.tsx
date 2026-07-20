"use client";

import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";

const SPEEDS = [0.5, 1, 1.5, 2];

export function StepControls({
  index,
  total,
  isPlaying,
  speed,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onSeek,
  onReset,
  onSpeedChange,
}: {
  index: number;
  total: number;
  isPlaying: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (i: number) => void;
  onReset: () => void;
  onSpeedChange: (s: number) => void;
}) {
  const btn =
    "flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/50 bg-white/50 text-neutral-600 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-indigo-600 hover:shadow-md disabled:opacity-40 disabled:hover:bg-white/50 disabled:hover:text-neutral-600 disabled:hover:shadow-sm dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-indigo-400";

  return (
    <div className="relative mx-auto flex w-full max-w-2xl flex-wrap items-center gap-4 rounded-2xl border border-white/20 bg-white/60 px-6 py-4 shadow-xl shadow-indigo-500/5 backdrop-blur-xl dark:border-neutral-700/30 dark:bg-neutral-900/60">
      <div className="flex items-center gap-2">
        <button type="button" onClick={onReset} className={btn} title="Về đầu">
          <RotateCcw size={18} />
        </button>
        <button
          type="button"
          onClick={onPrev}
          disabled={index <= 0}
          className={btn}
          title="Bước trước"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={isPlaying ? onPause : onPlay}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 transition-transform hover:scale-105 active:scale-95"
          title={isPlaying ? "Tạm dừng" : "Chạy"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={index >= total - 1}
          className={btn}
          title="Bước sau"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex flex-1 items-center gap-3">
        <input
          type="range"
          min={0}
          max={Math.max(total - 1, 0)}
          value={index}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-neutral-200/50 outline-none accent-indigo-600 dark:bg-neutral-700/50"
          aria-label="Tua tới bước"
        />
        <span className="w-12 text-right font-mono text-sm font-semibold text-neutral-600 dark:text-neutral-300">
          {index + 1}/{total}
        </span>
      </div>

      <div className="flex items-center gap-2 border-l border-neutral-200/50 pl-4 dark:border-neutral-700/50">
        <span className="text-xs font-medium text-neutral-400">Tốc độ</span>
        <select
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="cursor-pointer appearance-none rounded-lg bg-white/50 px-3 py-1.5 text-sm font-semibold text-indigo-600 outline-none hover:bg-white dark:bg-neutral-800/50 dark:text-indigo-400 dark:hover:bg-neutral-800"
          aria-label="Tốc độ"
        >
          {SPEEDS.map((s) => (
            <option key={s} value={s}>
              {s}x
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
