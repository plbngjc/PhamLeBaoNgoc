# Bản xuất cuộc trò chuyện

## Người dùng

Hãy tạo cho tôi một web app "TODO app: chương trình quản lý các task cá nhân" bằng Node.js. Tạo toàn bộ project trong thư mục `todoapp` nằm trong folder `Backend`.

### Công nghệ

- Backend: Node.js + Express
- Database: SQLite (dùng thư viện better-sqlite3), file db tự tạo khi chạy lần đầu
- Frontend: HTML + CSS + JavaScript thuần, đặt trong thư mục public/, Express phục vụ file tĩnh
- Giao diện toàn bộ bằng tiếng Việt, responsive, dùng được trên điện thoại

### Database

Bảng tasks gồm: id (tự tăng), title (bắt buộc), due_date (YYYY-MM-DD), priority (high/medium/low), category, done (0/1), done_at (ngày hoàn thành, null nếu chưa xong), created_at.

### REST API

- GET /api/tasks?date=&q=&status=&priority= (lọc theo ngày, tìm kiếm theo title/category, trạng thái, mức ưu tiên)
- POST /api/tasks
- PUT /api/tasks/:id
- PATCH /api/tasks/:id/toggle (đánh dấu xong/chưa xong)
- DELETE /api/tasks/:id
- GET /api/stats (tổng task, số đã xong, số chưa xong, số quá hạn, tỷ lệ hoàn thành, số task theo từng ngày trong 7 ngày gần nhất, thống kê theo priority và theo category)
- POST /api/mock (nạp data mock)
- Có validate dữ liệu đầu vào và trả lỗi JSON rõ ràng.

### Giao diện (2 trang)

1. **Trang "Hôm nay":** Hiển thị task đến hạn hôm nay, chuyển sang xem tất cả task, tìm kiếm/lọc, thêm/sửa/xóa bằng modal hoặc form, xác nhận trước khi xóa, checkbox hoàn thành, task quá hạn màu đỏ và trạng thái rỗng rõ ràng.
2. **Trang "Thống kê":** Thẻ số liệu tổng quan, biểu đồ cột 7 ngày gần nhất, thống kê theo mức ưu tiên và nhóm; có nút nạp khoảng 15 task mẫu và nút xóa toàn bộ.

### Yêu cầu khác

- Cấu trúc: server.js, db.js, routes/, public/ (index.html, stats.html, css/, js/)
- package.json có script start và dev (nodemon)
- Có .gitignore (node_modules, file .db)
- README.md tiếng Việt mô tả chức năng, công nghệ, cài đặt, API và cấu trúc thư mục
- Comment ngắn bằng tiếng Việt, tên biến rõ ràng
- Sau khi tạo xong, chạy thử và báo địa chỉ truy cập.

## Trợ lý

Đã tạo ứng dụng trong thư mục `todoapp`, gồm backend Express + SQLite, giao diện tiếng Việt responsive, trang thống kê và README tiếng Việt.

Ứng dụng chạy tại http://localhost:3000; trang thống kê tại http://localhost:3000/stats.html.

Đã kiểm tra hai trang tải thành công và thử API CRUD, lọc, xác thực dữ liệu, thống kê, nạp mock và xóa toàn bộ.

## Người dùng

Chạy lại localhost đi, nếu tôi gõ lệnh trên terminal thì gõ như thế nào để chạy?

## Trợ lý

Localhost đã chạy lại và trả về HTTP 200: http://localhost:3000.

Để tự chạy trong PowerShell hoặc terminal VS Code:

```powershell
cd "C:\Users\ADMIN\OneDrive\Desktop\Backend\todoapp"
npm.cmd start
```

Nếu đây là lần đầu chạy, cài thư viện trước bằng `npm.cmd install`. Khi server chạy, giữ cửa sổ terminal mở và truy cập http://localhost:3000.
