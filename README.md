# Phạm Lê Bảo Ngọc – Phát triển ứng dụng Thương mại điện tử

Repository dùng cho việc học tập và thực hành môn **Phát triển ứng dụng Thương mại điện tử** – Đại học Kinh tế TP. Hồ Chí Minh (UEH).

## Thông tin sinh viên

| Mục | Nội dung |
| --- | --- |
| Họ và tên | Phạm Lê Bảo Ngọc |
| MSSV | 31241027164 |
| Lớp học phần | Phát triển ứng dụng TMĐT |
| Repository | [github.com/plbngjc/PhamLeBaoNgoc](https://github.com/plbngjc/PhamLeBaoNgoc) |

## Cấu trúc repository

```
PhamLeBaoNgoc/
├── mua_sam_nhanh/        # Dự án E-commerce UI Improvement (HTML5, CSS3)
├── Tuan 3/               # Bài thực hành tuần 3
├── JavaScript-Labs/      # Bài thực hành tuần 4 – Chương 4: JavaScript
│   ├── index.html        # Trang chủ portfolio, điều hướng đến 3 Lab
│   ├── css/style.css
│   ├── js/main.js
│   ├── Lab08/            # JavaScript 1: Language Foundations
│   ├── Lab09/            # JavaScript 2: DOM and Events
│   ├── Lab10/            # JavaScript 3: jQuery
└── README.md
```

---

## Tuần 4 – Chương 4: JavaScript (JavaScript-Labs)

### Mục tiêu

Hoàn thành 03 bài Lab để vận dụng JavaScript xây dựng các chức năng tương tác cho website, đồng thời liên hệ với các tình huống thực tế của ứng dụng thương mại điện tử như kiểm tra biểu mẫu đăng ký, giỏ hàng, cập nhật nội dung sản phẩm và hiệu ứng tương tác.

### Đường dẫn truy cập (GitHub Pages)

| Nội dung | Liên kết |
| --- | --- |
| Trang chủ JavaScript-Labs | https://plbngjc.github.io/PhamLeBaoNgoc/JavaScript-Labs/ |
| Lab 08 | https://plbngjc.github.io/PhamLeBaoNgoc/JavaScript-Labs/Lab08/ |
| Lab 09 | https://plbngjc.github.io/PhamLeBaoNgoc/JavaScript-Labs/Lab09/ |
| Lab 10 | https://plbngjc.github.io/PhamLeBaoNgoc/JavaScript-Labs/Lab10/ |

### Nội dung từng Lab

**Lab 08 – JavaScript 1: Language Foundations**
- Cú pháp và cách nhúng JavaScript vào trang HTML.
- Biến, kiểu dữ liệu, hàm và các cấu trúc điều khiển cơ bản.
- Làm việc với String, Date, Array và Object.
- Sử dụng Browser Console để kiểm tra và gỡ lỗi.

**Lab 09 – JavaScript 2: DOM and Events**
- Truy xuất, lựa chọn phần tử HTML qua DOM.
- Đọc và thay đổi nội dung, thuộc tính, kiểu hiển thị.
- Tạo, thêm, xóa phần tử HTML.
- Xử lý sự kiện click, mouseover, mouseout.
- Làm việc với Form và kiểm tra dữ liệu đầu vào.

**Lab 10 – JavaScript 3: jQuery**
- Cài đặt jQuery (CDN) và sử dụng Selectors.
- Xử lý sự kiện và thao tác DOM bằng jQuery.
- Tạo hiệu ứng, hoạt ảnh.
- Thực hiện GET Request và xử lý kết quả qua jqXHR.

### Hướng dẫn truy cập bài thực hành

1. Mở trang chủ JavaScript-Labs bằng liên kết ở trên.
2. Chọn **Lab 08**, **Lab 09** hoặc **Lab 10** để vào danh sách Exercise tương ứng.
3. Chọn từng Exercise để xem kết quả chạy; mã nguồn nằm trong thư mục tương ứng của repository.

### Lịch sử cập nhật
(tobeupdated)

## Tuần 1 và 2 - Xây dựng giao diện trang website TMĐT với CSS và HTML

### 1. Giới thiệu

Dự án là một trang thương mại điện tử tĩnh Mua Sắm Nhanh, xây dựng bằng HTML5 và CSS3, tham khảo từ giao diện của Shopee. Khu vực giao diện được cải tiến là khu vực tìm kiếm: gợi ý từ khóa, hỗ trợ lỗi chính tả. Ngoài ra trang có thêm thanh điều hướng trên cùng và khu vực video ngắn quảng cáo sản phẩm.

### 2. Website tham khảo

- Tên website: Shopee
- URL: https://shopee.vn/
- Khu vực đã khảo sát: Trang chủ, Danh mục sản phẩm, Chi tiết sản phẩm, Tìm kiếm, Giỏ hàng

### 3. Chức năng

- Hiển thị danh sách sản phẩm
- Hiển thị tên và giá sản phẩm
- Bố cục hỗ trợ nhiều kích thước màn hình
- Thanh tìm kiếm có gợi ý từ khóa và bộ lọc
- Thanh điều hướng ở đầu màn hình: Trang chủ, Video ngắn, Thông báo, Tài khoản
- Khu vực Video ngắn gồm 4 khung video dọc tỉ lệ 9:16

### 4. Công nghệ

- HTML5
- CSS3

### 6. Cải tiến đã thực hiện

- **Vấn đề ban đầu:** khi khách hàng nhập từ khóa chung chung, sai chính tả hoặc chưa biết chính xác tên sản phẩm, việc tìm được kết quả phù hợp có thể mất nhiều thời gian; khách phải đổi từ khóa hoặc dùng thêm bộ lọc để thu hẹp kết quả.
- **Thay đổi đã thực hiện:**
  - Bổ sung gợi ý từ khóa, hỗ trợ lỗi chính tả và bố trí bộ lọc giá bán, thương hiệu, đánh giá dễ nhận biết hơn.
  - Kiểm tra giao diện bằng DevTools (Ctrl+Shift+I) ở kích thước điện thoại và máy tính.
  - Điểm tự phát hiện và sửa: giao diện AI tạo có một số nút chức năng dư thừa phía dưới banner, còn phía trên chưa có thanh điều hướng. Đã xóa các nút thừa và thêm thanh điều hướng:
    - Trang chủ: về đầu trang.
    - Video ngắn: cuộn tới khu vực video mới, bấm vào sẽ tới sản phẩm tương ứng.
    - Thông báo: có danh sách 3 thông báo mẫu.
    - Tài khoản: mở menu gồm Hồ sơ, Đơn mua, SP yêu thích, Đăng nhập.

### 7. Hỗ trợ từ AI

- **AI hỗ trợ:** phân tích giao diện Shopee thành bảng 5 khu vực, đề xuất bố cục khu vực tìm kiếm và tạo mã nguồn HTML/CSS ban đầu.
- **Phần tôi đã kiểm tra, điều chỉnh, bổ sung:** đối chiếu kết quả AI với website thực tế, loại bỏ nhận xét chưa có bằng chứng, thêm nhận xét cá nhân (giỏ hàng và danh mục của Shopee đã khá hoàn thiện, không đề xuất thêm), kiểm thử responsive bằng DevTools, xóa các nút thừa và tự thêm thanh điều hướng cùng khu vực video ngắn.
