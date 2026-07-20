# Đồ thị cơ bản & Thuật toán duyệt BFS/DFS

Đồ thị (Graph) là một trong những chủ đề rộng và có tính phân loại cao nhất trong cấu trúc dữ liệu. Rất nhiều bài toán thực tế (Tìm đường đi, Xếp lịch, Phân bổ luồng mạng) đều quy về đồ thị.

## 1. Biểu diễn Đồ thị trong Bộ nhớ

Cho đồ thị có $V$ đỉnh (Vertices) và $E$ cạnh (Edges).

### Ma trận kề (Adjacency Matrix)
Dùng mảng 2 chiều `adj[V][V]`.
- Ưu điểm: Kiểm tra xem $U$ và $V$ có nối với nhau không mất đúng $O(1)$.
- Nhược điểm: Tốn bộ nhớ $O(V^2)$. Quá lãng phí nếu đồ thị thưa (ít cạnh). Thường chỉ dùng khi $V \le 1000$.

### Danh sách kề (Adjacency List)
Dùng `vector<int> adj[V]` trong C++ hoặc mảng chứa danh sách.
- Mỗi đỉnh lưu danh sách các hàng xóm của nó.
- Ưu điểm: Bộ nhớ tối ưu $O(V + E)$. Rất phổ biến trong Lập trình thi đấu.

---

## 2. Duyệt theo Chiều Sâu (DFS - Depth First Search)
Đi sâu vào một nhánh cho đến tận cùng (ngõ cụt), sau đó mới quay lui (Backtracking).

```cpp
bool visited[MAX_V];
void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}
```
**Ứng dụng thực chiến**:
- Đếm số thành phần liên thông (Connected Components).
- Tìm chu trình (Cycle Detection).
- **Sắp xếp Topo (Topological Sort)**: Sắp xếp các công việc có tính chất phụ thuộc (cái này phải làm xong mới được làm cái kia).

---

## 3. Duyệt theo Chiều Rộng (BFS - Breadth First Search)
Duyệt loang như vết dầu, lan ra từng lớp hàng xóm kề cận. Dùng **Queue** để xử lý.

```cpp
void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}
```
**Ứng dụng thực chiến**:
- Tìm **đường đi ngắn nhất** trên đồ thị *không có trọng số*. Bất cứ đỉnh nào được thăm lần đầu bằng BFS chắc chắn là đường đi ngắn nhất từ gốc.
- Đồ thị lưới (Grid Graph / Ma trận 2D): Các bài toán mê cung (Maze) tìm đường ra nhanh nhất.

> [!NOTE]
> Độ phức tạp của cả BFS và DFS (khi dùng Danh sách kề) đều là $O(V + E)$. Nghĩa là thuật toán duyệt qua toàn bộ đỉnh và toàn bộ cạnh đúng 1 lần. Đây là mức tối ưu nhất về mặt thời gian lý thuyết.
