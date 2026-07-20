export const LINE = {
  factBase: 10,
  factBaseCaseCheck: 11,
  factBaseCaseReturn: 12,
  factRecursiveCall: 13,
  factReturnCalc: 14,
};

export const pseudocode = `// Đệ quy (Recursion) - Tính Giai thừa (Factorial)

function factorial(n):
  if n <= 1:
    return 1
  return n * factorial(n - 1)
`;
