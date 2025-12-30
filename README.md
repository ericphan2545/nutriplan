# 🍳 NutriPlan - Ứng Dụng Lập Kế Hoạch Dinh Dưỡng Thông Minh

## 📋 Giới Thiệu

**NutriPlan** là một ứng dụng web toàn diện giúp người dùng quản lý dinh dưỡng và lập kế hoạch bữa ăn hàng tuần. Ứng dụng tích hợp nhiều tính năng hữu ích như thư viện món ăn, kiểm tra BMI, lập thực đơn tuần và quản lý món ăn yêu thích.

## ✨ Tính Năng Chính

### 1. 📚 Thư Viện Món Ăn (Food Library)
- **Tìm kiếm thông minh**: Tìm kiếm món ăn theo tên với tính năng debounce
- **Lọc đa dạng**: 
  - Lọc theo danh mục (Món nước, Món quay, Món tráng miệng, Món mặn)
  - Lọc theo độ khó (Dễ, Trung bình, Khó)
  - Lọc theo thời gian nấu (Dưới 30 phút, 30-60 phút, Trên 60 phút)
- **Chi tiết công thức**: Xem đầy đủ thông tin về nguyên liệu và cách chế biến
- **Đánh dấu yêu thích**: Lưu các món ăn yêu thích để xem lại sau

### 2. 📊 Kiểm Tra BMI & Tính Toán Dinh Dưỡng
- **Tính toán BMI**: Dựa trên chiều cao, cân nặng, giới tính và tuổi
- **Tính TDEE**: Tính toán tổng năng lượng tiêu hao hàng ngày (Total Daily Energy Expenditure)
- **Mục tiêu calo**: Đề xuất lượng calo phù hợp dựa trên BMI và mức độ vận động
- **Phân tích dinh dưỡng**: Hiển thị chỉ số BMI trên thang đo trực quan
- **Gợi ý dinh dưỡng**: Đưa ra lời khuyên và gợi ý món ăn phù hợp với tình trạng sức khỏe

### 3. 🗓️ Lập Thực Đơn Tuần (Meal Planner)
- **Lịch tuần**: Lập kế hoạch bữa ăn cho cả tuần (7 ngày, 3 bữa/ngày)
- **Chọn món ăn**: Chọn món ăn từ cơ sở dữ liệu phong phú với hơn 50 món ăn Việt Nam
- **Tự động đề xuất**: Tính năng tự động tạo thực đơn cân bằng dinh dưỡng
- **Theo dõi dinh dưỡng**: 
  - Hiển thị tổng lượng Carbohydrate, Protein, Chất béo, Chất xơ
  - Cảnh báo khi thực đơn mất cân bằng dinh dưỡng
- **Quản lý tuần**: Chuyển đổi giữa các tuần, lưu trữ dữ liệu tự động
- **Giới hạn lặp lại**: Mỗi món ăn chỉ được sử dụng tối đa 2 lần/tuần để đa dạng hóa

### 4. ❤️ Trang Yêu Thích (Favorites)
- **Quản lý món yêu thích**: Xem tất cả các món ăn đã đánh dấu yêu thích
- **Xóa nhanh**: Dễ dàng bỏ yêu thích từ trang này
- **Đồng bộ dữ liệu**: Tự động cập nhật khi có thay đổi từ các trang khác

### 5. 🎨 Giao Diện & Trải Nghiệm
- **Dark/Light Mode**: Chuyển đổi giữa chế độ sáng và tối
- **Responsive Design**: Tối ưu cho mọi thiết bị (desktop, tablet, mobile)
- **UI/UX hiện đại**: Giao diện đẹp mắt, dễ sử dụng với các animation mượt mà
- **Lưu trữ cục bộ**: Tất cả dữ liệu được lưu trong localStorage, không cần đăng nhập

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **HTML5**: Cấu trúc trang web
- **CSS3**: Styling với các file CSS module hóa:
  - `base.css`: Reset và biến CSS
  - `layout.css`: Layout và grid system
  - `components.css`: Components tái sử dụng
  - `theme.css`: Dark/Light theme
  - `meal-planner.css`: Styles cho Meal Planner
- **JavaScript (ES6+)**: Logic xử lý và tương tác
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool và development server

