/**
 * Theme Manager - Quản lý Dark/Light Mode
 * Được sử dụng chung cho tất cả các trang
 */
import "../css/style.css";
const ThemeManager = {
    // Khởi tạo theme
    init() {
        this.loadSavedTheme();
        this.bindToggleButton();
    },

    // Load theme đã lưu từ localStorage
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    },

    // Toggle giữa dark và light theme
    toggle() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    },

    // Bind sự kiện cho nút toggle
    bindToggleButton() {
        const toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }
    },

    // Lấy theme hiện tại
    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    },

    // Set theme cụ thể
    setTheme(theme) {
        if (theme === 'dark' || theme === 'light') {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }
};

// Khởi tạo ngay khi DOM ready
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});

// Export cho global scope (để có thể gọi từ onclick trong HTML)
window.toggleTheme = () => ThemeManager.toggle();


