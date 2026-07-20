import Link from "next/link";
import { BookOpen, MonitorPlay, Sparkles } from "lucide-react";
import { visualizers } from "@/features/visualizers/registry";
import { CHAPTERS } from "@/lib/chapters";

export default function Home() {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:py-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/50 bg-indigo-100/50 px-4 py-1.5 text-sm font-semibold text-indigo-700 backdrop-blur-sm dark:border-indigo-900/50 dark:bg-indigo-900/30 dark:text-indigo-300">
            <Sparkles size={16} className="text-amber-500" /> Nền tảng học tập chuẩn 2026
          </span>
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl mb-6">
          <span className="text-neutral-900 dark:text-white">Ôn tập</span>{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 bg-clip-text text-transparent drop-shadow-sm">
            Cấu trúc dữ liệu
          </span>
          <br />
          <span className="text-neutral-900 dark:text-white">&amp; Giải thuật</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Tạm biệt những slide khô khan! Khám phá toàn bộ kiến thức CSD201 bằng hình ảnh động tương tác mượt mà. 
          Hiểu sâu bản chất thuật toán qua từng bước chạy thực tế.
        </p>
        
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/visualizers"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
            <MonitorPlay size={20} className="relative z-10" /> 
            <span className="relative z-10">Khám phá Visualizer</span>
          </Link>
          <Link
            href="/topics"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-neutral-200/80 bg-white/50 px-8 py-4 font-bold text-neutral-700 backdrop-blur-sm transition-all hover:bg-neutral-100 hover:scale-105 dark:border-neutral-800/80 dark:bg-neutral-900/50 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <BookOpen size={20} /> Bắt đầu học lý thuyết
          </Link>
        </div>
      </div>

      <div className="mt-24 grid gap-6 sm:grid-cols-3 relative z-10">
        <div className="group relative rounded-3xl border border-neutral-200/50 bg-white/40 p-8 backdrop-blur-md transition-all hover:-translate-y-2 hover:shadow-xl dark:border-neutral-800/50 dark:bg-neutral-900/40 dark:hover:border-indigo-500/30 dark:hover:shadow-indigo-900/20">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
            {CHAPTERS.length}
          </div>
          <div className="mt-3 text-base font-medium text-neutral-600 dark:text-neutral-400">
            Chương kiến thức cốt lõi
          </div>
        </div>
        <div className="group relative rounded-3xl border border-neutral-200/50 bg-white/40 p-8 backdrop-blur-md transition-all hover:-translate-y-2 hover:shadow-xl dark:border-neutral-800/50 dark:bg-neutral-900/40 dark:hover:border-violet-500/30 dark:hover:shadow-violet-900/20">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400">
            {visualizers.length}+
          </div>
          <div className="mt-3 text-base font-medium text-neutral-600 dark:text-neutral-400">
            Thuật toán được trực quan hóa
          </div>
        </div>
        <div className="group relative rounded-3xl border border-neutral-200/50 bg-white/40 p-8 backdrop-blur-md transition-all hover:-translate-y-2 hover:shadow-xl dark:border-neutral-800/50 dark:bg-neutral-900/40 dark:hover:border-sky-500/30 dark:hover:shadow-sky-900/20">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-sky-600 to-cyan-500 dark:from-sky-400 dark:to-cyan-400">
            100%
          </div>
          <div className="mt-3 text-base font-medium text-neutral-600 dark:text-neutral-400">
            Miễn phí và chạy trực tiếp trên trình duyệt
          </div>
        </div>
      </div>
    </div>
  );
}