### Dữ Liệu
- **LocalStorage**: Lưu trữ dữ liệu người dùng (BMI, thực đơn, món yêu thích)
- **JSON**: Cơ sở dữ liệu món ăn và công thức nấu ăn

### Build & Deploy
- **Vite**: Bundling và optimization
- **GitHub Pages**: Hosting static website

## 📁 Cấu Trúc Dự Án

```
NutriPlan-dev/
├── index.html              # Trang chủ - Thư viện món ăn
├── meal-planner.html       # Trang lập thực đơn tuần
├── favorites.html         # Trang món ăn yêu thích
│
├── css/                   # Stylesheets
│   ├── base.css           # Reset, variables, base styles
│   ├── layout.css         # Layout và grid system
│   ├── components.css     # Reusable components
│   ├── theme.css          # Dark/Light theme
│   ├── meal-planner.css   # Meal Planner specific styles
│   └── style.css          # Main stylesheet
│
├── js/                    # JavaScript modules
│   ├── app.js             # Main application logic
│   ├── food-library.js    # Food Library functionality
│   ├── food-database.js   # Food database (50+ dishes)
│   ├── bmi-checker.js     # BMI calculation logic
│   ├── meal-planner.js    # Meal Planner core logic
│   ├── favorites.js       # Favorites page logic
│   ├── recipes.js         # Recipe database & display
│   ├── theme.js           # Theme toggle functionality
│   └── nav-indicator.js   # Navigation indicator
│
├── assets/                # Static assets
│   └── images/           # Food images
│       ├── pho.jpg
│       └── banhmi.jpg
│
├── public/                # Public assets (copied to dist)
│   └── js/               # Public JS files
│
├── dist/                  # Build output (generated)
│
├── node_modules/         # Dependencies
│
├── package.json          # Project dependencies & scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── README.md             # Documentation
```

## 🚀 Cài Đặt & Sử Dụng

### Yêu Cầu Hệ Thống
- Node.js (v14 trở lên)
- npm hoặc yarn

### Cài Đặt

