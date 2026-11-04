# AI Usage LMS1 
## 1. Công cụ AI
Tên công cụ: ChatGPT

## 2. Mục đích sử dụng
- Phân tích giao diện và chức năng website Shopee.
- Đề xuất bố cục cải tiến cho khu vực tìm kiếm.
- Tạo mã nguồn HTML/CSS ban đầu cho giao diện.
- Hỗ trợ giải thích và sửa mã khi thêm thanh điều hướng.

## 3. Prompt đã sử dụng
_1/ Phân tích giao diện và chức năng website:_
Tôi đang khảo sát website: https://shopee.vn/
Hãy giúp tôi lập bảng phân tích các khu vực:
1. Trang chủ.
2. Danh mục sản phẩm.
3. Chi tiết sản phẩm.
4. Tìm kiếm.
5. Giỏ hàng.
Với mỗi khu vực, hãy nêu:
- Mục đích của chức năng.
- Thành phần giao diện cần có.
- Điểm thuận tiện đối với khách hàng.
- Một vấn đề có thể phát sinh.
- Một đề xuất cải tiến.
Không khẳng định những tính năng chưa được kiểm chứng.
Phân biệt rõ nhận xét dựa trên quan sát và đề xuất của AI.

_2/ Nhờ AI đề xuất giao diện cải tiến:_
Tôi đang thực hiện bài tập phát triển giao diện website thương mại điện tử
bằng HTML5 và CSS3.
Tôi muốn cải tiến khu vực: [Tìm kiếm] của shopee.vn  thanh tìm kiếm khi khách hàng nhập từ khóa quá chung chung, viết sai chính tả hoặc chưa xác định chính xác tên sản phẩm, việc tìm được kết quả phù hợp có thể mất nhiều thời gian. Khách hàng có thể phải thay đổi từ khóa hoặc sử dụng thêm bộ lọc để thu hẹp kết quả tìm kiếm. Vì vậy, em sẽ cải tiến khu vực tìm kiếm bằng cách bổ sung gợi ý từ khóa phù hợp, hỗ trợ xử lý lỗi chính tả và bố trí các bộ lọc như giá bán, thương hiệu và đánh giá một cách dễ nhận biết hơn. 
Đối tượng sử dụng: khách hàng mua sắm trực tuyến tại Việt Nam.
Hãy đề xuất:
1. Bố cục giao diện.
2. Các thành phần HTML cần sử dụng.
3. Cách tổ chức CSS.
4. Cách hiển thị trên máy tính và điện thoại.
5. Những điểm cần kiểm tra về khả năng sử dụng.
Trước tiên, hãy giải thích phương án thiết kế.
Chưa tạo toàn bộ mã nguồn cho đến khi tôi yêu cầu.

_3/ AI hỗ trợ tạo mã HTML5 và CSS3 cho giao diện trang Mua sắm nhanh:_
Dựa trên phương án đã thống nhất, hãy tạo một trang giao diện
thương mại điện tử bằng HTML5 và CSS3. Có các hình ảnh sản phẩm và tham khảo các trang web tmdt khác như shopee.vn hay tiki.vn hay lazada
Yêu cầu:
- Giao diện có tiêu đề và khu vực sản phẩm.
- Có tối thiểu 4 sản phẩm mẫu.
- Mỗi sản phẩm có hình ảnh, tên, giá và nút thao tác.
- Bố cục phù hợp với màn hình máy tính và điện thoại.
- Mã HTML có cấu trúc rõ ràng.
- CSS được tách thành file riêng.
- Không sử dụng backend hoặc cơ sở dữ liệu.
- Không đưa thư viện hoặc thành phần không cần thiết vào dự án.
Giải thích cách chạy trang web và những phần tôi cần kiểm tra.

## 4. Kết quả AI đề xuất
Đối với yêu cầu 1/, AI lập bảng phân tích 5 khu vực của Shopee và đưa ra ba hướng cải tiến chính: Giảm quá tải thông tin, sửa lỗi khi tìm kiếm để thuận tiện và nhanh chóng hơn và sửa phần giao diện khi bỏ và giỏ hàng/thanh toán để minh bạch giá cả hơn. Yêu cầu 2/, AI đề xuất cải tiến khu vực tìm kiếm: gợi ý từ khóa, hỗ trợ lỗi chính tả, bộ lọc giá bán, thương hiệu, đánh giá. Yêu cầu 3/, dựa vào những đề xuất AI đưa ra ở yêu cầu 2/ đã tạo thử một trang giao diện với khu vực tìm kiếm tối ưu hơn.

## 5. Kiểm tra và điều chỉnh
- Đã kiểm tra: Sử dụng DevTools để xem giao diện ở kích thước điện thoại và máy tính
- Đã sử đổi/bổ sung:
  + Xóa các nút chức năng dư thừa phía dưới banner.
  + Thêm thanh điều hướng <nav class="top-nav">: Trang chủ, Video ngắn, Thông báo (huy hiệu 3, 3 thông báo mẫu), Tài khoản (Hồ sơ, Đơn mua, Yêu thích, Đăng nhập).
  + Thêm khu vực Video ngắn: 4 khung video dọc 9:16, có nút ▶, thời lượng, lượt xem.
  + Nhận xét cá nhân đối với phần đề xuất của AI cho yêu cầu 1/: giỏ hàng và danh mục sản phẩm của Shopee đã khá hoàn thiện, không đề xuất cải tiến.
  
## 6. Phần tôi hiểu và có thể giải thích
- <nav>, <ul>, <li>: vùng điều hướng và danh sách mục; trình đọc màn hình nhận ra đây là menu.
- <details>/<summary>: tạo menu thả xuống không cần JavaScript. Thuộc tính name="nav-menu" để mở mục này thì mục kia tự đóng.
  - position: sticky; top: 0: giữ thanh điều hướng cố định ở đầu màn hình khi cuộn. z-index: 30 đặt thanh điều hướng nằm trên header và các menu.
