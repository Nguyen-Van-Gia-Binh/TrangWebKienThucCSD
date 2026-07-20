export const pseudocode = `// Danh sách liên kết đơn (Singly Linked List)

function insertHead(value):
  newNode = Node(value)
  newNode.next = head
  head = newNode

function insertTail(value):
  newNode = Node(value)
  if head is null: head = newNode; return
  curr = head
  while curr.next is not null: curr = curr.next
  curr.next = newNode

function deleteHead():
  if head is null: return
  head = head.next

function deleteTail():
  if head is null: return
  if head.next is null: head = null; return
  curr = head
  while curr.next.next is not null: curr = curr.next
  curr.next = null

function search(value):
  curr = head
  while curr is not null:
    if curr.value == value: return curr
    curr = curr.next
  return null
`;
