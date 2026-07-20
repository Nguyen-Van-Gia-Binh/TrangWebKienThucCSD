# Đường đi ngắn nhất (Dijkstra)

Khi đồ thị được gắn trọng số (Ví dụ: Số km giữa 2 thành phố, Thời gian bay), thuật toán BFS thông thường trở nên vô dụng vì nó chỉ đếm số lượng cạnh, không đếm trọng số. 
Thuật toán **Dijkstra** ra đời để tìm khoảng cách ngắn nhất từ 1 đỉnh Nguồn (Source) tới toàn bộ các đỉnh còn lại trên đồ thị.

## 1. Tư tưởng tham lam (Greedy)
Dijkstra hoạt động dựa trên triết lý: "Nếu ta biết đường đi ngắn nhất tới thành phố X là $D$, thì từ X bước sang thành phố lân cận Y mất $W$ km, một đường đi tiềm năng tới Y sẽ là $D + W$."

**Thuật toán cơ bản:**
1. Khởi tạo mảng `dist[]` với giá trị vô cực ($\infty$), riêng đỉnh nguồn `dist[S] = 0`.
2. Tạo một tập hợp các đỉnh "đang chờ xử lý".
3. Lặp lại:
   - Rút đỉnh $U$ có `dist[U]` nhỏ nhất ra khỏi tập chờ (Đỉnh này được chốt hạ khoảng cách, không ai có thể tìm ra đường nào ngắn hơn tới $U$ nữa).
   - *Relaxation (Cập nhật)*: Duyệt các hàng xóm $V$ của $U$. Nếu `dist[U] + weight(U, V) < dist[V]`, ta cập nhật `dist[V]` bằng con đường mới ngắn hơn này.
4. Dừng khi tập chờ rỗng.

## 2. Tối ưu bằng Hàng đợi ưu tiên (Min-Heap Priority Queue)
Nếu dùng mảng để tìm đỉnh $U$ có khoảng cách nhỏ nhất, mất $O(V)$ mỗi lần. Tổng cộng là $O(V^2)$.
Để tối ưu, Lập trình thi đấu 100% sử dụng **Min-Heap** (`std::priority_queue` trong C++). Việc lấy ra $U$ nhỏ nhất chỉ mất $O(\log V)$.

```cpp
// Định nghĩa: pair<khoảng_cách, đỉnh>
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

pq.push({0, source});
dist[source] = 0;

while (!pq.empty()) {
    int d = pq.top().first;
    int u = pq.top().second;
    pq.pop();
    
    if (d > dist[u]) continue; // Bỏ qua nếu đây là dữ liệu cũ (stale data)
    
    for (auto edge : adj[u]) {
        int v = edge.v;
        int weight = edge.weight;
        if (dist[u] + weight < dist[v]) {
            dist[v] = dist[u] + weight;
            pq.push({dist[v], v});
        }
    }
}
```

Độ phức tạp sau khi tối ưu là **$O(E \log V)$**, cực kì chớp nhoáng cho các đồ thị lên đến hàng trăm nghìn đỉnh.

> [!WARNING]
> **Điểm yếu chí mạng**: Dijkstra sẽ sai hoàn toàn nếu đồ thị chứa **Cạnh có trọng số âm** (Negative weight edge). Lý do là vì nguyên lý Greedy (chốt hạ đỉnh khi lấy khỏi Heap) không dự đoán được việc đi tiếp lại có thể làm *giảm* tổng khoảng cách. Trong trường hợp có cạnh âm, ta bắt buộc phải sử dụng **Bellman-Ford**.
