import type { Step, StepHighlight, StepNote } from "../../lib/types";
import { LINE } from "./kruskal.pseudocode";

export type KruskalOp = { type: "kruskal" };

export interface KruskalState {
  nodes: string[];
  edges: [string, string, number][]; // All edges sorted
  mst: [string, string, number][];
  rejectedEdges: [string, string, number][];
  parent: Record<string, string>;
  currentEdge: [string, string, number] | null;
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

export function generateSteps(ops: KruskalOp[]): Step<KruskalState>[] {
  const steps: Step<KruskalState>[] = [];
  
  let currentMST: [string, string, number][] = [];
  let currentRejected: [string, string, number][] = [];
  let currentParent: Record<string, string> = {};
  let currentEdge: [string, string, number] | null = null;
  
  // Sort edges by weight
  const sortedEdges = [...GRAPH_EDGES].sort((a, b) => a[2] - b[2]);

  const cloneState = (): KruskalState => {
    return {
      nodes: [...GRAPH_NODES],
      edges: [...sortedEdges],
      mst: [...currentMST],
      rejectedEdges: [...currentRejected],
      parent: { ...currentParent },
      currentEdge,
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

  emit("Khởi tạo đồ thị", undefined);

  const runKruskal = () => {
    currentMST = [];
    currentRejected = [];
    currentParent = {};
    currentEdge = null;

    for (const node of GRAPH_NODES) {
      currentParent[node] = node;
    }
    emit("Khởi tạo Disjoint Set: Mỗi đỉnh tự làm cha của chính nó", LINE.initSets);

    emit(`Đã sắp xếp các cạnh theo trọng số tăng dần: ${sortedEdges.map(e => `(${e[0]},${e[1]}:${e[2]})`).join(", ")}`, LINE.sortEdges);
    emit("MST hiện tại rỗng", LINE.initMST);

    const find = (i: string): string => {
      if (currentParent[i] === i) return i;
      // Note: in a real implementation we would do path compression,
      // but for visualization, tracking exact parent links might be useful.
      return find(currentParent[i]);
    };

    const union = (i: string, j: string) => {
      const rootI = find(i);
      const rootJ = find(j);
      currentParent[rootI] = rootJ;
    };

    for (const edge of sortedEdges) {
      currentEdge = edge;
      const [u, v, weight] = edge;
      
      emit(`Xét cạnh tiếp theo: (${u}, ${v}) trọng số ${weight}`, LINE.forEdges, [
        { ids: [u, v], kind: "compare" }
      ]);

      const rootU = find(u);
      const rootV = find(v);
      
      emit(`Tìm cha của ${u} (là ${rootU}) và ${v} (là ${rootV})`, LINE.findCycle, [
        { ids: [rootU, rootV], kind: "active" }
      ]);

      if (rootU !== rootV) {
        emit(`Hai đỉnh nằm ở hai cây khác nhau (Không tạo chu trình)`, LINE.ifNotCycle);
        
        currentMST.push(edge);
        emit(`Thêm cạnh (${u}, ${v}) vào MST`, LINE.addToMST, [{ ids: [u, v], kind: "success" }]);
        
        union(u, v);
        emit(`Gộp 2 tập hợp chứa ${u} và ${v}`, LINE.unionSets);

        if (currentMST.length === GRAPH_NODES.length - 1) {
          emit(`MST đã đủ ${GRAPH_NODES.length - 1} cạnh (N-1). Dừng thuật toán!`, LINE.ifMSTComplete);
          currentEdge = null;
          break;
        }
      } else {
        emit(`Hai đỉnh có chung cha là ${rootU} -> Nối sẽ tạo chu trình! Bỏ qua cạnh này.`, LINE.ifNotCycle, [{ ids: [u, v], kind: "danger" }]);
        currentRejected.push(edge);
      }
      currentEdge = null;
    }

    emit("Thuật toán Kruskal hoàn tất!", LINE.returnMST);
  };

  for (const op of ops) {
    if (op.type === "kruskal") runKruskal();
  }

  return steps;
}
