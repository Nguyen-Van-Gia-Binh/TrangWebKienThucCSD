export interface Chapter {
  slug: string;
  title: string;
  slide: string;
}

export const CHAPTERS: Chapter[] = [
  { slug: "intro", title: "Giới thiệu Cấu trúc dữ liệu & Giải thuật", slide: "0-IntroductionToDSA" },
  { slug: "recursion", title: "Đệ quy (Recursion)", slide: "3-Recursion" },
  { slug: "lists", title: "Danh sách liên kết (Linked Lists)", slide: "1-ListDataStructures" },
  { slug: "stacks-queues", title: "Stack & Queue", slide: "2-StacksQueues" },
  { slug: "trees-1", title: "Cây, Cây nhị phân & BST", slide: "4A-Trees1" },
  { slug: "trees-2", title: "Cây cân bằng AVL", slide: "4B-Trees2" },
  { slug: "graphs-1", title: "Đồ thị cơ bản, BFS/DFS", slide: "5A-Graphs1" },
  { slug: "graphs-2", title: "Đường đi ngắn nhất (Dijkstra)", slide: "5B-Graphs2" },
  { slug: "graphs-3", title: "Cây khung nhỏ nhất (Kruskal)", slide: "5C-Graphs3" },
];

export function getChapter(slug: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.slug === slug);
}
