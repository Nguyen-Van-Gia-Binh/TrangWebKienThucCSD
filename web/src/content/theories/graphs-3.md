# Cây khung nhỏ nhất (Kruskal & DSU)

Cho một đồ thị vô hướng, liên thông, có trọng số gồm $V$ đỉnh. Một **Cây khung (Spanning Tree)** là một tập con của đồ thị, giữ lại đúng $V-1$ cạnh sao cho tất cả các đỉnh vẫn nối với nhau nhưng không tạo thành chu trình.
**Cây khung nhỏ nhất (Minimum Spanning Tree - MST)** là cây khung có tổng trọng số các cạnh là nhỏ nhất.

## 1. Thuật toán Kruskal
Kruskal là một thuật toán Tham lam (Greedy) dựa trực tiếp trên các Cạnh (Edges).

**Tư tưởng:**
1. Thu thập mọi cạnh trong đồ thị và **Sắp xếp chúng theo thứ tự trọng số tăng dần**.
2. Khởi tạo một Rừng, mỗi đỉnh là một cây độc lập.
3. Duyệt danh sách cạnh đã sắp xếp:
   - Thử nối 2 đỉnh $U$ và $V$ của cạnh đó.
   - Nếu nối mà **không tạo thành chu trình**, ta chọn cạnh đó vào MST.
   - Nếu tạo chu trình, bỏ qua cạnh đó.
4. Dừng khi đã chọn đủ $V-1$ cạnh.

Vậy vấn đề khó nhất của Kruskal là: *Làm sao để biết nối 2 đỉnh có bị tạo chu trình hay không một cách nhanh nhất?*
Đáp án là cấu trúc dữ liệu **Disjoint Set Union (DSU)**.

## 2. Disjoint Set Union (Tập hợp rời rạc)
DSU sinh ra để quản lý các "bè phái" (tập hợp). Cấu trúc này có 2 thao tác thần thánh với độ phức tạp xấp xỉ $O(1)$:
- `Find(x)`: Trả về "đại ca" (Root) của tập hợp chứa phần tử x. Nếu 2 phần tử có chung đại ca, nghĩa là chúng thuộc cùng 1 tập hợp.
- `Union(x, y)`: Gộp tập hợp chứa x và tập hợp chứa y lại với nhau (bằng cách cho đại ca của x phục tùng đại ca của y).

Trong Kruskal, nếu `Find(U) == Find(V)`, việc nối thêm cạnh $U-V$ sẽ tạo thành chu trình!

### Hai Tối ưu (Optimization) kinh điển của DSU
Nếu chỉ cài đặt DSU ngây thơ, nó sẽ bị suy biến thành LinkedList. Do đó ta dùng 2 kỹ thuật:

**Kỹ thuật 1: Nén đường (Path Compression)**
Mỗi khi gọi `Find(x)`, khi đệ quy về, ta cho `x` trỏ thẳng lên "tổng bộ" (đại ca cao nhất) luôn. Những lần `Find` sau sẽ mất đúng $O(1)$.
```cpp
int findSet(int v) {
    if (v == parent[v])
        return v;
    // Gán trực tiếp parent[v] = kết quả findSet (Path Compression)
    return parent[v] = findSet(parent[v]); 
}
```

**Kỹ thuật 2: Gộp theo Rank (Union by Rank / Size)**
Khi gộp 2 tập hợp, ta luôn cho "đại ca" của tập hợp có cây *nông hơn* (hoặc ít phần tử hơn) làm "đàn em" cho đại ca của tập hợp *sâu hơn*. Việc này giúp cây DSU không bị cao lên không kiểm soát.

> [!TIP]
> Nhờ DSU với Path Compression, thuật toán Kruskal hoạt động với độ phức tạp **$O(E \log E)$** (chủ yếu tốn thời gian cho việc Sắp xếp mảng các cạnh lúc ban đầu). Đoạn xử lý DSU về sau có độ phức tạp gần như là Tuyến tính thời gian đảo (Inverse Ackermann function).
