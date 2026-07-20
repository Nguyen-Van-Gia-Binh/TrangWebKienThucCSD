export const LINE = {
  initSets: 10,
  sortEdges: 11,
  initMST: 12,
  forEdges: 13,
  findCycle: 14,
  ifNotCycle: 15,
  addToMST: 16,
  unionSets: 17,
  ifMSTComplete: 18,
  returnMST: 19,
};

export const pseudocode = `// Thuật toán Kruskal (Cây khung nhỏ nhất - Minimum Spanning Tree)

function kruskal(graph):
  mst = []
  parent = { node: node for node in graph }

  function find(i):
    if parent[i] == i: return i
    return find(parent[i])

  function union(i, j):
    root_i = find(i)
    root_j = find(j)
    parent[root_i] = root_j

  // Sắp xếp các cạnh theo trọng số tăng dần
  edges = sort(graph.edges, by=weight)

  for edge in edges:
    u, v, weight = edge
    if find(u) != find(v): // Không tạo thành chu trình
      mst.add(edge)
      union(u, v)

    if mst.length == graph.nodes.length - 1:
      break

  return mst
`;
