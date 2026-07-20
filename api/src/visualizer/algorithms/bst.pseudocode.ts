export const pseudocode = `
class Node {
  value: number;
  left: Node | null;
  right: Node | null;
}

function insert(root, value) {
  if (root == null) return new Node(value);
  if (value < root.value)
    root.left = insert(root.left, value);
  else if (value > root.value)
    root.right = insert(root.right, value);
  return root;
}

function search(root, value) {
  if (root == null || root.value == value)
    return root;
  if (value < root.value)
    return search(root.left, value);
  return search(root.right, value);
}

function delete(root, value) {
  if (root == null) return root;
  if (value < root.value)
    root.left = delete(root.left, value);
  else if (value > root.value)
    root.right = delete(root.right, value);
  else {
    if (root.left == null) return root.right;
    if (root.right == null) return root.left;
    let minNode = getMin(root.right);
    root.value = minNode.value;
    root.right = delete(root.right, minNode.value);
  }
  return root;
}
`.trim();

export const LINE = {
  insertBase: 8,
  insertLeftCheck: 9,
  insertLeft: 10,
  insertRightCheck: 11,
  insertRight: 12,
  searchBase: 17,
  searchReturnMatch: 18,
  searchLeftCheck: 19,
  searchLeft: 20,
  searchRight: 21,
  deleteBase: 25,
  deleteLeftCheck: 26,
  deleteLeft: 27,
  deleteRightCheck: 28,
  deleteRight: 29,
  deleteFound: 30,
  deleteNoLeft: 31,
  deleteNoRight: 32,
  deleteTwoChildrenMin: 33,
  deleteTwoChildrenSwap: 34,
  deleteTwoChildrenDel: 35,
};
