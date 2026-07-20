---
title: "Ghi chú tham chiếu: code Java demo trên lớp (đã gỡ khỏi repo)"
source: "CodeInClass/ (NetBeans projects, đã xóa sau khi tổng hợp — 2026-07-20)"
---

# Ghi chú tham chiếu code Java trên lớp

Repo gốc từng chứa 7 project NetBeans minh họa cấu trúc dữ liệu. Sau khi tổng hợp ý chính vào
file này, các project đã được xóa khỏi repo để tránh rác build/IDE. Nội dung dưới đây dùng làm
tham chiếu khi viết lại logic (bằng TypeScript) cho các visualizer tương tác trên web.

## Model dùng chung

Cả 7 project đều dùng chung 2 kiểu dữ liệu giống hệt nhau:

```java
class Student { String id; String name; double gpa; }
class Node { Student data; Node next; /* + previous / left / right tùy cấu trúc */ }
```

`isEmpty()` luôn cài đặt bằng `size == 0` (biến đếm), không kiểm tra head/root null.

## 1. StackDemo — Stack bằng danh sách liên kết (LIFO, con trỏ `top`)

- `push(s)` — rỗng: `top = newNode`; else: `newNode.next = top; top = newNode`.
- `pop()` — trả về `Student` bị gỡ (không phải Node); rỗng thì in thông báo, trả `null`.
- `peek()` — trả `top.data`, không gỡ.
- `traverse()`, `clear()` (`top=null; size=0`).
- `removeStudentByID(id)` — tìm tuyến tính từ `top`, có `preNode`; nếu match ở `top` thì gọi `pop()`, ngược lại nối tắt (`preNode.next = currentNode.next`).

**Bug đáng chú ý (giữ lại để làm ví dụ "tìm lỗi" khi ôn tập):**
- `pop()` giảm `size--` **kể cả khi stack rỗng** (nằm ngoài nhánh if/else) → `size` có thể âm nếu pop liên tục lúc rỗng.
- `searchStudent(id)` dùng điều kiện vòng lặp `while (!isEmpty())` thay vì kiểm tra `currentNode != null` — nếu không tìm thấy, vòng lặp không dừng đúng chỗ (size không đổi trong lúc duyệt) → nguy cơ lặp vô hạn/NPE khi con trỏ chạy quá đáy.

## 2. Queue — Queue bằng danh sách liên kết (FIFO, con trỏ `front`/`rear`)

- `enqueue(s)` — rỗng: `front=rear=newNode`; else: `rear.next=newNode; rear=newNode`.
- `dequeue()` — trả `Student` bị gỡ; rỗng thì `null`; còn 1 phần tử thì null hóa cả `front` và `rear`.
- `front()`/`rear()` — peek, không gỡ.
- `getStudentByID(id)` — tìm tuyến tính từ `front`.
- `swap()` — hoán đổi node `front`/`rear` (bài tập luyện con trỏ, **không phải thao tác Queue chuẩn**) — nên gắn nhãn "bonus" khi lên visualizer, không xếp cùng nhóm enqueue/dequeue/peek.
- Không giới hạn dung lượng (unbounded), không có bản mảng/circular-buffer trong project này.

## 3. SingleLinkedList — Singly Linked List tối giản (chỉ có `head`)

- Chỉ có **một** method thật sự: `insert(student)` — thực chất là `addLast` bằng cách duyệt tới cuối (`while curr.next != null`), vì **không có con trỏ tail** → O(n) mỗi lần thêm.
- Không có `display`, `search`, `delete`, `addFirst`, hay `isEmpty`.
- Dùng để đối chiếu với `SInglyLinkedListWithTail` nhằm minh họa **vì sao cần con trỏ tail** (O(n) vs O(1) khi thêm cuối).

## 4. SInglyLinkedListWithTail — Singly Linked List có `head` + `tail`

- `addLast(s)` — O(1) nhờ `tail`: rỗng thì `head=tail=newNode`; else `tail.next=newNode; tail=newNode`.
- `addFirst(s)` — rỗng như trên; else `newNode.next=head; head=newNode` (tail giữ nguyên).
- `displayAll()`, `getStudentByID(id)` (tuyến tính), `getAverageGpa()`.
- Không có delete/remove nào được cài đặt.

**Bug nhỏ:** `getMaxGpa()` khởi tạo `maxGPA = 0` rồi so sánh `maxGPA < gpa` — nếu toàn bộ GPA trong danh sách đều ≤ 0 thì hàm trả về `null` sai (nên khởi tạo từ node đầu tiên thay vì hằng số 0).

