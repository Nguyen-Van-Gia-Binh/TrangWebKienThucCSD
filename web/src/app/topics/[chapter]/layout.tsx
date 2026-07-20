export default async function ChapterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-4">
      <div className="flex-1 py-10 md:px-8">{children}</div>
    </div>
  );
}
