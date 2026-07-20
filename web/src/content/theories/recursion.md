# Đệ quy (Recursion)

Đệ quy là một phương pháp cực kỳ mạnh mẽ trong Khoa học máy tính và Lập trình thi đấu (CP), nơi **một hàm tự gọi lại chính nó** để giải quyết các bài toán lớn bằng cách chia nhỏ chúng thành các bài toán con tương tự.

## 1. Cấu trúc chuẩn của một hàm đệ quy
Một hàm đệ quy bao giờ cũng phải có 2 phần cốt lõi:
1. **Trường hợp cơ sở (Base Case)**: Điều kiện dừng. Trả về kết quả ngay lập tức mà không gọi đệ quy tiếp. Thiếu Base Case sẽ gây ra lỗi `Stack Overflow`.
2. **Trường hợp đệ quy (Recursive Case)**: Chia bài toán thành bài toán nhỏ hơn và gọi lại chính nó.

```cpp
// Ví dụ kinh điển: Tính N giai thừa (N!)
long long factorial(int n) {
    if (n == 0 || n == 1) return 1; // Base case
    return n * factorial(n - 1);    // Recursive case
}
```

## 2. Call Stack (Ngăn xếp gọi hàm)
Mỗi lần hàm đệ quy được gọi, hệ điều hành sẽ cấp phát một khung bộ nhớ (Stack Frame) chứa các biến cục bộ và địa chỉ trả về, sau đó đẩy vào **Call Stack**.
Khi gặp Base Case, các hàm sẽ lần lượt được *pop* ra khỏi Stack và tính toán ngược trở lên.

> [!WARNING]
> Vì kích thước Call Stack của hệ điều hành có giới hạn (thường là vài MB), nếu gọi đệ quy quá sâu (khoảng $>10^5$ lần), chương trình sẽ bị crash vì lỗi **Stack Overflow**. Trong Lập trình thi đấu, lỗi này tương đương với `Runtime Error (RTE)`.

## 3. Các loại đệ quy & Tối ưu hoá

### 3.1. Đệ quy đuôi (Tail Recursion)
Là đệ quy mà lời gọi hàm nằm ở *cuối cùng* và không có phép toán nào thực hiện sau nó. Các trình biên dịch hiện đại (như GCC) có thể tối ưu Đệ quy đuôi thành vòng lặp (với cờ `-O2` hoặc `-O3`), giúp tiết kiệm hoàn toàn Call Stack.

```cpp
// Không phải Tail Recursion (Vì còn phép nhân sau khi gọi hàm)
int fact(int n) { return (n == 0) ? 1 : n * fact(n - 1); }

// Tail Recursion (Dùng tham số tích lũy accumulator)
int tailFact(int n, int acc = 1) {
    if (n == 0) return acc;
    return tailFact(n - 1, n * acc);
}
```

### 3.2. Đệ quy nhánh (Tree Recursion)
Hàm gọi đệ quy từ hai lần trở lên, tạo thành cấu trúc cây. Nổi tiếng nhất là tính dãy Fibonacci.
Độ phức tạp của đệ quy Fibonacci thuần túy là **$O(2^N)$** – Tăng trưởng theo cấp số mũ, cực kỳ chậm. Để tối ưu, ta phải dùng **Quy hoạch động (Memoization)** để lưu lại các kết quả đã tính.

## 4. Ứng dụng trong Lập trình thi đấu
- **Quay lui (Backtracking)**: Dùng đệ quy để sinh các hoán vị, tổ hợp, giải bài toán Sudoku, N-Queens.
- **Duyệt đồ thị (DFS)**: Depth First Search bản chất là một thuật toán đệ quy.
- **Chia để trị (Divide and Conquer)**: Thuật toán Merge Sort, Quick Sort.

## Bài tập tự luyện
1. Viết hàm đệ quy đảo ngược một xâu ký tự.
2. Cài đặt thuật toán Quay lui sinh tất cả các chuỗi nhị phân độ dài $N$.
