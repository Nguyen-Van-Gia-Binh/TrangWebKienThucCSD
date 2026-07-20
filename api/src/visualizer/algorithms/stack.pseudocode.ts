export const pseudocode = [
  "push(x):",
  "  if top == capacity - 1 → grow()",
  "  top = top + 1",
  "  arr[top] = x",
  "",
  "pop():",
  "  if isEmpty() → lỗi: stack rỗng",
  "  x = arr[top]",
  "  top = top - 1",
  "  return x",
  "",
  "peek():",
  "  if isEmpty() → lỗi: stack rỗng",
  "  return arr[top]",
];

export const LINE = {
  pushCheck: 1,
  pushIncTop: 2,
  pushAssign: 3,
  popCheck: 6,
  popRead: 7,
  popDecTop: 8,
  popReturn: 9,
  peekCheck: 12,
  peekReturn: 13,
};
