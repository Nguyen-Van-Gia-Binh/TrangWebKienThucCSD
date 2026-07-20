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

export interface QueueCircularState {
  cells: (QueueItem | null)[];
  front: number;
  rear: number;
  capacity: number;
}

const INITIAL_CAPACITY = 6;

export function generateSteps(ops: QueueOp[]): Step<QueueCircularState>[] {
  const steps: Step<QueueCircularState>[] = [];
  const capacity = INITIAL_CAPACITY;
  let cells: (QueueItem | null)[] = Array(capacity).fill(null);
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
      state: { cells: [...cells], front, rear, capacity },
      action,
      pseudocodeLine,
      highlights,
      note,
    });
  };

  emit(`Khởi tạo Circular Queue rỗng: capacity ${capacity}, front = -1, rear = -1`);

  for (const op of ops) {
    if (op.type === "enqueue") {
      emit(
        `enqueue(${op.value}): kiểm tra mảng đầy ((rear + 1) % capacity == front?)`,
        LINE.enqCheck,
      );
      if ((rear + 1) % capacity === front) {
        emit(
          "Mảng đã đầy hoàn toàn, không thể thêm mới.",
          LINE.enqCheck,
          undefined,
          { text: "Lỗi: Mảng đầy (Overflow)", tone: "danger" },
        );
        continue;
      }
      
      emit(`Kiểm tra xem queue có đang rỗng không? (front == -1)`, LINE.enqFrontCheck);
      if (front === -1) {
        front = 0;
        emit(`Queue rỗng -> cập nhật front = 0`, LINE.enqFrontCheck);
      }

      rear = (rear + 1) % capacity;
      emit(`rear = (rear + 1) % capacity → rear = ${rear}`, LINE.enqIncRear);
      
      const item = { id: `q${counter++}`, value: op.value };
      cells[rear] = item;
      emit(
        `arr[${rear}] = ${op.value}`,
        LINE.enqAssign,
        [{ ids: [item.id], kind: "success" }],
      );
    } else if (op.type === "dequeue") {
      emit("dequeue(): kiểm tra queue có rỗng không?", LINE.deqCheck);
      if (front === -1) {
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
      
      emit(`Kiểm tra xem mảng có đang chỉ còn 1 phần tử? (front == rear?)`, LINE.deqIfReset);
      if (front === rear) {
        front = -1;
        rear = -1;
        emit(`Chỉ còn 1 phần tử -> Reset front = -1, rear = -1`, LINE.deqIfReset);
      } else {
        front = (front + 1) % capacity;
        emit(`Nhiều phần tử -> front = (front + 1) % capacity → front = ${front}`, LINE.deqElseFront);
      }

      emit(`return x → trả về ${item.value}`, LINE.deqReturn, undefined, {
        text: `dequeue() trả về ${item.value}`,
        tone: "success",
      });
    } else {
      emit("peek(): kiểm tra queue có rỗng không?", LINE.peekCheck);
      if (front === -1) {
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
