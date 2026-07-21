# Kế hoạch fix bug — nhánh `fixBug`

> Dựa trên `BAO-CAO-BAN-GIAO.md`. Đã dùng 2 Explore agent đọc code thật để kiểm chứng toàn bộ báo
> cáo trước khi lên kế hoạch — tất cả 10 bug + 8 mục nợ kỹ thuật đều **CONFIRMED**, chỉ lệch nhỏ ở
> bug #10 (thực tế 4 module trùng lặp, không phải 5 — `sll` đã được dọn từ trước) và hậu quả runtime
> của bug #3 (chưa kiểm chứng được liệu client có thật sự "treo" hay NestJS vẫn trả 500 mặc định).
>
> **Quyết định đã chốt**: bug #10 → bỏ hẳn code sinh bước phía client, dùng backend làm nguồn duy
> nhất (`generateSteps` thành optional). Phạm vi lượt này = 10 bug + 4 việc dọn nhanh không rủi ro
> (README, `fix-math.js`, Mongo/docker-compose chưa dùng, markdown mồ côi). Không làm các tái cấu
> trúc lớn hơn ở mục 4 báo cáo (gộp InputPanel/Canvas trùng lặp, `switch`→`Record`, batch embedding,
> hamburger nav mobile, memo hoá regex, O(n²) AVL Canvas) — để dành lượt sau.
>
> **Quy ước cập nhật file này**: mỗi khi hoàn thành một mục, tick `- [x]` và ghi chú ngắn nếu cách
> làm thực tế khác kế hoạch, để người/AI tiếp nhận sau nắm được tiến độ mà không cần đọc lại hội thoại.

## A. Chặn deploy (🔴)

- [x] **A1** — `web/src/data/quizzes.json`: gộp khoá `"stacks"` + `"queues"` thành `"stacks-queues"`
      (giữ toàn bộ câu hỏi của cả hai, 4 câu). *Không* tự soạn quiz cho 8 chương còn thiếu (việc biên
      soạn nội dung, ngoài phạm vi sửa bug).
- [x] **A2** — `VisualizerShell.tsx` chết ngoài local + code chết bug #10:
  - [x] Thêm `web/.env.example` (`NEXT_PUBLIC_API_URL=http://localhost:3001`), dùng biến này thay vì
        hardcode `http://localhost:3001` trong `VisualizerShell.tsx`.
  - [x] Thêm check `res.ok` trước khi `.json()`.
  - [x] Thay cơ chế nuốt lỗi (catch → `state:{}` → suy luận qua `Object.keys().length`) bằng state
        lỗi riêng, hiển thị banner tiếng Việt + nút "Thử lại".
  - [x] `web/src/lib/types.ts`: `generateSteps` thành optional.
  - [x] 4 module `bst`, `stack`, `queue-linear`, `queue-circular`: bỏ thân thuật toán trong
        `generateSteps.ts` (giữ type), đổi `meta.ts` thành `generateSteps: () => [], // Handled by API`.
- [x] **A3** — `api/src/rag/rag.service.ts`: mở `try` từ trước `retrieve()`/`res.setHeader`; bọc
      riêng lời gọi `this.extractor(...)` trong `retrieve()`, trả `[]` khi lỗi thay vì ném ra ngoài.

## B. Nghiêm trọng (🟠)

- [x] **B1** — `api/src/rag/rag.controller.ts`: thêm guard kiểm tra tin nhắn cuối có `content` là
      string không rỗng trước khi dùng, trả 400 nếu không hợp lệ (không kéo thêm class-validator/DTO).
- [x] **B2** — `ChatWidget.tsx`: dùng `NEXT_PUBLIC_API_URL`; destructure `error` + `onError` từ
      `useChat`, render bubble lỗi; badge trạng thái phản ánh `error` thật thay vì hardcode "Online";
      chỉ ghi localStorage khi `!isLoading && !error` (fix kèm nợ kỹ thuật "ghi mỗi token").

