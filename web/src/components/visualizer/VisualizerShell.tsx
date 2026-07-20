"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getVisualizer } from "@/features/visualizers/registry";
import { getChapter } from "@/lib/chapters";
import { useStepEngine } from "./useStepEngine";
import { StepControls } from "./StepControls";
import { PseudocodePanel } from "./PseudocodePanel";
import { ActionLog } from "./ActionLog";

export function VisualizerShell({ slug }: { slug: string }) {
  const mod = getVisualizer(slug);
  if (!mod) throw new Error(`Visualizer không tồn tại: ${slug}`);
  return <ShellInner slug={slug} />;
}

function ShellInner({ slug }: { slug: string }) {
  const mod = getVisualizer(slug)!;
  const [input, setInput] = useState<unknown>(mod.defaultInput);
  const steps = useMemo(() => mod.generateSteps(input), [mod, input]);
  const engine = useStepEngine(steps);
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

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <InputPanel defaultInput={mod.defaultInput} onRun={setInput} />
          <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <Canvas step={engine.current} />
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
