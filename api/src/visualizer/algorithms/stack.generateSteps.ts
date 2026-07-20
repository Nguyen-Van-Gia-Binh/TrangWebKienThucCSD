import type { Step, StepHighlight, StepNote } from "../../lib/types";
import { LINE } from "./stack.pseudocode";

export type StackOp =
  | { type: "push"; value: number }
  | { type: "pop" }
  | { type: "peek" };

export interface StackItem {
  id: string;
  value: number;
}

export interface StackState {
  cells: (StackItem | null)[];
  top: number;
  capacity: number;
}

const INITIAL_CAPACITY = 4;

export function generateSteps(ops: StackOp[]): Step<StackState>[] {
  const steps: Step<StackState>[] = [];
  let cells: (StackItem | null)[] = Array(INITIAL_CAPACITY).fill(null);
  let top = -1;
  let counter = 0;

  const emit = (
    action: string,
    pseudocodeLine?: number,
    highlights?: StepHighlight[],
    note?: StepNote,
  ) => {
    steps.push({
      state: { cells: [...cells], top, capacity: cells.length },
      action,
      pseudocodeLine,
      highlights,
      note,
    });
  };

  emit(`Khởi tạo stack rỗng: mảng capacity ${INITIAL_CAPACITY}, top = -1`);

  for (const op of ops) {
    if (op.type === "push") {
      emit(
        `push(${op.value}): kiểm tra mảng đã đầy chưa (top == capacity - 1?)`,
        LINE.pushCheck,
      );
      if (top === cells.length - 1) {
        cells = [...cells, ...Array<null>(cells.length).fill(null)];
        emit(
          `Mảng đầy → grow(): cấp phát mảng mới gấp đôi, capacity = ${cells.length}`,
          LINE.pushCheck,
          undefined,
          { text: `grow(): capacity ${cells.length / 2} → ${cells.length}`, tone: "info" },
        );
      }
      top++;
      emit(`top = top + 1 → top = ${top}`, LINE.pushIncTop);
      const item = { id: `n${counter++}`, value: op.value };
      cells[top] = item;
      emit(
        `arr[${top}] = ${op.value} — đặt ${op.value} vào đỉnh stack`,
        LINE.pushAssign,
        [{ ids: [item.id], kind: "success" }],
      );
    } else if (op.type === "pop") {
      emit("pop(): kiểm tra stack có rỗng không?", LINE.popCheck);
      if (top === -1) {
        emit(
          "Stack rỗng → pop thất bại (underflow), không có gì để gỡ",
          LINE.popCheck,
          undefined,
          { text: "Lỗi: stack rỗng (underflow)", tone: "danger" },
        );
        continue;
      }
      const item = cells[top]!;
      emit(`x = arr[${top}] → x = ${item.value}`, LINE.popRead, [
        { ids: [item.id], kind: "compare" },
      ]);
      cells[top] = null;
      top--;
      emit(`top = top - 1 → top = ${top}`, LINE.popDecTop);
      emit(`return x → trả về ${item.value}`, LINE.popReturn, undefined, {
        text: `pop() trả về ${item.value}`,
        tone: "success",
      });
    } else {
      emit("peek(): kiểm tra stack có rỗng không?", LINE.peekCheck);
      if (top === -1) {
        emit(
          "Stack rỗng → không có phần tử đỉnh để xem",
          LINE.peekCheck,
          undefined,
          { text: "Lỗi: stack rỗng", tone: "danger" },
        );
        continue;
      }
      const item = cells[top]!;
      emit(
        `return arr[${top}] → ${item.value} (chỉ xem, không gỡ khỏi stack)`,
        LINE.peekReturn,
        [{ ids: [item.id], kind: "active" }],
        { text: `peek() trả về ${item.value}`, tone: "info" },
      );
    }
  }

  emit("Hoàn thành ✓");
  return steps;
}
