export type GraphOp =
  | { type: "bfs"; startNode: string }
  | { type: "dfs"; startNode: string };

export interface GraphState {
  nodes: string[];
  edges: [string, string][];
  visited: string[];
  queueOrStack: string[];
  currentNode: string | null;
}
