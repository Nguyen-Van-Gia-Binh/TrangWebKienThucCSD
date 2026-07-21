# Báo cáo bàn giao: nhánh `tung` → `InitailDevelopment`

> **Mục đích tài liệu**: giúp một người/AI đang làm trên nhánh `InitailDevelopment` nắm nhanh
> những gì nhánh `tung` đã thay đổi, hiện trạng dự án, và danh sách lỗi cần sửa.
> Toàn bộ nội dung dưới đây được rút ra từ một lượt code review tự động trên diff
> `git diff InitailDevelopment...tung` (118 file, ~6.958 dòng thêm, 173 dòng xoá, không tính lockfile).
>
> Mọi số hiệu dòng đều đã được kiểm chứng bằng cách đọc file thật, không phải suy đoán.

---

## 1. Nhánh `tung` đã thay đổi kiến trúc như thế nào

Đây là thay đổi lớn nhất và là gốc rễ của phần lớn lỗi bên dưới:

**Trước (`InitailDevelopment`)**: web là ứng dụng Next.js độc lập. Visualizer tính toán các bước
hoạt hình **ngay trên client** bằng `mod.generateSteps(input)`. Không cần backend.

**Sau (`tung`)**: dự án tách thành 2 service:

| Thành phần | Công nghệ | Cổng | Vai trò |
|---|---|---|---|
| `web/` | Next.js 16.2.10, React 19, Tailwind 4, framer-motion | 3000 | Giao diện |
| `api/` | NestJS 10 | 3001 | Sinh bước visualizer + RAG chatbot |
| Ollama | chạy ngoài | 11434 | LLM cho chatbot (model `llama3`) |
| MongoDB | docker-compose | 27017 | **Đã khai báo nhưng chưa dùng tới** |

Những thứ nhánh `tung` thêm mới:

- **`api/src/visualizer/`** — 10 thuật toán sinh bước phía server:
  `avl, bst, dijkstra, graph, kruskal, queue-circular, queue-linear, recursion, sll, stack`.
  Mỗi thuật toán có `*.generateSteps.ts` + `*.pseudocode.ts`.
- **`api/src/rag/`** — chatbot RAG chạy hoàn toàn local:
  - Embedding: `Xenova/paraphrase-multilingual-MiniLM-L12-v2` qua `@xenova/transformers` (bản quantized, chạy CPU).
  - Vector store: mảng trong RAM (`private chunks: DocumentChunk[]`), dựng lại mỗi lần khởi động.
  - Nguồn tri thức: **backend đọc trực tiếp thư mục markdown của frontend**
    (`rag.service.ts:43` → `../../../web/src/content/theories`). Đây là một ràng buộc chéo
    giữa 2 service, cần lưu ý khi deploy tách rời.
  - LLM: Ollama model `llama3`.
- **`web/`** — 10 thư mục visualizer trong `web/src/features/visualizers/*`
  (mỗi thư mục: `Canvas.tsx`, `InputPanel.tsx`, `generateSteps.ts`, `meta.ts`, `pseudocode.ts`),
  `ChatWidget`, `QuizSection`, `MarkdownRenderer`, `Sidebar`, `ThemeToggle`/`ThemeProvider`,
  11 file lý thuyết markdown, `quizzes.json`.

### Hợp đồng API giữa web và api

```
POST http://localhost:3001/visualize/:algorithm/generate
  body: { ops: any[] }
  trả về: Step[]   (mảng; mỗi step có state, action, pseudocodeLine, highlights, note)

POST http://localhost:3001/chat
  body: { messages: [...] }   ← dùng useChat của thư viện `ai` v3
  trả về: text stream
```

CORS đang mở toàn bộ (`app.enableCors({ origin: '*' })` trong `api/src/main.ts`).

### Cách chạy (đã đổi so với README)

README hiện tại **còn thiếu bước Ollama** và vẫn ghi Next.js 14 (thực tế là 16.2.10).
Quy trình đúng hiện nay là 3 tiến trình:

