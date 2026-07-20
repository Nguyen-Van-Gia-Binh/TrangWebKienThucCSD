import type { Step, StepHighlight, StepNote } from "@/lib/types";
import { LINE } from "./pseudocode";

export type QueueOp =
  | { type: "enqueue"; value: number }
  | { type: "dequeue" }
  | { type: "peek" };

export interface QueueItem {
  id: string;
  value: number;
}

export interface QueueLinearState {
  cells: (QueueItem | null)[];
  front: number;
  rear: number;
  capacity: number;
}

const INITIAL_CAPACITY = 6;

export function generateSteps(ops: QueueOp[]): Step<QueueLinearState>[] {
  const steps: Step<QueueLinearState>[] = [];
  let cells: (QueueItem | null)[] = Array(INITIAL_CAPACITY).fill(null);
  let front = -1;
  let rear = -1;
  let counter = 0;

  const emit = (
    action: string,
    pseudocodeLine?: number,
    highlights?: StepHighlight[],
    note?: StepNote,
  ) => {
    steps.push({
      state: { cells: [...cells], front, rear, capacity: cells.length },
      action,
      pseudocodeLine,
      highlights,
      note,
    });
  };

  emit(`Khởi tạo hàng đợi rỗng: capacity ${INITIAL_CAPACITY}, front = -1, rear = -1`);

  for (const op of ops) {
    if (op.type === "enqueue") {
      emit(
        `enqueue(${op.value}): kiểm tra mảng đầy (rear == capacity - 1?)`,
        LINE.enqCheck,
      );
      if (rear === cells.length - 1) {
        emit(
          "Mảng đã đầy ở cuối (False Full), không thể thêm dù có thể còn chỗ trống ở đầu.",
          LINE.enqCheck,
          undefined,
          { text: "Lỗi: Mảng đầy (Overflow/False Full)", tone: "danger" },
        );
        continue;
      }
      
      emit(`Kiểm tra xem queue có đang rỗng không? (front == -1)`, LINE.enqFrontCheck);
      if (front === -1) {
        front = 0;
        emit(`Queue rỗng -> cập nhật front = 0`, LINE.enqFrontCheck);
      }

      rear++;
      emit(`rear = rear + 1 → rear = ${rear}`, LINE.enqIncRear);
      
      const item = { id: `q${counter++}`, value: op.value };
      cells[rear] = item;
      emit(
        `arr[${rear}] = ${op.value}`,
        LINE.enqAssign,
        [{ ids: [item.id], kind: "success" }],
      );
    } else if (op.type === "dequeue") {
      emit("dequeue(): kiểm tra queue có rỗng không?", LINE.deqCheck);
      if (front === -1 || front > rear) {
        emit(
          "Queue rỗng → lấy thất bại (underflow)",
          LINE.deqCheck,
          undefined,
          { text: "Lỗi: rỗng (underflow)", tone: "danger" },
        );
        continue;
      }
      
      const item = cells[front]!;
      emit(`x = arr[${front}] → x = ${item.value}`, LINE.deqRead, [
        { ids: [item.id], kind: "compare" },
      ]);
      cells[front] = null;
      emit(`arr[${front}] = null (Xóa phần tử)`, LINE.deqClear);
      
      front++;
      emit(`front = front + 1 → front = ${front}`, LINE.deqIncFront);
      emit(`return x → trả về ${item.value}`, LINE.deqReturn, undefined, {
        text: `dequeue() trả về ${item.value}`,
        tone: "success",
      });
    } else {
      emit("peek(): kiểm tra queue có rỗng không?", LINE.peekCheck);
      if (front === -1 || front > rear) {
        emit(
          "Queue rỗng → không có gì để xem",
          LINE.peekCheck,
          undefined,
          { text: "Lỗi: rỗng", tone: "danger" },
        );
        continue;
      }
      const item = cells[front]!;
      emit(
        `return arr[${front}] → ${item.value}`,
        LINE.peekReturn,
        [{ ids: [item.id], kind: "active" }],
        { text: `peek() trả về ${item.value}`, tone: "info" },
      );
    }
  }

  emit("Hoàn thành ✓");
  return steps;
}
