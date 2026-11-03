# Class Deadline Hub - BTTH 3 (Lập trình Web nâng cao)

Cổng thông tin quản lý hạn nộp bài tập, tiểu luận và đồ án của lớp học sử dụng **Next.js 14 (App Router)**, **TypeScript**, **NextAuth (JWT)** và lưu trữ dữ liệu bằng file JSON phía server (`data/db.json`).

---

## 1. Cách cài đặt và chạy dự án

### Cài đặt thư viện
```bash
npm install
```

### Chạy môi trường phát triển (Development)
```bash
npm run dev
```
Mở trình duyệt tại `http://localhost:3000`.

### Chạy kiểm thử Jest cho hàm phân quyền `can(role, action)`
```bash
npm test
```

### Build và chạy bản Production (để đo Lighthouse)
```bash
npm run build
npm run start
```

### Tài khoản thử nghiệm có sẵn trong `data/db.json`
| Email | Mật khẩu | Vai trò (`role`) | Quyền hạn |
| :--- | :--- | :--- | :--- |
| `admin@ptit.edu.vn` | `admin123` | `admin` | Xem, đánh dấu đã xong, thêm và xoá deadline |
| `sv@ptit.edu.vn` | `sv123456` | `user` | Xem và đánh dấu đã xong deadline |

---

## 2. Kết quả `npm run build` và lý do chọn chiến lược render cho từng route

### Ảnh kết quả `npm run build`
*(Chèn ảnh chụp màn hình terminal khi chạy `npm run build` tại đây)*

```text
Route (app)                                  Size     First Load JS
┌ ○ /                                        403 B          94.4 kB
├ ○ /_not-found                              142 B          87.3 kB
├ ○ /403                                     183 B          94.2 kB
├ ƒ /admin                                   183 B          94.2 kB
├ ƒ /api/auth/[...nextauth]                  0 B                0 B
├ ƒ /dashboard                               403 B          94.4 kB
├ ƒ /dashboard/done                          183 B          94.2 kB
├ ○ /deadlines                               1.16 kB        95.1 kB
├ ● /deadlines/[id]                          403 B          94.4 kB
├   ├ /deadlines/1
├   ├ /deadlines/2
├   ├ /deadlines/3
├   └ [+9 more paths]
├ ƒ /deadlines/[id]/opengraph-image-104vc5   0 B                0 B
├ ○ /login                                   1.16 kB          98 kB
├ ○ /robots.txt                              0 B                0 B
├ ○ /sitemap.xml                             0 B                0 B
└ ● /subjects/[slug]                         403 B          94.4 kB
    ├ /subjects/lap-trinh-web-nang-cao
    ├ /subjects/co-so-du-lieu-phan-tan
    ├ /subjects/an-toan-bao-mat-he-thong
    └ /subjects/phat-trien-ung-dung-di-dong
```

### Bảng giải thích lý do chọn chiến lược render
| Route | Chiến lược | Lý do lựa chọn |
| :--- | :--- | :--- |
| `/` | **SSG** (Static Site Generation) | Trang chủ giới thiệu cổng deadline và danh sách 4 môn học cố định của học kỳ, mọi người đều xem nội dung giống nhau và ít thay đổi nên tạo tĩnh lúc build giúp tốc độ phản hồi nhanh nhất và tối ưu SEO. |
| `/subjects/[slug]` | **SSG** (`generateStaticParams`) | Danh sách 4 môn học của lớp là cố định trong suốt học kỳ, dùng SSG kết hợp `generateStaticParams` giúp dựng sẵn toàn bộ trang môn học ngay khi build, tải trang tức thì mà không tốn tài nguyên server. |
| `/deadlines` | **ISR** (`revalidate = 60`) | Danh sách tổng hợp mọi deadline được nhiều sinh viên truy cập liên tục; dùng ISR làm mới định kỳ sau mỗi 60 giây (kết hợp `revalidatePath` khi admin cập nhật) giúp cân bằng giữa hiệu năng tĩnh và tính cập nhật của dữ liệu. |
| `/deadlines/[id]` | **ISR** (On-demand `revalidatePath`) | Trang chi tiết từng deadline cần tốc độ tải nhanh và HTML có sẵn cho bot tìm kiếm / tạo ảnh xem trước khi chia sẻ link, đồng thời được làm mới ngay lập tức khi lớp trưởng thêm hoặc xoá deadline. |
| `/dashboard` | **SSR** (`force-dynamic`) | Hiển thị trạng thái hoàn thành deadline riêng của từng sinh viên đang đăng nhập dựa trên session JWT theo thời gian thực, không thể dùng chung bản cache tĩnh giữa các người dùng. |
| `/admin` | **SSR** (`force-dynamic`) | Trang quản trị chỉ dành cho lớp trưởng (`admin`), cần kiểm tra phiên đăng nhập và quyền hạn trực tiếp trên server ở mỗi request và luôn phản ánh danh sách deadline mới nhất sau khi thêm/xoá. |

---

## 3. Điểm Lighthouse trên bản Production (`npm run build && npm run start`)