- scroll-padding-top: 60px trên html: chừa chỗ cho thanh điều hướng, nên tiêu đề không bị che khi bấm "Video ngắn" hay "Sản phẩm".
- aspect-ratio: 9 / 16: giữ khung video dọc ở mọi kích thước. Lưới video là 4 cột trên máy tính và 2 cột trên màn hình dưới 950px.

# AI Usage LMS2
# AI Usage Log — Bài tập cá nhân tuần 2

## Công cụ

- **AI sử dụng:** Claude.ai (mức effort: Medium), dùng xuyên suốt bài tập tuần 2.
- **Phạm vi:** AI hỗ trợ phân tích, giải thích và đề xuất mã. Mọi đề xuất đều được kiểm tra trên trình duyệt trước khi đưa vào repository.

## Nhật ký theo từng bước

| Bước | Nội dung | AI hỗ trợ gì | Em kiểm tra / tự làm gì |
|---|---|---|---|
| 1 | Rà soát trang kế thừa từ buổi 1 | Chỉ ra 3 vấn đề: (1) liên kết và `id` chưa hợp lý (giỏ hàng dẫn sai nội dung, ảnh và tên sản phẩm chưa dẫn đến trang chi tiết); (2) hộp gợi ý tìm kiếm chỉ có CSS, chưa nhập được từ khóa, cấu trúc và khả năng tiếp cận hạn chế; (3) CSS khó bảo trì (`font-size: 0` + `::first-letter`), cỡ chữ nhỏ, lỗi hiển thị chữ tiếng Việt, `:focus-visible` chưa đồng nhất. Đề xuất dùng `nav`, `ul/li` hoặc `datalist`, Flexbox, `span`, `rem` | Đối chiếu từng vấn đề với trang thực tế; xem chi tiết ở mục "Đề xuất AI đã điều chỉnh" bên dưới |
| 2 | Củng cố HTML5 ngữ nghĩa | Giải thích các nhóm thẻ: cấu trúc cơ bản, bố cục (`header`, `nav`, `main`, `section`, `article`, `footer`), văn bản và tiêu đề, liên kết và danh sách, biểu mẫu (`form`, `label`, `input`, `button`, `details`, `summary`), hình ảnh, các thuộc tính hỗ trợ (`aria-*`, `loading="lazy"`) | Gắn từng thẻ với vị trí cụ thể trong mã nguồn của bài; trả lời 4 câu tự kiểm tra bằng cách hiểu và diễn đạt lại |
| 4 | CSS selector và Box Model | Hướng dẫn áp dụng `margin`, `padding`, `border`, class selector cho thẻ sản phẩm | Áp dụng lên sản phẩm của bài, quan sát kết quả trên trình duyệt |
| 5 | Flexbox cơ bản | Chỉnh bố cục bằng `display: flex`, `justify-content`, `align-items`, `gap` | So sánh giao diện trước và sau khi chỉnh; tự trả lời 3 câu hỏi kiểm tra |
| 6 | CSS Grid cho danh sách sản phẩm | Hỗ trợ bố cục lưới: 4 cột trên máy tính, 2 cột trên điện thoại | Kiểm tra hiển thị ở hai kích thước màn hình |
| 7 | Hover và focus | Bổ sung hiệu ứng hover cho nút "Thêm vào giỏ" và `:focus-visible` khi dùng phím Tab | Thử bằng chuột và phím Tab để xác nhận hiệu ứng hoạt động |

## Đề xuất AI đã điều chỉnh

- **Đề xuất (Bước 1):** Bỏ kỹ thuật `font-size: 0` kết hợp `::first-letter`, thay bằng Flexbox, thẻ `span` và đơn vị `rem`.
- **Cách kiểm tra:** Mở trang trên trình duyệt, thu nhỏ và phóng to cửa sổ, dùng phím Tab để xem `:focus-visible`.
- **Phát hiện:** Một số đoạn chữ tiếng Việt vẫn hiển thị chưa đúng và cỡ chữ ở vài vị trí còn nhỏ.
- **Xử lý:** Không áp dụng nguyên văn. Tự chỉnh lại giá trị `rem` và màu sắc để đủ độ tương phản trước khi đưa vào bài.
- **Bài học:** Mã do AI đề xuất có thể đúng về hướng nhưng vẫn cần kiểm thử thực tế và chỉnh theo bài của mình.

## Phần do em tự thực hiện

- Sắp xếp lại cấu trúc thư mục trên repository.
- Thêm responsive cho giao diện điện thoại.
- Điều chỉnh `rem`, màu sắc và độ tương phản sau khi kiểm tra.
- Kiểm tra thủ công theo checklist Bước 8 (mở trang, áp dụng CSS, hình ảnh, liên kết, bố cục, hover/focus): tất cả đạt.

## Liên kết hội thoại với AI

- Bước 1: https://claude.ai/share/264a2a50-bc09-4d31-9188-62f1a3ba3503
- Bước 2: https://claude.ai/share/90cb506a-a54e-4abc-aacb-19ff89982bee
- Bước 4: https://claude.ai/share/c869f676-6f75-4756-8ffc-c799c4f35714
- Bước 5: https://claude.ai/share/4016634a-d29b-4518-80f2-a753d50cd21f
- Bước 6: https://chatgpt.com/s/t_6ad37824f2208191ae763dffdf90108c
- Bước 7: https://chatgpt.com/s/t_6ad37824f2208191ae763dffdf90108c
