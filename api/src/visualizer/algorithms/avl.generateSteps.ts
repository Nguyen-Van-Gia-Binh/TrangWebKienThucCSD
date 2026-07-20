import type { Step, StepHighlight, StepNote } from "../../lib/types";
import { LINE } from "./avl.pseudocode";

export type AVLOp =
  | { type: "insert"; value: number }
  | { type: "search"; value: number };

export interface AVLNode {
  id: string;
  value: number;
  left: string | null;
  right: string | null;
  height: number;
  balance: number;
}

export interface AVLState {
  nodes: AVLNode[];
  root: string | null;
}

export function generateSteps(ops: AVLOp[]): Step<AVLState>[] {
  const steps: Step<AVLState>[] = [];
  let nextId = 0;
  
  let currentNodes: AVLNode[] = [];
  let currentRoot: string | null = null;

  const cloneState = (): AVLState => {
    return { 
      nodes: currentNodes.map(n => ({ ...n })), 
      root: currentRoot 
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

  const getHeight = (id: string | null) => {
    if (!id) return 0;
    const node = currentNodes.find(n => n.id === id);
    return node ? node.height : 0;
  };

  const getBalance = (id: string | null) => {
    if (!id) return 0;
    const node = currentNodes.find(n => n.id === id);
    if (!node) return 0;
    return getHeight(node.left) - getHeight(node.right);
  };

  const updateHeightAndBalance = (id: string) => {
    const idx = currentNodes.findIndex(n => n.id === id);
    if (idx === -1) return;
    const node = currentNodes[idx];
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
    node.balance = getBalance(id);
  };

  const rightRotate = (yId: string): string => {
    const yIdx = currentNodes.findIndex(n => n.id === yId);
    const y = currentNodes[yIdx];
    const xId = y.left!;
    const xIdx = currentNodes.findIndex(n => n.id === xId);
    const x = currentNodes[xIdx];
    const T2 = x.right;

    // Perform rotation
    x.right = yId;
    y.left = T2;

    // Update heights
    updateHeightAndBalance(yId);
    updateHeightAndBalance(xId);

    return xId;
  };

  const leftRotate = (xId: string): string => {
    const xIdx = currentNodes.findIndex(n => n.id === xId);
    const x = currentNodes[xIdx];
    const yId = x.right!;
    const yIdx = currentNodes.findIndex(n => n.id === yId);
    const y = currentNodes[yIdx];
    const T2 = y.left;

    // Perform rotation
    y.left = xId;
    x.right = T2;

    // Update heights
    updateHeightAndBalance(xId);
    updateHeightAndBalance(yId);

    return yId;
  };

  emit("Khởi tạo cây AVL rỗng");

  const insert = (value: number) => {
    emit(`insert(${value})`, LINE.insertBase);

    const insertHelper = (nodeId: string | null): string => {
      if (!nodeId) {
        const id = `n${nextId++}`;
        currentNodes.push({ id, value, left: null, right: null, height: 1, balance: 0 });
        emit(`Tạo node mới ${value}`, LINE.insertCreate, [{ ids: [id], kind: "success" }]);
        return id;
      }

      const nodeIdx = currentNodes.findIndex(n => n.id === nodeId);
      const node = currentNodes[nodeIdx];
      
      emit(`So sánh ${value} với ${node.value}`, LINE.insertCompare, [{ ids: [nodeId], kind: "compare" }]);

      if (value < node.value) {
        emit(`${value} < ${node.value}, chèn vào nhánh trái`, LINE.insertLeft, [{ ids: [nodeId], kind: "active" }]);
        node.left = insertHelper(node.left);
      } else if (value > node.value) {
        emit(`${value} > ${node.value}, chèn vào nhánh phải`, LINE.insertRight, [{ ids: [nodeId], kind: "active" }]);
        node.right = insertHelper(node.right);
      } else {
        return nodeId; // Duplicate values not allowed in this simple BST
      }

      // Update height and balance
      updateHeightAndBalance(nodeId);
      emit(`Cập nhật chiều cao và Hệ số cân bằng cho node ${node.value}`, LINE.insertUpdateHeight, [{ ids: [nodeId], kind: "active" }]);

      const balance = node.balance;
      
      // Check for unbalance
      if (balance > 1 || balance < -1) {
        emit(`Node ${node.value} mất cân bằng (Balance = ${balance})! Bắt đầu xoay...`, LINE.insertCheckBalance, [{ ids: [nodeId], kind: "danger" }]);
        
        // LL Case
        if (balance > 1 && value < currentNodes.find(n => n.id === node.left)!.value) {
          emit(`Trường hợp Trái-Trái (LL) -> Xoay phải (Right Rotate)`, LINE.rotateLL, [{ ids: [nodeId, node.left!], kind: "compare" }]);
          return rightRotate(nodeId);
        }
        
        // RR Case
        if (balance < -1 && value > currentNodes.find(n => n.id === node.right)!.value) {
          emit(`Trường hợp Phải-Phải (RR) -> Xoay trái (Left Rotate)`, LINE.rotateRR, [{ ids: [nodeId, node.right!], kind: "compare" }]);
          return leftRotate(nodeId);
        }
        
        // LR Case
        if (balance > 1 && value > currentNodes.find(n => n.id === node.left)!.value) {
          emit(`Trường hợp Trái-Phải (LR) -> Xoay trái node con, sau đó Xoay phải node cha`, LINE.rotateLR, [{ ids: [nodeId, node.left!], kind: "compare" }]);
          node.left = leftRotate(node.left!);
          emit(`Đã xoay trái node con. Tiếp tục xoay phải node cha`, LINE.rotateLR, [{ ids: [nodeId], kind: "active" }]);
          return rightRotate(nodeId);
        }
        
        // RL Case
        if (balance < -1 && value < currentNodes.find(n => n.id === node.right)!.value) {
          emit(`Trường hợp Phải-Trái (RL) -> Xoay phải node con, sau đó Xoay trái node cha`, LINE.rotateRL, [{ ids: [nodeId, node.right!], kind: "compare" }]);
          node.right = rightRotate(node.right!);
          emit(`Đã xoay phải node con. Tiếp tục xoay trái node cha`, LINE.rotateRL, [{ ids: [nodeId], kind: "active" }]);
          return leftRotate(nodeId);
        }
      }

      return nodeId;
    };

    currentRoot = insertHelper(currentRoot);
    emit(`Đã cân bằng xong sau khi chèn ${value}`, undefined);
  };

  const search = (value: number) => {
    emit(`search(${value})`, LINE.searchBase);
    let curr = currentRoot;
    
    while (curr) {
      const node = currentNodes.find(n => n.id === curr)!;
      emit(`So sánh với ${node.value}`, LINE.searchCompare, [{ ids: [curr], kind: "compare" }]);
      
      if (value === node.value) {
        emit(`Tìm thấy ${value}!`, LINE.searchFound, [{ ids: [curr], kind: "success" }]);
        return;
      }
      
      if (value < node.value) {
        emit(`${value} < ${node.value}, đi sang trái`, LINE.searchLeft, [{ ids: [curr], kind: "active" }]);
        curr = node.left;
      } else {
        emit(`${value} > ${node.value}, đi sang phải`, LINE.searchRight, [{ ids: [curr], kind: "active" }]);
        curr = node.right;
      }
    }
    
    emit(`Không tìm thấy ${value} trong cây`, LINE.searchNotFound);
  };

  for (const op of ops) {
    if (op.type === "insert") insert(op.value);
    else if (op.type === "search") search(op.value);
  }

  emit("Hoàn thành ✓");
  return steps;
}
