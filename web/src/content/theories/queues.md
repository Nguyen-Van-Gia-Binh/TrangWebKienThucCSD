# Hàng đợi (Queue)

Queue là cấu trúc dữ liệu hoạt động theo nguyên tắc **FIFO** (First In, First Out - Vào trước ra trước).
Giống như xếp hàng mua vé, người đến trước sẽ được phục vụ trước.

## Các thao tác cơ bản
- **Enqueue**: Thêm phần tử vào cuối hàng đợi (Rear).
- **Dequeue**: Lấy phần tử ra khỏi đầu hàng đợi (Front).
- **Peek**: Xem phần tử ở đầu hàng đợi.

## Các biến thể của Queue
- **Circular Queue (Hàng đợi vòng)**: Khắc phục tình trạng lãng phí bộ nhớ trong Queue mảng khi Dequeue.
- **Priority Queue**: Mỗi phần tử có một độ ưu tiên, phần tử có độ ưu tiên cao nhất sẽ được Dequeue trước.
- **Deque (Double-ended Queue)**: Có thể Enqueue và Dequeue ở cả hai đầu.

## Ứng dụng
- Quản lý tài nguyên chia sẻ (CPU Scheduling, Print Spooler).
- Duyệt đồ thị theo chiều rộng (BFS).
