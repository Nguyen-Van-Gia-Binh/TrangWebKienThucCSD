import Link from "next/link";
import { BookOpen, MonitorPlay, Sparkles } from "lucide-react";
import { visualizers } from "@/features/visualizers/registry";
import { CHAPTERS } from "@/lib/chapters";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          <Sparkles size={13} /> Học bằng hình ảnh động, từng bước một
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Ôn tập{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Cấu trúc dữ liệu
          </span>{" "}
          &amp; Giải thuật
        </h1>
        <p className="mt-4 text-neutral-500 dark:text-neutral-400">
          Toàn bộ kiến thức môn CSD — từ danh sách liên kết, stack, queue, đệ
          quy đến cây và đồ thị — kèm visualizer tương tác giúp bạn nhìn thấy
          từng bước thuật toán chạy.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/visualizers"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            <MonitorPlay size={17} /> Khám phá Visualizer
          </Link>
          <Link
            href="/topics"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-5 py-2.5 font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <BookOpen size={17} /> Xem chủ đề
          </Link>
        </div>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
          <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {CHAPTERS.length}
          </div>
          <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            chương kiến thức bám sát slide môn học
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
          <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {visualizers.length}
          </div>
          <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            visualizer tương tác (đang tiếp tục bổ sung)
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
          <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
            100%
          </div>
          <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            miễn phí, chạy ngay trên trình duyệt, không cần tài khoản
          </div>
        </div>
      </div>
    </div>
  );
}
