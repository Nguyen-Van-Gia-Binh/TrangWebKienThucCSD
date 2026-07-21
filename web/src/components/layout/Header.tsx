"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { GraduationCap, Search, Bell, User, Menu } from "lucide-react";
import { useSidebar } from "@/components/providers/SidebarProvider";

export function Header() {
  const { setMobileMenuOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/50 bg-white/70 backdrop-blur-md dark:border-neutral-800/50 dark:bg-neutral-900/70 shadow-sm transition-colors duration-300">
      <div className="flex h-16 items-center px-6 gap-4">
        
        {/* Mobile Logo and Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 -ml-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
              CSD201
            </span>
          </Link>
        </div>

        {/* Global Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-neutral-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Tìm kiếm bài học, thuật toán..." 
            className="w-full bg-neutral-100/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-full py-2 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white dark:focus:bg-neutral-900 transition-all placeholder:text-neutral-500"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-1.5 font-mono text-[10px] font-medium text-neutral-500 dark:text-neutral-400 opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden lg:flex items-center text-sm font-medium text-neutral-500 dark:text-neutral-400 mr-2 border-r border-neutral-200 dark:border-neutral-700 pr-5">
            Đại học FPT • Cấu trúc dữ liệu và Giải thuật
          </div>

          <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-neutral-900"></span>
          </button>
          
          <a href="https://github.com/Nguyen-Van-Gia-Binh/TrangWebKienThucCSD/tree/tung" target="_blank" rel="noreferrer" className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 relative">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>

          <div className="h-5 w-px bg-neutral-200 dark:bg-neutral-700 hidden sm:block mx-1"></div>

          <ThemeToggle />

          <button className="h-9 w-9 overflow-hidden rounded-full border-2 border-neutral-200 dark:border-neutral-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 ml-1">
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
