import type { Step, StepHighlight, StepNote } from "@/lib/types";
import { LINE } from "./pseudocode";

export type BSTOp =
  | { type: "insert"; value: number }
  | { type: "delete"; value: number }
  | { type: "search"; value: number };

export interface BSTNode {
  id: string;
  value: number;
  left: string | null;
  right: string | null;
}

export interface BSTState {
  nodes: Record<string, BSTNode>;
  rootId: string | null;
  targetValue?: number | null;
  targetAction?: string | null;
}

export function generateSteps(ops: BSTOp[]): Step<BSTState>[] {
  const steps: Step<BSTState>[] = [];
  let nextId = 0;
  
  // Create a deep copy of the state
  const cloneState = (nodes: Record<string, BSTNode>, rootId: string | null): BSTState => {
    const newNodes: Record<string, BSTNode> = {};
    for (const k in nodes) {
      newNodes[k] = { ...nodes[k] };
    }
    return { nodes: newNodes, rootId };
  };

  const currentNodes: Record<string, BSTNode> = {};
  let currentRootId: string | null = null;

  const emit = (
    action: string,
    pseudocodeLine?: number,
    highlights?: StepHighlight[],
    note?: StepNote,
  ) => {
    steps.push({
      state: cloneState(currentNodes, currentRootId),
      action,
      pseudocodeLine,
      highlights,
      note,
    });
  };

  emit(`Khởi tạo cây BST rỗng`);

  const insert = (nodeId: string | null, value: number): string => {
    emit(`insert(root, ${value})`, LINE.insertBase, nodeId ? [{ ids: [nodeId], kind: "active" }] : undefined);
    
    if (nodeId === null) {
      const id = `n${nextId++}`;
      currentNodes[id] = { id, value, left: null, right: null };
      emit(`Tạo node mới với giá trị ${value}`, LINE.insertBase, [{ ids: [id], kind: "success" }]);
      return id;
    }

    const node = currentNodes[nodeId];
    if (value < node.value) {
      emit(`${value} < ${node.value}, rẽ trái`, LINE.insertLeftCheck, [{ ids: [nodeId], kind: "compare" }]);
      const newChild = insert(node.left, value);
      currentNodes[nodeId].left = newChild;
      emit(`Cập nhật con trái của ${node.value}`, LINE.insertLeft, [{ ids: [nodeId, newChild], kind: "active" }]);
    } else if (value > node.value) {
      emit(`${value} > ${node.value}, rẽ phải`, LINE.insertRightCheck, [{ ids: [nodeId], kind: "compare" }]);
      const newChild = insert(node.right, value);
      currentNodes[nodeId].right = newChild;
      emit(`Cập nhật con phải của ${node.value}`, LINE.insertRight, [{ ids: [nodeId, newChild], kind: "active" }]);
    } else {
      emit(`Giá trị ${value} đã tồn tại trong cây`, undefined, [{ ids: [nodeId], kind: "danger" }], { text: "Giá trị trùng lặp", tone: "danger" });
    }
    return nodeId;
  };

  const search = (nodeId: string | null, value: number): void => {
    emit(`search(root, ${value})`, LINE.searchBase, nodeId ? [{ ids: [nodeId], kind: "active" }] : undefined);
    if (nodeId === null) {
      emit(`Không tìm thấy ${value}`, LINE.searchReturnMatch, undefined, { text: "Không tìm thấy", tone: "danger" });
      return;
    }
    const node = currentNodes[nodeId];
    if (node.value === value) {
      emit(`Tìm thấy ${value}!`, LINE.searchReturnMatch, [{ ids: [nodeId], kind: "success" }], { text: "Tìm thấy", tone: "success" });
      return;
    }
    if (value < node.value) {
      emit(`${value} < ${node.value}, rẽ trái`, LINE.searchLeftCheck, [{ ids: [nodeId], kind: "compare" }]);
      search(node.left, value);
    } else {
      emit(`${value} > ${node.value}, rẽ phải`, LINE.searchRight, [{ ids: [nodeId], kind: "compare" }]);
      search(node.right, value);
    }
  };

  const deleteNode = (nodeId: string | null, value: number): string | null => {
    emit(`delete(root, ${value})`, LINE.deleteBase, nodeId ? [{ ids: [nodeId], kind: "active" }] : undefined);
    if (nodeId === null) {
      emit(`Không tìm thấy ${value} để xoá`, LINE.deleteBase, undefined, { text: "Không tìm thấy", tone: "danger" });
      return null;
    }
    const node = currentNodes[nodeId];
    if (value < node.value) {
      emit(`${value} < ${node.value}, rẽ trái`, LINE.deleteLeftCheck, [{ ids: [nodeId], kind: "compare" }]);
      currentNodes[nodeId].left = deleteNode(node.left, value);
      return nodeId;
    } else if (value > node.value) {
      emit(`${value} > ${node.value}, rẽ phải`, LINE.deleteRightCheck, [{ ids: [nodeId], kind: "compare" }]);
      currentNodes[nodeId].right = deleteNode(node.right, value);
      return nodeId;
    } else {
      emit(`Tìm thấy node ${value} để xoá`, LINE.deleteFound, [{ ids: [nodeId], kind: "success" }]);
      if (node.left === null) {
        emit(`Node không có con trái, trả về con phải`, LINE.deleteNoLeft, [{ ids: [nodeId], kind: "danger" }]);
        const rightChild = node.right;
        delete currentNodes[nodeId];
        return rightChild;
      }
      if (node.right === null) {
        emit(`Node không có con phải, trả về con trái`, LINE.deleteNoRight, [{ ids: [nodeId], kind: "danger" }]);
        const leftChild = node.left;
        delete currentNodes[nodeId];
        return leftChild;
      }
      
      emit(`Node có 2 con, tìm node nhỏ nhất ở cây con phải`, LINE.deleteTwoChildrenMin, [{ ids: [nodeId], kind: "active" }]);
      let minId = node.right;
      let curr = currentNodes[minId];
      while (curr.left !== null) {
        minId = curr.left;
        curr = currentNodes[minId];
      }
      emit(`Tìm được node nhỏ nhất: ${curr.value}`, LINE.deleteTwoChildrenMin, [{ ids: [minId], kind: "success" }]);
      
      currentNodes[nodeId].value = curr.value;
      emit(`Thay giá trị node cần xoá bằng ${curr.value}`, LINE.deleteTwoChildrenSwap, [{ ids: [nodeId, minId], kind: "success" }]);
      
      currentNodes[nodeId].right = deleteNode(node.right, curr.value);
      return nodeId;
    }
  };

  for (const op of ops) {
    if (op.type === "insert") {
      currentRootId = insert(currentRootId, op.value);
    } else if (op.type === "search") {
      search(currentRootId, op.value);
    } else if (op.type === "delete") {
      currentRootId = deleteNode(currentRootId, op.value);
    }
  }

  emit("Hoàn thành ✓");
  return steps;
}
