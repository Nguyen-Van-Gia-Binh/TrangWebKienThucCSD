# Cây (Trees) và Cây Nhị Phân Tìm Kiếm (BST)

## 1. Khái niệm Cây (Tree)
Khác với danh sách liên kết, **Tree** là cấu trúc dữ liệu **phi tuyến tính** (phân cấp). Thuật ngữ quan trọng:
- **Root (Gốc)**: Đỉnh trên cùng.
- **Leaf (Lá)**: Đỉnh không có bất kỳ con nào.
- **Height (Chiều cao)**: Số lượng cạnh dài nhất từ gốc đến một lá.
- **Depth (Độ sâu)**: Khoảng cách từ một đỉnh lên tới gốc.

## 2. Cây Nhị Phân (Binary Tree)
Mỗi đỉnh có tối đa 2 con (trái và phải). Một Cây nhị phân hoàn chỉnh (Complete Binary Tree) gồm $N$ đỉnh sẽ có chiều cao xấp xỉ $\log_2(N)$.

### 3 Phép duyệt cây đệ quy kinh điển (Tree Traversal)
Cho một Node gồm `Root`, `Left`, `Right`:

1. **Pre-order (Tiền tự): Root $\rightarrow$ Left $\rightarrow$ Right**
   - Dùng để clone (sao chép) cấu trúc của một cây.
2. **In-order (Trung tự): Left $\rightarrow$ Root $\rightarrow$ Right**
   - Rất quan trọng với BST vì nó sẽ duyệt các giá trị theo thứ tự **tăng dần**.
3. **Post-order (Hậu tự): Left $\rightarrow$ Right $\rightarrow$ Root**
   - Dùng để Xóa (Delete) cây, vì bạn phải xóa con cái hết rồi mới xóa được cha.

```cpp
void inOrder(Node* root) {
    if (root == nullptr) return;
    inOrder(root->left);
    cout << root->val << " "; // Xử lý Root
    inOrder(root->right);
}
```

## 3. Cây Nhị Phân Tìm Kiếm (Binary Search Tree - BST)
Được sinh ra để giải quyết bài toán: *Tìm kiếm một phần tử nhanh như Binary Search trên mảng, nhưng lại chèn/xóa động nhanh như Linked List*.
- Trái < Gốc < Phải.

### Vấn đề suy biến (Degenerate Tree)
Nếu dữ liệu chèn vào BST đã được **sắp xếp sẵn** (ví dụ insert `1, 2, 3, 4, 5`), BST sẽ mọc toàn cành bên phải và biến thành một **Singly Linked List**.
- Thời gian tìm kiếm tệ nhất (Worst Case) sụp đổ từ $O(\log N)$ về $O(N)$.

> [!TIP]
> Trong Lập trình thi đấu, người ta KHÔNG BAO GIỜ dùng BST thuần túy vì dễ bị Test Case đánh sập do mảng đã sắp xếp. Thay vào đó, người ta sử dụng các cây Tự cân bằng (như AVL Tree hoặc Red-Black Tree).
