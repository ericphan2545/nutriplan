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
  showToast(message) {
    const toast = document.getElementById("toast");
    const toastMsg = document.querySelector(".toast-message");
    
    if (toast && toastMsg) {
        if(message) toastMsg.textContent = message;
        
        toast.classList.add("show");
        
        // Tự động ẩn sau 3 giây
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
  },

  openWarningModal() {
    const modal = document.getElementById("warningModal");
    if (modal) {
      modal.style.display = "flex";
      setTimeout(() => modal.classList.add("show"), 10);
    }
  },

  closeWarningModal() {
    const modal = document.getElementById("warningModal");
    if (modal) {
      modal.classList.remove("show");
      setTimeout(() => (modal.style.display = "none"), 300);
    }
  },

  confirmOpenSettings() {
    this.closeWarningModal();
    // Đợi modal cảnh báo đóng xong thì mở modal cài đặt
    setTimeout(() => {
        this.openSettingsModal();
    }, 300);
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
  // --- TÍNH TOÁN BMI & TDEE (Đã cập nhật cho giao diện mới) ---
  calculateBMI() {
    // 1. Lấy dữ liệu từ Input
    const ageInput = document.getElementById("age");
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");

    const age = parseInt(ageInput.value);
    const height = parseInt(heightInput.value);
    const weight = parseInt(weightInput.value);

    // 2. Kiểm tra dữ liệu đầu vào
    if (!this.userData.gender || !this.userData.activityLevel || !age || !height || !weight) {
      // Nếu thiếu thông tin, hiện popup cảnh báo (dùng hàm bạn vừa sửa)
      this.openWarningModal(); 
      return;
    }

    // Cập nhật vào userData
    this.userData.age = age;
    this.userData.height = height;
    this.userData.weight = weight;

    // 3. Tính BMI
    // BMI = Cân nặng (kg) / (Chiều cao (m) * Chiều cao (m))
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    this.userData.bmi = bmi;

    // Xác định phân loại BMI
    let category = "";
    let colorClass = ""; // Có thể dùng để đổi màu chữ nếu muốn
    if (bmi < 18.5) category = "Thiếu cân";
    else if (bmi < 24.9) category = "Bình thường";
    else if (bmi < 29.9) category = "Thừa cân";
    else category = "Béo phì";

    // 4. Tính BMR (Mifflin-St Jeor)
    let bmr = 0;
    if (this.userData.gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // 5. Tính TDEE & Target Calories
    // Activity Multipliers: 1.2, 1.375, 1.55, 1.725
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
    };
    
    const multiplier = activityMultipliers[this.userData.activityLevel] || 1.2;
    const tdee = Math.round(bmr * multiplier);
    
    // Mục tiêu: Giảm cân nhẹ (TDEE - 300) hoặc giữ cân (TDEE)
    // Ở đây để mặc định là giữ cân hoặc giảm nhẹ tuỳ logic bạn muốn. 
    // Ví dụ: Giảm 10% để healthy
    const targetCalories = Math.round(tdee * 0.9); 

    this.userData.tdee = tdee;
    this.userData.targetCalories = targetCalories;

    // 6. HIỂN THỊ KẾT QUẢ RA GIAO DIỆN MỚI
    const bmiValueEl = document.getElementById("bmiValue");
    const bmiCategoryEl = document.getElementById("bmiCategory");
    const bmrValueEl = document.getElementById("bmrValue");
    const tdeeValueEl = document.getElementById("tdeeValue");
    const targetCaloriesEl = document.getElementById("targetCalories");
    const resultCard = document.getElementById("bmiResult");

    if (bmiValueEl) bmiValueEl.innerText = bmi;
    if (bmiCategoryEl) bmiCategoryEl.innerText = category;
    
    // Format số có dấu phẩy (ví dụ: 1,500)
    if (bmrValueEl) bmrValueEl.innerText = bmr.toLocaleString();
    if (tdeeValueEl) tdeeValueEl.innerText = tdee.toLocaleString();
    if (targetCaloriesEl) targetCaloriesEl.innerText = targetCalories.toLocaleString();

    // Hiển thị thẻ kết quả (QUAN TRỌNG: display flex để giữ layout ngang)
    if (resultCard) {
      resultCard.style.display = "flex";
      // Cuộn xuống để người dùng thấy kết quả trên mobile
      resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Lưu dữ liệu
    this.updateNutritionTargets();
    this.saveData();
    this.closeSettingsModal();
    this.showToast("Đã tính toán BMI & Nhu cầu Calo thành công!");
  },

  displayBMIResult() {
    // 1. Kiểm tra dữ liệu
    if (!this.userData.bmi) return;

    // 2. Cập nhật các số liệu (Dùng đúng ID trong HTML mới)
    const elements = {
      "bmiValue": this.userData.bmi,
      "tdeeValue": this.userData.tdee ? this.userData.tdee.toLocaleString() : 0,
      "targetCalories": this.userData.targetCalories ? this.userData.targetCalories.toLocaleString() : 0
    };

    // Vòng lặp gán giá trị tránh lỗi null
    for (const [id, value] of Object.entries(elements)) {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    }

    // 3. Tính toán và hiển thị lại Category (Phân loại)
    const bmi = parseFloat(this.userData.bmi);
    let category = "";
    if (bmi < 18.5) category = "Thiếu cân";
    else if (bmi < 24.9) category = "Bình thường";
    else if (bmi < 29.9) category = "Thừa cân";
    else category = "Béo phì";

    const categoryEl = document.getElementById("bmiCategory");
    if (categoryEl) categoryEl.textContent = category;

    // 4. Tính lại và hiển thị BMR (vì BMR không được lưu trong database nên cần tính lại để hiển thị)
    if (this.userData.weight && this.userData.height && this.userData.age && this.userData.gender) {
        let bmr = 0;
        if (this.userData.gender === "male") {
            bmr = 10 * this.userData.weight + 6.25 * this.userData.height - 5 * this.userData.age + 5;
        } else {
            bmr = 10 * this.userData.weight + 6.25 * this.userData.height - 5 * this.userData.age - 161;
        }
        const bmrEl = document.getElementById("bmrValue");
        if (bmrEl) bmrEl.textContent = Math.round(bmr).toLocaleString();
    }

    // 5. Hiển thị khung kết quả
    const resultCard = document.getElementById("bmiResult");
    if (resultCard) {
      resultCard.style.display = "flex"; // Bắt buộc dùng flex để không bị vỡ giao diện
    }
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
      // Lưu ý: mealData.name phải khớp với tên key trong recipesDB
      return `
                <div class="meal-slot-content">
                    <span class="meal-emoji">${mealData.emoji || '🥘'}</span>
                    <div>
                        <div class="meal-name" style="font-weight:600; font-size: 0.7rem;">${mealData.name}</div>
                        <div class="meal-calories" style="font-size: 0.8rem; color: var(--text-muted);">${mealData.calories} kcal</div>
                    </div>
                </div>
                
                <div class="meal-actions" style="display: flex; gap: 5px;">
                    <button class="detail-meal-btn" 
        type="button" 
        onclick="event.preventDefault(); event.stopPropagation(); showRecipeDetails('${mealData.name}')"
        title="Xem công thức"
        >!
</button>

                    <button class="remove-meal-btn" 
                            onclick="event.stopPropagation(); removeMeal('${day}', '${meal}')"
                            title="Xóa món">
                        ✕
                    </button>
                </div>
            `;
    }

    return `<div class="add-meal-icon" style="font-size: 1.5rem; color: var(--text-muted);">+</div>`;
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
      // --- CODE CŨ (Xóa đi) ---
      // const confirmOpen = confirm("...");
      // if (confirmOpen) { this.openSettingsModal(); }
      
      // --- CODE MỚI (Thay bằng dòng này) ---
      this.openWarningModal(); 
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
window.openWarningModal = () => MealPlanner.openWarningModal();
window.closeWarningModal = () => MealPlanner.closeWarningModal();
window.confirmOpenSettings = () => MealPlanner.confirmOpenSettings();

document.addEventListener("DOMContentLoaded", () => {
  MealPlanner.init();
});
