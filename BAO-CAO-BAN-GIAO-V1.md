# Báo cáo bàn giao v1 — sau khi fix bug & gộp nhánh vào `main`

> Bản này mô tả những gì đã làm trong phiên fix bug (dựa trên `BAO-CAO-BAN-GIAO.md` — vẫn giữ
> nguyên, không xóa, để tra cứu chi tiết từng bug gốc), hiện trạng repo sau khi gộp nhánh, và
> hướng phát triển tiếp theo. Chi tiết từng bug + cách sửa cụ thể xem `KE-HOACH-FIX-BUG.md`
> (checklist đầy đủ, đã tick hết).

## 1. Đã làm gì

### Nhánh & lịch sử git
- Nhánh `InitailDevelopment` (cũ, dừng ở commit `e6e258a` — bản trước khi có backend/RAG) đã được
  **đổi tên thành `main`**.
- Tất cả các fix bug được commit trên nhánh `fixBug` (commit `91c2bd6`), sau đó **fast-forward
  merge vào `main`**. `main` hiện trỏ đúng `91c2bd6`.
- Nhánh `fixBug` và `tung` vẫn còn tồn tại cục bộ (trỏ tới các commit cũ hơn hoặc bằng `main`), có
  thể xóa sau nếu không cần nữa.
- **Chưa push lên remote** (`origin/InitailDevelopment`, `origin/tung` vẫn giữ nguyên như cũ) —
  cần bạn tự quyết định khi nào push/đổi tên nhánh mặc định trên GitHub, vì việc này ảnh hưởng tới
  các thành viên khác trong nhóm.

