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
// ==========================================
// 4. DAILY DUA CAROUSEL LOGIC
// ==========================================
(function () {
  // Wrap in IIFE or just paste inside your DOMContentLoaded event

  const duaCollection = [
    {
      title: "For Knowledge",
      arabic: "رَّبِّ زِدْنِي عِلْمًا",
      trans: "Rabbi zidni 'ilma",
      meaning: "My Lord, increase me in knowledge.",
    },
    {
      title: "For Forgiveness",
      arabic: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ",
      trans: "Rabbana aghfir li wa liwalidayya",
      meaning: "Our Lord! Forgive me and my parents.",
    },
    {
      title: "For Goodness",
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
      trans: "Rabbana atina fid-dunya hasanah",
      meaning: "Our Lord, give us in this world [that which is] good.",
    },
    {
      title: "For Patience",
      arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا",
      trans: "Rabbana afrigh 'alayna sabra",
      meaning: "Our Lord, pour upon us patience.",
    },
    {
      title: "For Protection",
      arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ",
      trans: "Bismillahil-ladhi la yadurru...",
      meaning: "In the Name of Allah with Whose Name nothing can harm.",
    },
  ];

  const duaWrapper = document.getElementById("dua-wrapper");
  const duaIndicators = document.getElementById("dua-indicators");
  let currentDuaIndex = 0;
  let duaInterval;

  // Only run if elements exist
  if (duaWrapper && duaIndicators) {
    // 1. Generate Slides & Dots
    duaWrapper.innerHTML = ""; // Clean slate
    duaIndicators.innerHTML = "";

    duaCollection.forEach((dua, index) => {
      // Create Slide Item
      const slide = document.createElement("div");
      // 'min-w-full' ensures each slide takes full width of the container
      slide.className =
        "min-w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 select-none";
      slide.innerHTML = `
                <span class="text-[10px] text-emerald-500 font-bold uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded mb-1">${dua.title}</span>
                <h2 class="font-amiri text-2xl md:text-3xl text-gray-800 leading-relaxed dir-rtl" dir="rtl">${dua.arabic}</h2>
                <p class="text-xs text-emerald-600 font-medium italic mt-1">${dua.trans}</p>
                <p class="text-sm text-gray-500 max-w-[95%] leading-snug mt-1">"${dua.meaning}"</p>
            `;
      duaWrapper.appendChild(slide);

      // Create Dot Indicator
      const dot = document.createElement("div");
      dot.className = `w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
        index === 0 ? "bg-emerald-500" : "bg-emerald-200"
      }`;
      duaIndicators.appendChild(dot);
    });

    // 2. Slide Function
    const slideToNext = () => {
      currentDuaIndex = (currentDuaIndex + 1) % duaCollection.length;
      updateCarousel();
    };

    const updateCarousel = () => {
      // Slide the wrapper by translating X based on index
      duaWrapper.style.transform = `translateX(-${currentDuaIndex * 100}%)`;

      // Update active dot color
      const dots = duaIndicators.children;
      Array.from(dots).forEach((dot, idx) => {
        dot.className = `w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
          idx === currentDuaIndex ? "bg-emerald-500" : "bg-emerald-200"
        }`;
      });
    };

    // 3. Start Timer (Change every 4 seconds)
    duaInterval = setInterval(slideToNext, 4000);

    // 4. Pause on Hover (Better User Experience)
    // Find the parent card to listen for mouse events
    const cardContainer = duaWrapper.closest(".group");
    if (cardContainer) {
      cardContainer.addEventListener("mouseenter", () =>
        clearInterval(duaInterval)
      );
      cardContainer.addEventListener(
        "mouseleave",
        () => (duaInterval = setInterval(slideToNext, 4000))
      );
    }
  }
})();
// ==========================================
// 5. 99 NAMES CAROUSEL LOGIC (Fixed Indicators)
// ==========================================
(function () {
  const namesCollection = [
    { arabic: "ٱلرَّحْمَٰن", trans: "Ar-Rahman", meaning: "The Most Merciful" },
    {
      arabic: "ٱلرَّحِيم",
      trans: "Ar-Rahim",
      meaning: "The Most Compassionate",
    },
    { arabic: "ٱلْمَلِك", trans: "Al-Malik", meaning: "The King" },
    { arabic: "ٱلْقُدُّوس", trans: "Al-Quddus", meaning: "The Most Pure" },
    { arabic: "ٱلسَّلَام", trans: "As-Salam", meaning: "The Source of Peace" },
    {
      arabic: "ٱلْمُؤْمِن",
      trans: "Al-Mu’min",
      meaning: "The Giver of Security",
    },
    { arabic: "ٱلْمُهَيْمِن", trans: "Al-Muhaymin", meaning: "The Protector" },
    { arabic: "ٱلْعَزِيز", trans: "Al-Aziz", meaning: "The Almighty" },
    { arabic: "ٱلْجَبَّار", trans: "Al-Jabbar", meaning: "The Compeller" },
    {
      arabic: "ٱلْمُتَكَبِّر",
      trans: "Al-Mutakabbir",
      meaning: "The Supremely Great",
    },

    { arabic: "ٱلْخَالِق", trans: "Al-Khaliq", meaning: "The Creator" },
    { arabic: "ٱلْبَارِئ", trans: "Al-Bari'", meaning: "The Evolver" },
    { arabic: "ٱلْمُصَوِّر", trans: "Al-Musawwir", meaning: "The Fashioner" },
    { arabic: "ٱلْغَفَّار", trans: "Al-Ghaffar", meaning: "The All-Forgiving" },
    { arabic: "ٱلْقَهَّار", trans: "Al-Qahhar", meaning: "The All-Subduer" },
    { arabic: "ٱلْوَهَّاب", trans: "Al-Wahhab", meaning: "The Bestower" },
    { arabic: "ٱلرَّزَّاق", trans: "Ar-Razzaq", meaning: "The Provider" },
    { arabic: "ٱلْفَتَّاح", trans: "Al-Fattah", meaning: "The Opener" },
    { arabic: "ٱلْعَلِيم", trans: "Al-'Alim", meaning: "The All-Knowing" },

    { arabic: "ٱلْقَابِض", trans: "Al-Qabid", meaning: "The Withholder" },
    { arabic: "ٱلْبَاسِط", trans: "Al-Basit", meaning: "The Expander" },
    { arabic: "ٱلْخَافِض", trans: "Al-Khafid", meaning: "The Abaser" },
    { arabic: "ٱلرَّافِع", trans: "Ar-Rafi'", meaning: "The Exalter" },
    { arabic: "ٱلْمُعِزّ", trans: "Al-Mu'izz", meaning: "The Giver of Honor" },
    {
      arabic: "ٱلْمُذِلّ",
      trans: "Al-Mudhill",
      meaning: "The Giver of Dishonor",
    },
    { arabic: "ٱلسَّمِيع", trans: "As-Sami'", meaning: "The All-Hearing" },
    { arabic: "ٱلْبَصِير", trans: "Al-Basir", meaning: "The All-Seeing" },
    { arabic: "ٱلْحَكَم", trans: "Al-Hakam", meaning: "The Judge" },
    { arabic: "ٱلْعَدْل", trans: "Al-'Adl", meaning: "The Utterly Just" },

    { arabic: "ٱللَّطِيف", trans: "Al-Latif", meaning: "The Most Subtle" },
    { arabic: "ٱلْخَبِير", trans: "Al-Khabir", meaning: "The All-Aware" },
    { arabic: "ٱلْحَلِيم", trans: "Al-Halim", meaning: "The Most Forbearing" },
    { arabic: "ٱلْعَظِيم", trans: "Al-'Azim", meaning: "The Magnificent" },
    { arabic: "ٱلْغَفُور", trans: "Al-Ghafur", meaning: "The Most Forgiving" },
    {
      arabic: "ٱلشَّكُور",
      trans: "Ash-Shakur",
      meaning: "The Most Appreciative",
    },
    { arabic: "ٱلْعَلِيّ", trans: "Al-'Aliyy", meaning: "The Most High" },
    { arabic: "ٱلْكَبِير", trans: "Al-Kabir", meaning: "The Most Great" },
    { arabic: "ٱلْحَفِيظ", trans: "Al-Hafiz", meaning: "The Preserver" },
    { arabic: "ٱلْمُقِيت", trans: "Al-Muqit", meaning: "The Sustainer" },

    { arabic: "ٱلْحَسِيب", trans: "Al-Hasib", meaning: "The Reckoner" },
    { arabic: "ٱلْجَلِيل", trans: "Al-Jalil", meaning: "The Majestic" },
    { arabic: "ٱلْكَرِيم", trans: "Al-Karim", meaning: "The Most Generous" },
    { arabic: "ٱلرَّقِيب", trans: "Ar-Raqib", meaning: "The Watchful" },
    { arabic: "ٱلْمُجِيب", trans: "Al-Mujib", meaning: "The Responsive" },
    { arabic: "ٱلْوَاسِع", trans: "Al-Wasi'", meaning: "The All-Encompassing" },
    { arabic: "ٱلْحَكِيم", trans: "Al-Hakim", meaning: "The All-Wise" },
    { arabic: "ٱلْوَدُود", trans: "Al-Wadud", meaning: "The Most Loving" },
    { arabic: "ٱلْمَجِيد", trans: "Al-Majid", meaning: "The Glorious" },

    { arabic: "ٱلْبَاعِث", trans: "Al-Ba'ith", meaning: "The Resurrector" },
    { arabic: "ٱلشَّهِيد", trans: "Ash-Shahid", meaning: "The All-Witnessing" },
    { arabic: "ٱلْحَقّ", trans: "Al-Haqq", meaning: "The Absolute Truth" },
    { arabic: "ٱلْوَكِيل", trans: "Al-Wakil", meaning: "The Trustee" },
    { arabic: "ٱلْقَوِيّ", trans: "Al-Qawiyy", meaning: "The All-Powerful" },
    { arabic: "ٱلْمَتِين", trans: "Al-Matin", meaning: "The Firm" },
    {
      arabic: "ٱلْوَلِيّ",
      trans: "Al-Waliyy",
      meaning: "The Protecting Friend",
    },
    { arabic: "ٱلْحَمِيد", trans: "Al-Hamid", meaning: "The Praiseworthy" },
    { arabic: "ٱلْمُحْصِي", trans: "Al-Muhsi", meaning: "The Accounter" },

    { arabic: "ٱلْمُبْدِئ", trans: "Al-Mubdi'", meaning: "The Originator" },
    { arabic: "ٱلْمُعِيد", trans: "Al-Mu'id", meaning: "The Restorer" },
    { arabic: "ٱلْمُحْيِي", trans: "Al-Muhyi", meaning: "The Giver of Life" },
    { arabic: "ٱلْمُمِيت", trans: "Al-Mumit", meaning: "The Giver of Death" },
    { arabic: "ٱلْحَيّ", trans: "Al-Hayy", meaning: "The Ever-Living" },
    { arabic: "ٱلْقَيُّوم", trans: "Al-Qayyum", meaning: "The Self-Existing" },
    { arabic: "ٱلْوَاحِد", trans: "Al-Wahid", meaning: "The One" },
    { arabic: "ٱلصَّمَد", trans: "As-Samad", meaning: "The Self-Sufficient" },
    { arabic: "ٱلْقَادِر", trans: "Al-Qadir", meaning: "The All-Powerful" },
    { arabic: "ٱلْمُقْتَدِر", trans: "Al-Muqtadir", meaning: "The Determiner" },

    { arabic: "ٱلْمُقَدِّم", trans: "Al-Muqaddim", meaning: "The Promoter" },
    { arabic: "ٱلْمُؤَخِّر", trans: "Al-Mu'akhkhir", meaning: "The Delayer" },
    { arabic: "ٱلأَوَّل", trans: "Al-Awwal", meaning: "The First" },
    { arabic: "ٱلْآخِر", trans: "Al-Akhir", meaning: "The Last" },
    { arabic: "ٱلظَّاهِر", trans: "Az-Zahir", meaning: "The Manifest" },
    { arabic: "ٱلْبَاطِن", trans: "Al-Batin", meaning: "The Hidden" },
    { arabic: "ٱلْمُتَعَالِي", trans: "Al-Muta'ali", meaning: "The Exalted" },
    { arabic: "ٱلْبَرّ", trans: "Al-Barr", meaning: "The Source of Goodness" },
    {
      arabic: "ٱلتَّوَّاب",
      trans: "At-Tawwab",
      meaning: "The Accepter of Repentance",
    },
    { arabic: "ٱلصَّبُور", trans: "As-Sabur", meaning: "The Most Patient" },
  ];

  const namesWrapper = document.getElementById("names-wrapper");
  const namesIndicators = document.getElementById("names-indicators");
  let currentIndex = 0;
  let namesInterval;

  if (namesWrapper && namesIndicators) {
    // 1. Generate Slides (Standard logic)
    namesWrapper.innerHTML = "";

    // CHANGE: No longer generating dots here!
    // We just set up the slides.
    namesCollection.forEach((item, index) => {
      const slide = document.createElement("div");
      slide.className =
        "min-w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 select-none";
      slide.innerHTML = `
            <div class="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-2 border border-emerald-100">
                <span class="text-emerald-300 font-bold opacity-50 text-xl">${
                  index + 1
                }</span>
            </div>
            <h2 class="font-amiri text-4xl text-emerald-800 font-bold mb-1 drop-shadow-sm">${
              item.arabic
            }</h2>
            <h3 class="text-lg font-bold text-gray-700 tracking-wide">${
              item.trans
            }</h3>
            <p class="text-sm text-gray-500 italic">"${item.meaning}"</p>
        `;
      namesWrapper.appendChild(slide);
    });

    // 2. Logic to Update Carousel AND Counter
    const slideToNextName = () => {
      currentIndex = (currentIndex + 1) % namesCollection.length;
      updateNamesCarousel();
    };

    const updateNamesCarousel = () => {
      // Move the slides
      namesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

      // CHANGE: Instead of highlighting a dot, we update the Text Counter
      // e.g. "1 / 99"
      namesIndicators.innerHTML = `
        <span class="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            ${currentIndex + 1} / ${namesCollection.length}
        </span>
      `;
    };

    // Initialize the counter text immediately
    updateNamesCarousel();

    // 3. Timer (3.0s)
    namesInterval = setInterval(slideToNextName, 3000);

    // 4. Pause on Hover
    const card = namesWrapper.closest(".group");
    if (card) {
      card.addEventListener("mouseenter", () => clearInterval(namesInterval));
      card.addEventListener(
        "mouseleave",
        () => (namesInterval = setInterval(slideToNextName, 3000))
      );
    }
  }
})();
// ==========================================
// 6. MOMENT OF SAKINAH (Breathing Dhikr)
// ==========================================
(function () {
  const circle = document.getElementById("breath-circle");
  const ring1 = document.getElementById("breath-ring-1");
  const ring2 = document.getElementById("breath-ring-2");
  const playIcon = document.getElementById("breath-play-icon");
  const textContainer = document.getElementById("breath-text-container");
  const instructionEl = document.getElementById("breath-instruction");
  const dhikrEl = document.getElementById("breath-dhikr");

  let isBreathing = false;
  let breathInterval;

  if (circle) {
    circle.addEventListener("click", () => {
      if (!isBreathing) {
        startBreathing();
      } else {
        stopBreathing();
      }
    });
  }

  function startBreathing() {
    isBreathing = true;

    // Hide Play Button, Show Text
    playIcon.classList.add("opacity-0");
    textContainer.classList.remove("opacity-0");

    // Immediate First Breath
    runBreathCycle();

    // Loop every 8 seconds (4s Inhale + 4s Exhale)
    breathInterval = setInterval(runBreathCycle, 8000);
  }

  function stopBreathing() {
    isBreathing = false;
    clearInterval(breathInterval);

    // Reset Visuals
    playIcon.classList.remove("opacity-0");
    textContainer.classList.add("opacity-0");

    // Remove Animation Classes
    circle.classList.remove("breath-active", "duration-[4000ms]");
    ring1.classList.remove("ring-active", "duration-[4000ms]");
    ring2.classList.remove("ring-active", "duration-[4000ms]");

    // Quick Reset transition
    circle.style.transition = "all 0.5s ease-out";
    circle.style.transform = "scale(1)";
  }

  function runBreathCycle() {
    // 1. INHALE PHASE (0s - 4s)
    instructionEl.textContent = "Inhale...";
    dhikrEl.textContent = "SubhanAllah";

    // Add smooth long transition for expansion
    circle.style.transition = "all 4s ease-in-out";
    ring1.style.transition = "all 4s ease-out";
    ring2.style.transition = "all 4s ease-out";

    // Add Active Classes (Grow)
    circle.classList.add("breath-active");
    ring1.classList.add("ring-active");
    ring2.classList.add("ring-active");

    // 2. EXHALE PHASE (4s - 8s)
    // We use setTimeout to trigger the exhale halfway through the loop
    setTimeout(() => {
      if (!isBreathing) return;

      instructionEl.textContent = "Exhale...";
      dhikrEl.textContent = "Alhamdulillah";

      // Remove Active Classes (Shrink)
      circle.classList.remove("breath-active");
      ring1.classList.remove("ring-active");
      ring2.classList.remove("ring-active");
    }, 4000); // 4000ms = 4 seconds
  }
})();
// ==========================================
// 7. THE QURANIC CURE (Mood Selector)
// ==========================================
(function () {
  // Data Store
  const verses = {
    sad: {
      arabic: "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
      trans: "Allah does not burden a soul beyond that it can bear.",
      ref: "Surah Al-Baqarah (2:286)",
    },
    anxious: {
      arabic: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
      trans: "Unquestionably, by the remembrance of Allah do hearts find rest.",
      ref: "Surah Ar-Ra'd (13:28)",
    },
    lonely: {
      arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ ٱلْوَرِيدِ",
      trans: "And We are closer to him than [his] jugular vein.",
      ref: "Surah Qaf (50:16)",
    },
    happy: {
      arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
      trans: "If you are grateful, I will surely increase you [in favor].",
      ref: "Surah Ibrahim (14:7)",
    },
    sinful: {
      arabic: "إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا",
      trans:
        "Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.",
      ref: "Surah Az-Zumar (39:53)",
    },
    lost: {
      arabic: "وَوَجَدَكَ ضَآلًّا فَهَدَىٰ",
      trans: "And He found you lost and guided [you].",
      ref: "Surah Ad-Duha (93:7)",
    },
  };

  const buttons = document.querySelectorAll(".mood-btn");
  const card = document.getElementById("cure-card");
  const emotionEl = document.getElementById("cure-emotion");
  const arabicEl = document.getElementById("cure-arabic");
  const transEl = document.getElementById("cure-translation");
  const refEl = document.getElementById("cure-reference");

  if (buttons.length > 0 && card) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const mood = btn.getAttribute("data-mood");
        const data = verses[mood];

        // 1. Highlight Active Button
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // 2. Hide Card (if open) to create transition effect
        card.classList.add("opacity-0", "translate-y-4");
        card.classList.remove("hidden");

        // 3. Update Content after a tiny delay (to allow fade out if switching)
        setTimeout(() => {
          emotionEl.textContent = `For when you feel ${mood}...`;
          arabicEl.textContent = data.arabic;
          transEl.textContent = `"${data.trans}"`;
          refEl.textContent = data.ref;

          // 4. Show Card
          card.classList.remove("opacity-0", "translate-y-4");
        }, 200);
      });
    });
  }
})();
// ==========================================
// 8. SHUKR JOURNAL (Gratitude List)
// ==========================================
(function () {
  const input = document.getElementById("shukr-input");
  const btn = document.getElementById("shukr-btn");
  const list = document.getElementById("shukr-list");
  const emptyState = document.getElementById("shukr-empty");
  const STORAGE_KEY = "shukr_entries";

  // Load entries from storage
  let entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  function renderList() {
    if (!list) return;

    list.innerHTML = "";

    if (entries.length === 0) {
      emptyState.style.display = "block";
    } else {
      emptyState.style.display = "none";

      // Show newest first
      entries
        .slice()
        .reverse()
        .forEach((entry, index) => {
          // Determine original index for deletion
          const originalIndex = entries.length - 1 - index;

          const li = document.createElement("li");
          li.className =
            "shukr-entry bg-emerald-50/50 border border-emerald-100 rounded-lg p-4 flex justify-between items-center group hover:bg-emerald-50 transition-colors";

          li.innerHTML = `
                    <div class="flex items-center gap-3">
                        <div class="h-2 w-2 rounded-full bg-emerald-400"></div>
                        <span class="text-gray-700 font-medium text-sm md:text-base">${entry.text}</span>
                    </div>
                    <button onclick="deleteShukr(${originalIndex})" class="text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100 p-1" aria-label="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                `;
          list.appendChild(li);
        });
    }
  }

  function addEntry() {
    const text = input.value.trim();
    if (text) {
      entries.push({ text: text, date: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      input.value = "";
      renderList();
    }
  }

  // Expose delete function globally so the inline onclick works
  window.deleteShukr = function (index) {
    entries.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    renderList();
  };

  if (btn && input) {
    renderList();

    btn.addEventListener("click", addEntry);

    // Allow pressing "Enter" to save
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addEntry();
    });
  }
})();
// ==========================================
// QURAN EXPLORER (ALQURAN.CLOUD API)
// ==========================================
(function () {
  const trigger = document.getElementById("quran-card-trigger");
  const modal = document.getElementById("quran-modal");
  const closeBtn = document.getElementById("close-quran");
  const backBtn = document.getElementById("back-to-list");
  const listGrid = document.getElementById("surah-list-grid");
  const readingView = document.getElementById("reading-view");
  const ayahList = document.getElementById("ayah-list");

  if (!trigger) return;

  trigger.onclick = () => {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    fetchSurahList();
  };

  closeBtn.onclick = () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  backBtn.onclick = () => {
    readingView.classList.add("hidden");
    listGrid.classList.remove("hidden");
    backBtn.classList.add("hidden");
  };

  async function fetchSurahList() {
    if (listGrid.innerHTML !== "") return;
    listGrid.innerHTML =
      '<div class="col-span-full text-center py-20 text-emerald-600">Loading Surahs...</div>';
    try {
      const res = await fetch("https://api.alquran.cloud/v1/surah");
      const data = await res.json();
      listGrid.innerHTML = data.data
        .map(
          (s) => `
                <div onclick="openSurah(${s.number})" class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-emerald-500 transition-all flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <div class="w-8 h-8 bg-emerald-100 rounded text-emerald-700 flex items-center justify-center font-bold text-xs">${s.number}</div>
                        <div>
                            <h4 class="font-bold text-gray-800">${s.englishName}</h4>
                            <p class="text-[10px] text-gray-400 uppercase">${s.englishNameTranslation}</p>
                        </div>
                    </div>
                    <p class="font-amiri text-lg text-emerald-900">${s.name}</p>
                </div>
            `
        )
        .join("");
    } catch (e) {
      listGrid.innerHTML = "Error loading Quran.";
    }
  }

  window.openSurah = async function (num) {
    listGrid.classList.add("hidden");
    readingView.classList.remove("hidden");
    backBtn.classList.remove("hidden");

    const ayahsContainer = document.getElementById("ayah-list");
    ayahsContainer.innerHTML =
      '<div class="text-center py-20 text-emerald-600 animate-pulse font-bold">Opening Surah...</div>';
    document
      .getElementById("quran-view-container")
      .scrollTo({ top: 0, behavior: "smooth" });

    try {
      const [arRes, enRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${num}`),
        fetch(`https://api.alquran.cloud/v1/surah/${num}/en.sahih`),
      ]);

      const arData = await arRes.json();
      const enData = await enRes.json();
      const surah = arData.data;

      // 1. Uniform Header for all Surahs
      const bismillahText = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

      document.getElementById("reading-header").innerHTML = `
            <div class="mb-12 text-center">
                <span class="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-200">Surah ${surah.number}</span>
                <h1 class="font-amiri text-6xl text-emerald-900 my-6">${surah.name}</h1>
                <p class="text-gray-500 mb-8">${surah.englishName} • ${surah.numberOfAyahs} Ayahs</p>
                
                <div class="py-4">
                    <p class="font-amiri text-4xl text-emerald-800">${bismillahText}</p>
                    <p class="text-[11px] text-gray-400 mt-2 italic">In the name of Allah, the Entirely Merciful, the Especially Merciful</p>
                </div>

                <div class="mt-8 bg-white p-3 rounded-2xl shadow-sm border border-emerald-50 max-w-xs mx-auto">
                    <audio controls class="w-full h-10">
                        <source src="https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${num}.mp3">
                    </audio>
                </div>
            </div>
        `;

      // 2. Render Ayahs without repeating Bismillah
      ayahsContainer.innerHTML = surah.ayahs
        .map((ayah, i) => {
          let arabicText = ayah.text;

          // Remove Bismillah from the first ayah if it's not Surah Al-Fatiha (1) or At-Tawbah (9)
          // The API usually includes it in the text of the first ayah
          if (num !== 1 && num !== 9 && i === 0) {
            // This regex removes the Bismillah string if it appears at the start
            arabicText = arabicText.replace(bismillahText, "").trim();
          }

          return `
                <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <div class="flex flex-col gap-6">
                        <h2 class="font-amiri text-3xl md:text-4xl text-right leading-[2.6] text-gray-800" dir="rtl">
                            ${arabicText} <span class="text-emerald-500/50 font-serif ml-2 text-2xl">۝</span>
                        </h2>
                        <div class="border-l-2 border-emerald-100 pl-4 py-1">
                            <span class="text-[10px] font-bold text-emerald-300 uppercase mb-1 block">Verse ${ayah.numberInSurah}</span>
                            <p class="text-gray-600 text-sm md:text-base italic leading-relaxed">
                                ${enData.data.ayahs[i].text}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        })
        .join("");
    } catch (e) {
      ayahsContainer.innerHTML = `<p class="text-center text-red-500">Error loading Surah.</p>`;
    }
  };
})();
// ==========================================
// 9. NIYYAH SETTER LOGIC
// ==========================================
(function () {
  const display = document.getElementById("display-niyyah");
  const customInput = document.getElementById("custom-niyyah");
  const buttons = document.querySelectorAll(".niyyah-btn");

  if (display && customInput) {
    // Handle Suggestion Buttons
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.getAttribute("data-niyyah");

        // Animate out
        display.style.opacity = "0";
        display.style.transform = "translateY(5px)";

        setTimeout(() => {
          display.textContent = `"${text}"`;
          display.style.opacity = "1";
          display.style.transform = "translateY(0)";
          customInput.value = ""; // Clear custom input if button clicked
        }, 300);
      });
    });

    // Handle Custom Input
    customInput.addEventListener("input", (e) => {
      const val = e.target.value;
      if (val.trim() !== "") {
        display.textContent = `"${val}"`;
      } else {
        display.textContent = "Click a suggestion or type your own below...";
      }
    });
  }
})();
