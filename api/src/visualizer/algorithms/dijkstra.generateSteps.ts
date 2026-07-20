import type { Step, StepHighlight, StepNote } from "../../lib/types";
import { LINE } from "./dijkstra.pseudocode";

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

const GRAPH_NODES = ["A", "B", "C", "D", "E", "F", "G"];
const GRAPH_EDGES: [string, string, number][] = [
  ["A", "B", 4],
  ["A", "C", 1],
  ["B", "C", 2],
  ["B", "D", 5],
  ["B", "E", 2],
  ["C", "F", 8],
  ["C", "G", 4],
  ["E", "F", 1],
  ["F", "G", 1],
];

const getNeighbors = (node: string): { neighbor: string; weight: number }[] => {
  const neighbors: { neighbor: string; weight: number }[] = [];
  for (const [u, v, w] of GRAPH_EDGES) {
    if (u === node) neighbors.push({ neighbor: v, weight: w });
    else if (v === node) neighbors.push({ neighbor: u, weight: w });
  }
  return neighbors.sort((a, b) => a.neighbor.localeCompare(b.neighbor));
};

export function generateSteps(ops: DijkstraOp[]): Step<DijkstraState>[] {
  const steps: Step<DijkstraState>[] = [];
  
  let currentDistances: Record<string, number> = {};
  let currentSettled: string[] = [];
  let currentPQ: { node: string; dist: number }[] = [];
  let currentNode: string | null = null;
  let currentNeighbor: string | null = null;

  const cloneState = (): DijkstraState => {
    return {
      nodes: [...GRAPH_NODES],
      edges: [...GRAPH_EDGES],
      distances: { ...currentDistances },
      settled: [...currentSettled],
      pq: [...currentPQ],
      currentNode,
      currentNeighbor,
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

  const runDijkstra = (startNode: string) => {
    currentDistances = {};
    for (const n of GRAPH_NODES) {
      currentDistances[n] = Infinity;
    }
    currentSettled = [];
    currentPQ = [];
    currentNode = null;
    currentNeighbor = null;

    emit(`Khởi tạo khoảng cách = Vô cực, PQ rỗng`, LINE.initDistances);

    currentDistances[startNode] = 0;
    currentPQ.push({ node: startNode, dist: 0 });
    emit(`Khoảng cách đến ${startNode} = 0. Đưa ${startNode} vào PQ`, LINE.initStartNode, [{ ids: [startNode], kind: "active" }]);

    while (currentPQ.length > 0) {
      emit(`Kiểm tra PQ: có ${currentPQ.length} phần tử`, LINE.whileNotEmpty);

      // Extract Min
      currentPQ.sort((a, b) => a.dist - b.dist);
      const minItem = currentPQ.shift()!;
      currentNode = minItem.node;
      
      emit(`Lấy ${currentNode} ra khỏi PQ (khoảng cách nhỏ nhất: ${minItem.dist})`, LINE.extractMin, [{ ids: [currentNode], kind: "active" }]);

      emit(`Kiểm tra xem ${currentNode} đã được tối ưu (settled) chưa?`, LINE.ifSettled);
      if (currentSettled.includes(currentNode)) {
        emit(`${currentNode} đã nằm trong tập settled. Bỏ qua.`, LINE.ifSettled);
        currentNode = null;
        continue;
      }

      currentSettled.push(currentNode);
      emit(`Chốt đường đi ngắn nhất đến ${currentNode} là ${minItem.dist}. Đánh dấu settled.`, LINE.markSettled, [{ ids: [currentNode], kind: "success" }]);

      const neighbors = getNeighbors(currentNode);
      for (const { neighbor, weight } of neighbors) {
        currentNeighbor = neighbor;
        emit(`Xét đỉnh kề ${neighbor} (trọng số cạnh: ${weight})`, LINE.forNeighbors, [
          { ids: [currentNode], kind: "success" },
          { ids: [neighbor], kind: "compare" },
        ]);

        const newDist = currentDistances[currentNode] + weight;
        const currentDist = currentDistances[neighbor];
        
        emit(`Đường đi qua ${currentNode} tới ${neighbor} dài: ${newDist}. (Hiện tại: ${currentDist === Infinity ? 'Vô cực' : currentDist})`, LINE.relaxIfBetter);
        
        if (newDist < currentDist) {
          currentDistances[neighbor] = newDist;
          emit(`Cập nhật khoảng cách mới tới ${neighbor} = ${newDist}`, LINE.updateDistance, [{ ids: [neighbor], kind: "active" }]);
          
          currentPQ.push({ node: neighbor, dist: newDist });
          emit(`Đưa ${neighbor} vào PQ với dist = ${newDist}`, LINE.pushQueue);
        } else {
          emit(`${newDist} >= ${currentDist}, không cập nhật.`, LINE.relaxIfBetter);
        }
      }
      currentNeighbor = null;
      currentNode = null;
    }

    emit(`PQ rỗng. Thuật toán Dijkstra hoàn tất!`, LINE.whileNotEmpty);
  };

  for (const op of ops) {
    if (op.type === "dijkstra") runDijkstra(op.startNode);
  }

  emit("Hoàn thành ✓");
  return steps;
}
