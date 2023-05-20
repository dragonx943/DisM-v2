DisM-v2

Code được làm lại từ bản gốc bởi TannerGabriel. Việt Hóa bởi dragonx943. Đang trong quá trình Việt Hóa các câu lệnh và tối ưu hóa trên các thiết bị giả lập Linux (Android, IOS), môi trường máy ảo (VMWare, VirtualBox, QEMU,...) và các máy có cấu hình yếu.

Cách dùng:
1. Cài đặt: *npm i*
- Không dùng câu lệnh *npm audit fix* để đảm bảo các module không gặp lỗi đè lên nhau
- Nếu module bị lỗi trong quá trình cài đặt, vui lòng kiểm tra đường truyền mạng và thử lại. Nếu vẫn có lỗi, vui lòng kiểm tra xem module có còn tồn tại không.
2. Thiết lập
- Nhập TOKEN Bot Discord của bạn vào file *test.env* rồi lưu lại với tên file mới là *.env* (Nếu bạn dùng các nền tảng khác như Replit hay Glitch để treo thì vui lòng tìm mục SECRET hoặc mục nào tương tự tùy vào từng nền tảng để ghi *DISCORD_TOKEN*)
- Mở file *config.json* và:
+ activityType: có các lựa chọn 0, 1, 2, 3 (Đang chơi, đang xem, đang nghe,...)
+ activity: Tên của hoạt động đó (VD: Đang chơi Genshin Impact,...)
, sau đó lưu lại.
3. Khởi chạy: *npm start* hoặc *node .*

Mục tiêu:
1. Việt Hóa tiếp các câu lệnh chưa được Việt Hóa
2. Tối ưu lại code, làm giảm dung lượng phù hợp để chạy trên các nền tảng Replit, Glitch,...
3. Mở cổng trang Web của Bot ở cổng 3000 (dành cho Replit) để treo 24/7
