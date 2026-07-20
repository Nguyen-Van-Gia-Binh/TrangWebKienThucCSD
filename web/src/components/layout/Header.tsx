import Link from "next/link";
import { Braces } from "lucide-react";

const LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/visualizers", label: "Visualizer" },
  { href: "/topics", label: "Chủ đề" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Braces size={15} />
          </span>
          CSD Study
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-1.5 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
