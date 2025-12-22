/**
 * Meal Planner - Quản lý lập thực đơn tuần
 * NutriPlan Application
 */
const MealPlanner = {
    // ===== STATE MANAGEMENT =====
    userData: {
        gender: null,
        age: null,
        height: null,
        weight: null,
        activityLevel: null,
        bmi: null,
        tdee: null,
        targetCalories: null
    },

    currentWeek: 1,
    mealPlan: {}, // { week1: { monday: { breakfast: {...}, lunch: {...}, dinner: {...} }, ... } }
    foodUsageCount: {}, // Track how many times each food is used in current week
    previousWeekFoods: [], // Foods used in previous weeks
    currentSelectedSlot: null,

    // ===== CONSTANTS =====
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    dayNames: {
        monday: 'Thứ 2',
        tuesday: 'Thứ 3',
        wednesday: 'Thứ 4',
        thursday: 'Thứ 5',
        friday: 'Thứ 6',
        saturday: 'Thứ 7',
        sunday: 'CN'
    },
    meals: ['breakfast', 'lunch', 'dinner'],
    mealNames: {
        breakfast: 'Sáng',
        lunch: 'Trưa',
        dinner: 'Tối'
    },

    // ===== FOOD DATABASE =====
    foodDatabase: [
        // Breakfast items
        { id: 1, name: 'Phở Bò', emoji: '🍜', calories: 450, carbs: 65, protein: 25, fat: 10, fiber: 2, category: 'carbs', meal: 'breakfast' },
        { id: 2, name: 'Bánh Mì Trứng', emoji: '🥖', calories: 380, carbs: 45, protein: 15, fat: 16, fiber: 3, category: 'balanced', meal: 'breakfast' },
        { id: 3, name: 'Xôi Gà', emoji: '🍚', calories: 420, carbs: 55, protein: 20, fat: 14, fiber: 2, category: 'carbs', meal: 'breakfast' },
        { id: 4, name: 'Cháo Gà', emoji: '🥣', calories: 280, carbs: 35, protein: 18, fat: 8, fiber: 1, category: 'balanced', meal: 'breakfast' },
        { id: 5, name: 'Bún Riêu', emoji: '🍜', calories: 350, carbs: 48, protein: 18, fat: 9, fiber: 3, category: 'balanced', meal: 'breakfast' },
        { id: 6, name: 'Bánh Cuốn', emoji: '🥟', calories: 300, carbs: 42, protein: 12, fat: 10, fiber: 2, category: 'carbs', meal: 'breakfast' },
        { id: 7, name: 'Yến Mạch Hoa Quả', emoji: '🥣', calories: 320, carbs: 55, protein: 10, fat: 6, fiber: 8, category: 'fiber', meal: 'breakfast' },
        { id: 8, name: 'Trứng Ốp La Rau', emoji: '🍳', calories: 280, carbs: 8, protein: 18, fat: 20, fiber: 4, category: 'protein', meal: 'breakfast' },

        // Lunch items  
        { id: 9, name: 'Cơm Tấm Sườn', emoji: '🍖', calories: 650, carbs: 75, protein: 35, fat: 22, fiber: 3, category: 'balanced', meal: 'lunch' },
        { id: 10, name: 'Bún Chả', emoji: '🍢', calories: 520, carbs: 55, protein: 28, fat: 20, fiber: 4, category: 'protein', meal: 'lunch' },
        { id: 11, name: 'Cơm Gà Xối Mỡ', emoji: '🍗', calories: 580, carbs: 65, protein: 32, fat: 18, fiber: 2, category: 'protein', meal: 'lunch' },
        { id: 12, name: 'Salad Gà Nướng', emoji: '🥗', calories: 380, carbs: 15, protein: 35, fat: 20, fiber: 8, category: 'protein', meal: 'lunch' },
        { id: 13, name: 'Cá Kho Tộ + Cơm', emoji: '🐟', calories: 520, carbs: 60, protein: 30, fat: 16, fiber: 2, category: 'protein', meal: 'lunch' },
        { id: 14, name: 'Canh Chua Cá', emoji: '🍲', calories: 280, carbs: 20, protein: 25, fat: 12, fiber: 5, category: 'balanced', meal: 'lunch' },
        { id: 15, name: 'Rau Xào Thập Cẩm', emoji: '🥬', calories: 180, carbs: 15, protein: 8, fat: 10, fiber: 12, category: 'fiber', meal: 'lunch' },
        { id: 16, name: 'Đậu Hũ Sốt Cà', emoji: '🧈', calories: 220, carbs: 18, protein: 15, fat: 12, fiber: 4, category: 'protein', meal: 'lunch' },
        { id: 17, name: 'Mì Xào Hải Sản', emoji: '🦐', calories: 480, carbs: 55, protein: 25, fat: 18, fiber: 3, category: 'balanced', meal: 'lunch' },
        { id: 18, name: 'Cơm Chiên Dương Châu', emoji: '🍛', calories: 550, carbs: 70, protein: 18, fat: 22, fiber: 3, category: 'carbs', meal: 'lunch' },

        // Dinner items
        { id: 19, name: 'Lẩu Thái', emoji: '🍲', calories: 450, carbs: 30, protein: 35, fat: 22, fiber: 6, category: 'protein', meal: 'dinner' },
        { id: 20, name: 'Gà Nướng Rau Củ', emoji: '🍗', calories: 420, carbs: 20, protein: 40, fat: 18, fiber: 8, category: 'protein', meal: 'dinner' },
        { id: 21, name: 'Cá Hồi Áp Chảo', emoji: '🐟', calories: 380, carbs: 5, protein: 35, fat: 25, fiber: 2, category: 'fat', meal: 'dinner' },
        { id: 22, name: 'Súp Rau Củ', emoji: '🥣', calories: 150, carbs: 25, protein: 6, fat: 4, fiber: 10, category: 'fiber', meal: 'dinner' },
        { id: 23, name: 'Thịt Bò Xào Rau', emoji: '🥩', calories: 380, carbs: 12, protein: 32, fat: 22, fiber: 5, category: 'protein', meal: 'dinner' },
        { id: 24, name: 'Canh Rau Đay', emoji: '🥬', calories: 80, carbs: 10, protein: 4, fat: 2, fiber: 8, category: 'fiber', meal: 'dinner' },
        { id: 25, name: 'Cơm Rang Thập Cẩm', emoji: '🍚', calories: 480, carbs: 65, protein: 15, fat: 18, fiber: 4, category: 'carbs', meal: 'dinner' },
        { id: 26, name: 'Bún Bò Huế', emoji: '🍜', calories: 480, carbs: 52, protein: 28, fat: 18, fiber: 3, category: 'balanced', meal: 'dinner' },
        { id: 27, name: 'Gỏi Cuốn', emoji: '🥗', calories: 180, carbs: 25, protein: 12, fat: 4, fiber: 6, category: 'fiber', meal: 'dinner' },
        { id: 28, name: 'Chả Cá Lã Vọng', emoji: '🐟', calories: 420, carbs: 15, protein: 35, fat: 25, fiber: 4, category: 'protein', meal: 'dinner' }
    ],

    // ===== INITIALIZATION =====
    init() {
        this.initializeMealPlan();
        this.renderCalendar();
        this.bindEvents();
    },

    initializeMealPlan() {
        if (!this.mealPlan[`week${this.currentWeek}`]) {
            this.mealPlan[`week${this.currentWeek}`] = {};
            this.days.forEach(day => {
                this.mealPlan[`week${this.currentWeek}`][day] = {
                    breakfast: null,
                    lunch: null,
                    dinner: null
                };
            });
        }
        this.updateFoodUsageCount();
    },

    bindEvents() {
        // Modal backdrop click
        const modal = document.getElementById('foodModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    },

    // ===== GENDER SELECTION =====
    selectGender(gender) {
        this.userData.gender = gender;
        document.querySelectorAll('.gender-option').forEach(el => {
            el.classList.toggle('selected', el.dataset.gender === gender);
        });
    },

    // ===== ACTIVITY SELECTION =====
    selectActivity(level) {
        this.userData.activityLevel = level;
        document.querySelectorAll('.activity-option').forEach(el => {
            el.classList.toggle('selected', el.dataset.level === level);
        });
    },

    // ===== BMI CALCULATION =====
    calculateBMI() {
        const age = parseInt(document.getElementById('age').value);
        const height = parseInt(document.getElementById('height').value);
        const weight = parseInt(document.getElementById('weight').value);

        if (!this.userData.gender || !age || !height || !weight || !this.userData.activityLevel) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        this.userData.age = age;
        this.userData.height = height;
        this.userData.weight = weight;

        // Calculate BMI
        const heightM = height / 100;
        const bmi = weight / (heightM * heightM);
        this.userData.bmi = bmi.toFixed(1);

        // Calculate BMR (Mifflin-St Jeor)
        let bmr;
        if (this.userData.gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Calculate TDEE
        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725
        };
        const tdee = Math.round(bmr * activityMultipliers[this.userData.activityLevel]);
        this.userData.tdee = tdee;

        // Calculate target calories based on BMI
        let targetCalories;
        if (bmi < 18.5) {
            targetCalories = tdee + 300; // Gain weight
        } else if (bmi < 24.9) {
            targetCalories = tdee; // Maintain
        } else if (bmi < 29.9) {
            targetCalories = tdee - 300; // Lose weight
        } else {
            targetCalories = tdee - 500; // Lose weight faster
        }
        this.userData.targetCalories = Math.round(targetCalories);

        // Update UI
        this.displayBMIResult();
        this.updateNutritionTargets();
    },

    displayBMIResult() {
        const bmi = parseFloat(this.userData.bmi);
        
        document.getElementById('bmiNumber').textContent = this.userData.bmi;
        document.getElementById('tdeeValue').textContent = this.userData.tdee;
        document.getElementById('targetCalories').textContent = this.userData.targetCalories;

        // BMI Status
        let status;
        if (bmi < 18.5) status = 'Thiếu cân';
        else if (bmi < 24.9) status = 'Bình thường';
        else if (bmi < 29.9) status = 'Thừa cân';
        else status = 'Béo phì';
        document.getElementById('bmiStatus').textContent = status;

        // Position pointer
        let pointerPosition;
        if (bmi < 16) pointerPosition = 5;
        else if (bmi > 35) pointerPosition = 95;
        else pointerPosition = ((bmi - 16) / (35 - 16)) * 100;
        document.getElementById('bmiPointer').style.left = `${pointerPosition}%`;

        // Show result card
        document.getElementById('bmiResult').classList.add('show');
    },

    updateNutritionTargets() {
        const calories = this.userData.targetCalories;
        
        // Calculate macros (typical ratio)
        const carbs = Math.round((calories * 0.5) / 4); // 50% carbs, 4 cal/g
        const protein = Math.round((calories * 0.25) / 4); // 25% protein, 4 cal/g
        const fat = Math.round((calories * 0.25) / 9); // 25% fat, 9 cal/g
        const fiber = 25; // Fixed recommendation

        document.getElementById('totalCarbs').textContent = carbs;
        document.getElementById('totalProtein').textContent = protein;
        document.getElementById('totalFat').textContent = fat;
        document.getElementById('totalFiber').textContent = fiber;
    },

    // ===== CALENDAR RENDERING =====
    renderCalendar() {
        const grid = document.getElementById('daysGrid');
        if (!grid) return;
        
        grid.innerHTML = '';

        const today = new Date();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay() + 1 + (this.currentWeek - 1) * 7);

        this.days.forEach((day, index) => {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + index);

            const dayCol = document.createElement('div');
            dayCol.className = 'day-column';
            dayCol.innerHTML = `
                <div class="day-header">
                    <div class="day-name">${this.dayNames[day]}</div>
                    <div class="day-date">${date.getDate()}/${date.getMonth() + 1}</div>
                </div>
                <div class="meal-slots">
                    ${this.meals.map(meal => `
                        <div class="meal-slot ${this.mealPlan[`week${this.currentWeek}`]?.[day]?.[meal] ? 'has-meal' : ''}" 
                             onclick="openFoodModal('${day}', '${meal}')"
                             data-day="${day}" data-meal="${meal}">
                            <div class="meal-slot-label">${this.mealNames[meal]}</div>
                            ${this.renderMealContent(day, meal)}
                        </div>
                    `).join('')}
                </div>
            `;
            grid.appendChild(dayCol);
        });
    },

    renderMealContent(day, meal) {
        const mealData = this.mealPlan[`week${this.currentWeek}`]?.[day]?.[meal];
        
        if (mealData) {
            return `
                <div class="meal-slot-content">
                    <span class="meal-emoji">${mealData.emoji}</span>
                    <div>
                        <div class="meal-name">${mealData.name}</div>
                        <div class="meal-calories">${mealData.calories} kcal</div>
                    </div>
                </div>
                <button class="remove-meal-btn" onclick="event.stopPropagation(); removeMeal('${day}', '${meal}')">✕</button>
            `;
        }
        
        return `<div class="add-meal-icon">+</div>`;
    },

    // ===== MODAL HANDLING =====
    openFoodModal(day, meal) {
        this.currentSelectedSlot = { day, meal };
        document.getElementById('modalTitle').textContent = `Chọn món ăn - Bữa ${this.mealNames[meal]} - ${this.dayNames[day]}`;
        this.renderFoodGrid('all');
        document.getElementById('foodModal').classList.add('show');
    },

    closeModal() {
        document.getElementById('foodModal').classList.remove('show');
        this.currentSelectedSlot = null;
    },

    // ===== FOOD FILTERING =====
    filterFood(category) {
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.toggle('active', tab.textContent.toLowerCase().includes(category) || 
                (category === 'all' && tab.textContent === 'Tất cả'));
        });
        this.renderFoodGrid(category);
    },

    updateFoodUsageCount() {
        this.foodUsageCount = {};
        const weekData = this.mealPlan[`week${this.currentWeek}`];
        if (!weekData) return;

        this.days.forEach(day => {
            this.meals.forEach(meal => {
                const mealData = weekData[day]?.[meal];
                if (mealData) {
                    this.foodUsageCount[mealData.id] = (this.foodUsageCount[mealData.id] || 0) + 1;
                }
            });
        });
    },

    renderFoodGrid(category) {
        const grid = document.getElementById('foodGrid');
        if (!grid) return;
        
        let foods = this.foodDatabase;
        
        // Filter by category
        if (category !== 'all') {
            foods = foods.filter(f => f.category === category);
        }

        grid.innerHTML = foods.map(food => {
            const usageCount = this.foodUsageCount[food.id] || 0;
            const isDisabled = usageCount >= 2; // Max 2 times per week
            const isUsedPrevWeek = this.previousWeekFoods.includes(food.id);

            return `
                <div class="food-item ${isDisabled ? 'disabled' : ''}" 
                     onclick="${isDisabled ? '' : `selectFood(${food.id})`}">
                    ${usageCount > 0 ? `<span class="usage-badge">${usageCount}</span>` : ''}
                    <div class="food-item-header">
                        <span class="food-item-emoji">${food.emoji}</span>
                        <span class="food-item-name">${food.name}</span>
                    </div>
                    <div class="food-item-meta">
                        <span class="food-item-calories">${food.calories} kcal</span>
                        ${isUsedPrevWeek ? '<span style="color:#ff9800">⚠️ Tuần trước</span>' : ''}
                    </div>
                    <div class="food-item-nutrients">
                        <span class="nutrient-badge carbs">C: ${food.carbs}g</span>
                        <span class="nutrient-badge protein">P: ${food.protein}g</span>
                        <span class="nutrient-badge fat">F: ${food.fat}g</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    // ===== FOOD SELECTION =====
    selectFood(foodId) {
        const food = this.foodDatabase.find(f => f.id === foodId);
        if (!food || !this.currentSelectedSlot) return;

        const { day, meal } = this.currentSelectedSlot;
        
        if (!this.mealPlan[`week${this.currentWeek}`]) {
            this.initializeMealPlan();
        }
        
        this.mealPlan[`week${this.currentWeek}`][day][meal] = { ...food };
        
        this.updateFoodUsageCount();
        this.renderCalendar();
        this.checkNutritionBalance();
        this.closeModal();
    },

    removeMeal(day, meal) {
        if (this.mealPlan[`week${this.currentWeek}`]?.[day]) {
            this.mealPlan[`week${this.currentWeek}`][day][meal] = null;
            this.updateFoodUsageCount();
            this.renderCalendar();
            this.checkNutritionBalance();
        }
    },

    // ===== NUTRITION BALANCE CHECK =====
    checkNutritionBalance() {
        const weekData = this.mealPlan[`week${this.currentWeek}`];
        if (!weekData) return;

        let categories = { carbs: 0, protein: 0, fat: 0, fiber: 0, balanced: 0 };
        let totalMeals = 0;

        this.days.forEach(day => {
            this.meals.forEach(meal => {
                const mealData = weekData[day]?.[meal];
                if (mealData) {
                    categories[mealData.category]++;
                    totalMeals++;
                }
            });
        });

        const warning = document.getElementById('nutritionWarning');
        const warningText = document.getElementById('warningText');

        if (totalMeals < 7) {
            warning.classList.add('hidden');
            return;
        }

        // Check for imbalance
        const threshold = totalMeals * 0.6; // If any category > 60%
        let isImbalanced = false;
        let imbalanceType = '';

        if (categories.carbs > threshold) {
            isImbalanced = true;
            imbalanceType = 'Quá nhiều tinh bột! Hãy thêm rau xanh và protein.';
        } else if (categories.protein > threshold) {
            isImbalanced = true;
            imbalanceType = 'Quá nhiều đạm! Hãy thêm rau xanh và tinh bột.';
        } else if (categories.fiber > threshold) {
            isImbalanced = true;
            imbalanceType = 'Quá nhiều chất xơ! Hãy thêm protein và tinh bột.';
        } else if (categories.fat > threshold) {
            isImbalanced = true;
            imbalanceType = 'Quá nhiều chất béo! Hãy cân bằng lại thực đơn.';
        }

        if (isImbalanced) {
            warning.classList.remove('hidden');
            warningText.textContent = imbalanceType;
        } else {
            warning.classList.add('hidden');
        }
    },

    // ===== AI AUTO GENERATE =====
    autoGenerateMeals() {
        if (!this.userData.targetCalories) {
            alert('Vui lòng tính BMI trước khi tạo thực đơn tự động!');
            return;
        }

        this.initializeMealPlan();
        
        const usedFoods = new Set(this.previousWeekFoods);
        const weeklyUsage = {};

        this.days.forEach(day => {
            this.meals.forEach(meal => {
                // Get foods for this meal type that haven't been used too much
                let availableFoods = this.foodDatabase.filter(food => {
                    const usage = weeklyUsage[food.id] || 0;
                    return usage < 2 && !usedFoods.has(food.id);
                });

                // If all foods are used, allow repeats but still limit to 2 per week
                if (availableFoods.length === 0) {
                    availableFoods = this.foodDatabase.filter(food => {
                        const usage = weeklyUsage[food.id] || 0;
                        return usage < 2;
                    });
                }

                // Ensure variety in categories
                const currentDayMeals = this.mealPlan[`week${this.currentWeek}`][day];
                const usedCategories = Object.values(currentDayMeals)
                    .filter(m => m)
                    .map(m => m.category);

                // Prioritize different categories
                let prioritizedFoods = availableFoods.filter(f => !usedCategories.includes(f.category));
                if (prioritizedFoods.length === 0) {
                    prioritizedFoods = availableFoods;
                }

                // Random selection
                if (prioritizedFoods.length > 0) {
                    const randomIndex = Math.floor(Math.random() * prioritizedFoods.length);
                    const selectedFood = prioritizedFoods[randomIndex];
                    
                    this.mealPlan[`week${this.currentWeek}`][day][meal] = { ...selectedFood };
                    weeklyUsage[selectedFood.id] = (weeklyUsage[selectedFood.id] || 0) + 1;
                }
            });
        });

        this.updateFoodUsageCount();
        this.renderCalendar();
        this.checkNutritionBalance();
    },

    // ===== WEEK NAVIGATION =====
    previousWeek() {
        if (this.currentWeek > 1) {
            this.storePreviousWeekFoods();
            this.currentWeek--;
            document.getElementById('currentWeek').textContent = `Tuần ${this.currentWeek}`;
            this.initializeMealPlan();
            this.renderCalendar();
        }
    },

    nextWeek() {
        this.storePreviousWeekFoods();
        this.currentWeek++;
        document.getElementById('currentWeek').textContent = `Tuần ${this.currentWeek}`;
        this.initializeMealPlan();
        this.renderCalendar();
    },

    storePreviousWeekFoods() {
        const weekData = this.mealPlan[`week${this.currentWeek}`];
        if (!weekData) return;

        this.previousWeekFoods = [];
        this.days.forEach(day => {
            this.meals.forEach(meal => {
                const mealData = weekData[day]?.[meal];
                if (mealData && !this.previousWeekFoods.includes(mealData.id)) {
                    this.previousWeekFoods.push(mealData.id);
                }
            });
        });
    }
};

// ===== THEME MANAGEMENT =====
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
})();

// ===== GLOBAL FUNCTION EXPORTS =====
// Export functions for onclick handlers in HTML
window.selectGender = (gender) => MealPlanner.selectGender(gender);
window.selectActivity = (level) => MealPlanner.selectActivity(level);
window.calculateBMI = () => MealPlanner.calculateBMI();
window.openFoodModal = (day, meal) => MealPlanner.openFoodModal(day, meal);
window.closeModal = () => MealPlanner.closeModal();
window.filterFood = (category) => MealPlanner.filterFood(category);
window.selectFood = (id) => MealPlanner.selectFood(id);
window.removeMeal = (day, meal) => MealPlanner.removeMeal(day, meal);
window.autoGenerateMeals = () => MealPlanner.autoGenerateMeals();
window.previousWeek = () => MealPlanner.previousWeek();
window.nextWeek = () => MealPlanner.nextWeek();
window.toggleTheme = toggleTheme;

// ===== INITIALIZE ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    MealPlanner.init();
});

