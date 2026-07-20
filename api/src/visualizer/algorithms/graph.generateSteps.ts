import type { Step, StepHighlight, StepNote } from "../../lib/types";
import { LINE } from "./graph.pseudocode";

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

// Fixed graph for demonstration
const GRAPH_NODES = ["A", "B", "C", "D", "E", "F", "G"];
const GRAPH_EDGES: [string, string][] = [
  ["A", "B"],
  ["A", "C"],
  ["B", "D"],
  ["B", "E"],
  ["C", "F"],
  ["C", "G"],
  ["E", "F"],
];

const getNeighbors = (node: string): string[] => {
  const neighbors: string[] = [];
  for (const [u, v] of GRAPH_EDGES) {
    if (u === node) neighbors.push(v);
    else if (v === node) neighbors.push(u); // Undirected graph
  }
  // Sort alphabetically for deterministic traversal
  return neighbors.sort();
};

export function generateSteps(ops: GraphOp[]): Step<GraphState>[] {
  const steps: Step<GraphState>[] = [];
  
  let currentVisited: string[] = [];
  let currentQueueOrStack: string[] = [];
  let currentNode: string | null = null;

  const cloneState = (): GraphState => {
    return { 
      nodes: [...GRAPH_NODES],
      edges: [...GRAPH_EDGES],
      visited: [...currentVisited], 
      queueOrStack: [...currentQueueOrStack],
      currentNode,
    };
  };

  const emit = (
    action: string,
    pseudocodeLine?: number,
    highlights?: StepHighlight[],
    note?: StepNote,
  ) => {
    steps.push({
      state: cloneState(),
      action,
      pseudocodeLine,
      highlights,
      note,
    });
  };

  emit("Khởi tạo đồ thị rỗng");

  const bfs = (startNode: string) => {
    currentVisited = [];
    currentQueueOrStack = [];
    currentNode = null;
    
    emit(`Bắt đầu BFS từ đỉnh ${startNode}`, LINE.bfsInitQueue);
    
    currentQueueOrStack.push(startNode);
    emit(`Đưa ${startNode} vào Queue`, LINE.bfsEnqueueStart, [{ ids: [startNode], kind: "active" }]);
    
    currentVisited.push(startNode);
    emit(`Đánh dấu ${startNode} đã thăm`, LINE.bfsMarkVisited, [{ ids: [startNode], kind: "success" }]);

    while (currentQueueOrStack.length > 0) {
      emit(`Kiểm tra Queue: [${currentQueueOrStack.join(", ")}]`, LINE.bfsWhileQueueNotEmpty);
      
      const u = currentQueueOrStack.shift()!;
      currentNode = u;
      emit(`Lấy ${u} ra khỏi Queue để xét`, LINE.bfsDequeue, [{ ids: [u], kind: "active" }]);

      const neighbors = getNeighbors(u);
      for (const v of neighbors) {
        emit(`Xét đỉnh kề ${v} của ${u}`, LINE.bfsForNeighbors, [{ ids: [v], kind: "compare" }, { ids: [u], kind: "active" }]);
        
        emit(`Kiểm tra xem ${v} đã được thăm chưa?`, LINE.bfsIfUnvisited);
        if (!currentVisited.includes(v)) {
          currentQueueOrStack.push(v);
          emit(`Chưa thăm -> Đưa ${v} vào Queue`, LINE.bfsEnqueueNeighbor, [{ ids: [v], kind: "active" }]);
          
          currentVisited.push(v);
          emit(`Đánh dấu ${v} đã thăm`, LINE.bfsMarkNeighborVisited, [{ ids: [v], kind: "success" }]);
        } else {
          emit(`${v} đã được thăm trước đó, bỏ qua!`, LINE.bfsIfUnvisited);
        }
      }
      
      currentNode = null;
    }
    
    emit(`Hàng đợi rỗng. Đã duyệt xong BFS từ ${startNode}!`, LINE.bfsWhileQueueNotEmpty);
  };

  const dfs = (startNode: string) => {
    currentVisited = [];
    currentQueueOrStack = [];
    currentNode = null;
    
    emit(`Bắt đầu DFS từ đỉnh ${startNode}`, LINE.dfsInitStack);
    
    currentQueueOrStack.push(startNode);
    emit(`Đưa ${startNode} vào Stack`, LINE.dfsPushStart, [{ ids: [startNode], kind: "active" }]);
    
    while (currentQueueOrStack.length > 0) {
      emit(`Kiểm tra Stack: [${currentQueueOrStack.join(", ")}]`, LINE.dfsWhileStackNotEmpty);
      
      const u = currentQueueOrStack.pop()!;
      currentNode = u;
      emit(`Lấy ${u} ra khỏi Stack để xét`, LINE.dfsPop, [{ ids: [u], kind: "active" }]);

      emit(`Kiểm tra xem ${u} đã được thăm chưa?`, LINE.dfsIfUnvisited);
      if (!currentVisited.includes(u)) {
        currentVisited.push(u);
        emit(`Chưa thăm -> Đánh dấu ${u} đã thăm`, LINE.dfsMarkVisited, [{ ids: [u], kind: "success" }]);
        
        const neighbors = getNeighbors(u);
        // Push in reverse order so we visit them in alphabetical order
        for (let i = neighbors.length - 1; i >= 0; i--) {
          const v = neighbors[i];
          if (!currentVisited.includes(v)) {
            currentQueueOrStack.push(v);
            emit(`Đưa đỉnh kề ${v} vào Stack`, LINE.dfsPushNeighbor, [{ ids: [v], kind: "active" }]);
          }
        }
      } else {
        emit(`${u} đã được thăm trước đó, bỏ qua!`, LINE.dfsIfUnvisited);
      }
      
      currentNode = null;
    }
    
    emit(`Stack rỗng. Đã duyệt xong DFS từ ${startNode}!`, LINE.dfsWhileStackNotEmpty);
  };

  for (const op of ops) {
    if (op.type === "bfs") bfs(op.startNode);
    else if (op.type === "dfs") dfs(op.startNode);
  }

  emit("Hoàn thành ✓");
  return steps;
}
