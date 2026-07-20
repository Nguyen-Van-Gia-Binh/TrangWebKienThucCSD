export const LINE = {
  enqCheck: 1,
  enqFrontCheck: 3,
  enqIncRear: 5,
  enqAssign: 6,
  deqCheck: 9,
  deqRead: 11,
  deqClear: 12,
  deqIfReset: 13,
  deqElseFront: 16,
  deqReturn: 18,
  peekCheck: 21,
  peekReturn: 23,
};

export const pseudocode = `enqueue(x):
  if (rear + 1) % capacity == front:
    return "Overflow"
  if front == -1:
    front = 0
  rear = (rear + 1) % capacity
  arr[rear] = x

dequeue():
  if front == -1:
    return "Underflow"
  x = arr[front]
  arr[front] = null
  if front == rear:
    front = -1
    rear = -1
  else:
    front = (front + 1) % capacity
  return x

peek():
  if front == -1:
    return "Underflow"
  return arr[front]`;
