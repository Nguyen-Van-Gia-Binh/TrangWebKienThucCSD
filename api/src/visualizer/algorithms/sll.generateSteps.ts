import type { Step, StepHighlight, StepNote } from "../../lib/types";
import { LINE } from "./sll.pseudocode";

export type SLLOp =
  | { type: "insertHead"; value: number }
  | { type: "insertTail"; value: number }
  | { type: "deleteHead" }
  | { type: "deleteTail" }
  | { type: "search"; value: number };

export interface SLLNode {
  id: string;
  value: number;
  next: string | null;
}

export interface SLLState {
  nodes: SLLNode[];
  head: string | null;
  targetValue?: number | null;
  targetAction?: string | null;
}

export function generateSteps(ops: SLLOp[]): Step<SLLState>[] {
  const steps: Step<SLLState>[] = [];
  let nextId = 0;
  
  let currentNodes: SLLNode[] = [];
  let currentHead: string | null = null;
  
  let currentTargetValue: number | null = null;
  let currentTargetAction: string | null = null;

  const cloneState = (): SLLState => {
    return { 
      nodes: currentNodes.map(n => ({ ...n })), 
      head: currentHead,
      targetValue: currentTargetValue,
      targetAction: currentTargetAction
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

  emit("Khởi tạo danh sách liên kết rỗng");

  const insertHead = (value: number) => {
    emit(`insertHead(${value})`, LINE.insertHeadBase);
    const id = `n${nextId++}`;
    
    // Create node
    currentNodes.push({ id, value, next: null });
    emit(`Tạo node mới với giá trị ${value}`, LINE.insertHeadCreate, [{ ids: [id], kind: "success" }]);

    // Link
    const nodeIndex = currentNodes.findIndex(n => n.id === id);
    currentNodes[nodeIndex].next = currentHead;
    emit(`Trỏ next của node mới vào head hiện tại`, LINE.insertHeadLink, [{ ids: [id], kind: "active" }]);

    // Update head
    currentHead = id;
    emit(`Cập nhật head trỏ vào node mới`, LINE.insertHeadUpdate, [{ ids: [id], kind: "active" }]);
  };

  const insertTail = (value: number) => {
    emit(`insertTail(${value})`, LINE.insertTailBase);
    const id = `n${nextId++}`;
    
    currentNodes.push({ id, value, next: null });
    emit(`Tạo node mới với giá trị ${value}`, LINE.insertTailCreate, [{ ids: [id], kind: "success" }]);

    if (!currentHead) {
      emit(`Danh sách rỗng, gán head bằng node mới`, LINE.insertTailCheckEmpty, [{ ids: [id], kind: "active" }]);
      currentHead = id;
      return;
    }

    emit(`Bắt đầu duyệt từ head để tìm node cuối`, LINE.insertTailTraverse, [{ ids: [currentHead], kind: "active" }]);
    let curr = currentHead;
    let currIndex = currentNodes.findIndex(n => n.id === curr);
    
    while (currentNodes[currIndex].next !== null) {
      curr = currentNodes[currIndex].next!;
      currIndex = currentNodes.findIndex(n => n.id === curr);
      emit(`Di chuyển đến node tiếp theo`, LINE.insertTailTraverse, [{ ids: [curr], kind: "active" }]);
    }

    currentNodes[currIndex].next = id;
    emit(`Trỏ next của node cuối vào node mới`, LINE.insertTailLink, [{ ids: [curr, id], kind: "success" }]);
  };

  const deleteHead = () => {
    emit(`deleteHead()`, LINE.deleteHeadBase);
    if (!currentHead) {
      emit(`Danh sách rỗng, không làm gì cả`, LINE.deleteHeadCheckEmpty, undefined, { text: "Danh sách rỗng", tone: "danger" });
      return;
    }

    const headIndex = currentNodes.findIndex(n => n.id === currentHead);
    const nextNode = currentNodes[headIndex].next;
    
    emit(`Cập nhật head bằng head.next`, LINE.deleteHeadUpdate, [{ ids: [currentHead], kind: "danger" }]);
    currentNodes = currentNodes.filter(n => n.id !== currentHead);
    currentHead = nextNode;
  };

  const deleteTail = () => {
    emit(`deleteTail()`, LINE.deleteTailBase);
    if (!currentHead) {
      emit(`Danh sách rỗng, không làm gì cả`, LINE.deleteTailCheckEmpty, undefined, { text: "Danh sách rỗng", tone: "danger" });
      return;
    }

    const headIndex = currentNodes.findIndex(n => n.id === currentHead);
    if (currentNodes[headIndex].next === null) {
      emit(`Danh sách chỉ có 1 node, gán head = null`, LINE.deleteTailCheckOne, [{ ids: [currentHead], kind: "danger" }]);
      currentNodes = currentNodes.filter(n => n.id !== currentHead);
      currentHead = null;
      return;
    }

    emit(`Bắt đầu duyệt tìm node áp chót`, LINE.deleteTailTraverse, [{ ids: [currentHead], kind: "active" }]);
    let curr = currentHead;
    let currIndex = currentNodes.findIndex(n => n.id === curr);
    
    while (currentNodes[currIndex].next !== null) {
      const nextNodeId = currentNodes[currIndex].next!;
      const nextNodeIndex = currentNodes.findIndex(n => n.id === nextNodeId);
      
      if (currentNodes[nextNodeIndex].next === null) {
        break; // curr is the second to last
      }
      
      curr = nextNodeId;
      currIndex = nextNodeIndex;
      emit(`Di chuyển đến node tiếp theo`, LINE.deleteTailTraverse, [{ ids: [curr], kind: "active" }]);
    }

    const tailId = currentNodes[currIndex].next!;
    emit(`Tìm thấy node cuối, ngắt kết nối`, LINE.deleteTailUnlink, [{ ids: [curr], kind: "active" }, { ids: [tailId], kind: "danger" }]);
    
    currentNodes[currIndex].next = null;
    currentNodes = currentNodes.filter(n => n.id !== tailId);
  };

  const search = (value: number) => {
    emit(`search(${value})`, LINE.searchBase);
    let curr = currentHead;
    
    while (curr !== null) {
      emit(`Kiểm tra node ${curr}`, LINE.searchTraverse, [{ ids: [curr], kind: "compare" }]);
      const currIndex = currentNodes.findIndex(n => n.id === curr);
      if (currentNodes[currIndex].value === value) {
        emit(`Tìm thấy giá trị ${value}!`, LINE.searchFound, [{ ids: [curr], kind: "success" }], { text: "Tìm thấy", tone: "success" });
        return;
      }
      curr = currentNodes[currIndex].next;
    }
    
    emit(`Không tìm thấy giá trị ${value}`, LINE.searchNotFound, undefined, { text: "Không tìm thấy", tone: "danger" });
  };

  for (const op of ops) {
    currentTargetAction = op.type;
    currentTargetValue = "value" in op ? op.value : null;
    
    switch (op.type) {
      case "insertHead": insertHead(op.value); break;
      case "insertTail": insertTail(op.value); break;
      case "deleteHead": deleteHead(); break;
      case "deleteTail": deleteTail(); break;
      case "search": search(op.value); break;
    }
  }

  currentTargetAction = null;
  currentTargetValue = null;
  emit("Hoàn thành ✓");
  return steps;
}
