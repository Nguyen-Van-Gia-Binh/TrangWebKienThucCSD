export type KruskalOp = { type: "kruskal" };

export interface KruskalState {
  nodes: string[];
  edges: [string, string, number][]; // All edges sorted
  mst: [string, string, number][];
  rejectedEdges: [string, string, number][];
  parent: Record<string, string>;
  currentEdge: [string, string, number] | null;
}
