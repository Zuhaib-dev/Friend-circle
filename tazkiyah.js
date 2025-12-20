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
