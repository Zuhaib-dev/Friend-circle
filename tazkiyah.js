document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. DAILY HADITH
  // ==========================================
  const hadithCollection = [
    {
      arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
      urdu: "تمام اعمال کا دارومدار نیت پر ہے۔",
      source: "Sahih Al-Bukhari",
    },
    {
      arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
      urdu: "تم میں سے بہترین وہ ہے جو قرآن سیکھے اور سکھائے۔",
      source: "Sahih Al-Bukhari",
    },
    {
      arabic:
        "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
      urdu: "تم میں سے کوئی مومن نہیں ہو سکتا جب تک وہ اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔",
      source: "Sahih Muslim",
    },
    {
      arabic: "الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ",
      urdu: "دنیا مومن کے لیے قید خانہ اور کافر کے لیے جنت ہے۔",
      source: "Sahih Muslim",
    },
    {
      arabic: "أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا",
      urdu: "مومنوں میں سب سے کامل ایمان والا وہ ہے جس کا اخلاق سب سے اچھا ہو۔",
      source: "Sunan Abu Dawood",
    },

    {
      arabic:
        "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
      urdu: "جو اللہ اور آخرت پر ایمان رکھتا ہے وہ اچھی بات کہے یا خاموش رہے۔",
      source: "Sahih Al-Bukhari",
    },
    {
      arabic: "الطُّهُورُ شَطْرُ الْإِيمَانِ",
      urdu: "پاکیزگی ایمان کا نصف ہے۔",
      source: "Sahih Muslim",
    },
    {
      arabic: "الدِّينُ النَّصِيحَةُ",
      urdu: "دین خیرخواہی کا نام ہے۔",
      source: "Sahih Muslim",
    },
    {
      arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَٰنُ",
      urdu: "رحم کرنے والوں پر رحمٰن رحم فرماتا ہے۔",
      source: "Jami` at-Tirmidhi",
    },
    {
      arabic: "مَنْ لَا يَرْحَمْ لَا يُرْحَمْ",
      urdu: "جو رحم نہیں کرتا اس پر رحم نہیں کیا جاتا۔",
      source: "Sahih Al-Bukhari",
    },
    {
      arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",
      urdu: "اپنے بھائی کے چہرے پر مسکرانا صدقہ ہے۔",
      source: "Jami` at-Tirmidhi",
    },
    {
      arabic: "الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى",
      urdu: "اوپر والا ہاتھ نیچے والے ہاتھ سے بہتر ہے۔",
      source: "Sahih Al-Bukhari",
    },
    {
      arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
      urdu: "سب سے بہترین لوگ وہ ہیں جو لوگوں کو سب سے زیادہ فائدہ پہنچائیں۔",
      source: "Al-Mu'jam Al-Awsat",
    },
    {
      arabic: "مَنْ صَمَتَ نَجَا",
      urdu: "جو خاموش رہا وہ نجات پا گیا۔",
      source: "Musnad Ahmad",
    },
    {
      arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ",
      urdu: "جہاں کہیں بھی ہو اللہ سے ڈرو۔",
      source: "Jami` at-Tirmidhi",
    },
    {
      arabic: "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ",
      urdu: "بے شک اللہ خوبصورت ہے اور خوبصورتی کو پسند کرتا ہے۔",
      source: "Sahih Muslim",
    },
    {
      arabic: "الْمُؤْمِنُ مِرْآةُ الْمُؤْمِنِ",
      urdu: "مومن، مومن کا آئینہ ہوتا ہے۔",
      source: "Sunan Abu Dawood",
    },
    {
      arabic: "خَيْرُ الْأُمُورِ أَوْسَطُهَا",
      urdu: "تمام کاموں میں بہترین اعتدال ہے۔",
      source: "Al-Bayhaqi",
    },
    {
      arabic:
        "إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَلَا إِلَى أَجْسَادِكُمْ",
      urdu: "اللہ تمہاری شکلوں اور جسموں کو نہیں دیکھتا۔",
      source: "Sahih Muslim",
    },
    {
      arabic: "مَنْ دَلَّ عَلَى خَيْرٍ فَلَهُ مِثْلُ أَجْرِ فَاعِلِهِ",
      urdu: "جو کسی نیکی کی رہنمائی کرے اسے بھی وہی اجر ملتا ہے۔",
      source: "Sahih Muslim",
    },
  ];
  const arabicEl = document.getElementById("hadith-arabic");
  const urduEl = document.getElementById("hadith-urdu");
  const sourceEl = document.getElementById("hadith-source");

  if (arabicEl) {
    // Check if elements exist to avoid errors
    const todayDate = new Date();
    const startOfYear = new Date(todayDate.getFullYear(), 0, 0);
    const diff = todayDate - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const dailyIndex = dayOfYear % hadithCollection.length;
    const todaysHadith = hadithCollection[dailyIndex];

    arabicEl.textContent = todaysHadith.arabic;
    urduEl.textContent = todaysHadith.urdu;
    sourceEl.textContent = todaysHadith.source;
  }

  // ==========================================
  // 2. SUNNAH CHECKLIST LOGIC (New & Persistent)
  // ==========================================
  const checklistItems = document.querySelectorAll(".sunnah-item");
  const STORAGE_KEY_DATE = "sunnah_last_date";
  const STORAGE_KEY_STATE = "sunnah_checked_items";

  const getTodayString = () => {
    return new Date().toISOString().split("T")[0];
  };

  const lastDate = localStorage.getItem(STORAGE_KEY_DATE);
  const todayStr = getTodayString();

  if (lastDate !== todayStr) {
    // It's a new day! Clear the saved state
    localStorage.removeItem(STORAGE_KEY_STATE);
    localStorage.setItem(STORAGE_KEY_DATE, todayStr);
  }

  const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY_STATE)) || [];

  // Apply saved state to UI
  checklistItems.forEach((item, index) => {
    if (savedState.includes(index)) {
      item.classList.add("completed");
    }

    // 3. ADD CLICK LISTENERS
    item.addEventListener("click", () => {
      // Toggle visual class
      item.classList.toggle("completed");

      // Recalculate which items are checked
      const newCheckedIndices = [];
      checklistItems.forEach((el, i) => {
        if (el.classList.contains("completed")) {
          newCheckedIndices.push(i);
        }
      });

      // Save to LocalStorage
      localStorage.setItem(
        STORAGE_KEY_STATE,
        JSON.stringify(newCheckedIndices)
      );

      // Haptic feedback (Mobile)
      if (navigator.vibrate) navigator.vibrate(50);
    });
  });
});
// Digital  tasbih
document.addEventListener("DOMContentLoaded", () => {
  const dhikrs = [
    { arabic: "سبحان الله", trans: "SubhanAllah" },
    { arabic: "الحمد لله", trans: "Alhamdulillah" },
    { arabic: "الله أكبر", trans: "Allahu Akbar" },
    { arabic: "أستغفر الله", trans: "Astaghfirullah" },
    { arabic: "لا إله إلا الله", trans: "La ilaha illallah" },
  ];

  // Select Elements
  const countEl = document.getElementById("tasbih-count");
  const btnEl = document.getElementById("tasbih-btn");
  const resetEl = document.getElementById("tasbih-reset");
  const changeEl = document.getElementById("tasbih-change");
  const arabicEl = document.getElementById("tasbih-arabic");
  const transEl = document.getElementById("tasbih-transliteration");

  // State Variables
  let count = parseInt(localStorage.getItem("tasbih_count")) || 0;
  let currentDhikrIndex = parseInt(localStorage.getItem("tasbih_index")) || 0;

  // Helper: Update UI
  const updateTasbihUI = () => {
    // Update Text
    arabicEl.textContent = dhikrs[currentDhikrIndex].arabic;
    transEl.textContent = dhikrs[currentDhikrIndex].trans;

    // Update Count
    countEl.textContent = count;

    // Save to Storage
    localStorage.setItem("tasbih_count", count);
    localStorage.setItem("tasbih_index", currentDhikrIndex);
  };

  // Initialize UI
  if (countEl) updateTasbihUI();

  // 1. COUNT ACTION
  if (btnEl) {
    btnEl.addEventListener("click", (e) => {
      // Increment
      count++;

      // Haptic Feedback (Vibration for Mobile)
      if (navigator.vibrate) navigator.vibrate(25); // Short buzz

      // Button Animation (Optional Ripple Logic)
      btnEl.classList.remove("active");
      void btnEl.offsetWidth; // Trigger reflow
      btnEl.classList.add("active");

      updateTasbihUI();
    });
  }

  // 2. RESET ACTION
  if (resetEl) {
    resetEl.addEventListener("click", () => {
      if (confirm("Reset counter to 0?")) {
        count = 0;
        updateTasbihUI();
      }
    });
  }

  // 3. CHANGE DHIKR ACTION
  if (changeEl) {
    changeEl.addEventListener("click", () => {
      // Cycle through array
      currentDhikrIndex = (currentDhikrIndex + 1) % dhikrs.length;

      // Optional: Reset count on change?
      // Let's keep count continuous for now, or uncomment next line to reset:
      // count = 0;

      updateTasbihUI();
    });
  }
});