## 5. CircularSinglyLinkedListDemo — Circular Singly Linked List (`head`/`tail`, `tail.next` luôn trỏ về `head`)

- `addLast(s)` / `addFirst(s)` — như singly linked list nhưng luôn kết thúc bằng `tail.next = head` để giữ vòng tròn.
- `display()` — dùng **do/while**, dừng khi `current == head` (không phải `!= null`, vì danh sách vòng không có điểm kết null) — điểm dạy học quan trọng nhất của cấu trúc này.
- `searchStudent(id)` — cũng do/while theo cùng nguyên tắc.
- `swap()` — hoán đổi `head`/`tail`; có nhánh riêng cho `size == 2`, còn lại duyệt tìm `previousTail` rồi nối lại 3 con trỏ.
- `swapNodeSpecific(id1, id2)` — hoán đổi 2 node bất kỳ theo id, có nhánh riêng khi cặp đó chính là `{head, tail}`. Không có `remove` tổng quát trong project này.

## 6. DoublyLinkedListDemo — Doubly Linked List (`head`/`tail`, không vòng)

- `addFirst`/`addLast` — chuẩn, cập nhật cả `next` và `previous`.
- `swap()` — chỉ hoán đổi **vị trí 2 node đầu/cuối**, phần giữa giữ nguyên thứ tự (không phải reverse cả danh sách).
- `removeFist()` [nguyên văn có lỗi chính tả trong code gốc] / `removeTail()` — gỡ đầu/cuối.
- `removeNode(id)` — tìm theo id, nếu là head/tail thì gọi hàm tương ứng, còn lại nối tắt `previous`/`next` của 2 node lân cận.
- `deleteHead()`/`deleteTail()` — bản thay thế, không được `Main` gọi tới.

**Bug đáng chú ý:** `removeFist()`/`removeTail()` khi gỡ **node cuối cùng** chỉ null hóa `next`/`previous` của node bị gỡ, **không null hóa chính `head`/`tail`** → để lại tham chiếu treo (dangling reference). Trong khi đó `deleteHead()`/`deleteTail()` (không được dùng) làm đúng: set `head=tail=null`. Đây là ví dụ tốt để minh họa lỗi "quên cập nhật con trỏ biên" khi xóa phần tử cuối cùng.

## 7. BinaryTree — Binary Search Tree (không tự cân bằng, sắp theo `Student.gpa`)

- `insert(s)` — duyệt kiểu BST chuẩn theo `gpa`: nhỏ hơn → trái, lớn hơn → phải, **bằng nhau → in "Duplicate GPA" và không chèn** (không cho trùng GPA).
- `inorderTraversal` — đệ quy trái-gốc-phải (in ra danh sách đã sắp xếp theo gpa).
- `searchMinID()`/`getMaxGPA()` — duyệt lặp (iterative) về node ngoài cùng trái/phải.
- `getAverage()` = `sum(root)/size(root)` — 2 hàm đệ quy phụ trợ (không dùng biến đếm `size` có sẵn).
- `findSecond()`/`findSencondMax()` [nguyên văn] — tìm giá trị lớn nhì; có cả bản lặp (dễ sai với vài hình dạng cây) lẫn bản đệ quy (đúng hơn: duyệt toàn cây, lấy max nhỏ hơn max).
- **Không có method xóa (delete) nào cho BST này.**
- **Không buildable:** overload `insert(Node root, Node value)` chỉ xử lý nhánh `root == null`, thiếu return cho nhánh còn lại → lỗi biên dịch Java (method không dùng tới từ `Main`, nhưng vẫn là lỗi nếu build cả file).

## Ứng dụng cho việc xây visualizer

- Dùng đúng các thao tác *chuẩn* của từng cấu trúc (không đưa `swap()`/`swapNodeSpecific()` vào luồng chính, chỉ ghi chú như bài tập mở rộng nếu cần).
- Có thể cân nhắc dựng 1-2 "câu hỏi tìm lỗi" trong quiz sau này dựa trên các bug ở trên (pop() âm size, xóa cuối danh sách đôi không null hóa head/tail, khởi tạo sai `getMaxGpa`) — vừa ôn cấu trúc dữ liệu vừa rèn kỹ năng đọc code.
- `SingleLinkedList` vs `SInglyLinkedListWithTail` là cặp đối chiếu tốt cho phần "vì sao cần con trỏ tail" trong bài List.
