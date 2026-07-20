import { Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200/50 bg-white/30 px-6 py-8 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-900/30 mt-auto">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row text-center md:text-left">
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center justify-center md:justify-start gap-2">
            CSD201 - Cấu trúc dữ liệu & Giải thuật
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Nền tảng học tập tương tác trực quan dành cho sinh viên Đại học FPT.
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            Phát triển bởi GROUP6<Heart className="h-4 w-4 text-rose-500 animate-pulse" fill="currentColor" /> 
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Trang chủ
            </Link>
            <span>&middot;</span>
            <Link href="/topics" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Lý thuyết
            </Link>
            <span>&middot;</span>
            <Link href="/visualizers" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Visualizer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
