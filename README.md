# Prototyle Web — Food Library, BMI Checker & Meal Planner

Ứng dụng web gồm Thư viện món ăn, Bộ kiểm tra BMI và module Meal Planner (JS/CSS).

## 📁 Cấu trúc (thực tế trong repo)

```
C:/ (repo root)
├── index.html              # Trang chủ - Thư viện món ăn
├── ibmchecker.html         # Trang kiểm tra BMI (tên file hiện có trong repo)
│
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── theme.css
│   └── meal-planner.css    # Styles cho module Meal Planner
│
├── js/
│   ├── theme.js
│   ├── food-library.js
│   ├── bmi-checker.js
│   └── meal-planner.js     # Logic Meal Planner (module, chưa có HTML riêng)
│
├── assets/
│   └── images/
│       ├── pho.jpg
│       └── banhmi.jpg
│
└── README.md
```

## 🚀 Tính năng chính

- Food Library (`index.html`)
  - Hiển thị danh sách món ăn dạng grid
  - Tìm kiếm với debounce
  - Lọc theo danh mục, thời gian, độ khó
  - Đánh dấu món yêu thích

- BMI Checker (`ibmchecker.html`)
  - Nhập thông tin cơ bản (chiều cao, cân nặng, giới tính)
  - Tính BMI và hiển thị kết luận
  - Gợi ý dinh dưỡng / món ăn phù hợp

- Meal Planner (module)
  - Module JS/CSS để lên kế hoạch bữa ăn (file `js/meal-planner.js` và `css/meal-planner.css`)
  - Có thể tích hợp vào bất kỳ trang HTML nào trong repo

- Theme (Dark / Light)
  - Quản lý theme bằng `js/theme.js`
  - Lưu lựa chọn vào localStorage
  - Tự động detect system preference

## 🛠 Cách sử dụng (local)

1. Mở `index.html` trong trình duyệt để xem Thư viện món ăn.
2. Mở `ibmchecker.html` để dùng BMI Checker.
3. Nếu muốn thử Meal Planner, tích hợp `css/meal-planner.css` và `js/meal-planner.js` vào trang HTML của bạn.
4. Theme toggle nằm góc màn hình (sử dụng `js/theme.js`).

## Ghi chú về tên file
- File trang BMI trong repo hiện được đặt là `ibmchecker.html`. Nếu bạn muốn đổi thành `bmi-checker.html`, hãy rename file tương ứng và cập nhật các liên kết.

## 🎯 Phát triển & đóng góp

- Mã nguồn thuần HTML/CSS/JS — không cần build step.
- Mở PR nếu muốn thay đổi cấu trúc hoặc thêm tính năng.

## 📝 License

© 2025 Prototyle Web. All rights reserved.

