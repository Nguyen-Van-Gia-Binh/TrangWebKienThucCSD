export interface Chapter {
  slug: string;
  title: string;
  slide: string;
}

export const CHAPTERS: Chapter[] = [
  { slug: "intro", title: "Giới thiệu Cấu trúc dữ liệu & Giải thuật", slide: "0-IntroductionToDSA" },
  { slug: "lists", title: "Danh sách & Danh sách liên kết", slide: "1-ListDataStructures" },
  { slug: "stacks", title: "Ngăn xếp (Stack)", slide: "2A-Stacks" },
  { slug: "queues", title: "Hàng đợi (Queue)", slide: "2B-Queues" },
  { slug: "recursion", title: "Đệ quy (Recursion)", slide: "3-Recursion" },
  { slug: "trees-1", title: "Cây, Cây nhị phân & BST", slide: "4A-Trees1" },
  { slug: "trees-2", title: "Cây cân bằng AVL & Heap", slide: "4B-Trees2" },
  { slug: "graphs-1", title: "Đồ thị: biểu diễn, BFS/DFS, đường đi ngắn nhất", slide: "5A-Graphs1" },
  { slug: "graphs-2", title: "Đồ thị: MST, Euler, Hamilton, tô màu", slide: "5B-Graphs2" },
];

export function getChapter(slug: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.slug === slug);
}
