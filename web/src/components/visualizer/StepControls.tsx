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
    "flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-transparent dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800";

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center gap-2">
        <button type="button" onClick={onReset} className={btn} title="Về đầu">
          <RotateCcw size={16} />
        </button>
        <button
          type="button"
          onClick={onPrev}
          disabled={index <= 0}
          className={btn}
          title="Bước trước"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={isPlaying ? onPause : onPlay}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white transition-colors hover:bg-indigo-500"
          title={isPlaying ? "Tạm dừng" : "Chạy"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={index >= total - 1}
          className={btn}
          title="Bước sau"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <input
        type="range"
        min={0}
        max={Math.max(total - 1, 0)}
        value={index}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="min-w-32 flex-1 accent-indigo-600"
        aria-label="Tua tới bước"
      />

      <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
        {index + 1}/{total}
      </span>

      <select
        value={speed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        className="rounded-lg border border-neutral-200 bg-transparent px-2 py-1.5 text-xs text-neutral-700 dark:border-neutral-700 dark:text-neutral-200 dark:[&>option]:bg-neutral-900"
        aria-label="Tốc độ"
      >
        {SPEEDS.map((s) => (
          <option key={s} value={s}>
            {s}x
          </option>
        ))}
      </select>
    </div>
  );
}
