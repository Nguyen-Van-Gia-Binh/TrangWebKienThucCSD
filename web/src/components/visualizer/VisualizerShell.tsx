"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import { getVisualizer } from "@/features/visualizers/registry";
import { getChapter } from "@/lib/chapters";
import type { Step } from "@/lib/types";
import { useStepEngine } from "./useStepEngine";
import { StepControls } from "./StepControls";
import { PseudocodePanel } from "./PseudocodePanel";
import { ActionLog } from "./ActionLog";
import { Legend } from "./Legend";

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const API_URL = rawApiUrl.replace(/\/$/, "");

export function VisualizerShell({ slug }: { slug: string }) {
  const mod = getVisualizer(slug);
  if (!mod) throw new Error(`Visualizer không tồn tại: ${slug}`);
  return <ShellInner slug={slug} />;
}

function ShellInner({ slug }: { slug: string }) {
  const mod = getVisualizer(slug)!;
  const [input, setInput] = useState<unknown>(mod.defaultInput);
  const [steps, setSteps] = useState<Step<unknown>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);

    const url = `${API_URL}/visualize/${slug}/generate`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ops: input }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Backend trả về lỗi HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!active) return;
        setSteps(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi fetch steps từ backend:", err);
        if (!active) return;
        setError(
          err instanceof Error
            ? err.message
            : "Không thể kết nối tới máy chủ visualizer.",
        );
        setSteps([]);
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug, input, retryToken]);

  const retry = useCallback(() => setRetryToken((t) => t + 1), []);

  const EMPTY_STEPS = useMemo(() => [{ state: {}, action: "Loading..." }], []);
  const engine = useStepEngine(steps.length > 0 ? steps : EMPTY_STEPS);
  const chapter = getChapter(mod.chapter);

  const { Canvas, InputPanel } = mod;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <Link
        href="/visualizers"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
      >
        <ArrowLeft size={15} /> Tất cả visualizer
      </Link>

      <div className="mb-6">
        <div className="mb-1 flex items-center gap-2">
          <h1 className="text-2xl font-bold">{mod.title}</h1>
          <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {mod.badge}
          </span>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {mod.description}
          {chapter && (
            <>
              {" · Chương: "}
              <Link
                href={`/topics/${chapter.slug}`}
                className="text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {chapter.title}
              </Link>
            </>
          )}
        </p>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">Không kết nối được tới backend visualizer</p>
            <p className="mt-1 text-rose-700 dark:text-rose-300">{error}</p>
            <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
              Đã gọi: <code>{API_URL}/visualize/{slug}/generate</code>. Hãy chắc chắn service{" "}
              <code>api</code> đang chạy (<code>cd api && npm run start:dev</code>).
            </p>
          </div>
          <button
            type="button"
            onClick={retry}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100 dark:border-rose-700 dark:text-rose-200 dark:hover:bg-rose-900"
          >
            <RefreshCw size={13} /> Thử lại
          </button>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <InputPanel defaultInput={mod.defaultInput} onRun={setInput} />
          <div className="relative rounded-xl border border-neutral-200/80 bg-white/50 p-5 shadow-lg shadow-neutral-200/50 backdrop-blur-sm dark:border-neutral-800/80 dark:bg-neutral-900/50 dark:shadow-black/50 bg-dot-pattern">
            <div className="mb-4">
              <Legend />
            </div>
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-white/60 backdrop-blur-sm dark:bg-neutral-900/60">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                <span className="mt-2 text-sm font-medium text-neutral-600 dark:text-neutral-300">Đang tính toán trên Backend...</span>
              </div>
            )}
            {engine.current && Object.keys(engine.current.state || {}).length > 0 ? (
              <Canvas step={engine.current} />
            ) : (
              <div className="min-h-[400px] flex items-center justify-center text-neutral-500">
                {isLoading ? "" : error ? "" : "Không có dữ liệu mô phỏng"}
              </div>
            )}
          </div>
          <StepControls
            index={engine.index}
            total={engine.total}
            isPlaying={engine.isPlaying}
            speed={engine.speed}
            onPlay={engine.play}
            onPause={engine.pause}
            onNext={engine.next}
            onPrev={engine.prev}
            onSeek={engine.seek}
            onReset={engine.reset}
            onSpeedChange={engine.setSpeed}
          />
        </div>
        <div className="flex flex-col gap-4">
          <PseudocodePanel
            lines={mod.pseudocode}
            activeLine={engine.current?.pseudocodeLine}
          />
          <ActionLog
            actions={steps.map((s) => s.action)}
            currentIndex={engine.index}
          />
        </div>
      </div>
    </div>
  );
}
