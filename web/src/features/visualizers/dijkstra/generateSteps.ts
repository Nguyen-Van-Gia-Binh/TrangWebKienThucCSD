export type DijkstraOp = { type: "dijkstra"; startNode: string };

export interface DijkstraState {
  nodes: string[];
  edges: [string, string, number][]; // [u, v, weight]
  distances: Record<string, number>;
  settled: string[];
  pq: { node: string; dist: number }[];
  currentNode: string | null;
  currentNeighbor: string | null;
}
