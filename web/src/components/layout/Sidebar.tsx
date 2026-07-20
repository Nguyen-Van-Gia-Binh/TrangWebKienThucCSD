"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, LayoutDashboard, Binary, Workflow, GitBranch, Network, Database, MonitorPlay } from "lucide-react";
import clsx from "clsx";

// A slightly richer chapter list with icons based on slug
const TOPICS = [
  { slug: "recursion", title: "Đệ quy", icon: Workflow },
  { slug: "lists", title: "Danh sách liên kết", icon: Binary },
  { slug: "stacks-queues", title: "Stack & Queue", icon: Database },
  { slug: "trees-1", title: "Cây nhị phân (BST)", icon: GitBranch },
  { slug: "trees-2", title: "Cây AVL (AVL Tree)", icon: GitBranch },
  { slug: "graphs-1", title: "Đồ thị cơ bản (BFS/DFS)", icon: Network },
  { slug: "graphs-2", title: "Đường đi ngắn nhất", icon: Network },
  { slug: "graphs-3", title: "Cây khung nhỏ nhất", icon: Network },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-72 shrink-0 flex-col border-r border-neutral-200/50 bg-white/50 backdrop-blur-md dark:border-neutral-800/50 dark:bg-neutral-900/50 z-40 transition-colors duration-300">
      <div className="flex h-16 items-center px-6 border-b border-neutral-200/50 dark:border-neutral-800/50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
            CSD201
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
        <div className="mb-4 text-xs font-bold text-neutral-400 uppercase tracking-wider dark:text-neutral-500 px-2">
          Hệ thống bài học
        </div>
        <nav className="flex flex-col gap-1.5">
          <Link
            href="/topics"
            className={clsx(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
              pathname === "/topics"
                ? "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 shadow-sm dark:from-indigo-900/20 dark:to-violet-900/20 dark:text-indigo-300"
                : "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-white"
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Tổng quan Lý thuyết</span>
          </Link>

          <Link
            href="/visualizers"
            className={clsx(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
              pathname.startsWith("/visualizers")
                ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 shadow-sm dark:from-emerald-900/20 dark:to-teal-900/20 dark:text-emerald-300"
                : "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-white"
            )}
          >
            <MonitorPlay className="h-4 w-4" />
            <span>Khu vực Mô phỏng</span>
          </Link>
          
          <div className="my-2 h-px w-full bg-neutral-200/50 dark:bg-neutral-800/50" />

          {TOPICS.map((topic) => {
            const isActive = pathname.startsWith(`/topics/${topic.slug}`);
            const Icon = topic.icon;
            
            return (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className={clsx(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 shadow-sm dark:from-indigo-900/20 dark:to-violet-900/20 dark:text-indigo-300"
                    : "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-white"
                )}
              >
                <div className={clsx(
                  "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                  isActive
                    ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                    : "bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200 group-hover:text-neutral-600 dark:bg-neutral-800 dark:group-hover:bg-neutral-700 dark:group-hover:text-neutral-300"
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <span>{topic.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
