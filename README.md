# CSD201 - Nền tảng Trực quan hoá Cấu trúc Dữ liệu & Giải thuật

Chào mừng đến với **CSD201** - dự án mã nguồn mở dành cho sinh viên Đại học FPT và cộng đồng đam mê lập trình! 
Dự án được phát triển với sứ mệnh biến những môn học thuật toán khô khan thành trải nghiệm trực quan, dễ hiểu và thú vị.

![Thuyết minh](https://img.shields.io/badge/Course-CSD201-blue.svg) ![Next.js](https://img.shields.io/badge/Next.js-16.x-black.svg) ![NestJS](https://img.shields.io/badge/NestJS-10.x-red.svg)

## 🌟 Tính năng Nổi bật

- **Trực quan hoá Thuật toán (Algorithm Visualizer)**: Quan sát code chạy từng dòng (Step-by-step), xem sự biến đổi của Node, Stack, Queue, Tree, Graph trong thời gian thực.
- **Tài liệu Lý thuyết chuẩn VNOI**: Học lý thuyết chuyên sâu từ đệ quy cơ bản đến Cây AVL, Cây khung Kruskal, Dijkstra, v.v. Tất cả được format Markdown tuyệt đẹp với đánh giá độ phức tạp $O(N)$.
- **Giao diện Hiện đại (Modern UI/UX)**: Hỗ trợ Light/Dark mode, hiệu ứng Glassmorphism, Animation mượt mà với Tailwind CSS & Framer Motion.
- **Kiến trúc Vượt trội**: 
  - Frontend: `Next.js 16` (App Router), `React`, `Tailwind CSS`
  - Backend: `NestJS`, xử lý API tốc độ cao + chatbot RAG local qua Ollama.

## 🚀 Hướng dẫn Cài đặt & Chạy (Local Development)

Dự án gồm 3 phần cần chạy song song: **Ollama** (LLM cho chatbot), `api` (Backend NestJS), `web` (Frontend Next.js).

### 1. Chạy Ollama (bắt buộc để chatbot hoạt động)
Cài [Ollama](https://ollama.com/), sau đó tải model `llama3` (chatbot dùng model này để trả lời tiếng Việt):
```bash
ollama run llama3
```
Ollama mặc định chạy tại `http://localhost:11434`. Nếu bỏ qua bước này, phần còn lại của trang vẫn
hoạt động bình thường, chỉ riêng chatbot sẽ báo lỗi kết nối.

### 2. Chạy Backend (NestJS)
```bash
cd api
npm install
npm run start:dev
```
Backend sẽ khởi chạy tại: `http://localhost:3001`. Lần chạy đầu tiên sẽ tải model embedding và
nhúng vector cho toàn bộ tài liệu lý thuyết, có thể mất một lúc trước khi server sẵn sàng.

### 3. Chạy Frontend (Next.js)
```bash
cd web
npm install
npm run dev
```
Frontend sẽ khởi chạy tại: `http://localhost:3000`. Hãy mở link này trên trình duyệt để trải nghiệm!

Nếu backend chạy ở địa chỉ khác `http://localhost:3001`, copy `web/.env.example` thành
`web/.env.local` và chỉnh `NEXT_PUBLIC_API_URL` cho phù hợp.

## 🤝 Đóng góp (Contributing)

Dự án này là mã nguồn mở! Nếu bạn phát hiện bug, hoặc muốn thêm thuật toán mới (như Red-Black Tree, Bellman-Ford...), đừng ngần ngại tạo Pull Request (PR) hoặc báo lỗi ở tab **Issues**.

1. Fork dự án
2. Tạo nhánh tính năng (`git checkout -b feature/ThuatToanMoi`)
3. Commit thay đổi (`git commit -m 'Thêm thuật toán XYZ'`)
4. Push nhánh (`git push origin feature/ThuatToanMoi`)
5. Tạo Pull Request

---

*Phát triển bởi đội ngũ 4 thành viên: **Lê Thanh Tùng, Nguyễn Văn Gia Bình, Nguyễn Hải Dương, Nguyễn Hữu Thành**. Chúc các bạn học tốt qua môn!*
