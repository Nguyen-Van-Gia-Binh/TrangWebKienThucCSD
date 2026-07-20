export const LINE = {
  enqCheck: 1,
  enqFrontCheck: 3,
  enqIncRear: 5,
  enqAssign: 6,
  deqCheck: 9,
  deqRead: 11,
  deqClear: 12,
  deqIncFront: 13,
  deqReturn: 14,
  peekCheck: 17,
  peekReturn: 19,
};

export const pseudocode = `enqueue(x):
  if rear == capacity - 1:
    return "Overflow (hoặc False Full)"
  if front == -1:
    front = 0
  rear = rear + 1
  arr[rear] = x

dequeue():
  if front == -1 or front > rear:
    return "Underflow"
  x = arr[front]
  arr[front] = null
  front = front + 1
  return x

peek():
  if front == -1 or front > rear:
    return "Underflow"
  return arr[front]`;