1. **Clone repository**
```bash
git clone https://github.com/ericphan2545/NutriPlan.git
cd NutriPlan
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Chạy development server**
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Build cho Production

```bash
npm run build
```

Files được build sẽ nằm trong thư mục `dist/`

### Preview Production Build

```bash
npm run preview
```

## 📖 Hướng Dẫn Sử Dụng

### 1. Sử Dụng Thư Viện Món Ăn
- Truy cập trang chủ (`index.html`)
- Sử dụng thanh tìm kiếm để tìm món ăn
- Click vào các nút lọc để lọc theo danh mục, độ khó, thời gian
- Click vào nút ❤️ để đánh dấu món yêu thích
- Click "Xem Công Thức" để xem chi tiết cách nấu

### 2. Kiểm Tra BMI
- Truy cập trang Meal Planner (`meal-planner.html`)
- Click nút "⚙️ Cài đặt" ở header
- Nhập thông tin: Giới tính, Tuổi, Chiều cao, Cân nặng, Mức độ vận động
- Click "Tính toán & Lưu" để xem kết quả BMI và TDEE
- Ứng dụng sẽ tự động tính toán mục tiêu calo và dinh dưỡng

### 3. Lập Thực Đơn Tuần
- Sau khi nhập thông tin BMI, quay lại trang Meal Planner
- Click vào các ô trống trong lịch tuần để chọn món ăn
- Hoặc click "Tự động đề xuất" để hệ thống tự tạo thực đơn
- Xem tổng dinh dưỡng ở phần tóm tắt phía trên
- Chú ý cảnh báo nếu thực đơn mất cân bằng
- Sử dụng nút ◀ ▶ để chuyển đổi giữa các tuần

### 4. Quản Lý Món Yêu Thích
- Truy cập trang Favorites (`favorites.html`)
- Xem tất cả món ăn đã đánh dấu yêu thích
- Click ❤️ để bỏ yêu thích
- Click "Xem Công Thức" để xem chi tiết

## 🎯 Tính Năng Nổi Bật

### Tự Động Đề Xuất Thực Đơn
- Phân tích mục tiêu calo và dinh dưỡng của người dùng
- Tự động chọn món ăn đa dạng, tránh lặp lại
- Ưu tiên các món chưa được sử dụng trong tuần trước
- Đảm bảo cân bằng dinh dưỡng (tinh bột, đạm, chất béo, chất xơ)

### Cảnh Báo Cân Bằng Dinh Dưỡng
- Theo dõi tỷ lệ các nhóm dinh dưỡng trong thực đơn
- Cảnh báo khi một nhóm dinh dưỡng chiếm quá 60% tổng số món
- Đưa ra gợi ý cụ thể để cân bằng lại

### Lưu Trữ Dữ Liệu
- Tự động lưu thông tin BMI, thực đơn, món yêu thích
- Dữ liệu được lưu trong localStorage, không mất khi refresh
- Hỗ trợ nhiều tuần, lưu lịch sử các tuần trước

## 🔧 Development

### Scripts

- `npm run dev`: Chạy development server với hot reload
- `npm run build`: Build project cho production
- `npm run preview`: Preview production build

### Code Structure

- **Modular JavaScript**: Mỗi tính năng được tách thành module riêng
- **CSS Architecture**: Tách biệt base, layout, components, theme
- **Data Management**: Centralized food database và recipe database
- **Event-driven**: Sử dụng custom events để đồng bộ giữa các trang

## 📝 Ghi Chú

- Dữ liệu được lưu trong localStorage, sẽ mất khi xóa cache trình duyệt
- Ứng dụng hoạt động hoàn toàn offline sau khi load lần đầu
- Hình ảnh món ăn được lưu trữ online, cần kết nối internet để hiển thị
- Cơ sở dữ liệu hiện có hơn 50 món ăn Việt Nam đặc trưng

## 🌐 Demo

Ứng dụng được deploy tại: [https://ericphan2545.github.io/NutriPlan/](https://ericphan2545.github.io/NutriPlan/)

## 📄 License

© 2025 NutriPlan. All rights reserved.

---

## 👥 Phân Công Thành Viên

### 1. Phan Tiến Thịnh - ID: 23090023
**Vai trò**: Project Leader, UI + Logic

**Nhiệm vụ đảm nhiệm**:
- **Project Leader**: Quản lý dự án, phân công công việc, đảm bảo tiến độ
- **UI Development**: 
  - Thiết kế và phát triển giao diện người dùng
  - Xây dựng layout và components
  - Responsive design cho mọi thiết bị
- **Logic Development**:
  - Phát triển logic tính toán BMI và TDEE
  - Xây dựng hệ thống Meal Planner
  - Xử lý lưu trữ dữ liệu với localStorage
  - Tích hợp các tính năng tự động đề xuất thực đơn
  - Xử lý cảnh báo cân bằng dinh dưỡng

### 2. Ngô Tấn Đức - ID: 23090008
**Vai trò**: UI Template + Fix Bug + Trang Yêu Thích

**Nhiệm vụ đảm nhiệm**:
- **UI Template**: 
  - Tạo các template giao diện mẫu
  - Thiết kế các component tái sử dụng
  - Xây dựng theme và styling
- **Fix Bug**: 
  - Phát hiện và sửa lỗi trong quá trình phát triển
  - Tối ưu hóa hiệu năng và trải nghiệm người dùng
  - Đảm bảo tính tương thích cross-browser
- **Trang Yêu Thích**: 
  - Phát triển trang Favorites (`favorites.html`)
  - Xây dựng logic quản lý món yêu thích
  - Tích hợp với hệ thống localStorage
  - Đồng bộ dữ liệu giữa các trang

### 3. Trần Văn Học - ID: 23090025
**Vai trò**: Thiết Kế API + UI

**Nhiệm vụ đảm nhiệm**:
- **Thiết Kế API**: 
  - Thiết kế cấu trúc dữ liệu cho Food Database
  - Xây dựng Recipe Database với đầy đủ thông tin món ăn
  - Thiết kế schema dữ liệu cho Meal Planner
  - Tối ưu hóa cách lưu trữ và truy xuất dữ liệu
- **UI Development**: 
  - Phát triển giao diện người dùng
  - Thiết kế các trang chính (Food Library, Meal Planner)
  - Xây dựng modal và các component tương tác
  - Tối ưu hóa trải nghiệm người dùng

---

**Lưu ý**: Dự án được phát triển bởi nhóm 3 thành viên với sự phân công công việc rõ ràng, đảm bảo chất lượng và tiến độ hoàn thành.
