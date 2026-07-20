import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { CHAPTERS } from "@/lib/chapters";
import { visualizers } from "@/features/visualizers/registry";

export const metadata: Metadata = {
  title: "Chủ đề",
};

export default function TopicsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Chủ đề</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">
        9 chương kiến thức bám sát slide môn học. Nội dung lý thuyết đang được
        biên soạn — visualizer của từng chương đã dùng được ngay.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CHAPTERS.map((c, i) => {
          const count = visualizers.filter((v) => v.chapter === c.slug).length;
          return (
            <Link
              key={c.slug}
              href={`/topics/${c.slug}`}
              className="group flex items-start gap-4 rounded-xl border border-neutral-200 p-5 transition-colors hover:border-indigo-400 dark:border-neutral-800 dark:hover:border-indigo-600"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 font-mono text-sm font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {i + 1}
              </span>
              <div>
                <div className="font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {c.title}
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-neutral-400 dark:text-neutral-500">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen size={12} /> Slide: {c.slide}
                  </span>
                  {count > 0 && (
                    <span className="font-semibold text-indigo-500 dark:text-indigo-400">
                      {count} visualizer
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
