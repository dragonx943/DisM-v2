DisM-v2

Code được làm lại từ bản gốc bởi TannerGabriel. Việt Hóa bởi dragonx943. Đang trong quá trình Việt Hóa các câu lệnh và tối ưu hóa trên các thiết bị giả lập Linux (Android, IOS), môi trường máy ảo (VMWare, VirtualBox, QEMU,...) và các máy có cấu hình yếu.

Yêu cầu:
1. Nếu là các thiết bị giả lập Linux (Android, IOS) thì cần tải và cài đặt:
+ Termux (Android 5+): Cần cài đặt Ubuntu hoặc Debian thông qua proot-distro. Sau đó cài đặt nodejs v16, ffmpeg, python, git.
+ UserLAnd (Android 5+): Thiết lập cài đặt Ubuntu hoặc Debian từ giao diện chính của app. Sau đó đăng nhập và cài đặt nodejs v16, ffmpeg, python, git.
+ iSH Shell (iOS 11.0+): Mở app, cập nhật gói và cài đặt nodejs v16, ffmpeg, python, git.
2. Nếu là môi trường máy ảo hoặc các máy tính có cấu hình tùy chỉnh:
- Hệ điều hành: Windows, Linux, MacOS,...
- Phần mềm: git, nodejs v16, python, ffmpeg (thêm gói *nano* nếu là Linux để có thể chỉnh sửa file)

Chuẩn bị:
- Mở Terminal (Linux, MacOS), Command Prompt (Windows) và gõ câu lệnh: *git clone https://github.com/dragonx943/DisM-v2.git* để tải code về máy.

Cách dùng:
1. Cài đặt:
- Sử dụng câu lệnh sau để bắt đầu cài đặt:
```sh
    npm i
```
- Sau khi nhập *npm i*, tiếp tục nhập:
```sh
    npm i ffmpeg ffmpeg-static node-opus opusscript
```
- Không dùng câu lệnh ```npm audit fix``` để đảm bảo các module không gặp lỗi đè lên nhau
- Nếu module bị lỗi trong quá trình cài đặt, vui lòng kiểm tra đường truyền mạng và thử lại. Nếu vẫn có lỗi, vui lòng kiểm tra xem module có còn tồn tại không.
2. Thiết lập
- Lấy TOKEN từ trang *https://discord.dev*, sau đó nhập dòng lệnh sau để nhập TOKEN vào Bot:
```sh
    echo "DISCORD_TOKEN=abc" > .env
```
Trong đó: abc - mã TOKEN bạn vừa lấy từ trang Dev của Discord. Đối với Web Replit thì tìm mục *Secrets* sau đó thêm ```DISCORD_TOKEN``` ở mục *New Secret* và điền TOKEN vào mục *Value*.
- Mở file *config.json* và:
+ activityType: có các lựa chọn 0, 1, 2, 3 (Đang chơi, đang xem, đang nghe,...)
+ activity: Tên của hoạt động đó (VD: Đang chơi Genshin Impact,...)
, sau đó lưu lại.
3. Khởi chạy: 
- Sử dụng câu lệnh ```node .``` để bắt đầu chạy.

Mục tiêu:
1. Việt Hóa tiếp các câu lệnh chưa được Việt Hóa
2. Tối ưu lại code, làm giảm dung lượng phù hợp để chạy trên các nền tảng Replit, Glitch,...
3. Mở cổng trang Web của Bot ở cổng 3000 (dành cho Replit) để treo 24/7