## C. Nhỏ (🟡)

- [x] **C1** — `layout.tsx`: đổi `Outfit` → **Be Vietnam Pro** (không có font variable nên phải khai
      báo `weight: ["400"…"900"]` tường minh, khác Outfit); thêm `"vietnamese"` vào subset của
      `JetBrains_Mono`. Nhân tiện đổi luôn biến CSS `--font-outfit` → `--font-sans-vn` (cả
      `layout.tsx` lẫn `globals.css`) để tên biến không còn gây hiểu nhầm là font Outfit.
- [x] **C2** — `sll/InputPanel.tsx`: thêm guard `Number.isNaN` cho 3 chỗ `parseInt`, theo đúng
      pattern đã có ở `stack/InputPanel.tsx`.
- [x] **C3** — `rag.service.ts`: sửa thông báo lỗi `ollama run phi3` → `ollama run llama3` (chung
      file với A3, sửa cùng lượt).

## D. Dọn nhanh (nợ kỹ thuật không rủi ro)

- [x] **D1** — README.md: Next.js 14 → 16; bỏ nhắc Zustand (không phải dependency thật); thêm bước
      chạy Ollama; ghi chú biến môi trường `NEXT_PUBLIC_API_URL`.
- [x] **D2** — Xoá `web/scripts/fix-math.js` (đường dẫn hardcode hỏng, không ai tham chiếu); xoá
      luôn thư mục `web/scripts/` vì đã rỗng.
- [x] **D3** — Xoá `docker-compose.yml` (chỉ có mongodb, không dùng); bỏ `@nestjs/mongoose` +
      `mongoose` khỏi `api/package.json`; đã `npm install` lại trong `api/` (gỡ 20 package con).
- [x] **D4** — Đã đọc cả 3 file: `stacks-queues.md` là bản viết lại đầy đủ hơn (có độ phức tạp,
      ứng dụng, Deque, Priority Queue) chứ không chỉ nối 2 file cũ — an toàn để xoá. Đã xoá
      `stacks.md` và `queues.md`.

## Không làm lượt này (để dành sau)

Hamburger menu mobile cho Sidebar · gộp `InputPanel`/`calculateLayout` trùng lặp giữa các visualizer
· thay `switch` 10 nhánh trong `visualizer.service.ts` bằng `Record` · batch hoá embedding · memo hoá
regex trong `MarkdownRenderer` · tối ưu O(n²) trong `avl/Canvas.tsx` · viết thêm quiz cho 8 chương
chưa có câu hỏi.

## Kiểm tra cuối

- [x] `cd web && npm run lint` — pass theo đúng baseline: trước khi sửa vốn đã có 11 lỗi lint có
      sẵn (không liên quan 10 bug); sau khi sửa còn 5 lỗi (đã giảm 6: xóa 2 lỗi `require()` khi xóa
      fix-math.js, 2 lỗi `prefer-const` khi bỏ code trùng lặp, tiện tay sửa luôn 2 lỗi `any` ở
      `VisualizerShell.tsx`/`ChatWidget.tsx` vì đang sửa 2 file đó cho A2/B2). 5 lỗi còn lại
      (`ThemeToggle.tsx`, `ThemeProvider.tsx`, `page.tsx:85`, 2 lỗi `setState`-trong-effect ở
      `ChatWidget`/`VisualizerShell`) là nợ kỹ thuật có sẵn, ngoài phạm vi 10 bug, để dành lượt sau.
- [x] `cd web && npm run build` — pass, toàn bộ route (9 topics + 10 visualizers) generate tĩnh
      thành công.
- [x] `cd api && npm run build` — pass.
- [ ] Chạy đủ 3 tiến trình (Ollama → api → web), kiểm tra thủ công từng mục theo checklist trên
      (chi tiết cách test từng bug xem `BAO-CAO-BAN-GIAO.md` + hội thoại lập kế hoạch).