```bash
# 1. Ollama (bắt buộc, nếu muốn dùng chatbot)
ollama run llama3

# 2. Backend
cd api && npm install && npm run start:dev      # → localhost:3001

# 3. Frontend
cd web && npm install && npm run dev            # → localhost:3000
```

Lần chạy `api` đầu tiên sẽ **tải model embedding về máy** và **nhúng vector cho toàn bộ file
markdown ngay trong `onModuleInit`** — server chặn ở bước này trước khi `listen`, nên khởi động
lần đầu sẽ chậm đáng kể.

---

## 2. Hiện trạng: cái gì xong, cái gì còn dở

**Đã hoạt động** (khi chạy đủ 3 tiến trình ở trên, trên máy local):
- 10 visualizer sinh bước từ backend.
- Chatbot RAG trả lời tiếng Việt dựa trên nội dung lý thuyết.
- Dark/light mode, sidebar, trang lý thuyết render markdown.

**Còn dở dang** — đây là phần cần AI tiếp nhận xử lý trước tiên:

1. **Việc chuyển visualizer từ client sang server mới làm được một nửa.**
   6/10 module đã dọn sạch (`generateSteps: () => [], // Handled by API`),
   nhưng 4-5 module (`bst`, `sll`, `stack`, `queue-linear`, `queue-circular`) **vẫn giữ nguyên
   bản cài đặt client đầy đủ**, giống hệt bản backend đến từng byte (chỉ khác đường dẫn import).
   Đây là 2 nguồn sự thật cho cùng một thuật toán.
2. **Không có biến môi trường nào cho URL backend.** Toàn bộ repo không có file `.env*`,
   không có tham chiếu `NEXT_PUBLIC_` nào, `next.config.ts` rỗng (không có rewrites/proxy).
