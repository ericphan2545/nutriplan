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
    targetCalories: null,
  },
  saveData() {
    const dataToSave = {
      userData: this.userData,
      mealPlan: this.mealPlan,
      currentWeek: this.currentWeek,
      previousWeekFoods: this.previousWeekFoods
    };
    localStorage.setItem('nutriPlanData', JSON.stringify(dataToSave));
  },

  loadData() {
    const savedData = localStorage.getItem('nutriPlanData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.userData = parsedData.userData || this.userData;
      this.mealPlan = parsedData.mealPlan || {};
      this.currentWeek = parsedData.currentWeek || 1;
      this.previousWeekFoods = parsedData.previousWeekFoods || [];
      
      // Cập nhật lại giao diện hiển thị tuần hiện tại
      const weekDisplay = document.getElementById("currentWeek");
      if(weekDisplay) weekDisplay.textContent = `Tuần ${this.currentWeek}`;
      
      // Nếu đã có thông tin BMI, hiển thị lại kết quả lên màn hình
      if (this.userData.bmi) {
         // Điền lại các ô input
         document.getElementById("age").value = this.userData.age || '';
         document.getElementById("height").value = this.userData.height || '';
         document.getElementById("weight").value = this.userData.weight || '';
         this.selectGender(this.userData.gender);
         this.selectActivity(this.userData.activityLevel);
         
         // Hiển thị kết quả tính toán
         this.displayBMIResult();
         this.updateNutritionTargets();
      }
    }
  },

  currentWeek: 1,
  mealPlan: {},
  foodUsageCount: {},
  previousWeekFoods: [],
  currentSelectedSlot: null,

  // ===== CONSTANTS =====
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ],
  dayNames: {
    monday: "Thứ 2",
    tuesday: "Thứ 3",
    wednesday: "Thứ 4",
    thursday: "Thứ 5",
    friday: "Thứ 6",
    saturday: "Thứ 7",
    sunday: "CN",
  },
  meals: ["breakfast", "lunch", "dinner"],
  mealNames: { breakfast: "Sáng", lunch: "Trưa", dinner: "Tối" },

  get foodDatabase() {
    return FOOD_DATABASE;
  },

  // ===== INITIALIZATION =====
  init() {
    this.loadData(); // <--- THÊM DÒNG NÀY ĐẦU TIÊN
    this.initializeMealPlan();
    this.renderCalendar();
    this.bindEvents();
    this.checkNutritionBalance(); // Kiểm tra lại cân bằng dinh dưỡng khi load lại
  },

  initializeMealPlan() {
    if (!this.mealPlan[`week${this.currentWeek}`]) {
      this.mealPlan[`week${this.currentWeek}`] = {};
      this.days.forEach((day) => {
        this.mealPlan[`week${this.currentWeek}`][day] = {
          breakfast: null,
          lunch: null,
          dinner: null,
        };
      });
    }
    this.updateFoodUsageCount();
  },

  bindEvents() {
    // Modal Food Selection Backdrop Click
    const foodModal = document.getElementById("foodModal");
    if (foodModal) {
      foodModal.addEventListener("click", (e) => {
        if (e.target === foodModal) this.closeModal();
      });
    }

    // Modal Settings Backdrop Click (MỚI)
    const settingsModal = document.getElementById("settingsModal");
    if (settingsModal) {
      settingsModal.addEventListener("click", (e) => {
        if (e.target === settingsModal) this.closeSettingsModal();
      });
    }
  },

  // ===== SETTINGS MODAL HANDLING (MỚI) =====
  openSettingsModal() {
    const modal = document.getElementById("settingsModal");
    if (modal) {
      modal.style.display = "flex";
      // Thêm timeout nhỏ để CSS transition hoạt động nếu có
      setTimeout(() => modal.classList.add("show"), 10);
    }
  },

  closeSettingsModal() {
    const modal = document.getElementById("settingsModal");
    if (modal) {
      modal.classList.remove("show");
      setTimeout(() => (modal.style.display = "none"), 300);
    }
  },

  // ===== GENDER SELECTION =====
  selectGender(gender) {
    this.userData.gender = gender;
    document.querySelectorAll(".gender-option").forEach((el) => {
      el.classList.toggle("selected", el.dataset.gender === gender);
    });
  },

  // ===== ACTIVITY SELECTION =====
  selectActivity(level) {
    this.userData.activityLevel = level;
    document.querySelectorAll(".activity-option").forEach((el) => {
      el.classList.toggle("selected", el.dataset.level === level);
    });
  },

  // ===== BMI CALCULATION =====
  calculateBMI() {
    const age = parseInt(document.getElementById("age").value);
    const height = parseInt(document.getElementById("height").value);
    const weight = parseInt(document.getElementById("weight").value);

    if (
      !this.userData.gender ||
      !age ||
      !height ||
      !weight ||
      !this.userData.activityLevel
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
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
    if (this.userData.gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate TDEE
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
    };
    const tdee = Math.round(
      bmr * activityMultipliers[this.userData.activityLevel]
    );
    this.userData.tdee = tdee;

    // Calculate target calories
    let targetCalories;
    if (bmi < 18.5) targetCalories = tdee + 300;
    else if (bmi < 24.9) targetCalories = tdee;
    else if (bmi < 29.9) targetCalories = tdee - 300;
    else targetCalories = tdee - 500;

    this.userData.targetCalories = Math.round(targetCalories);

    // Update UI
    this.displayBMIResult();
    this.updateNutritionTargets();
    this.saveData();

    // Không đóng modal ngay để người dùng xem kết quả BMI
    // alert("Đã cập nhật chỉ số!");
  },

  displayBMIResult() {
    const bmi = parseFloat(this.userData.bmi);
    document.getElementById("bmiNumber").textContent = this.userData.bmi;
    document.getElementById("tdeeValue").textContent = this.userData.tdee;
    document.getElementById("targetCalories").textContent =
      this.userData.targetCalories;

    let status;
    if (bmi < 18.5) status = "Thiếu cân";
    else if (bmi < 24.9) status = "Bình thường";
    else if (bmi < 29.9) status = "Thừa cân";
    else status = "Béo phì";
    document.getElementById("bmiStatus").textContent = status;

    let pointerPosition;
    if (bmi < 16) pointerPosition = 5;
    else if (bmi > 35) pointerPosition = 95;
    else pointerPosition = ((bmi - 16) / (35 - 16)) * 100;
    document.getElementById("bmiPointer").style.left = `${pointerPosition}%`;

    document.getElementById("bmiResult").classList.add("show");
  },

  updateNutritionTargets() {
    const calories = this.userData.targetCalories;
    const carbs = Math.round((calories * 0.5) / 4);
    const protein = Math.round((calories * 0.25) / 4);
    const fat = Math.round((calories * 0.25) / 9);
    const fiber = 25;

    document.getElementById("totalCarbs").textContent = carbs;
    document.getElementById("totalProtein").textContent = protein;
    document.getElementById("totalFat").textContent = fat;
    document.getElementById("totalFiber").textContent = fiber;
  },

  // ===== CALENDAR RENDERING =====
  renderCalendar() {
    const grid = document.getElementById("daysGrid");
    if (!grid) return;

    grid.innerHTML = "";

    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(
      today.getDate() - today.getDay() + 1 + (this.currentWeek - 1) * 7
    );

    this.days.forEach((day, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);

      const dayCol = document.createElement("div");
      dayCol.className = "day-column";
      dayCol.innerHTML = `
                <div class="day-header">
                    <div class="day-name">${this.dayNames[day]}</div>
                    <div class="day-date">${date.getDate()}/${
        date.getMonth() + 1
      }</div>
                </div>
                <div class="meal-slots">
                    ${this.meals
                      .map(
                        (meal) => `
                        <div class="meal-slot ${
                          this.mealPlan[`week${this.currentWeek}`]?.[day]?.[
                            meal
                          ]
                            ? "has-meal"
                            : ""
                        }" 
                             onclick="openFoodModal('${day}', '${meal}')"
                             data-day="${day}" data-meal="${meal}">
                            <div class="meal-slot-label">${
                              this.mealNames[meal]
                            }</div>
                            ${this.renderMealContent(day, meal)}
                        </div>
                    `
                      )
                      .join("")}
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
                <button class="detail-meal-btn" onclick="event.stopPropagation(); removeMeal('${day}', '${meal}')">!</button>
                <button class="remove-meal-btn" onclick="event.stopPropagation(); removeMeal('${day}', '${meal}')">✕</button>
            `;
    }

    return `<div class="add-meal-icon">+</div>`;
  },

  // ===== FOOD MODAL HANDLING =====
  openFoodModal(day, meal) {
    this.currentSelectedSlot = { day, meal };
    document.getElementById(
      "modalTitle"
    ).textContent = `Chọn món ăn - Bữa ${this.mealNames[meal]} - ${this.dayNames[day]}`;
    this.renderFoodGrid("all");

    // --- SỬA ĐOẠN NÀY ---
    const modal = document.getElementById("foodModal");
    if (modal) {
      modal.style.display = "flex"; // Bật hiển thị trước
      setTimeout(() => {
        modal.classList.add("show"); // Thêm class để chạy animation opacity
      }, 10);
    }
  },

  closeModal() {
    // --- SỬA ĐOẠN NÀY ---
    const modal = document.getElementById("foodModal");
    if (modal) {
      modal.classList.remove("show"); // Tắt animation trước
      this.currentSelectedSlot = null;

      // Đợi 300ms cho transition chạy xong rồi mới ẩn hoàn toàn
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  },

  // ===== FILTER & GRID =====
  filterFood(category) {
    document.querySelectorAll(".filter-tab").forEach((tab) => {
      tab.classList.toggle(
        "active",
        tab.textContent.toLowerCase().includes(category) ||
          (category === "all" && tab.textContent === "Tất cả")
      );
    });
    this.renderFoodGrid(category);
  },

  updateFoodUsageCount() {
    this.foodUsageCount = {};
    const weekData = this.mealPlan[`week${this.currentWeek}`];
    if (!weekData) return;
    this.days.forEach((day) => {
      this.meals.forEach((meal) => {
        const mealData = weekData[day]?.[meal];
        if (mealData)
          this.foodUsageCount[mealData.id] =
            (this.foodUsageCount[mealData.id] || 0) + 1;
      });
    });
  },

  renderFoodGrid(category) {
    const grid = document.getElementById("foodGrid");
    if (!grid) return;

    let foods = this.foodDatabase;

    // Filter by category
    if (category !== "all") {
      foods = foods.filter((f) => f.category === category);
    }

    grid.innerHTML = foods
      .map((food) => {
        const usageCount = this.foodUsageCount[food.id] || 0;
        const isDisabled = usageCount >= 2; // Max 2 times per week
        const isUsedPrevWeek = this.previousWeekFoods.includes(food.id);

        return `
                <div class="food-item ${isDisabled ? "disabled" : ""}" 
                     onclick="${isDisabled ? "" : `selectFood(${food.id})`}">
                    ${
                      usageCount > 0
                        ? `<span class="usage-badge">${usageCount}</span>`
                        : ""
                    }
                    <div class="food-item-header">
                        <span class="food-item-emoji">${food.emoji}</span>
                        <span class="food-item-name">${food.name}</span>
                    </div>
                    <div class="food-item-meta">
                        <span class="food-item-calories">${
                          food.calories
                        } kcal</span>
                        ${
                          isUsedPrevWeek
                            ? '<span style="color:#ff9800">⚠️ Tuần trước</span>'
                            : ""
                        }
                    </div>
                    <div class="food-item-nutrients">
                        <span class="nutrient-badge carbs">C: ${
                          food.carbs
                        }g</span>
                        <span class="nutrient-badge protein">P: ${
                          food.protein
                        }g</span>
                        <span class="nutrient-badge fat">F: ${food.fat}g</span>
                    </div>
                </div>
            `;
      })
      .join("");
  },

  // ===== FOOD SELECTION =====
  selectFood(foodId) {
    const food = this.foodDatabase.find((f) => f.id === foodId);
    if (!food || !this.currentSelectedSlot) return;
    const { day, meal } = this.currentSelectedSlot;
    if (!this.mealPlan[`week${this.currentWeek}`]) this.initializeMealPlan();

    this.mealPlan[`week${this.currentWeek}`][day][meal] = { ...food };
    this.updateFoodUsageCount();
    this.renderCalendar();
    this.checkNutritionBalance();
    this.saveData();
    this.closeModal();
  },

  removeMeal(day, meal) {
    if (this.mealPlan[`week${this.currentWeek}`]?.[day]) {
      this.mealPlan[`week${this.currentWeek}`][day][meal] = null;
      this.updateFoodUsageCount();
      this.renderCalendar();
      this.checkNutritionBalance();
      this.saveData();
    }
  },

  checkNutritionBalance() {
    const weekData = this.mealPlan[`week${this.currentWeek}`];
    if (!weekData) return;
    let categories = { carbs: 0, protein: 0, fat: 0, fiber: 0, balanced: 0 };
    let totalMeals = 0;

    this.days.forEach((day) => {
      this.meals.forEach((meal) => {
        const mealData = weekData[day]?.[meal];
        if (mealData) {
          categories[mealData.category]++;
          totalMeals++;
        }
      });
    });

    const warning = document.getElementById("nutritionWarning");
    const warningText = document.getElementById("warningText");

    if (totalMeals < 7) {
      warning.classList.add("hidden");
      return;
    }
    const threshold = totalMeals * 0.6;
    let isImbalanced = false;
    let imbalanceType = "";

    if (categories.carbs > threshold) {
      isImbalanced = true;
      imbalanceType = "Quá nhiều tinh bột! Hãy thêm rau xanh và protein.";
    } else if (categories.protein > threshold) {
      isImbalanced = true;
      imbalanceType = "Quá nhiều đạm! Hãy thêm rau xanh và tinh bột.";
    } else if (categories.fiber > threshold) {
      isImbalanced = true;
      imbalanceType = "Quá nhiều chất xơ! Hãy thêm protein và tinh bột.";
    } else if (categories.fat > threshold) {
      isImbalanced = true;
      imbalanceType = "Quá nhiều chất béo! Hãy cân bằng lại thực đơn.";
    }

    if (isImbalanced) {
      warning.classList.remove("hidden");
      warningText.textContent = imbalanceType;
    } else {
      warning.classList.add("hidden");
    }
  },

  // ===== AI AUTO GENERATE =====
  autoGenerateMeals() {
    if (!this.userData.targetCalories) {
      // Cập nhật: Nếu chưa có chỉ số thì nhắc người dùng mở cài đặt
      const confirmOpen = confirm(
        "Bạn cần cập nhật chỉ số cơ thể trước khi tạo thực đơn tự động. Mở cài đặt ngay?"
      );
      if (confirmOpen) {
        this.openSettingsModal();
      }
      return;
    }

    this.initializeMealPlan();
    const usedFoods = new Set(this.previousWeekFoods);
    const weeklyUsage = {};

    this.days.forEach((day) => {
      this.meals.forEach((meal) => {
        let availableFoods = this.foodDatabase.filter((food) => {
          const usage = weeklyUsage[food.id] || 0;
          return usage < 2 && !usedFoods.has(food.id);
        });
        if (availableFoods.length === 0) {
          availableFoods = this.foodDatabase.filter((food) => {
            const usage = weeklyUsage[food.id] || 0;
            return usage < 2;
          });
        }
        const currentDayMeals = this.mealPlan[`week${this.currentWeek}`][day];
        const usedCategories = Object.values(currentDayMeals)
          .filter((m) => m)
          .map((m) => m.category);
        let prioritizedFoods = availableFoods.filter(
          (f) => !usedCategories.includes(f.category)
        );
        if (prioritizedFoods.length === 0) prioritizedFoods = availableFoods;

        if (prioritizedFoods.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * prioritizedFoods.length
          );
          const selectedFood = prioritizedFoods[randomIndex];
          this.mealPlan[`week${this.currentWeek}`][day][meal] = {
            ...selectedFood,
          };
          weeklyUsage[selectedFood.id] =
            (weeklyUsage[selectedFood.id] || 0) + 1;
        }
      });
    });

    this.updateFoodUsageCount();
    this.renderCalendar();
    this.checkNutritionBalance();
    this.saveData();
  },

  // ===== WEEK NAVIGATION =====
  previousWeek() {
    if (this.currentWeek > 1) {
      this.storePreviousWeekFoods();
      this.currentWeek--;
      document.getElementById(
        "currentWeek"
      ).textContent = `Tuần ${this.currentWeek}`;
      this.initializeMealPlan();
      this.renderCalendar();
      this.saveData();
    }
  },

  nextWeek() {
    this.storePreviousWeekFoods();
    this.currentWeek++;
    document.getElementById(
      "currentWeek"
    ).textContent = `Tuần ${this.currentWeek}`;
    this.initializeMealPlan();
    this.renderCalendar();
    this.saveData();
  },

  storePreviousWeekFoods() {
    const weekData = this.mealPlan[`week${this.currentWeek}`];
    if (!weekData) return;
    this.previousWeekFoods = [];
    this.days.forEach((day) => {
      this.meals.forEach((meal) => {
        const mealData = weekData[day]?.[meal];
        if (mealData && !this.previousWeekFoods.includes(mealData.id)) {
          this.previousWeekFoods.push(mealData.id);
        }
      });
    });
  },
};

// ===== THEME MANAGEMENT =====
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

(function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
})();

// ===== GLOBAL FUNCTION EXPORTS =====
// Cập nhật thêm các hàm mới vào Window để HTML gọi được
window.openSettingsModal = () => MealPlanner.openSettingsModal();
window.closeSettingsModal = () => MealPlanner.closeSettingsModal();

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

document.addEventListener("DOMContentLoaded", () => {
  MealPlanner.init();
});
