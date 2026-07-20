# Danh sách liên kết (Linked List)

Array (Mảng) là cấu trúc dữ liệu tuyệt vời nhờ khả năng truy cập phần tử ngẫu nhiên $O(1)$. Tuy nhiên, mảng có điểm yếu chí mạng: Kích thước cố định và việc chèn/xóa ở đầu hoặc giữa mảng mất $O(N)$ do phải dịch chuyển toàn bộ phần tử. **Danh sách liên kết (Linked List)** ra đời để giải quyết bài toán này.

## 1. Khái niệm và Cấu trúc
Linked List lưu trữ dữ liệu dưới dạng các **Node** nằm rải rác trong bộ nhớ (Heap). Chúng liên kết với nhau bằng **Con trỏ (Pointers)**.

```cpp
// Khai báo một Node trong Singly Linked List (C++)
struct Node {
    int data;
    Node* next;
    
    // Constructor
    Node(int val) : data(val), next(nullptr) {}
};
```

## 2. Các loại Danh sách liên kết

### Singly Linked List (Danh sách liên kết đơn)
- Chỉ có con trỏ `next` đi về phía trước.
- Không thể duyệt ngược từ cuối về đầu.

### Doubly Linked List (Danh sách liên kết đôi)
- Mỗi Node có 2 con trỏ: `next` và `prev`.
- Ưu điểm: Xóa một phần tử bất kỳ chỉ tốn $O(1)$ nếu biết trước con trỏ tới nó. Có thể duyệt 2 chiều.
- Nhược điểm: Tốn gấp đôi bộ nhớ cho con trỏ. Thư viện chuẩn C++ `std::list` chính là Doubly Linked List.

### Circular Linked List (Danh sách liên kết vòng)
- Con trỏ `next` của Node cuối cùng trỏ ngược về `head` thay vì `nullptr`. Ứng dụng trong lập lịch Round-Robin của Hệ điều hành.

## 3. Phân tích Độ phức tạp (Complexity)

| Thao tác | Mảng (Array) | Singly Linked List |
| :--- | :---: | :---: |
| **Truy cập phần tử thứ i** | $O(1)$ | $O(N)$ |
| **Thêm/Xóa ở ĐẦU** | $O(N)$ | $O(1)$ |
| **Thêm/Xóa ở CUỐI** | $O(1)$ | $O(N)$ (nếu chỉ có `head`) |
| **Thêm/Xóa ở GIỮA** | $O(N)$ | $O(1)$ (nếu đã trỏ tới vị trí đó) |

## 4. Kỹ thuật nâng cao: Floyd's Cycle-Finding Algorithm (Rùa và Thỏ)
Làm sao để biết một Linked List có bị vòng lặp (Cycle) hay không với bộ nhớ $O(1)$?
Sử dụng 2 con trỏ:
- Con trỏ `slow` (Rùa) bước 1 bước mỗi lần.
- Con trỏ `fast` (Thỏ) bước 2 bước mỗi lần.
Nếu có vòng lặp, `fast` chắc chắn sẽ đuổi kịp và đụng độ `slow` tại một vòng chạy nào đó.

> [!CAUTION]
> Quản lý bộ nhớ cực kỳ quan trọng trong C/C++. Mỗi khi thực hiện thao tác Delete một Node, đừng quên gọi hàm `delete` (trong C++) hoặc `free` (trong C) để giải phóng vùng nhớ. Nếu không, chương trình của bạn sẽ bị **Memory Leak** (Rò rỉ bộ nhớ).