3. **Quiz đang chết hoàn toàn** do lệch khoá slug (chi tiết ở lỗi #2).
4. **MongoDB khai báo trong docker-compose nhưng chưa có code nào dùng.**
   `docker-compose.yml` cũng chỉ có mongodb, **không có service `web`/`api`**.

---

## 3. Danh sách lỗi cần sửa (xếp theo mức độ nghiêm trọng)

### 🔴 #1 — Toàn bộ visualizer chết ngoài môi trường local
**File**: `web/src/components/visualizer/VisualizerShell.tsx:31`

URL backend bị hardcode:
```ts
fetch(`http://localhost:3001/visualize/${slug}/generate`, { ... })
```
Trước đây dòng này là `const steps = useMemo(() => mod.generateSteps(input), [mod, input]);`
— chạy hoàn toàn client, không cần backend.

**Hậu quả**: ai chỉ chạy `npm run dev` trong `web/` (rất dễ xảy ra vì `api/` còn cần cả Ollama),
hoặc bất kỳ bản deploy nào, đều thấy **cả 10 visualizer** hiện "Không có dữ liệu mô phỏng".
Riêng visualizer `stack` trước đây chạy được mà không cần backend, giờ cũng hỏng theo.
Khối `catch` (dòng 43-49) đặt `state: {}`, mà điều kiện render ở dòng 107 lại là
`Object.keys(engine.current.state || {}).length > 0`, nên thông báo lỗi bị nuốt luôn —
người dùng không biết là do backend.

**Hướng sửa**: đưa origin ra biến môi trường (`NEXT_PUBLIC_API_URL`) với giá trị mặc định
`http://localhost:3001`, hoặc thêm `rewrites` trong `next.config.ts` để proxy qua same-origin.
Cân nhắc thêm: giữ `mod.generateSteps` làm fallback client khi fetch lỗi — code vẫn còn sẵn đó.

---

### 🔴 #2 — Tính năng Quiz chết trên mọi chương
**File**: `web/src/data/quizzes.json:2` và `:18`

`quizzes.json` chỉ có đúng 2 khoá: `"stacks"` và `"queues"`.
Nhưng nhánh `tung` đã gộp 2 chương này thành một: `chapters.ts:11` giờ là `{ slug: "stacks-queues" }`.
Trang chương tra cứu bằng `quizzesData[chapter.slug]` (`page.tsx:85`), và
`QuizSection.tsx:24` trả về `null` khi mảng rỗng.

**Hậu quả**: không khoá nào trong `quizzes.json` khớp với 9 slug hiện có
(`intro, recursion, lists, stacks-queues, trees-1, trees-2, graphs-1, graphs-2, graphs-3`).
Cả 4 câu hỏi quiz không bao giờ hiển thị, trên **mọi** chương.

**Hướng sửa**: gộp 2 khoá `"stacks"` + `"queues"` trong `quizzes.json` thành `"stacks-queues"`.
Nên bổ sung luôn quiz cho 8 chương còn lại vì hiện chưa có.

---

### 🔴 #3 — Request chatbot bị treo không hồi đáp khi embedding lỗi
**File**: `api/src/rag/rag.service.ts:114`

`chatStream` bắt đầu ở dòng 112, gọi `await this.retrieve(query, 3)` ngay dòng 114,
nhưng khối `try {` mãi dòng 142 mới mở — tức là sau cả `res.setHeader(...)` (dòng 139-140).
Khối `catch` (163-168) chỉ bao được lời gọi Ollama.

**Hậu quả**: `retrieve()` chỉ kiểm tra `if (!this.extractor) return []`, còn lại gọi
`await this.extractor(query, {...})` không bảo vệ. Vì controller dùng `@Res()`, khi lỗi thoát ra
ngoài `chatStream` thì **không có response nào được ghi** — client treo hoặc bị reset kết nối,
thay vì nhận thông báo lỗi tiếng Việt thân thiện mà code rõ ràng có ý định trả về.

**Hướng sửa**: mở `try` từ trước lời gọi `retrieve()`, hoặc bọc riêng `retrieve()` và cho phép
trả về `[]` khi lỗi để chatbot vẫn trả lời (không có ngữ cảnh) thay vì chết hẳn.

---

### 🟠 #4 — Body request dị dạng làm sập handler (500 thay vì 400)
**File**: `api/src/rag/rag.controller.ts:15`

Guard ở dòng 11-13 chỉ kiểm tra `!messages || messages.length === 0`.
Dòng 15: `const latestMessage = messages[messages.length - 1].content;`

**Hậu quả**: body `{"messages":[null]}` vượt qua guard (length = 1), rồi `null.content` ném TypeError.
Không có lớp bảo vệ nào chặn trước: `main.ts` không gọi `useGlobalPipes`, `app.module.ts` không
khai báo `APP_PIPE`/`APP_FILTER`, không có DTO nào, và `class-validator` **không phải** dependency thật
(chỉ xuất hiện như optional peer trong lockfile). Client nhận 500 thay vì 400.
Trường hợp `{"messages":[{}]}` còn tệ hơn: `query` thành `undefined` và rơi thẳng vào lỗi #3.

**Hướng sửa**: cài `class-validator` + `class-transformer`, tạo DTO cho `/chat`, bật
`app.useGlobalPipes(new ValidationPipe({ whitelist: true }))`. Cách nhanh hơn: kiểm tra
`typeof latestMessage === 'string' && latestMessage.trim()` trước khi gọi service.

---

### 🟠 #5 — Chatbot im lặng khi mất kết nối, không báo lỗi gì
**File**: `web/src/components/chat/ChatWidget.tsx:28`

```ts
const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
  api: "http://localhost:3001/chat",
  initialMessages: initialMessages,
});
```

Hai vấn đề cùng lúc: URL hardcode (như #1), và **`error` không được lấy ra** từ `useChat`,
cũng không truyền `onError`. Toàn bộ file 181 dòng không có chỗ nào render lỗi.

**Hậu quả**: khi backend/Ollama không chạy, tin nhắn người dùng hiện lên, `isLoading` tắt,
rồi... không có gì cả. Header vẫn hiển thị cứng `● Local AI Online`. Tệ hơn: effect lưu trữ
(dòng 33-37) ghi `messages` vào localStorage vô điều kiện, nên tin nhắn cụt (không có phản hồi)
bị lưu vĩnh viễn và load lại ở lần mở sau.

**Hướng sửa**: lấy `error` từ `useChat`, render một bubble lỗi; cho badge trạng thái phản ánh
kết nối thật; chỉ ghi localStorage khi lượt trả lời hoàn tất.

---

### 🟠 #6 — Fetch visualizer không kiểm tra `res.ok`
**File**: `web/src/components/visualizer/VisualizerShell.tsx:36`

`.then((res) => res.json())` bỏ qua status code.

**Hậu quả**: response 404/500 kèm body JSON vẫn resolve bình thường. `Array.isArray(data)`
khi đó false → `setSteps([])` với `isLoading` đã tắt. UI đứng ở "Không có dữ liệu mô phỏng",
và **thậm chí dòng log "Error connecting to backend" cũng không xuất hiện** — endpoint sai
đường dẫn trông y hệt như dữ liệu rỗng. Rất khó debug.

**Hướng sửa**: `if (!res.ok) throw new Error(...)` trước khi `.json()`.

---

### 🟡 #7 — Mất subset font tiếng Việt trên trang toàn tiếng Việt
**File**: `web/src/app/layout.tsx:12` (font chữ chính) và `:17` (font mono)

Diff đổi `Inter({ subsets: ["latin", "vietnamese"] })` → `Outfit({ subsets: ["latin"] })`,
và JetBrains_Mono cũng bị rút còn `["latin"]`.

**Hậu quả**: trang là `<html lang="vi">`, nội dung 100% tiếng Việt. Subset `latin` của Google
không bao gồm dải Unicode tiếng Việt (U+1EA0-1EF9, U+0102/0110), nên các ký tự `ạ ệ ừ ố`
rơi về font hệ thống theo từng ký tự → chữ bị lệch font loang lổ ở tiêu đề, nội dung và code block.

**Lưu ý quan trọng khi sửa**: font `Outfit` **không hề có** subset `vietnamese`
(đã kiểm tra `font-data.json` của next/font — Outfit chỉ có `latin`, `latin-ext`),
nên thêm `"vietnamese"` vào Outfit sẽ **lỗi lúc build**. Phải đổi sang font có hỗ trợ tiếng Việt
(Inter, Be Vietnam Pro, Nunito Sans...). Riêng JetBrains_Mono dòng 17 thì có subset `vietnamese`,
sửa lại là xong.

---

### 🟡 #8 — Thao tác NaN lọt vào visualizer danh sách liên kết
**File**: `web/src/features/visualizers/sll/InputPanel.tsx:15`, `:21`, `:27`

```ts
setOps([...ops, { type: "insertHead", value: parseInt(headValue, 10) }])
```
Không có guard nào cả. Ô input rỗng → `parseInt("", 10)` = `NaN` → op NaN được đẩy vào hàng đợi.

**Hậu quả**: visualizer hiển thị `NaN`, mọi phép so sánh với nó đều false.

**Hướng sửa**: các panel `stack`, `queue-linear`, `queue-circular` đã làm đúng ở dòng 39
(`if (!Number.isNaN(v))`) — áp dụng đúng mẫu đó. (Các panel `bst`/`avl` an toàn nhờ
`<input type="number">` cộng guard truthy, không cần sửa.)

---

### 🟡 #9 — Thông báo lỗi chỉ sai model
**File**: `api/src/rag/rag.service.ts:165`

Dòng 145 gọi `model: 'llama3'` (kèm comment giải thích đã bỏ phi3 vì "phi3 quá yếu Tiếng Việt"),
nhưng khối catch dòng 165 lại in:
`"Vui lòng đảm bảo bạn đã chạy \`ollama run phi3\`"`

**Hậu quả**: người dùng đã bật Ollama nhưng chưa pull `llama3` sẽ rơi vào catch này,
làm đúng theo hướng dẫn (pull phi3) và **vẫn hỏng**. Grep toàn repo chỉ có 2 chỗ nhắc `phi3`,
đều trong file này.

**Hướng sửa**: đổi chuỗi thành `llama3`. Tốt hơn: nội suy từ hằng số tên model để không lệch lần nữa.

---

### 🟡 #10 — Code chết: 2 nguồn sự thật cho cùng thuật toán
**File**: `web/src/features/visualizers/bst/generateSteps.ts:23` (và các file tương tự)

`VisualizerShell` không còn gọi `mod.generateSteps` nữa, nhưng 5 module `bst`, `sll`, `stack`,
`queue-linear`, `queue-circular` **vẫn export bản cài đặt đầy đủ** và vẫn nối qua `meta.ts`.
Chạy `diff` giữa `web/src/features/visualizers/stack/generateSteps.ts` và
`api/src/visualizer/algorithms/stack.generateSteps.ts` cho thấy chúng **giống hệt nhau từng byte**,
chỉ khác đường dẫn import.

**Hậu quả**: sửa một lỗi thuật toán phải sửa ở 2 cây thư mục; rất dễ sửa một bên quên bên kia.
Bản chết vẫn nằm trong bundle client.

**Hướng sửa**: chọn một trong hai hướng và làm dứt điểm —
(a) xoá bản client, để `generateSteps: () => []` như 6 module kia đã làm; hoặc
(b) giữ bản client làm fallback offline thật sự và cho `VisualizerShell` dùng khi fetch lỗi.
Nếu chọn (a), nên đổi `generateSteps` thành optional trong `web/src/lib/types.ts:42`.

---

## 4. Nợ kỹ thuật khác (không phải bug chặn, nhưng nên dọn)

| Vấn đề | Vị trí | Ghi chú |
|---|---|---|
| Script hỏng hoàn toàn | `web/scripts/fix-math.js:4` | Đường dẫn hardcode `D:\Ki4_Summer_2026\...`; `path.join` coi `'d:'` là tên thư mục thường nên **hỏng trên mọi máy**, kể cả máy tác giả. Chạy thử → `ENOENT`. Không được tham chiếu ở đâu (grep `fix-math` = 0 kết quả). Nên xoá hoặc sửa thành `path.join(__dirname, '..', 'src', 'content', 'theories')`. |
| Không có nav trên mobile | `Header.tsx` / `Sidebar.tsx:24` | Nav bị chuyển hết vào Sidebar `hidden md:flex` (chỉ desktop). Không có component hamburger nào trong repo. Người dùng mobile vẫn tới được 3 mục chính qua Footer (không bị chặn breakpoint), nhưng 8 lối tắt chương thì mất. |
| Embedding tuần tự lúc khởi động | `rag.service.ts:59` | Nhúng từng chunk một trong vòng lặp `for`, chặn `onModuleInit` → chặn `app.listen`. Transformers.js nhận cả mảng: gọi theo batch sẽ nhanh hơn nhiều. |
| Ghi localStorage mỗi token | `ChatWidget.tsx:35` | Effect chạy theo `messages`, mà `messages` đổi theo từng token stream → serialize toàn bộ hội thoại hàng chục lần mỗi câu trả lời. |
| Tra cứu O(n²) khi layout cây | `avl/Canvas.tsx:23` | `nodesArr.find(...)` cho mỗi node, chạy lại mỗi bước hoạt hình. Dùng `Map` là xong. |
| Không memo hoá regex markdown | `MarkdownRenderer.tsx:8` | Chuỗi 4-5 lệnh `.replace()` chạy lại mỗi lần render. Bọc `useMemo(..., [content])`. |
| `switch` 10 nhánh để dispatch | `visualizer.service.ts:12-30` | Thêm thuật toán thứ 11 phải sửa file dùng chung. Thay bằng `Record<string, StepGenerator>`. Có cả case alias `'stack-push-pop'` → `'stack'` do lệch tên slug giữa FE/BE. |
| Layout cây trùng lặp | `avl/Canvas.tsx:14` ↔ `bst/Canvas.tsx:14` | `calculateLayout` gần như giống hệt. Nên tách ra `web/src/lib`. |
| InputPanel trùng lặp | `stack`, `queue-linear`, `queue-circular` | ~90 dòng gần như giống hệt (cùng chuỗi class `smallBtn`, cùng `MAX_OPS=30`). |
| README lỗi thời | `README.md:6,14` | Ghi Next.js 14 (thật ra 16.2.10), thiếu hoàn toàn bước cài Ollama + model `llama3`. |
| File markdown mồ côi | `web/src/content/theories/` | `stacks.md` và `queues.md` vẫn còn sau khi slug gộp thành `stacks-queues.md` → link cũ `/topics/stacks`, `/topics/queues` giờ 404. |
| MongoDB chưa dùng | `docker-compose.yml` | Đã khai báo service + `@nestjs/mongoose` đã cài, nhưng chưa có code nào kết nối. docker-compose cũng chưa có service `web`/`api`. |

---

## 5. Những giả thuyết ĐÃ ĐƯỢC KIỂM CHỨNG LÀ KHÔNG PHẢI LỖI

Ghi lại để người tiếp nhận **không mất công đi "sửa" những chỗ vốn đã đúng**:

1. **`ChatWidget` load lịch sử từ localStorage** — *không lỗi*. Ban đầu nghi `initialMessages`
   set sau lần render đầu sẽ không tới được `useChat`. Kiểm chứng trong `swr@2.4.2`: `data` được
   tính lại từ `fallbackData` ở **mỗi lần render** khi cache rỗng (và cache luôn rỗng vì `useChat`
   truyền fetcher `null`), nên lịch sử vẫn hiện đúng.
2. **`bst/Canvas.tsx` crash với cây rỗng** — *không lỗi*. Đã có guard `if (!rootId) return layout;`
   ở dòng 16, chặn trước khi tới `Math.min(...)`.
3. **Điều kiện render `Object.keys(state).length > 0`** — *không lỗi*. Không generator nào sinh
   state rỗng ở bước 0 (stack luôn có `{cells, top, capacity}`), nên stack/queue rỗng vẫn render đúng.
4. **`defaultTheme="dark"` + `enableSystem={false}`** — *là quyết định thiết kế có chủ đích*,
   không phải bug. Cả hệ thống `.dark` class, biến CSS và `ThemeToggle` được thêm cùng lúc;
   next-themes vẫn lưu lựa chọn của người dùng vào localStorage.
5. **Vi phạm quy ước Next.js** — không có. Đã đối chiếu diff với
   `node_modules/next/dist/docs/.../version-16.md`: không dùng API nào đã deprecated
   (`next/legacy/image`, `images.domains`, `getServerSideProps`, `next/router`, v.v.).

---

## 6. Thứ tự đề xuất khi bắt tay vào việc

1. Sửa #2 (quiz) — nhanh, chỉ sửa file JSON, khôi phục ngay một tính năng.
2. Sửa #1 + #5 + #6 — đưa URL backend ra env, thêm xử lý lỗi hai đầu. Đây là nhóm chặn deploy.
3. Sửa #3 + #4 — làm cứng đường lỗi phía backend.
4. Sửa #7 + #8 + #9 — các lỗi nhỏ, độc lập, dễ làm song song.
5. Quyết định dứt điểm #10 (giữ hay bỏ bản client) rồi mới dọn nợ kỹ thuật ở mục 4.

**Lưu ý khi merge**: chưa có test tự động nào trong repo (`api/` có `@nestjs/testing` nhưng không có
file test, `web/` không có test runner). Mọi thay đổi cần kiểm tra thủ công bằng cách chạy đủ
3 tiến trình và bấm thử từng visualizer.
