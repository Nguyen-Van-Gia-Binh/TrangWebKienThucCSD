import type { Metadata } from "next";
import Link from "next/link";
import { MonitorPlay } from "lucide-react";
import { visualizers } from "@/features/visualizers/registry";
import { getChapter } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "Visualizer",
};

export default function VisualizersPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Visualizer</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">
        Xem thuật toán chạy từng bước: điều khiển play / pause, tua lại, đối
        chiếu mã giả và diễn giải tiếng Việt.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visualizers.map((v) => {
          const chapter = getChapter(v.chapter);
          return (
            <Link
              key={v.slug}
              href={`/visualizers/${v.slug}`}
              className="group rounded-xl border border-neutral-200 p-5 transition-colors hover:border-indigo-400 dark:border-neutral-800 dark:hover:border-indigo-600"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {v.badge}
                </span>
                <MonitorPlay
                  size={17}
                  className="text-neutral-300 transition-colors group-hover:text-indigo-500 dark:text-neutral-600"
                />
              </div>
              <div className="font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {v.title}
              </div>
              <p className="mt-1 line-clamp-3 text-sm text-neutral-500 dark:text-neutral-400">
                {v.description}
              </p>
              {chapter && (
                <div className="mt-3 text-xs text-neutral-400 dark:text-neutral-500">
                  Chương: {chapter.title}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
