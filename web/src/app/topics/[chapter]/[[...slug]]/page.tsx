import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Construction, MonitorPlay } from "lucide-react";
import { CHAPTERS, getChapter } from "@/lib/chapters";
import { visualizers } from "@/features/visualizers/registry";

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

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <Link
        href="/topics"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
      >
        <ArrowLeft size={15} /> Tất cả chủ đề
      </Link>

      <h1 className="text-3xl font-bold">{chapter.title}</h1>
      <p className="mt-1 text-sm text-neutral-400 dark:text-neutral-500">
        Slide gốc: {chapter.slide}.pdf
      </p>

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-dashed border-amber-300 bg-amber-50 p-5 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
        <Construction size={18} className="mt-0.5 shrink-0" />
        <p>
          Nội dung lý thuyết của chương này đang được biên soạn từ slide môn học
          và sẽ sớm xuất hiện tại đây.
        </p>
      </div>

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">
            Visualizer của chương này
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
    </div>
  );
}
