import { notFound } from "next/navigation";
import { getVisualizer, visualizers } from "@/features/visualizers/registry";
import { VisualizerShell } from "@/components/visualizer/VisualizerShell";

export function generateStaticParams() {
  return visualizers.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getVisualizer(slug);
  return { title: mod ? mod.title : "Visualizer" };
}

export default async function VisualizerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getVisualizer(slug)) notFound();
  return <VisualizerShell slug={slug} />;
}
