export interface TreeNode {
  id: string;
  left?: string | null;
  right?: string | null;
  [key: string]: any;
}

export function calculateTreeLayout(nodesArr: TreeNode[], rootId: string | null) {
  const layout: Record<string, { x: number; y: number }> = {};
  if (!rootId) return layout;

  const LEVEL_HEIGHT = 70;
  const MIN_NODE_SPACING = 55;

  const positions: { id: string; level: number; offset: number }[] = [];
  const nodeMap = new Map(nodesArr.map((n) => [n.id, n]));

  // In-order traversal to determine X offset
  let currentOffset = 0;
  const traverse = (id: string, level: number) => {
    const node = nodeMap.get(id);
    if (!node) return;
    if (node.left) traverse(node.left, level + 1);
    positions.push({ id, level, offset: currentOffset++ });
    if (node.right) traverse(node.right, level + 1);
  };

  traverse(rootId, 0);

  // Center the tree
  if (positions.length > 0) {
    const minOffset = Math.min(...positions.map((p) => p.offset));
    const maxOffset = Math.max(...positions.map((p) => p.offset));
    const centerOffset = (minOffset + maxOffset) / 2;

    positions.forEach((p) => {
      layout[p.id] = {
        x: (p.offset - centerOffset) * MIN_NODE_SPACING,
        y: p.level * LEVEL_HEIGHT,
      };
    });
  }

  return layout;
}
