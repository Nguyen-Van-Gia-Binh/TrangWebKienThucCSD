export const pseudocode = `// Đồ thị (Graph) - Duyệt theo chiều rộng (BFS) và chiều sâu (DFS)

function BFS(graph, start):
  queue = new Queue()
  visited = new Set()
  queue.enqueue(start)
  visited.add(start)

  while not queue.isEmpty():
    node = queue.dequeue()
    for neighbor in graph.neighbors(node):
      if neighbor not in visited:
        queue.enqueue(neighbor)
        visited.add(neighbor)

function DFS(graph, start):
  stack = new Stack()
  visited = new Set()
  stack.push(start)

  while not stack.isEmpty():
    node = stack.pop()
    if node not in visited:
      visited.add(node)
      for neighbor in graph.neighbors(node):
        stack.push(neighbor)
`;
