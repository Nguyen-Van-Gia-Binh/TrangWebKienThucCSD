export function Legend() {
  const items = [
    { label: "Bình thường", colorClass: "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700" },
    { label: "Đang xét", colorClass: "bg-violet-400 border-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.4)]" },
    { label: "Đang so sánh", colorClass: "bg-amber-400 border-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.4)]" },
    { label: "Thành công / Đã xong", colorClass: "bg-emerald-400 border-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.4)]" },
    { label: "Xóa / Lỗi", colorClass: "bg-rose-400 border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-neutral-200/50 bg-white/50 px-4 py-2.5 text-xs text-neutral-600 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-900/50 dark:text-neutral-400">
      <span className="font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Chú giải:</span>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full border ${item.colorClass}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
