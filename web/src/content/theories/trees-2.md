# Cây AVL (Cân bằng độ cao)

Trong Lập trình thi đấu, một thuật toán $O(\log N)$ là chìa khóa để vượt qua các bài toán có Time Limit khắt khe. Tuy nhiên, BST thuần túy có rủi ro suy biến thành $O(N)$. **Cây AVL** (Adelson-Velsky và Landis) ra đời với khả năng **tự cân bằng (Self-balancing)** cực kỳ thông minh.

## 1. Cơ sở Toán học: Balance Factor
Chiều cao của một cây là đường đi dài nhất từ gốc đến lá. Cây AVL quy định một luật thép:
$$ | Height(LeftChild) - Height(RightChild) | \le 1 $$

Tại mỗi Node, ta duy trì một biến `BalanceFactor = H(Left) - H(Right)`.
- Nếu `BF == 0, 1, -1`: Cây tại Node đó đang cân bằng.
- Nếu `BF >= 2`: Lệch Trái (Cây con trái quá nặng).
- Nếu `BF <= -2`: Lệch Phải (Cây con phải quá nặng).

## 2. 4 Trường hợp mất cân bằng và Cách xoay (Rotations)
Để cân bằng lại cây, AVL sử dụng kỹ thuật "xoay". Việc xoay chỉ tốn $O(1)$ thay đổi con trỏ, đảm bảo cây vẫn giữ được tính chất BST (Trái < Gốc < Phải).

### TH1: Mất cân bằng Trái-Trái (LL)
- Xảy ra khi: `BF(root) == 2` và `BF(root->left) >= 0`.
- Khắc phục: **Xoay Phải (Right Rotate)** tại `root`.

### TH2: Mất cân bằng Phải-Phải (RR)
- Xảy ra khi: `BF(root) == -2` và `BF(root->right) <= 0`.
- Khắc phục: **Xoay Trái (Left Rotate)** tại `root`.

### TH3: Mất cân bằng Trái-Phải (LR)
- Xảy ra khi: `BF(root) == 2` nhưng nhánh con trái lại lệch phải `BF(root->left) < 0`.
- Khắc phục: Xoay Trái tại `root->left`, sau đó Xoay Phải tại `root`.

### TH4: Mất cân bằng Phải-Trái (RL)
- Xảy ra khi: `BF(root) == -2` nhưng nhánh con phải lệch trái `BF(root->right) > 0`.
- Khắc phục: Xoay Phải tại `root->right`, sau đó Xoay Trái tại `root`.

## 3. So sánh AVL Tree và Red-Black Tree
Cả hai đều là Cây tự cân bằng với $O(\log N)$.
- **AVL Tree**: Cân bằng nghiêm ngặt hơn (chênh lệch $\le 1$). Tốc độ tìm kiếm nhanh hơn. Tuy nhiên, thao tác chèn/xóa có thể tốn nhiều phép xoay hơn để duy trì sự cân bằng khắt khe này.
- **Red-Black Tree**: Cân bằng lỏng lẻo hơn (đường dài nhất không quá 2 lần đường ngắn nhất). Thao tác chèn/xóa ít phép xoay hơn, nhanh hơn AVL trong thực tế chèn/xóa liên tục. Đây là lý do `std::set` và `std::map` trong C++ STL dùng Red-Black Tree thay vì AVL.
