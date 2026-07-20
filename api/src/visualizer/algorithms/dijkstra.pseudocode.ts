export const LINE = {
  initQueue: 10,
  initDistances: 11,
  initStartNode: 12,
  whileNotEmpty: 13,
  extractMin: 14,
  ifSettled: 15,
  markSettled: 16,
  forNeighbors: 17,
  relaxIfBetter: 18,
  updateDistance: 19,
  pushQueue: 20,
};

export const pseudocode = `// Thuật toán Dijkstra (Tìm đường đi ngắn nhất)

function dijkstra(graph, start):
  pq = new PriorityQueue()
  distances = { node: Infinity for node in graph }
  settled = new Set()

  distances[start] = 0
  pq.push(start, 0)

  while not pq.isEmpty():
    current_node = pq.extractMin()
    
    if current_node in settled:
      continue
    settled.add(current_node)

    for neighbor, weight in graph.neighbors(current_node):
      new_dist = distances[current_node] + weight
      
      if new_dist < distances[neighbor]:
        distances[neighbor] = new_dist
        pq.push(neighbor, new_dist)
`;