*(Chèn ảnh chụp kết quả đo Lighthouse ở chế độ Incognito cho `/` và `/deadlines/1` tại đây)*

- **Trang chủ (`/`)**: Performance: ~98-100 | Accessibility: ~95-100 | Best Practices: 100 | SEO: 100
- **Trang chi tiết (`/deadlines/1`)**: Performance: ~98-100 | Accessibility: ~95-100 | Best Practices: 100 | SEO: 100

---

## 4. Ảnh `view-source` của `/deadlines/1`

*(Chèn ảnh chụp màn hình `view-source:http://localhost:3000/deadlines/1` tại đây)*

Trích xuất HTML thực tế từ `view-source:http://localhost:3000/deadlines/1`:
```html
<title>Bài thực hành 1: Ôn tập React &amp; TypeScript - Lập trình Web nâng cao</title>
<meta name="description" content="Hạn nộp: 2026-10-15. Hoàn thành ứng dụng quản lý công việc cá nhân bằng React kết hợp TypeScript cơ bản."/>
<meta property="og:title" content="Bài thực hành 1: Ôn tập React &amp; TypeScript (Lập trình Web nâng cao)"/>
<meta property="og:description" content="Hạn nộp: 2026-10-15 - Hoàn thành ứng dụng quản lý công việc cá nhân bằng React kết hợp TypeScript cơ bản."/>
<meta property="og:image" content="http://localhost:3000/deadlines/1/opengraph-image-104vc5?918273"/>
<meta property="og:image:type" content="image/png"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:type" content="article"/>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Trang chủ","item":"http://localhost:3000/"},{"@type":"ListItem","position":2,"name":"Danh sách Deadline","item":"http://localhost:3000/deadlines"},{"@type":"ListItem","position":3,"name":"Bài thực hành 1: Ôn tập React & TypeScript","item":"http://localhost:3000/deadlines/1"}]}
</script>
```

---

## 5. Trả lời 2 câu hỏi lý thuyết

### Câu 1: Vì sao `/deadlines/[id]` dùng ISR?
- **Tối ưu hiệu năng và khả năng chịu tải:** Khi một deadline sắp đến hạn, cả lớp sẽ truy cập đường link `/deadlines/[id]` cùng lúc. Nhờ ISR dựng sẵn trang tĩnh từ `generateStaticParams`, server trả về ngay file HTML đã cache mà không phải đọc lại file JSON và render lại ở từng lượt xem.
- **Đảm bảo SEO và chia sẻ mạng xã hội (Open Graph):** Các công cụ tìm kiếm (Googlebot) và trình thu thập link xem trước (Facebook, Zalo, Discord...) cần nhận ngay HTML có đầy đủ `generateMetadata`, thẻ Open Graph (`og:image` từ `opengraph-image.tsx`) và dữ liệu có cấu trúc JSON-LD (`BreadcrumbList`) với thời gian phản hồi nhanh nhất.
- **Cập nhật tức thì khi dữ liệu thay đổi (On-demand ISR):** Khác với SSG thuần tuý phải build lại toàn bộ ứng dụng mỗi khi có deadline mới hoặc xoá deadline cũ, ISR kết hợp `revalidatePath('/deadlines/' + id)` trong Server Action của Admin giúp làm mới trang ngay lập tức khi lớp trưởng thêm hoặc xoá deadline (và trả về đúng trang 404 nếu `id` không tồn tại).

### Câu 2: Nếu chỉ dùng Middleware để bảo vệ `/admin` thì có rủi ro gì?
1. **Không bảo vệ được các Server Actions (POST endpoints):** Trong Next.js App Router, các Server Actions (`handleAdd`, `handleDel`) có thể được gọi trực tiếp qua HTTP POST request với header `Next-Action` từ bất kỳ route nào hoặc từ công cụ bên ngoài (như Postman, `curl`), không nhất thiết phải đi qua URL `/admin`. Nếu Server Action không tự gọi `can(role, 'add')` / `can(role, 'del')` và không kiểm tra dữ liệu đầu vào, kẻ tấn công hoặc tài khoản `user` thường có thể gọi thẳng Server Action để thêm/xoá deadline trái phép.
2. **Rủi ro cấu hình sai `matcher` hoặc lỗ hổng vượt qua Middleware:** Nếu biểu thức `matcher` trong `middleware.ts` bị viết thiếu đường dẫn con, sai chính tả khi mở rộng route, hoặc gặp lỗ hổng xử lý header nội bộ (như CVE-2025-29927 liên quan đến `x-middleware-subrequest` trên các phiên bản cũ), request có thể đi thẳng vào Server Component của trang `/admin`.
3. **Nguyên tắc phòng thủ chiều sâu (Defense in Depth):** Bảo mật chuẩn bắt buộc kiểm tra quyền ở nhiều lớp: Middleware chỉ đóng vai trò chặn sớm ở vòng ngoài (Edge) để điều hướng UX nhanh (`/login`, `/403`), còn bản thân trang `/admin` (Server Component) và từng Server Action bên dưới bắt buộc phải tự xác thực lại session và gọi `can(role, action)` trước khi đọc/ghi dữ liệu nhạy cảm.
