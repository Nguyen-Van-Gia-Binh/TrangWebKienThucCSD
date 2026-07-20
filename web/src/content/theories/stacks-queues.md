# Ngăn xếp (Stack) và Hàng đợi (Queue)

Stack và Queue là 2 cấu trúc dữ liệu trừu tượng (ADT) tuyến tính đặc biệt. Điểm chung của chúng là việc giới hạn thao tác thêm/xóa phần tử chỉ được thực hiện ở một đầu cụ thể.

## 1. Ngăn xếp (Stack)
Hoạt động theo nguyên tắc **LIFO (Last In, First Out)** - Vào sau, Ra trước.
Trong C++, có thể dùng `std::stack`, trong JavaScript dùng trực tiếp mảng (với `push` và `pop`).

### Độ phức tạp thao tác
- `Push` (Thêm vào đỉnh): $O(1)$
- `Pop` (Lấy khỏi đỉnh): $O(1)$
- `Top` (Xem giá trị đỉnh): $O(1)$

### Ứng dụng thần thánh của Stack
- **Duyệt đồ thị (DFS)**: Thay vì dùng đệ quy dễ bị *Stack Overflow*, người ta dùng Stack vật lý.
- **Đổi cơ số**: Chuyển số thập phân sang nhị phân.
- **Kiểm tra dãy ngoặc hợp lệ**: Khi gặp `(`, `[`, `{` thì đẩy vào Stack. Khi gặp ngoặc đóng, kiểm tra `top` xem có khớp không.
- **Ký pháp Ba Lan ngược (RPN)**: Đánh giá biểu thức hậu tố toán học.

---

## 2. Hàng đợi (Queue)
Hoạt động theo nguyên tắc **FIFO (First In, First Out)** - Vào trước, Ra trước. Giống như xếp hàng trong siêu thị.

### Ứng dụng của Queue
- **Duyệt đồ thị (BFS)**: Queue là xương sống của thuật toán duyệt theo chiều rộng.
- Chờ xử lý tín hiệu trong Hệ điều hành, CPU Task Scheduling.

## 3. Các biến thể nâng cao

### Hàng đợi hai đầu (Deque - Double Ended Queue)
- Cho phép thêm và xóa ở cả **hai đầu** (Front và Back) với thời gian $O(1)$.
- C++: `std::deque`.
- Ứng dụng kinh điển: Thuật toán tìm Max/Min trong cửa sổ trượt (Sliding Window Maximum) với độ phức tạp $O(N)$ cực kỳ đỉnh cao.

### Hàng đợi ưu tiên (Priority Queue)
- Bất kể phần tử nào vào trước hay sau, phần tử có **Độ ưu tiên cao nhất** sẽ luôn nằm ở đầu.
- Bản chất bên dưới được cài đặt bằng cấu trúc **Binary Heap** (Cây nhị phân hoàn chỉnh).
- Độ phức tạp `Push` và `Pop` là $O(\log N)$.
- C++: `std::priority_queue`.
- Ứng dụng: Thuật toán Dijkstra tìm đường đi ngắn nhất.
