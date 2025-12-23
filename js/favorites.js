/**
 * Favorites Page - Display user's favorite foods
 * NutriPlan Application
 */

// Food database for reference
const foodDatabase = [
    { id: 1, name: 'Phở Bò Hà Nội', emoji: '🍜', category: 'Món Việt', time: '90 phút', difficulty: 'Khó', description: 'Món phở truyền thống với nước dùng đậm đà, thịt bò mềm và bánh phở dai ngon.', image: 'assets/images/pho.jpg' },
    { id: 2, name: 'Bánh Mì Thịt Nguội', emoji: '🥖', category: 'Món Việt', time: '20 phút', difficulty: 'Dễ', description: 'Bánh mì giòn rụm kẹp thịt nguội, pate và rau thơm đặc trưng Việt Nam.', image: 'assets/images/banhmi.jpg' },
    { id: 3, name: 'Sushi Cá Hồi', emoji: '🍣', category: 'Món Á', time: '45 phút', difficulty: 'Trung bình', description: 'Sushi tươi ngon với cá hồi béo ngậy, cơm dẻo và wasabi cay nồng.', image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop' },
    { id: 4, name: 'Pizza Margherita', emoji: '🍕', category: 'Món Âu', time: '60 phút', difficulty: 'Trung bình', description: 'Pizza Ý truyền thống với sốt cà chua, phô mai mozzarella và lá húng quế.', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop' },
    { id: 5, name: 'Chè Thái', emoji: '🥣', category: 'Tráng miệng', time: '30 phút', difficulty: 'Dễ', description: 'Chè thập cẩm mát lạnh với nước cốt dừa béo ngậy và các loại topping đa dạng.', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop' },
    { id: 6, name: 'Pad Thái', emoji: '🍜', category: 'Món Á', time: '35 phút', difficulty: 'Trung bình', description: 'Mì xào Thái Lan với tôm, đậu phộng rang và nước sốt chua ngọt đặc trưng.', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop' },
    { id: 7, name: 'Bò Bít Tết', emoji: '🥩', category: 'Món Âu', time: '40 phút', difficulty: 'Khó', description: 'Thịt bò áp chảo hoàn hảo với khoai tây nghiền và sốt tiêu đen.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop' },
    { id: 8, name: 'Trà Sữa Trân Châu', emoji: '🧋', category: 'Đồ uống', time: '25 phút', difficulty: 'Dễ', description: 'Trà sữa thơm ngon với trân châu đường đen dai giòn hấp dẫn.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop' }
];

const Favorites = {
    init() {
        this.loadFavorites();
        this.renderFavorites();
    },

    loadFavorites() {
        const storedFavorites = localStorage.getItem('favorites');
        this.favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];
    },

    getFavoriteFoods() {
        return foodDatabase.filter(food => this.favoriteIds.includes(food.id));
    },

    removeFavorite(foodId) {
        this.favoriteIds = this.favoriteIds.filter(id => id !== foodId);
        localStorage.setItem('favorites', JSON.stringify(this.favoriteIds));
        this.renderFavorites();
    },

    renderFavorites() {
        const favoriteFoods = this.getFavoriteFoods();
        const grid = document.getElementById('favoritesGrid');
        const emptyState = document.getElementById('emptyState');
        const resultCount = document.getElementById('favoriteCount');

        if (favoriteFoods.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            resultCount.textContent = 'Chưa có món ăn nào được yêu thích';
            return;
        }

        grid.style.display = 'grid';
        emptyState.style.display = 'none';
        resultCount.textContent = `Hiển thị ${favoriteFoods.length} món ăn yêu thích`;

        grid.innerHTML = favoriteFoods.map(food => `
            <article class="food-card">
                <div class="image-container">
                    <img src="${food.image}" alt="${food.name}" class="food-image">
                    <span class="food-category-badge">${food.category}</span>
                    <div class="food-favorite" onclick="Favorites.removeFavorite(${food.id})">
                        <span>❤️</span>
                    </div>
                </div>
                <div class="food-content">
                    <h3 class="food-name">${food.name}</h3>
                    <p class="food-description">${food.description}</p>
                    <div class="food-meta">
                        <span class="food-time">⏱️ ${food.time}</span>
                        <span class="food-difficulty">${food.difficulty}</span>
                    </div>
                    <button class="view-recipe-btn">Xem Công Thức</button>
                </div>
            </article>
        `).join('');
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    Favorites.init();
});
