export const LINE = {
  // BFS
  bfsInitQueue: 10,
  bfsInitVisited: 11,
  bfsEnqueueStart: 12,
  bfsMarkVisited: 13,
  bfsWhileQueueNotEmpty: 14,
  bfsDequeue: 15,
  bfsForNeighbors: 16,
  bfsIfUnvisited: 17,
  bfsEnqueueNeighbor: 18,
  bfsMarkNeighborVisited: 19,
  
  // DFS
  dfsInitStack: 30,
  dfsInitVisited: 31,
  dfsPushStart: 32,
  dfsWhileStackNotEmpty: 33,
  dfsPop: 34,
  dfsIfUnvisited: 35,
  dfsMarkVisited: 36,
  dfsForNeighbors: 37,
  dfsPushNeighbor: 38,
};

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