### 10 bug đã sửa (đối chiếu `BAO-CAO-BAN-GIAO.md`)
Đã xác minh lại toàn bộ báo cáo gốc bằng cách đọc code thật trước khi sửa (phát hiện 2 điểm báo
cáo hơi lệch: bug #10 thực tế chỉ còn 4 module trùng lặp code chứ không phải 5; hậu quả "treo hẳn"
của bug #3 chưa chắc chắn 100% nhưng hướng sửa vẫn đúng).

| # | Bug | Đã sửa như thế nào |
|---|---|---|
| 1, 6 | Visualizer chết ngoài local, nuốt lỗi im lặng | `VisualizerShell.tsx` dùng `NEXT_PUBLIC_API_URL` (mặc định `http://localhost:3001`, xem `web/.env.example`), kiểm tra `res.ok`, hiển thị banner lỗi tiếng Việt + nút "Thử lại" thay vì màn hình trắng |
| 2 | Quiz chết mọi chương | Gộp khoá `"stacks"` + `"queues"` trong `quizzes.json` thành `"stacks-queues"` khớp `chapters.ts` |
| 3 | Chat treo khi lỗi embedding | `rag.service.ts`: mở `try` bao trọn cả `retrieve()` lẫn `res.setHeader`; `retrieve()` tự bắt lỗi và trả `[]` thay vì ném ra ngoài |
| 4 | Body dị dạng làm sập handler (500) | `rag.controller.ts`: validate tin nhắn cuối có `content` dạng string không rỗng, trả 400 nếu không hợp lệ |
| 5 | Chatbot im lặng khi mất kết nối | `ChatWidget.tsx`: lấy `error`/`onError` từ `useChat`, hiện bubble lỗi, badge phản ánh trạng thái thật, chỉ lưu localStorage khi lượt trả lời đã xong |
| 7 | Mất dấu tiếng Việt (font `Outfit` không có subset `vietnamese`) | Đổi sang **Be Vietnam Pro** (có sẵn subset `vietnamese`, gần với phong cách của Outfit); thêm subset `vietnamese` cho `JetBrains Mono` |
| 8 | NaN lọt vào visualizer SLL | Thêm guard `Number.isNaN` ở `sll/InputPanel.tsx`, đúng pattern đã có ở `stack/InputPanel.tsx` |
| 9 | Thông báo lỗi sai tên model (`phi3` thay vì `llama3`) | Sửa chuỗi lỗi trong `rag.service.ts` |
| 10 | 2 nguồn sự thật cho cùng thuật toán (`bst`, `stack`, `queue-linear`, `queue-circular`) | Bỏ hẳn code sinh bước phía client ở 4 module này, dùng backend làm nguồn duy nhất (giống 6 module còn lại); `generateSteps` trong `VisualizerModule` giờ là optional |

### Dọn nhanh nợ kỹ thuật (không nằm trong 10 bug nhưng an toàn, không rủi ro)
- `README.md`: sửa Next.js 14 → 16, bỏ nhắc `Zustand` (không phải dependency thật), thêm bước
  chạy Ollama, ghi chú biến môi trường `NEXT_PUBLIC_API_URL`.
- Xóa `web/scripts/fix-math.js` (đường dẫn hardcode hỏng trên mọi máy, không ai tham chiếu).
- Xóa `docker-compose.yml` (chỉ khai báo MongoDB, không service nào dùng) và bỏ
  `@nestjs/mongoose`/`mongoose` khỏi `api/package.json`.
- Xóa 2 file markdown lý thuyết mồ côi `stacks.md`/`queues.md` (đã có `stacks-queues.md` đầy đủ
  hơn thay thế, đi kèm việc gộp quiz ở bug #2).
- Tiện tay sửa luôn 2 lỗi lint `any` có sẵn ở đúng 2 file đang sửa (`VisualizerShell.tsx`,
  `ChatWidget.tsx`) — không đụng tới các file không liên quan.

### Đã kiểm tra
- `web`: `npm run lint` — 5 lỗi còn lại đều là nợ kỹ thuật có sẵn từ trước (không liên quan 10 bug,
  nằm ở `ThemeToggle.tsx`, `ThemeProvider.tsx`, `page.tsx`), giảm từ 11 lỗi gốc xuống 5.
  `npm run build` — pass, toàn bộ 9 trang topic + 10 visualizer generate tĩnh thành công.
- `api`: `npm run build` — pass.
- Chạy thử `api` (không bật Ollama) + gọi trực tiếp API: endpoint visualizer trả đúng `Step[]`,
  gửi body dị dạng `{"messages":[null]}` trả đúng 400, gửi tin nhắn chat hợp lệ trả về thông báo
  lỗi thân thiện nhắc đúng `llama3` **và không treo** (xác nhận bug #3/#4/#9 đã sửa đúng).
- Mở trình duyệt thật (Playwright) kiểm tra: trang `/visualizers/stack-push-pop` load được không
  hiện banner lỗi (api chạy bình thường); trang `/topics/stacks-queues` hiện đủ 4 câu quiz đã gộp;
  `/topics/stacks` (slug cũ) trả 404 đúng như kỳ vọng.
- **Chưa xác nhận được bằng browser tự động**: luồng gửi tin nhắn qua `ChatWidget` khi tắt Ollama
  có hiện đúng bubble lỗi + badge "Mất kết nối backend" hay không — script test tự động không bắt
  được phần tử đúng lúc (có thể do timing/selector, chưa chắc là bug thật). Đã xác nhận riêng phần
  logic backend hoạt động đúng qua `curl`, nhưng **bạn nên tự mở `web` và bấm thử ChatWidget một
  lần** để chắc chắn phần UI hiển thị lỗi đúng như thiết kế.

## 2. Hiện trạng dự án

Kiến trúc không đổi so với `BAO-CAO-BAN-GIAO.md` mô tả: `web/` (Next.js 16) + `api/` (NestJS 10,
sinh bước visualizer + chatbot RAG qua Ollama). Khác biệt chính sau đợt fix này:
- Tất cả 10 visualizer giờ đồng nhất lấy dữ liệu từ backend, không còn code trùng lặp phía client.
- Có banner lỗi + nút thử lại rõ ràng khi backend không chạy, thay vì im lặng/màn hình trắng.
- Quiz hoạt động cho chương Stack & Queue (4 câu); 8 chương còn lại **vẫn chưa có câu hỏi nào**
  (chưa từng có, không phải lỗi mới).
- Repo sạch hơn: hết Mongo/docker-compose thừa, hết script hỏng, hết markdown mồ côi.

## 3. Hướng phát triển tiếp theo (chưa làm trong lượt này)

Theo đúng phạm vi đã thống nhất, các việc sau **cố tình chưa làm**, để lại cho lượt sau:

- **Nội dung**: viết thêm quiz cho 8 chương còn thiếu (`intro`, `recursion`, `lists`, `trees-1`,
  `trees-2`, `graphs-1/2/3`).
- **UX**: thêm hamburger menu cho mobile (hiện `Sidebar` chỉ hiện ở desktop, `hidden md:flex`,
  chưa có toggle nào cho mobile).
- **Tái cấu trúc (không khẩn cấp)**:
  - Gộp `InputPanel` trùng lặp giữa `stack`/`queue-linear`/`queue-circular` (~90 dòng gần giống
    hệt nhau mỗi file).
  - Gộp `calculateLayout` trùng lặp giữa `avl/Canvas.tsx` và `bst/Canvas.tsx`.
  - Thay `switch` 10 nhánh trong `api/src/visualizer/visualizer.service.ts` bằng `Record<string,
    StepGenerator>` — tiện thể xử lý dứt điểm alias `'stack-push-pop'` ↔ `'stack'` (lệch tên slug
    frontend/backend, hiện đã có case xử lý riêng nhưng là giải pháp tạm).
  - Batch hoá embedding trong `rag.service.ts` (hiện nhúng tuần tự từng đoạn văn bản trong vòng
    lặp, chặn `onModuleInit`/`app.listen`).
  - Memo hoá regex xử lý markdown trong `MarkdownRenderer.tsx`.
  - Tối ưu tra cứu O(n²) trong `avl/Canvas.tsx`.
- **Validate nghiêm túc hơn**: hiện `rag.controller.ts` chỉ có guard kiểm tra nhanh (đủ để chặn
  bug #4); nếu API được public rộng hơn, nên cân nhắc `class-validator` + DTO + `ValidationPipe`
  thật sự thay vì check tay.
- **Đồng bộ remote**: quyết định có push nhánh `main` mới (đổi tên) + xóa/rename remote branch cũ
  hay không, và thông báo cho các thành viên khác trong nhóm (Lê Thanh Tùng, Nguyễn Hải Dương,
  Nguyễn Hữu Thành) vì họ có thể đang làm việc dựa trên `origin/InitailDevelopment` hoặc
  `origin/tung`.
- **5 lỗi lint còn sót** (nợ kỹ thuật có sẵn từ trước, không phải do lượt fix này gây ra): 3 lỗi
  `react-hooks/set-state-in-effect` ở `ChatWidget.tsx`/`ThemeToggle.tsx`/`VisualizerShell.tsx`,
  2 lỗi `no-explicit-any` ở `ThemeProvider.tsx`/`page.tsx`.

## 4. Tài liệu liên quan

- `BAO-CAO-BAN-GIAO.md` — báo cáo review gốc, liệt kê chi tiết 10 bug + nợ kỹ thuật (đã xác minh
  lại toàn bộ trước khi sửa, xem mục 1 ở trên).
- `KE-HOACH-FIX-BUG.md` — checklist chi tiết từng bug, đã tick hết, có ghi chú cách làm thực tế
  nếu khác kế hoạch ban đầu.
