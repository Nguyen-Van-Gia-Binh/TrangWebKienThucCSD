"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import clsx from "clsx";

export function MarkdownRenderer({ content, className }: { content: string; className?: string }) {
  const cleanContent = content
    .replace(/\$\$\s*\|\s*Height\(LeftChild\)\s*-\s*Height\(RightChild\)\s*\|\s*\\le\s*1\s*\$\$/g, '`| Height(LeftChild) - Height(RightChild) | <= 1`')
    .replace(/\\rightarrow/g, '->')
    .replace(/\\infty/g, '∞')
    .replace(/\$([^\$]+)\$/g, (match, p1) => {
      let clean = p1.trim();
      clean = clean.replace(/\\log_2/g, 'log_2');
      clean = clean.replace(/\\log/g, 'log');
      clean = clean.replace(/\\le/g, '<=');
      return '`' + clean + '`';
    });

  return (
    <div
      className={clsx(
        "prose-custom flex flex-col gap-5 text-[17px] leading-[1.8] text-neutral-700 dark:text-neutral-300",
        "[&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:mt-8 [&_h1]:mb-6 [&_h1]:text-transparent [&_h1]:bg-clip-text [&_h1]:bg-gradient-to-r [&_h1]:from-indigo-600 [&_h1]:to-violet-600 dark:[&_h1]:from-indigo-400 dark:[&_h1]:to-violet-400",
        "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-neutral-900 dark:[&_h2]:text-white [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2",
        "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-neutral-800 dark:[&_h3]:text-neutral-100",
        "[&_p]:mb-5",
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul_li]:mb-2 [&_ul_li]:pl-1 [&_ul_li::marker]:text-indigo-400",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol_li]:mb-2 [&_ol_li]:pl-1 [&_ol_li::marker]:text-indigo-400 [&_ol_li::marker]:font-semibold",
        "[&_a]:text-indigo-600 dark:[&_a]:text-indigo-400 [&_a]:underline [&_a]:decoration-indigo-200 dark:[&_a]:decoration-indigo-800 [&_a]:underline-offset-4 hover:[&_a]:decoration-indigo-500",
        "[&_code]:bg-indigo-50 dark:[&_code]:bg-indigo-900/30 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-indigo-600 dark:[&_code]:text-indigo-300",
        "[&_pre]:bg-[#1e1e2e] dark:[&_pre]:bg-[#181825] [&_pre]:p-5 [&_pre]:rounded-2xl [&_pre]:shadow-lg [&_pre]:overflow-x-auto [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[#cdd6f4] [&_pre_code]:text-sm",
        "[&_blockquote]:border-l-4 [&_blockquote]:border-indigo-500 [&_blockquote]:bg-indigo-50/50 dark:[&_blockquote]:bg-indigo-900/10 [&_blockquote]:pl-5 [&_blockquote]:py-3 [&_blockquote]:pr-4 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_blockquote]:text-neutral-600 dark:[&_blockquote]:text-neutral-400",
        "[&_strong]:font-semibold [&_strong]:text-neutral-900 dark:[&_strong]:text-white",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
}
