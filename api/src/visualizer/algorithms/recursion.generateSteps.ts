import type { Step, StepHighlight, StepNote } from "../../lib/types";
import { LINE } from "./recursion.pseudocode";

export type RecursionOp = { type: "factorial"; value: number };

export interface CallFrame {
  id: string;
  funcName: string;
  args: { n: number };
  status: "running" | "waiting" | "returned";
  returnValue?: number | null;
}

export interface RecursionState {
  callStack: CallFrame[];
}

export function generateSteps(ops: RecursionOp[]): Step<RecursionState>[] {
  const steps: Step<RecursionState>[] = [];
  let nextFrameId = 0;
  
  let currentCallStack: CallFrame[] = [];

  const cloneState = (): RecursionState => {
    return { 
      callStack: currentCallStack.map(f => ({ ...f, args: { ...f.args } })) 
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

  emit("Chờ lệnh thực thi", undefined);

  const calculateFactorial = (n: number) => {
    const recurse = (currentN: number): number => {
      const frameId = `frame_${nextFrameId++}`;
      
      // If there is a caller, set caller to waiting
      if (currentCallStack.length > 0) {
        currentCallStack[currentCallStack.length - 1].status = "waiting";
      }

      // Push new frame
      currentCallStack.push({
        id: frameId,
        funcName: "factorial",
        args: { n: currentN },
        status: "running",
        returnValue: null,
      });

      emit(`Gọi hàm factorial(${currentN})`, LINE.factBase, [{ ids: [frameId], kind: "active" }]);
      emit(`Kiểm tra n <= 1`, LINE.factBaseCaseCheck, [{ ids: [frameId], kind: "compare" }]);

      if (currentN <= 1) {
        currentCallStack[currentCallStack.length - 1].returnValue = 1;
        currentCallStack[currentCallStack.length - 1].status = "returned";
        emit(`Đạt điều kiện dừng, trả về 1`, LINE.factBaseCaseReturn, [{ ids: [frameId], kind: "success" }]);
        
        currentCallStack.pop();
        if (currentCallStack.length > 0) {
          currentCallStack[currentCallStack.length - 1].status = "running";
        }
        return 1;
      }

      emit(`Chưa đạt điều kiện dừng, chuẩn bị gọi đệ quy factorial(${currentN - 1})`, LINE.factRecursiveCall, [{ ids: [frameId], kind: "active" }]);
      
      const childResult = recurse(currentN - 1);

      // Back to this frame
      currentCallStack[currentCallStack.length - 1].status = "running";
      
      const result = currentN * childResult;
      currentCallStack[currentCallStack.length - 1].returnValue = result;
      currentCallStack[currentCallStack.length - 1].status = "returned";
      
      emit(`Nhận kết quả từ hàm con (${childResult}), trả về ${currentN} * ${childResult} = ${result}`, LINE.factReturnCalc, [{ ids: [frameId], kind: "success" }]);
      
      currentCallStack.pop();
      if (currentCallStack.length > 0) {
        currentCallStack[currentCallStack.length - 1].status = "running";
      }

      return result;
    };

    recurse(n);
  };

  for (const op of ops) {
    if (op.type === "factorial") {
      calculateFactorial(op.value);
    }
  }

  emit("Hoàn thành ✓");
  return steps;
}
