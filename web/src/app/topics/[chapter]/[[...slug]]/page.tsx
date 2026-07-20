import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MonitorPlay } from "lucide-react";
import { CHAPTERS, getChapter } from "@/lib/chapters";
import { visualizers } from "@/features/visualizers/registry";
import quizzesData from "@/data/quizzes.json";
import { QuizSection } from "@/components/quiz/QuizSection";
import fs from "fs";
import path from "path";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ chapter: c.slug, slug: [] as string[] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { chapter } = await params;
  return { title: getChapter(chapter)?.title ?? "Chủ đề" };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapter: string; slug?: string[] }>;
}) {
  const { chapter: chapterSlug } = await params;
  const chapter = getChapter(chapterSlug);
  if (!chapter) notFound();

  const related = visualizers.filter((v) => v.chapter === chapter.slug);

  // Đọc nội dung Markdown từ file
  let markdownContent = "";
  try {
    const filePath = path.join(process.cwd(), "src", "content", "theories", `${chapter.slug}.md`);
    markdownContent = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    markdownContent = "Đang biên soạn nội dung...";
  }

  return (
    <div className="w-full">
      <Link
        href="/topics"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
      >
        <ArrowLeft size={15} /> Tất cả chủ đề
      </Link>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10 dark:border-neutral-800 dark:bg-neutral-900/50">
        <MarkdownRenderer content={markdownContent} />
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-3 text-lg font-semibold">
            Trực quan hóa (Visualizer)
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((v) => (
              <Link
                key={v.slug}
                href={`/visualizers/${v.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-indigo-400 dark:border-neutral-800 dark:hover:border-indigo-600"
              >
                <MonitorPlay
                  size={18}
                  className="shrink-0 text-indigo-500 dark:text-indigo-400"
                />
                <span className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {v.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Render Quizzes if any */}
      <QuizSection questions={(quizzesData as Record<string, any>)[chapter.slug] || []} />
    </div>
  );
}
