# E-commerce UI Improvement
## 1. Giới thiệu
Dự án là một trang thương mại điện tử tĩnh Mua Sắm Nhanh, xây dựng bằng HTML5 và CSS3, tham khảo từ giao diện của Shopee. Khu vực giao diện được cải tiến là khu vực tìm kiếm: gợi ý từ khóa, hỗ trợ lỗi chính tả. Ngoài ra trang có thêm thanh điều hướng trên cùng và khu vực video ngắn quảng cáo sản phẩm.

## 2. Website tham khảo
- Tên website: Shopee
- URL: https://shopee.vn/
- Khu vực đã khảo sát: Trang chủ, Danh mục sản phẩm, Chi tiết sản phẩm, Tìm kiếm, Giỏ hàng

## 3. Chức năng
- Hiển thị danh sách sản phẩm
- Hiển thị tên và giá sản phẩm
- Bố cục hỗ trợ nhiều kích thước màn hình
- Thanh tìm kiếm có gợi ý từ khóa và bộ lọc
- Thanh điều hướng ở đầu màn hình: Trang chủ, Video ngắn, Thông báo, Tài khoản.
- Khu vực Video ngắn gồm 4 khung video dọc tỉ lệ 9:16 

## 4. Công nghệ
- HTML5
- CSS3

## 5. Cách chạy
Mở file index.html bằng trình duyệt.

## 6. Cải tiến đã thực hiện
- Vấn đề ban đầu: khi khách hàng nhập từ khóa chung chung, sai chính tả hoặc chưa biết chính xác tên sản phẩm, việc tìm được kết quả phù hợp có thể mất nhiều thời gian; khách phải đổi từ khóa hoặc dùng thêm bộ lọc để thu hẹp kết quả.
- Thay đổi đã thực hiện:
  + Bổ sung gợi ý từ khóa, hỗ trợ lỗi chính tả và bố trí bộ lọc giá bán, thương hiệu, đánh giá dễ nhận biết hơn.
  + Kiểm tra giao diện bằng DevTools (Ctrl+Shift+I) ở kích thước điện thoại và máy tính.
  + Điểm tự phát hiện và sửa: giao diện AI tạo có một số nút chức năng dư thừa phía dưới banner, còn phía trên chưa có thanh điều hướng. Đã xóa các nút thừa và thêm thanh điều hướng:
  Trang chủ: về đầu trang.
  Video ngắn: cuộn tới khu vực video mới, bấm vào sẽ tới sản phẩm tương ứng.
  Thông báo: Có danh sách 3 thông báo mẫu.
  Tài khoản: mở menu gồm Hồ sơ, Đơn mua, SP yêu thích, Đăng nhập.
## 7. Hỗ trợ từ AI
- AI hỗ trợ: phân tích giao diện Shopee thành bảng 5 khu vực, đề xuất bố cục khu vực tìm kiếm và tạo mã nguồn HTML/CSS ban đầu.
- Phần tôi đã kiểm tra, điều chỉnh, bổ sung: đối chiếu kết quả AI với website thực tế, loại bỏ nhận xét chưa có bằng chứng, thêm nhận xét cá nhân (giỏ hàng và danh mục của Shopee đã khá hoàn thiện, không đề xuất thêm), kiểm thử responsive bằng DevTools, xóa các nút thừa và tự thêm thanh điều hướng cùng khu vực video ngắn.
