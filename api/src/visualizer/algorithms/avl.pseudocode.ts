export const LINE = {
  insertBase: 10,
  insertCompare: 11,
  insertLeft: 12,
  insertRight: 13,
  insertCreate: 14,
  insertUpdateHeight: 15,
  insertCheckBalance: 16,
  
  rotateLL: 20,
  rotateRR: 21,
  rotateLR: 22,
  rotateRL: 23,

  searchBase: 30,
  searchCompare: 31,
  searchLeft: 32,
  searchRight: 33,
  searchFound: 34,
  searchNotFound: 35,
};

export const pseudocode = `// Cây AVL (AVL Tree)

function insert(node, value):
  if node is null: return new Node(value)
  if value < node.value:
    node.left = insert(node.left, value)
  else if value > node.value:
    node.right = insert(node.right, value)
  else return node // Duplicate

  // Cập nhật chiều cao & Tính Balance Factor
  node.height = 1 + max(height(node.left), height(node.right))
  balance = height(node.left) - height(node.right)

  // Cân bằng cây (Rotations)
  if balance > 1 and value < node.left.value:
    return rightRotate(node) // LL
  if balance < -1 and value > node.right.value:
    return leftRotate(node) // RR
  if balance > 1 and value > node.left.value:
    node.left = leftRotate(node.left)
    return rightRotate(node) // LR
  if balance < -1 and value < node.right.value:
    node.right = rightRotate(node.right)
    return leftRotate(node) // RL

  return node

function search(node, value):
  if node is null: return null
  if value == node.value: return node
  if value < node.value: return search(node.left, value)
  return search(node.right, value)
`;
