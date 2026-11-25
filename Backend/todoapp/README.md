# Việc của tôi — ứng dụng quản lý task

Ứng dụng TODO cá nhân với giao diện tiếng Việt, tương thích điện thoại. Bạn có thể quản lý task theo ngày, tìm kiếm/lọc task, đánh dấu hoàn thành và xem thống kê tiến độ.

## Công nghệ

- Backend: Node.js, Express
- Cơ sở dữ liệu: SQLite với `better-sqlite3` (tự tạo file `todoapp.db` khi khởi chạy lần đầu)
- Frontend: HTML, CSS và JavaScript thuần; Express phục vụ nội dung trong `public/`

## Cài đặt và chạy

Yêu cầu Node.js 18 trở lên.

```bash
npm install
npm start
```

Mở [http://localhost:3000](http://localhost:3000). Trong quá trình phát triển có thể dùng `npm run dev` để tự khởi động lại server khi mã nguồn thay đổi.

## Chức năng

- Trang **Hôm nay** hiển thị task đến hạn hôm nay, hoặc chuyển sang toàn bộ task; tìm kiếm theo tên/nhóm, lọc trạng thái/mức ưu tiên và thêm, sửa, xóa task.
- Task quá hạn được đánh dấu màu đỏ; checkbox cập nhật trạng thái và thời điểm hoàn thành.
- Trang **Thống kê** hiển thị tổng số task, task đã xong/chưa xong/quá hạn, tỷ lệ hoàn thành, biểu đồ 7 ngày, thống kê mức ưu tiên và nhóm.
- Nạp dữ liệu mẫu (16 task trải trên tuần gần nhất và vài ngày sắp tới) hoặc xóa toàn bộ task.

## REST API

| Phương thức | Đường dẫn | Mô tả |
|---|---|---|
| `GET` | `/api/tasks?date=&q=&status=&priority=` | Lọc task theo ngày, tìm kiếm tên/nhóm, trạng thái (`all`, `done`, `pending`) và mức ưu tiên (`high`, `medium`, `low`) |
| `POST` | `/api/tasks` | Tạo task |
| `PUT` | `/api/tasks/:id` | Cập nhật task |
| `PATCH` | `/api/tasks/:id/toggle` | Đảo trạng thái hoàn thành |
| `DELETE` | `/api/tasks/:id` | Xóa task |
| `DELETE` | `/api/tasks/clear` | Xóa toàn bộ task (được dùng bởi nút trên trang thống kê) |
| `GET` | `/api/stats` | Lấy tổng quan và thống kê |
| `POST` | `/api/tasks/mock` | Nạp bộ dữ liệu mẫu (các task trùng ngày và tiêu đề được bỏ qua) |

Task nhận các trường `title` (bắt buộc, tối đa 200 ký tự), `due_date` (`YYYY-MM-DD` hoặc rỗng), `priority`, `category` (tối đa 80 ký tự) và `done` (tùy chọn). Lỗi trả về JSON với trường `error`; lỗi xác thực có thêm `details`.

## Cấu trúc thư mục

```text
todoapp/
├── db.js
├── server.js
├── routes/
│   ├── stats.js
│   └── tasks.js
├── public/
│   ├── index.html
│   ├── stats.html
│   ├── css/style.css
│   └── js/
│       ├── app.js
│       └── stats.js
├── package.json
└── .gitignore
```
