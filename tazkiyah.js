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
// ==========================================
// SPIRITUAL GOAL TRACKER (WITH PERSISTENCE)
// ==========================================
(function () {
  const goalInput = document.getElementById("goal-input");
  const targetInput = document.getElementById("target-input");
  const setBtn = document.getElementById("set-goal-btn");
  const stepBtn = document.getElementById("step-btn");
  const resetBtn = document.getElementById("reset-goal");

  const displayTitle = document.getElementById("active-goal-title");
  const ring = document.getElementById("progress-ring");
  const currentText = document.getElementById("current-progress-text");
  const targetText = document.getElementById("target-progress-text");

  let state = {
    goalName: "",
    currentCount: 0,
    targetCount: 0,
  };

  // 1. Load Data from LocalStorage on Startup
  const loadData = () => {
    const saved = localStorage.getItem("muraqaba_goal");
    if (saved) {
      state = JSON.parse(saved);
      renderUI();
    }
  };

  // 2. Save Data to LocalStorage
  const saveData = () => {
    localStorage.setItem("muraqaba_goal", JSON.stringify(state));
  };

  // 3. Update the Visuals
  const renderUI = () => {
    const { goalName, currentCount, targetCount } = state;

    // Update Text
    displayTitle.textContent = goalName || "Set a goal to begin";
    currentText.textContent = currentCount;
    targetText.textContent = `Target: ${targetCount}`;

    // Update Progress Ring (Circumference is 251.2)
    const percent = targetCount > 0 ? (currentCount / targetCount) * 100 : 0;
    const offset = 251.2 - (Math.min(percent, 100) / 100) * 251.2;
    ring.style.strokeDashoffset = offset;

    // Success State
    if (currentCount >= targetCount && targetCount > 0) {
      displayTitle.innerHTML = `${goalName} <span class="block text-sm text-yellow-400 mt-2">Goal Achieved! ✨</span>`;
      stepBtn.classList.add("opacity-50", "pointer-events-none");
    } else {
      stepBtn.classList.remove("opacity-50", "pointer-events-none");
    }
  };

  // 4. Event Listeners
  setBtn.addEventListener("click", () => {
    const name = goalInput.value.trim();
    const target = parseInt(targetInput.value);

    if (name && target > 0) {
      state = {
        goalName: name,
        currentCount: 0,
        targetCount: target,
      };
      saveData();
      renderUI();

      // Visual feedback on button
      const originalText = setBtn.textContent;
      setBtn.textContent = "Goal Set!";
      setTimeout(() => (setBtn.textContent = originalText), 1500);
    }
  });

  stepBtn.addEventListener("click", () => {
    if (state.currentCount < state.targetCount) {
      state.currentCount++;
      saveData();
      renderUI();
      if (navigator.vibrate) navigator.vibrate(20);
    }
  });

  resetBtn.addEventListener("click", () => {
    if (confirm("Do you want to clear your current goal?")) {
      state = { goalName: "", currentCount: 0, targetCount: 0 };
      localStorage.removeItem("muraqaba_goal");
      goalInput.value = "";
      targetInput.value = 1;
      renderUI();
    }
  });

  // Initialize
  loadData();
})();
// ==========================================
// SABR POMODORO WITH PiP MODE
// ==========================================
(function () {
  let timeLeft = 25 * 60;
  let timerId = null;
  const display = document.getElementById("pomodoro-timer");
  const startBtn = document.getElementById("pomodoro-start");
  const pipBtn = document.getElementById("pomodoro-pip");
  const resetBtn = document.getElementById("pomodoro-reset");
  const video = document.getElementById("pomodoro-video");
  const canvas = document.getElementById("pomodoro-canvas");
  const ctx = canvas.getContext("2d");

  // 1. Logic to format time
  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // 2. Logic to Draw Timer to Canvas (for PiP)
  const updateCanvas = () => {
    ctx.fillStyle = "#064e3b"; // Emerald 950
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 80px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      formatTime(timeLeft),
      canvas.width / 2,
      canvas.height / 2 + 20
    );
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#34d399";
    ctx.fillText("Sabr Session", canvas.width / 2, canvas.height / 2 + 80);
  };

  // 3. Start/Stop Timer
  const toggleTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
      startBtn.textContent = "Resume Session";
    } else {
      startBtn.textContent = "Pause Session";
      timerId = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          display.textContent = formatTime(timeLeft);
          updateCanvas();
        } else {
          clearInterval(timerId);
          alert("Time for a break! Take a moment for Zikr.");
        }
      }, 1000);
    }
  };

  // 4. Picture-in-Picture Trigger
  pipBtn.addEventListener("click", async () => {
    try {
      const stream = canvas.captureStream();
      video.srcObject = stream;
      await video.play();
      await video.requestPictureInPicture();
    } catch (error) {
      console.error("PiP failed", error);
    }
  });

  startBtn.addEventListener("click", toggleTimer);

  resetBtn.addEventListener("click", () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60;
    display.textContent = formatTime(timeLeft);
    startBtn.textContent = "Start Session";
    updateCanvas();
  });

  // Initial canvas draw
  updateCanvas();
})();
// ==========================================
// DAILY MUHASABAH LOGIC
// ==========================================
(function () {
  const checks = document.querySelectorAll(".muhasabah-check");
  const ring = document.getElementById("score-ring");
  const percentText = document.getElementById("score-percent");
  const feedback = document.getElementById("score-feedback");
  const resetBtn = document.getElementById("reset-muhasabah");

  const updateScore = (isInitial = false) => {
    let total = 0;
    let checkedCount = 0;

    checks.forEach((check, index) => {
      if (isInitial) {
        // Restore state from storage
        const savedState = localStorage.getItem(`muhasabah_check_${index}`);
        if (savedState === "true") check.checked = true;
      } else {
        // Save state to storage
        localStorage.setItem(`muhasabah_check_${index}`, check.checked);
      }

      if (check.checked) {
        total += parseInt(check.getAttribute("data-weight"));
        checkedCount++;
      }
    });

    // Update UI
    const circumference = 276.5; // 2 * pi * 44
    const offset = circumference - (total / 100) * circumference;
    ring.style.strokeDashoffset = offset;
    percentText.textContent = `${total}%`;

    // Feedback Logic
    if (total === 0) feedback.textContent = "Awaiting your reflection...";
    else if (total < 40) feedback.textContent = "Every small step counts.";
    else if (total < 80)
      feedback.textContent = "Alhamdulillah, a productive day!";
    else if (total <= 100)
      feedback.textContent = "Ma Sha Allah, a blessed day!";
  };

  checks.forEach((check) => {
    check.addEventListener("change", () => {
      updateScore();
      if (navigator.vibrate) navigator.vibrate(10);
    });
  });

  resetBtn.addEventListener("click", () => {
    if (confirm("Reset today's progress?")) {
      checks.forEach((check, index) => {
        check.checked = false;
        localStorage.removeItem(`muhasabah_check_${index}`);
      });
      updateScore();
    }
  });

  // Initialize
  updateScore(true);
})();
// ==========================================
// PURIFICATION GUIDES (Wudu/Ghusl Modal)
// ==========================================
(function () {
  const guidesData = {
    wudu: {
      title: "How to Perform Wudu",
      subtitle: "The Sunnah Method",
      steps: [
        {
          title: "Niyyah (Intention)",
          desc: "Make the intention in your heart to perform Wudu for the sake of Allah. Say 'Bismillah'.",
        },
        {
          title: "Hands",
          desc: "Wash both hands up to the wrists 3 times, ensuring water reaches between fingers.",
        },
        { title: "Mouth", desc: "Rinse the mouth thoroughly 3 times." },
        {
          title: "Nose",
          desc: "Sniff water into the nose and blow it out 3 times.",
        },
        {
          title: "Face",
          desc: "Wash the entire face 3 times (from hairline to chin, and ear to ear).",
        },
        {
          title: "Arms",
          desc: "Wash arms up to and including the elbows 3 times, starting with the right.",
        },
        {
          title: "Head (Masah)",
          desc: "Wipe the head once with wet hands, from front to back and back to front. Wipe inside ears.",
        },
        {
          title: "Feet",
          desc: "Wash feet up to and including the ankles 3 times, starting with the right. Ensure water reaches between toes.",
        },
      ],
      tip: "Prophet Muhammad (ﷺ) said: 'He who performs Wudu perfectly, his sins will depart from his body, even from under his fingernails.' (Muslim)",
    },
    ghusl: {
      title: "How to Perform Ghusl",
      subtitle: "Complete Ritual Bath",
      steps: [
        {
          title: "Niyyah",
          desc: "Intend to perform Ghusl to remove major impurity. Say 'Bismillah'.",
        },
        { title: "Wash Hands", desc: "Wash your hands three times." },
        {
          title: "Private Parts",
          desc: "Wash private parts and remove any impurity from the body.",
        },
        {
          title: "Perform Wudu",
          desc: "Perform a complete Wudu (like for prayer).",
        },
        {
          title: "Pour Water (Head)",
          desc: "Pour water over the head 3 times, ensuring it reaches the roots of the hair.",
        },
        {
          title: "Right Side",
          desc: "Pour water over the entire right side of the body.",
        },
        {
          title: "Left Side",
          desc: "Pour water over the entire left side of the body.",
        },
        { title: "Ensure", desc: "Ensure no part of the body remains dry." },
      ],
      tip: "Water must reach every part of the body, including inside the navel and roots of the hair.",
    },
    tayammum: {
      title: "How to Perform Tayammum",
      subtitle: "Dry Ablution",
      steps: [
        { title: "Find Clean Earth", desc: "Find clean soil, sand, or stone." },
        {
          title: "Niyyah",
          desc: "Make intention to purify yourself for prayer. Say 'Bismillah'.",
        },
        {
          title: "Strike",
          desc: "Strike the earth lightly with the palms of both hands.",
        },
        { title: "Face", desc: "Blow off excess dust and wipe the face once." },
        {
          title: "Hands/Arms",
          desc: "Wipe the back of the right hand with the left palm, and the back of the left hand with the right palm (up to wrists/elbows).",
        },
      ],
      tip: "Tayammum is valid only when water is unavailable, or using it would cause harm/illness.",
    },
  };

  // Global function to be accessed by HTML onclick attributes
  window.openGuide = function (type) {
    const modal = document.getElementById("guide-modal");
    const title = document.getElementById("guide-title");
    const subtitle = document.getElementById("guide-subtitle");
    const container = document.getElementById("guide-steps");
    const tip = document.getElementById("guide-tip");

    const data = guidesData[type];

    if (!data || !modal) return;

    // Populate Data
    title.textContent = data.title;
    subtitle.textContent = data.subtitle;
    tip.textContent = data.tip;

    // Create Steps HTML
    container.innerHTML = data.steps
      .map(
        (step, index) => `
            <div class="flex gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm border border-emerald-200">
                    ${index + 1}
                </div>
                <div>
                    <h4 class="font-bold text-gray-800 text-base">${
                      step.title
                    }</h4>
                    <p class="text-gray-500 text-sm leading-relaxed mt-1">${
                      step.desc
                    }</p>
                </div>
            </div>
        `
      )
      .join("");

    // Show Modal
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  window.closeGuide = function () {
    const modal = document.getElementById("guide-modal");
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = ""; // Restore scrolling
    }
  };

  // Close on Escape Key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") window.closeGuide();
  });
})();
// ==========================================
// SPIRITUAL ARMOR (ADHKAR) LOGIC
// ==========================================
(function () {
  // Helper strings for the heavy text (to keep code clean)
  const ayatAlKursi =
    "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَئُودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ";

  const surahIkhlas =
    "قُلْ هُوَ ٱللَّهُ أَحَدٌ ۝ ٱللَّهُ ٱلصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ";

  const surahFalaq =
    "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ";

  const surahNas =
    "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ ۝ مَلِكِ ٱلنَّاسِ ۝ إِلَٰهِ ٱلنَّاسِ ۝ مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ ۝ ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ ۝ مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ";

  const adhkarData = {
    morning: {
      title: "Morning Adhkar",
      subtitle: "Start your day with Barakah",
      steps: [
        {
          title: "Ayat al-Kursi (1x)",
          desc: `<p class="font-amiri text-xl text-emerald-900 leading-[2.2] dir-rtl text-right mt-2 mb-2 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">${ayatAlKursi}</p>
                           <span class='text-emerald-600 italic text-xs'>Protection from Jinn until evening.</span>`,
        },
        {
          title: "The 3 Quls (3x each)",
          desc: `<div class="space-y-4 mt-2">
                            <div class="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                                <p class="text-[10px] text-emerald-500 font-bold uppercase mb-1">Al-Ikhlas</p>
                                <p class="font-amiri text-lg text-emerald-900 leading-[2.2] dir-rtl text-right">${surahIkhlas}</p>
                            </div>
                            <div class="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                                <p class="text-[10px] text-emerald-500 font-bold uppercase mb-1">Al-Falaq</p>
                                <p class="font-amiri text-lg text-emerald-900 leading-[2.2] dir-rtl text-right">${surahFalaq}</p>
                            </div>
                            <div class="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                                <p class="text-[10px] text-emerald-500 font-bold uppercase mb-1">An-Nas</p>
                                <p class="font-amiri text-lg text-emerald-900 leading-[2.2] dir-rtl text-right">${surahNas}</p>
                            </div>
                           </div>`,
        },
        {
          title: "Sayyidul Istighfar",
          desc: `<p class="font-amiri text-xl text-emerald-900 leading-[2.2] dir-rtl text-right mt-2 mb-2 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                           اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ
                           </p>
                           <span class='text-emerald-600 italic text-xs'>The master prayer for forgiveness.</span>`,
        },
        {
          title: "Protection Dua (3x)",
          desc: `<p class="font-amiri text-xl text-emerald-900 leading-[2.2] dir-rtl text-right mt-2 mb-2 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                           بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ
                           </p>
                           <span class='text-emerald-600 italic text-xs'>'In the Name of Allah... nothing can harm.'</span>`,
        },
      ],
      tip: "The best time for Morning Adhkar is between Fajr and Sunrise.",
    },
    evening: {
      title: "Evening Adhkar",
      subtitle: "End your day with Peace",
      steps: [
        {
          title: "Ayat al-Kursi (1x)",
          desc: `<p class="font-amiri text-xl text-emerald-900 leading-[2.2] dir-rtl text-right mt-2 mb-2 bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">${ayatAlKursi}</p>
                           <span class='text-indigo-600 italic text-xs'>Protection from Jinn until morning.</span>`,
        },
        {
          title: "The 3 Quls (3x each)",
          desc: `<div class="space-y-4 mt-2">
                            <div class="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                                <p class="text-[10px] text-indigo-500 font-bold uppercase mb-1">Al-Ikhlas</p>
                                <p class="font-amiri text-lg text-emerald-900 leading-[2.2] dir-rtl text-right">${surahIkhlas}</p>
                            </div>
                            <div class="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                                <p class="text-[10px] text-indigo-500 font-bold uppercase mb-1">Al-Falaq</p>
                                <p class="font-amiri text-lg text-emerald-900 leading-[2.2] dir-rtl text-right">${surahFalaq}</p>
                            </div>
                            <div class="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                                <p class="text-[10px] text-indigo-500 font-bold uppercase mb-1">An-Nas</p>
                                <p class="font-amiri text-lg text-emerald-900 leading-[2.2] dir-rtl text-right">${surahNas}</p>
                            </div>
                           </div>`,
        },
        {
          title: "Complete Wellness (3x)",
          desc: `<p class="font-amiri text-xl text-emerald-900 leading-[2.2] dir-rtl text-right mt-2 mb-2 bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                           اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ
                           </p>
                           <span class='text-indigo-600 italic text-xs'>'O Allah, grant me health in my body, hearing, and sight.'</span>`,
        },
        {
          title: "Refuge in Allah's Words (3x)",
          desc: `<p class="font-amiri text-xl text-emerald-900 leading-[2.2] dir-rtl text-right mt-2 mb-2 bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                           أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ
                           </p>
                           <span class='text-indigo-600 italic text-xs'>'I seek refuge in the perfect words of Allah...'</span>`,
        },
      ],
      tip: "The best time for Evening Adhkar is between Asr and Maghrib.",
    },
    sleep: {
      title: "Sunnahs Before Sleep",
      subtitle: "Rest in the remembrance of Allah",
      steps: [
        {
          title: "Wudu",
          desc: "Perform Wudu before going to bed. Angels will pray for you.",
        },
        {
          title: "Ayat al-Kursi",
          desc: `<p class="font-amiri text-xl text-emerald-900 leading-[2.2] dir-rtl text-right mt-2 mb-2 bg-slate-50 p-3 rounded-lg border border-slate-200">${ayatAlKursi}</p>
                           <span class='text-slate-600 italic text-xs'>Protection from shaytaan during sleep.</span>`,
        },
        {
          title: "Tasbih Fatimah",
          desc: "Recite SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (34x).",
        },
        {
          title: "Sleep on Right Side",
          desc: "Lie on your right side with your right hand under your cheek.",
        },
        {
          title: "Last Dua",
          desc: `<p class="font-amiri text-xl text-emerald-900 leading-[2.2] dir-rtl text-right mt-2 mb-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                                اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا
                           </p>
                           <span class='text-slate-600 italic text-xs'>'In Your Name, O Allah, I die and I live.'</span>`,
        },
      ],
      tip: "If you die in this state, you die on the Fitrah (natural disposition).",
    },
  };

  // Global Function (No changes needed here, just data update)
  window.openAdhkar = function (type) {
    const modal = document.getElementById("guide-modal");
    const title = document.getElementById("guide-title");
    const subtitle = document.getElementById("guide-subtitle");
    const container = document.getElementById("guide-steps");
    const tip = document.getElementById("guide-tip");

    const data = adhkarData[type];

    if (!data || !modal) return;

    // Populate Data
    title.textContent = data.title;
    subtitle.textContent = data.subtitle;
    tip.textContent = data.tip;

    // Populate Steps with improved styling for Arabic blocks
    container.innerHTML = data.steps
      .map(
        (step, index) => `
            <div class="flex gap-4 items-start">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm border border-orange-200 mt-1">
                    ${index + 1}
                </div>
                <div class="w-full">
                    <h4 class="font-bold text-gray-800 text-base">${
                      step.title
                    }</h4>
                    <div class="text-gray-600 text-sm leading-relaxed mt-1">${
                      step.desc
                    }</div>
                </div>
            </div>
        `
      )
      .join("");

    // Show Modal
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };
})();
// ==========================================
// GARDEN OF SALAWAT CAROUSEL
// ==========================================
(function () {
  const salawatData = [
    {
      title: "Durood Ibrahim",
      arabic:
        "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ . اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      transliteration:
        "Allahumma salli 'ala Muhammadin wa 'ala aali Muhammadin kama sallaita 'ala Ibrahima wa 'ala aali Ibrahima innaka Hamidum Majid...",
      translation:
        "O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon Ibrahim and upon the family of Ibrahim; You are indeed Worthy of Praise, Full of Glory.",
      benefit:
        "The most authentic and complete Salawat, recited in every Salah.",
    },
    {
      title: "Short & Powerful",
      arabic: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
      transliteration: "Allahumma salli wa sallim 'ala nabiyyina Muhammad",
      translation:
        "O Allah, send peace and blessings upon our Prophet Muhammad PBUH.",
      benefit:
        "Easy to recite frequently throughout the day. Whoever recites this 10 times morning and evening will get the Prophet's intercession.",
    },
    {
      title: "Salawat for Relief",
      arabic:
        "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ عَبْدِكَ وَرَسُولِكَ النَّبِيِّ الأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ",
      transliteration:
        "Allahumma salli 'ala Muhammadin 'abdika wa rasulika an-nabiyyil ummiyyi...",
      translation:
        "O Allah, send blessings upon Muhammad, Your servant and Messenger, the unlettered Prophet, and upon his family and companions.",
      benefit:
        "Recommended for Friday afternoons; removes 80 years of sins (with sincerity).",
    },
  ];

  const slider = document.getElementById("salawat-slider");
  const dotsContainer = document.getElementById("salawat-dots");
  const prevBtn = document.getElementById("prev-salawat");
  const nextBtn = document.getElementById("next-salawat");

  let currentIndex = 0;

  if (!slider) return;

  // 1. Render Slides
  slider.innerHTML = salawatData
    .map(
      (item, index) => `
        <div class="min-w-full p-8 md:p-16 flex flex-col items-center justify-center text-center select-none">
            <span class="inline-block px-4 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-8 border border-emerald-100">
                ${item.title}
            </span>
            
            <h3 class="font-amiri text-2xl md:text-4xl lg:text-5xl text-gray-800 leading-[2.2] dir-rtl mb-8 drop-shadow-sm">
                ${item.arabic}
            </h3>
            
            <div class="max-w-3xl mx-auto space-y-4">
                <p class="text-emerald-700 font-medium italic text-sm md:text-base opacity-80">
                    "${item.transliteration}"
                </p>
                <p class="text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100 pt-4">
                    ${item.translation}
                </p>
                <div class="bg-yellow-50 text-yellow-800 text-xs font-bold px-4 py-2 rounded-lg inline-block mt-4 border border-yellow-100">
                    <span class="mr-1">✨</span> Benefit: ${item.benefit}
                </div>
            </div>
        </div>
    `
    )
    .join("");

  // 2. Render Dots
  dotsContainer.innerHTML = salawatData
    .map(
      (_, index) => `
        <button onclick="goToSalawat(${index})" class="w-2.5 h-2.5 rounded-full transition-all duration-300 ${
        index === 0 ? "bg-emerald-600 w-6" : "bg-gray-300 hover:bg-emerald-300"
      }" aria-label="Go to slide ${index + 1}"></button>
    `
    )
    .join("");

  // 3. Navigation Logic
  const updateSlider = () => {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update Dots
    const dots = dotsContainer.querySelectorAll("button");
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.className =
          "w-6 h-2.5 rounded-full bg-emerald-600 transition-all duration-300";
      } else {
        dot.className =
          "w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-emerald-300 transition-all duration-300";
      }
    });
  };

  window.goToSalawat = (index) => {
    currentIndex = index;
    updateSlider();
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex =
        currentIndex === 0 ? salawatData.length - 1 : currentIndex - 1;
      updateSlider();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % salawatData.length;
      updateSlider();
    });
  }

  // Optional: Auto-slide every 10 seconds if user isn't interacting
  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % salawatData.length;
    updateSlider();
  }, 7000);
  slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
})();
// ==========================================
// PROPHETIC FOODS (TIB AN-NABAWI)
// ==========================================
(function () {
  const foodsData = [
    {
      name: "Honey",
      arabic: "العسل",
      desc: "A cure for mankind.",
      icon: "🍯",
      color: "amber",
      hadith:
        "The Prophet ﷺ said: 'Make use of the two cures: Honey and the Quran.' (Sunan Ibn Majah)",
    },
    {
      name: "Dates (Ajwa)",
      arabic: "التمر",
      desc: "Protection from poison.",
      icon: "🌴",
      color: "orange",
      hadith:
        "The Prophet ﷺ said: 'He who eats seven Ajwa dates every morning will not be affected by poison or magic on that day.' (Bukhari)",
    },
    {
      name: "Black Seed",
      arabic: "الحبة السوداء",
      desc: "Cure for everything but death.",
      icon: "🌱",
      color: "gray",
      hadith:
        "The Prophet ﷺ said: 'Use the Black Seed, for indeed, it contains a cure for every disease except death.' (Bukhari)",
    },
    {
      name: "Olive Oil",
      arabic: "زيت الزيتون",
      desc: "From a blessed tree.",
      icon: "🫒",
      color: "emerald",
      hadith:
        "The Prophet ﷺ said: 'Eat olive oil and use it on your hair and skin, for it comes from a blessed tree.' (Tirmidhi)",
    },
    {
      name: "Talbinah",
      arabic: "التلبينة",
      desc: "Soothing for the heart.",
      icon: "🥣",
      color: "yellow",
      hadith:
        "The Prophet ﷺ said: 'The Talbinah soothes the heart of the patient and relieves some of his sorrow.' (Bukhari)",
    },
    {
      name: "Milk",
      arabic: "اللبن",
      desc: "A complete food.",
      icon: "🥛",
      color: "blue",
      hadith:
        "The Prophet ﷺ said: 'There is nothing that serves as both food and drink except milk.' (Abu Dawood)",
    },
  ];

  const grid = document.getElementById("foods-grid");

  if (grid) {
    grid.innerHTML = foodsData
      .map(
        (item, index) => `
            <div class="group relative h-64 perspective-1000 cursor-pointer" onclick="this.classList.toggle('flipped')">
                
                <div class="relative w-full h-full duration-700 preserve-3d group-hover:shadow-xl transition-all rounded-3xl">
                    
                    <div class="absolute inset-0 backface-hidden bg-white border border-${item.color}-100 rounded-3xl p-8 flex flex-col justify-between shadow-sm group-hover:border-${item.color}-300 transition-colors">
                        <div class="flex justify-between items-start">
                            <span class="text-4xl filter drop-shadow-md">${item.icon}</span>
                            <span class="font-amiri text-2xl text-${item.color}-800 opacity-20 font-bold">${item.arabic}</span>
                        </div>
                        
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-1">${item.name}</h3>
                            <p class="text-sm text-gray-500 font-medium">${item.desc}</p>
                        </div>

                        <div class="flex items-center gap-2 text-${item.color}-600 text-xs font-bold uppercase tracking-widest mt-4">
                            <span>Tap to Reveal</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    <div class="absolute inset-0 backface-hidden rotate-y-180 bg-${item.color}-50 border border-${item.color}-200 rounded-3xl p-8 flex flex-col justify-center text-center shadow-inner">
                        <div class="mb-4 text-${item.color}-600 opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01697V13C9.01697 12.4477 9.46468 12 10.017 12H12.017C13.1216 12 14.017 11.1046 14.017 10V4C14.017 2.89543 13.1216 2 12.017 2H6.01697C4.9124 2 4.01697 2.89543 4.01697 4V10C4.01697 11.1046 4.9124 12 6.01697 12H8.01697V16H5.01697C3.9124 16 3.01697 16.8954 3.01697 18V21H14.017ZM16.017 21H21.017V18C21.017 16.8954 20.1216 16 19.017 16H16.017V12H18.017C19.1216 12 20.017 11.1046 20.017 10V4C20.017 2.89543 19.1216 2 18.017 2H16.017V10H16.017V21Z"/></svg>
                        </div>
                        <p class="text-gray-800 font-medium text-sm md:text-base italic leading-relaxed">
                            "${item.hadith}"
                        </p>
                    </div>

                </div>
            </div>
        `
      )
      .join("");
  }
})();
// ==========================================
// MEDICINE OF THE HEARTS (TIBB AL-QULUB)
// ==========================================
(function () {
  const ailmentsData = [
    {
      id: "anger",
      name: "Anger (Ghadab)",
      icon: "🔥",
      diagnosis:
        "Anger is a burning coal thrown by Shaytaan into the heart of the son of Adam. It destroys faith as aloe destroys honey.",
      steps: [
        "Seek refuge in Allah: Say 'A'udhu billahi minash shaytanir rajeem'.",
        "Change your posture: If standing, sit; if sitting, lie down.",
        "Perform Wudu: Water extinguishes the fire of anger.",
        "Remain Silent: 'If one of you becomes angry, let him keep silent.'",
      ],
      dua: {
        arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        trans: "I seek refuge in Allah from the accursed Satan.",
      },
    },
    {
      id: "anxiety",
      name: "Anxiety (Hamm)",
      icon: "😰",
      diagnosis:
        "Anxiety comes from fearing the future. Remember that the pen has dried and what is meant for you will never miss you.",
      steps: [
        "Trust in Qadr: Know that Allah is Al-Wakeel (The Trustee).",
        "Increase Istighfar: It removes worries and opens provision.",
        "Focus on Today: 'O Allah, I seek refuge from worry and grief.'",
        "Pray 2 Rakah: Seek help through patience and prayer.",
      ],
      dua: {
        arabic:
          "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ",
        trans:
          "Sufficient for me is Allah; there is no deity except Him. On Him I have relied.",
      },
    },
    {
      id: "envy",
      name: "Envy (Hasad)",
      icon: "👁️",
      diagnosis:
        "Envy consumes good deeds just as fire consumes wood. It is objecting to Allah's distribution of gifts.",
      steps: [
        "Pray for them: Make dua for the person you envy (angels say 'Ameen, and for you too').",
        "Give a Gift: Gifts remove malice from the heart.",
        "Say Ma Sha Allah: Attribute the blessing to Allah.",
        "Focus on your own blessings: Gratitude kills envy.",
      ],
      dua: {
        arabic:
          "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا",
        trans:
          "Our Lord, forgive us and our brothers... and leave no malice in our hearts.",
      },
    },
    {
      id: "pride",
      name: "Arrogance (Kibr)",
      icon: "🦚",
      diagnosis:
        "Arrogance is rejecting the truth and looking down on people. Remember your origin—you were created from dust.",
      steps: [
        "Serve Others: Physically serve those you think you are better than.",
        "Remember Death: The grave makes everyone equal.",
        "Reflect on Origin: You were a drop of fluid, and you will be a corpse.",
        "Attribute success to Allah: Say 'Haza min fadli Rabbi' (This is from my Lord).",
      ],
      dua: {
        arabic:
          "اللَّهُمَّ اجْعَلْنِي فِي عَيْنِي صَغِيرًا وَفِي أَعْيُنِ النَّاسِ كَبِيرًا",
        trans:
          "O Allah, make me small in my own eyes, and great in the eyes of the people.",
      },
    },
    {
      id: "laziness",
      name: "Laziness (Kasl)",
      icon: "💤",
      diagnosis:
        "Laziness is a knot tied by Shaytaan. It prevents you from fulfilling your potential and purpose.",
      steps: [
        "Wake up Early: Barakah is in the early hours.",
        "Make Wudu immediately: It unties the knots of Shaytaan.",
        "Set small goals: 'The most beloved deeds are those that are consistent, even if small.'",
        "Remember the Reward: Jannah is not for the lazy.",
      ],
      dua: {
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
        trans: "O Allah, I seek refuge in You from incapacity and laziness.",
      },
    },
  ];

  const buttonContainer = document.getElementById("ailment-buttons");
  const emptyState = document.getElementById("rx-empty");
  const contentState = document.getElementById("rx-content");

  // UI Elements to update
  const rxTitle = document.getElementById("rx-title");
  const rxDiagnosis = document.getElementById("rx-diagnosis");
  const rxSteps = document.getElementById("rx-steps");
  const rxDuaAr = document.getElementById("rx-dua-arabic");
  const rxDuaEn = document.getElementById("rx-dua-trans");

  if (buttonContainer && emptyState) {
    // 1. Render Buttons
    buttonContainer.innerHTML = ailmentsData
      .map(
        (item) => `
            <button onclick="loadPrescription('${item.id}')" class="rx-btn w-full text-left p-4 rounded-xl border border-gray-100 bg-white hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 flex items-center justify-between group shadow-sm hover:shadow-md" data-id="${item.id}">
                <div class="flex items-center gap-3">
                    <span class="text-xl group-hover:scale-110 transition-transform">${item.icon}</span>
                    <span class="font-bold text-gray-700 group-hover:text-emerald-800">${item.name}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300 group-hover:text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        `
      )
      .join("");

    // 2. Load Function (Global)
    window.loadPrescription = function (id) {
      const data = ailmentsData.find((i) => i.id === id);
      if (!data) return;

      // Visual: Highlight active button
      document.querySelectorAll(".rx-btn").forEach((btn) => {
        if (btn.getAttribute("data-id") === id) {
          btn.classList.add(
            "border-emerald-500",
            "bg-emerald-50",
            "ring-1",
            "ring-emerald-500"
          );
        } else {
          btn.classList.remove(
            "border-emerald-500",
            "bg-emerald-50",
            "ring-1",
            "ring-emerald-500"
          );
        }
      });

      // Hide content briefly for transition
      contentState.classList.add("opacity-0");

      setTimeout(() => {
        // Hide Empty State
        emptyState.style.display = "none";

        // Update Data
        rxTitle.textContent = data.name;
        rxDiagnosis.textContent = `"${data.diagnosis}"`;
        rxDuaAr.textContent = data.dua.arabic;
        rxDuaEn.textContent = data.dua.trans;

        // Render List
        rxSteps.innerHTML = data.steps
          .map(
            (step) => `
                    <li class="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm text-gray-600 leading-relaxed">${step}</span>
                    </li>
                `
          )
          .join("");

        // Show content
        contentState.classList.remove("opacity-0");
      }, 300);
    };
  }
})();
// ==========================================
// TADABBUR (HIDDEN PEARLS) LOGIC
// ==========================================
(function () {
  const gemsData = [
    {
      id: "iron",
      category: "Scientific Miracle",
      title: "Iron Sent Down",
      arabic: "وَأَنزَلْنَا ٱلْحَدِيدَ فِيهِ بَأْسٌ شَدِيدٌ",
      trans: "And We sent down iron, wherein is great military might...",
      reflection:
        "The Quran uses the word 'Anzalna' (We sent down) for Iron. Modern astrophysics has proven that iron is not native to Earth; it was forged in giant stars and sent down to Earth via meteorites. It literally came from the sky.",
      ref: "Surah Al-Hadid (57:25)",
    },
    {
      id: "womb",
      category: "Linguistic Beauty",
      title: "Mercy & The Womb",
      arabic: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      trans: "The Entirely Merciful, the Especially Merciful.",
      reflection:
        "The words for Mercy (Rahmah) and Womb (Rahim) share the same root (R-H-M). Just as a womb protects, nourishes, and surrounds the unborn child from all sides, Allah's mercy envelopes His creation completely.",
      ref: "The Root: R-H-M",
    },
    {
      id: "mountains",
      category: "Geology",
      title: "Mountains as Pegs",
      arabic: "وَٱلْجِبَالَ أَوْتَادًا",
      trans: "And [have We not made] the mountains as pegs?",
      reflection:
        "The Quran describes mountains as 'Awtad' (Pegs/Stakes). Like a tent peg is mostly underground, modern geology confirms that mountains have deep 'roots' extending into the Earth's mantle to stabilize the crust (Isostasy).",
      ref: "Surah An-Naba (78:7)",
    },
    {
      id: "orbit",
      category: "Astronomy",
      title: "Orbits",
      arabic: "كُلٌّ فِى فَلَكٍ يَسْبَحُونَ",
      trans: "All [heavenly bodies] are swimming in orbit.",
      reflection:
        "The word 'Yasbahun' means 'swimming' or 'floating' with its own motion. This perfectly describes the movement of planets and stars in space—they are not fixed rigidly, but float through the vacuum.",
      ref: "Surah Ya-Sin (36:40)",
    },
  ];

  const btnContainer = document.getElementById("gem-buttons");
  const contentArea = document.getElementById("gem-content");

  // Elements to update
  const gemTag = document.getElementById("gem-tag");
  const gemArabic = document.getElementById("gem-arabic");
  const gemTrans = document.getElementById("gem-translation");
  const gemReflect = document.getElementById("gem-reflection");

  if (btnContainer && contentArea) {
    // 1. Render Buttons
    btnContainer.innerHTML = gemsData
      .map(
        (gem, index) => `
            <button onclick="loadGem(${index})" class="gem-btn w-full text-left p-4 rounded-2xl transition-all duration-300 border border-transparent flex items-center justify-between group ${
          index === 0
            ? "bg-white/20 border-white/30 shadow-lg"
            : "hover:bg-white/10"
        }" data-index="${index}">
                <div>
                    <span class="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block mb-1">${
                      gem.category
                    }</span>
                    <h4 class="text-white font-bold text-lg group-hover:text-yellow-400 transition-colors">${
                      gem.title
                    }</h4>
                </div>
                <div class="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white opacity-50 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                </div>
            </button>
        `
      )
      .join("");

    // 2. Load Function
    window.loadGem = function (index) {
      const data = gemsData[index];

      // Visual: Update active button state
      document.querySelectorAll(".gem-btn").forEach((btn) => {
        if (parseInt(btn.getAttribute("data-index")) === index) {
          btn.classList.add("bg-white/20", "border-white/30", "shadow-lg");
          btn.classList.remove("hover:bg-white/10");
        } else {
          btn.classList.remove("bg-white/20", "border-white/30", "shadow-lg");
          btn.classList.add("hover:bg-white/10");
        }
      });

      // Animate Content Out
      contentArea.style.opacity = "0";
      contentArea.style.transform = "translateY(10px)";

      setTimeout(() => {
        // Update Content
        gemTag.textContent = data.category;
        gemArabic.textContent = data.arabic;
        gemTrans.textContent = `"${data.trans}"`;
        gemReflect.innerHTML = `${data.reflection} <br><span class="block mt-3 text-xs text-emerald-400 font-bold uppercase">— ${data.ref}</span>`;

        // Animate Content In
        contentArea.style.opacity = "1";
        contentArea.style.transform = "translateY(0)";
      }, 300);
    };

    // Initialize first gem
    loadGem(0);
  }
})();
// ==========================================
// SMART SUNNAH TIMELINE (DAY OF BARAKAH)
// ==========================================
(function () {
  const routineData = [
    {
      title: "The Early Victory",
      time: "04:00 - 07:00",
      icon: "🌅",
      desc: "Wake up for Tahajjud/Fajr. The Prophet ﷺ prayed for Barakah in the early hours.",
      action: "Morning Adhkar + 2 Rakah Fajr",
      startHour: 4,
      endHour: 7,
    },
    {
      title: "Charity of the Joints",
      time: "08:00 - 11:00",
      icon: "💼",
      desc: "Perform Salat al-Duha (2-8 rakahs). It suffices as charity for every joint in your body.",
      action: "Productive Work / Duha Prayer",
      startHour: 8,
      endHour: 11,
    },
    {
      title: "The Sunnah Nap",
      time: "12:00 - 13:30",
      icon: "☀️",
      desc: "Take a short 'Qaylulah' (nap) before or after Dhuhr to energize for worship.",
      action: "Brief Rest + Dhuhr Prayer",
      startHour: 12,
      endHour: 13,
    },
    {
      title: "The Pursuit of Risk",
      time: "15:00 - 17:30",
      icon: "🌱",
      desc: "Work with excellence (Ihsan). After Asr, engage in Evening Adhkar.",
      action: "Asr Prayer + Evening Adhkar",
      startHour: 15,
      endHour: 17,
    },
    {
      title: "The Family Bond",
      time: "17:00 - 19:00",
      icon: "🏡",
      desc: "Maghrib is family time. Serve them, eat together, and strengthen ties.",
      action: "Maghrib + Family Khidmah",
      startHour: 17,
      endHour: 19,
    },
    {
      title: "The Night Vigil",
      time: "19:00 - 03:59",
      icon: "🌙",
      desc: "Perform Isha, pray Witr, and reflect (Muhasabah) before sleep.",
      action: "Isha + Witr + Sleep Sunnahs",
      startHour: 19,
      endHour: 23, // Logic handles overnight wrap separately if needed, simplified here
    },
  ];

  const container = document.getElementById("timeline-container");

  if (container) {
    // 1. Get Current Hour
    const currentHour = new Date().getHours();

    // 2. Render Timeline
    container.innerHTML = routineData
      .map((item, index) => {
        // Check if this slot is active
        let isActive = false;

        // Handle midnight wrapping logic for the last item (e.g., 21:00 - 04:00)
        if (item.startHour > item.endHour) {
          // e.g. Start 21, End 4. Active if hour is >= 21 OR hour <= 4
          isActive =
            currentHour >= item.startHour || currentHour <= item.endHour;
        } else {
          // Normal range e.g. 8 to 11
          isActive =
            currentHour >= item.startHour && currentHour <= item.endHour;
        }

        // Alternating Layout Classes
        const isLeft = index % 2 === 0;
        const alignClass = isLeft ? "md:flex-row" : "md:flex-row-reverse";
        const textClass = isLeft ? "md:text-right" : "md:text-left";
        const marginClass = isLeft ? "md:mr-8" : "md:ml-8";

        return `
                <div class="timeline-card relative flex items-center ${alignClass} ${
          isActive ? "timeline-active rounded-2xl" : ""
        }">
                    
                    <div class="flex-1 w-full pl-12 md:pl-0 ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    }">
                        
                        <div class="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm relative z-10 ${
                          isActive
                            ? "border-emerald-500 ring-1 ring-emerald-500"
                            : ""
                        }">
                            
                            <div class="md:hidden absolute -left-10 top-6 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-white timeline-dot text-sm">
                                ${item.icon}
                            </div>

                            <div class="flex flex-col ${textClass}">
                                <span class="text-[10px] font-bold ${
                                  isActive
                                    ? "text-emerald-600"
                                    : "text-gray-400"
                                } uppercase tracking-widest mb-1">
                                    ${item.time} ${
          isActive
            ? '<span class="ml-2 animate-pulse text-red-500">● NOW</span>'
            : ""
        }
                                </span>
                                <h3 class="text-xl font-bold text-gray-800 mb-2">${
                                  item.title
                                }</h3>
                            </div>

                            <p class="text-gray-500 text-sm leading-relaxed mb-4 ${textClass}">
                                ${item.desc}
                            </p>

                            <div class="flex items-center ${
                              isLeft ? "md:justify-end" : "md:justify-start"
                            } gap-2">
                                <span class="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                                    ${item.action}
                                </span>
                            </div>

                            <div class="hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-emerald-100 transform rotate-45 ${
                              isLeft
                                ? "-right-2 border-r border-t border-l-0 border-b-0"
                                : "-left-2 border-l border-b border-r-0 border-t-0"
                            } ${
          isActive ? "border-emerald-500 bg-emerald-50" : ""
        }"></div>
                        </div>

                    </div>

                    <div class="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-emerald-200 border-2 border-white transform -translate-x-1/2 hidden md:block timeline-dot z-20 ${
                      isActive ? "scale-125" : ""
                    }"></div>
                    
                    <div class="flex-1 hidden md:block"></div>

                </div>
            `;
      })
      .join("");
  }
})();
// ==========================================
// SCROLL TO TOP LOGIC
// ==========================================
(function () {
  const btn = document.getElementById("scroll-top-btn");

  if (btn) {
    // Show button when scrolling down
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        btn.classList.remove("translate-y-20", "opacity-0");
      } else {
        btn.classList.add("translate-y-20", "opacity-0");
      }
    });

    // Scroll to top on click
    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
})();
// ==========================================
// DIVINE PROMISES LOGIC (FIXED ICON POSITION)
// ==========================================
(function () {
  const promisesData = [
    {
      title: "Promise of Increase",
      reward: "I will surely increase you.",
      condition: "If you are grateful...",
      verse: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
      ref: "Surah Ibrahim (14:7)",
      icon: "📈",
    },
    {
      title: "Promise of Response",
      reward: "I will answer you.",
      condition: "Call upon Me...",
      verse: "ٱدْعُونِىٓ أَسْتَجِبْ لَكُمْ",
      ref: "Surah Ghafir (40:60)",
      icon: "🤲",
    },
    {
      title: "Promise of Remembrance",
      reward: "I will remember you.",
      condition: "Remember Me...",
      verse: "فَٱذْكُرُونِىٓ أَذْكُرْكُمْ",
      ref: "Surah Al-Baqarah (2:152)",
      icon: "📿",
    },
    {
      title: "Promise of Forgiveness",
      reward: "He will forgive your sins.",
      condition: "If you love Allah, follow me (the Prophet)...",
      verse: "قُلْ إِن كُنتُمْ تُحِبُّونَ ٱللَّهَ فَٱتَّبِعُونِى",
      ref: "Surah Ali 'Imran (3:31)",
      icon: "❤️",
    },
    {
      title: "Promise of Ease",
      reward: "Indeed, with hardship comes ease.",
      condition: "A promise for every struggle.",
      verse: "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
      ref: "Surah Ash-Sharh (94:6)",
      icon: "🌤️",
    },
    {
      title: "Promise of Provision",
      reward: "He will provide from where he does not expect.",
      condition: "Whoever fears Allah (Taqwa)...",
      verse: "وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًا",
      ref: "Surah At-Talaq (65:2-3)",
      icon: "🌱",
    },
  ];

  const container = document.getElementById("promises-grid");

  if (container) {
    container.innerHTML = promisesData
      .map(
        (item) => `
            <div class="relative mt-10 group cursor-default">
                
                <div class="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white border border-amber-100 rounded-full flex items-center justify-center text-2xl shadow-sm z-20 group-hover:scale-110 group-hover:border-amber-300 transition-all duration-300">
                    ${item.icon}
                </div>

                <div class="shimmer-card bg-white rounded-2xl p-8 pt-10 border border-amber-100 shadow-sm group-hover:shadow-xl group-hover:border-amber-300 transition-all duration-500 overflow-hidden h-full relative z-10">
                    
                    <div class="absolute inset-0 bg-texture-dots rounded-2xl"></div>
                    
                    <div class="relative z-10 flex flex-col items-center text-center h-full">
                        
                        <span class="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-2 mt-2">${item.title}</span>
                        
                        <h3 class="font-amiri text-2xl md:text-3xl text-emerald-900 font-bold mb-6 group-hover:text-amber-600 transition-colors leading-relaxed">
                            "${item.reward}"
                        </h3>

                        <div class="w-12 h-0.5 bg-amber-100 mb-6 group-hover:w-24 group-hover:bg-amber-300 transition-all duration-500"></div>

                        <div class="space-y-3 mt-auto">
                            <p class="text-sm text-gray-500 font-medium italic">
                                ${item.condition}
                            </p>
                            <p class="font-amiri text-lg text-emerald-800 dir-rtl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                ${item.verse}
                            </p>
                            <span class="text-[10px] text-gray-400 font-bold uppercase block mt-2">
                                ${item.ref}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }
})();
// ==========================================
// ETERNAL INVESTMENTS (SPIRITUAL BANKING)
// ==========================================
(function () {
  const investmentsData = [
    {
      title: "A House in Jannah",
      action: "Recite Surah Al-Ikhlas 10x",
      roi: "A Palace in Paradise",
      cost: "2 Minutes",
      rewardVal: 100000, // Symbolic value for the counter
      icon: "🏰",
      theme: "emerald",
    },
    {
      title: "Heavy on the Scales",
      action: "SubhanAllah wa bihamdihi, SubhanAllahil Azeem",
      roi: "Infinite Weight",
      cost: "5 Seconds",
      rewardVal: 5000,
      icon: "⚖️",
      theme: "amber",
    },
    {
      title: "Trees in Paradise",
      action: "SubhanAllah, Alhamdulillah, La ilaha illallah, Allahu Akbar",
      roi: "1 Tree per recitation",
      cost: "3 Seconds",
      rewardVal: 1000,
      icon: "🌴",
      theme: "teal",
    },
    {
      title: "Treasure of Paradise",
      action: "La hawla wa la quwwata illa billah",
      roi: "A Treasure from beneath the Throne",
      cost: "2 Seconds",
      rewardVal: 25000,
      icon: "💎",
      theme: "indigo",
    },
    {
      title: "Forgiveness of Sins",
      action: "SubhanAllah wa bihamdihi (100x)",
      roi: "Sins forgiven even if like sea foam",
      cost: "3 Minutes",
      rewardVal: 50000,
      icon: "🌊",
      theme: "blue",
    },
    {
      title: "1000 Good Deeds",
      action: "SubhanAllah (100x)",
      roi: "1000 Hasanat written",
      cost: "2 Minutes",
      rewardVal: 1000,
      icon: "📈",
      theme: "rose",
    },
  ];

  const grid = document.getElementById("invest-grid");
  const portfolioCounter = document.getElementById("portfolio-count");
  let totalHasanat = 0;

  if (grid && portfolioCounter) {
    // 1. Render Cards
    grid.innerHTML = investmentsData
      .map(
        (item, index) => `
            <div class="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden">
                
                <div class="absolute -right-6 -top-6 w-24 h-24 bg-${item.theme}-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

                <div class="relative z-10">
                    <div class="flex justify-between items-start mb-4">
                        <div class="w-12 h-12 rounded-xl bg-${item.theme}-100 text-2xl flex items-center justify-center">
                            ${item.icon}
                        </div>
                        <span class="bg-${item.theme}-50 text-${item.theme}-700 text-[10px] font-bold px-2 py-1 rounded border border-${item.theme}-100 uppercase">
                            ${item.cost}
                        </span>
                    </div>

                    <h3 class="text-xl font-bold text-gray-800 mb-1">${item.title}</h3>
                    <p class="text-sm text-gray-500 mb-6 min-h-[40px]">${item.action}</p>

                    <div class="bg-gray-50 rounded-lg p-3 mb-6 border border-gray-100">
                        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Return on Investment</p>
                        <p class="text-${item.theme}-600 font-bold text-sm">${item.roi}</p>
                    </div>

                    <button onclick="invest(${index})" class="w-full bg-white border border-${item.theme}-200 text-${item.theme}-700 font-bold py-3 rounded-xl hover:bg-${item.theme}-600 hover:text-white hover:border-${item.theme}-600 transition-all active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden btn-invest-${index}">
                        <span>Invest Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>
            </div>
        `
      )
      .join("");

    // 2. Invest Function (Global)
    window.invest = function (index) {
      const item = investmentsData[index];
      const btn = document.querySelector(`.btn-invest-${index}`);

      // Update Logic
      totalHasanat += item.rewardVal;

      // Animate Counter
      animateValue(
        portfolioCounter,
        parseInt(portfolioCounter.textContent.replace(/,/g, "")),
        totalHasanat,
        500
      );

      // Visual Feedback on Button
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span class='flex items-center gap-2'>Invested! <svg class='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'></path></svg></span>`;
      btn.classList.add(
        "bg-emerald-50",
        "border-emerald-500",
        "text-emerald-700"
      );

      // Floating +1 Text
      const float = document.createElement("div");
      float.className =
        "float-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600 font-bold";
      float.textContent = "+ Good Deeds";
      btn.appendChild(float);

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove(
          "bg-emerald-50",
          "border-emerald-500",
          "text-emerald-700"
        );
        float.remove();
      }, 1000);
    };

    // Helper: Number Animation
    function animateValue(obj, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        obj.innerHTML = current.toLocaleString(); // Adds commas
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }
})();
// ==========================================
// ETERNAL INVESTMENTS (SPIRITUAL BANKING)
// ==========================================
(function () {
  const investmentsData = [
    {
      title: "A House in Jannah",
      action: "Recite Surah Al-Ikhlas 10x",
      roi: "A Palace in Paradise",
      cost: "2 Minutes",
      rewardVal: 100000,
      icon: "🏰",
      theme: "emerald",
    },
    {
      title: "Heavy on the Scales",
      action: "SubhanAllah wa bihamdihi, SubhanAllahil Azeem",
      roi: "Infinite Weight",
      cost: "5 Seconds",
      rewardVal: 5000,
      icon: "⚖️",
      theme: "amber",
    },
    {
      title: "Trees in Paradise",
      action: "SubhanAllah, Alhamdulillah, La ilaha illallah, Allahu Akbar",
      roi: "1 Tree per recitation",
      cost: "3 Seconds",
      rewardVal: 1000,
      icon: "🌴",
      theme: "teal",
    },
    {
      title: "Treasure of Paradise",
      action: "La hawla wa la quwwata illa billah",
      roi: "A Treasure from beneath the Throne",
      cost: "2 Seconds",
      rewardVal: 25000,
      icon: "💎",
      theme: "indigo",
    },
    {
      title: "Forgiveness of Sins",
      action: "SubhanAllah wa bihamdihi (100x)",
      roi: "Sins forgiven even if like sea foam",
      cost: "3 Minutes",
      rewardVal: 50000,
      icon: "🌊",
      theme: "blue",
    },
    {
      title: "1000 Good Deeds",
      action: "SubhanAllah (100x)",
      roi: "1000 Hasanat written",
      cost: "2 Minutes",
      rewardVal: 1000,
      icon: "📈",
      theme: "rose",
    },
  ];

  const grid = document.getElementById("invest-grid");
  const portfolioCounter = document.getElementById("portfolio-count");

  // 1. Load saved score from LocalStorage (or default to 0)
  let totalHasanat = parseInt(localStorage.getItem("tazkiyah_hasanat")) || 0;

  if (grid && portfolioCounter) {
    // 2. Initialize the display immediately
    portfolioCounter.textContent = totalHasanat.toLocaleString();

    // 3. Render Cards
    grid.innerHTML = investmentsData
      .map(
        (item, index) => `
            <div class="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden">
                
                <div class="absolute -right-6 -top-6 w-24 h-24 bg-${item.theme}-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

                <div class="relative z-10">
                    <div class="flex justify-between items-start mb-4">
                        <div class="w-12 h-12 rounded-xl bg-${item.theme}-100 text-2xl flex items-center justify-center">
                            ${item.icon}
                        </div>
                        <span class="bg-${item.theme}-50 text-${item.theme}-700 text-[10px] font-bold px-2 py-1 rounded border border-${item.theme}-100 uppercase">
                            ${item.cost}
                        </span>
                    </div>

                    <h3 class="text-xl font-bold text-gray-800 mb-1">${item.title}</h3>
                    <p class="text-sm text-gray-500 mb-6 min-h-[40px]">${item.action}</p>

                    <div class="bg-gray-50 rounded-lg p-3 mb-6 border border-gray-100">
                        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Return on Investment</p>
                        <p class="text-${item.theme}-600 font-bold text-sm">${item.roi}</p>
                    </div>

                    <button onclick="invest(${index})" class="w-full bg-white border border-${item.theme}-200 text-${item.theme}-700 font-bold py-3 rounded-xl hover:bg-${item.theme}-600 hover:text-white hover:border-${item.theme}-600 transition-all active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden btn-invest-${index}">
                        <span>Invest Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>
            </div>
        `
      )
      .join("");

    // 4. Invest Function (Global)
    window.invest = function (index) {
      const item = investmentsData[index];
      const btn = document.querySelector(`.btn-invest-${index}`);

      // Update Variable
      totalHasanat += item.rewardVal;

      // 5. SAVE to LocalStorage
      localStorage.setItem("tazkiyah_hasanat", totalHasanat);

      // Animate Counter
      const currentVal = parseInt(
        portfolioCounter.textContent.replace(/,/g, "")
      );
      animateValue(portfolioCounter, currentVal, totalHasanat, 500);

      // Visual Feedback on Button
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span class='flex items-center gap-2'>Invested! <svg class='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'></path></svg></span>`;
      btn.classList.add(
        "bg-emerald-50",
        "border-emerald-500",
        "text-emerald-700"
      );

      // Floating +1 Text
      const float = document.createElement("div");
      float.className =
        "float-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600 font-bold";
      float.textContent = "+ Good Deeds";
      btn.appendChild(float);

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove(
          "bg-emerald-50",
          "border-emerald-500",
          "text-emerald-700"
        );
        float.remove();
      }, 1000);
    };

    // Helper: Number Animation
    function animateValue(obj, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        obj.innerHTML = current.toLocaleString(); // Adds commas
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }
})();
// ==========================================
// POST-SALAH ZIKR LOGIC
// ==========================================
(function () {
  const zikrData = [
    {
      title: "The Opening",
      count: 3,
      badge: "Repeat 3 Times",
      arabic: "أَسْتَغْفِرُ اللَّهَ",
      translit: "Astaghfirullah",
      trans: "I seek forgiveness from Allah.",
      ref: "Sahih Muslim 591",
      isCounter: false,
    },
    {
      title: "Peace & Blessing",
      count: 1,
      badge: "Recite Once",
      arabic:
        "اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالإِكْرَامِ",
      translit:
        "Allahumma antas-salam wa minkas-salam tabarakta ya dhal-jalali wal-ikram",
      trans:
        "O Allah, You are Peace and from You is peace. Blessed are You, O Owner of Majesty and Honor.",
      ref: "Sahih Muslim 591",
      isCounter: false,
    },
    {
      title: "Declaration of Tawheed",
      count: 1,
      badge: "Recite Once",
      arabic:
        "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لاَ مَانِعَ لِمَا أَعْطَيْتَ وَلاَ مُعْطِيَ لِمَا مَنَعْتَ وَلاَ يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ",
      translit:
        "La ilaha illallahu wahdahu la sharika lahu... Allahumma la mani'a lima a'tayta...",
      trans:
        "None has the right to be worshipped but Allah alone... O Allah, no one can withhold what You give...",
      ref: "Sahih Al-Bukhari 844",
      isCounter: false,
    },
    {
      title: "Ayat-ul-Kursi",
      count: 1,
      badge: "Essential",
      arabic:
        "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَئُودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
      translit: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum...",
      trans:
        "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence...",
      ref: "An-Nasa'i (Sahih) - The ticket to Jannah",
      isCounter: false,
    },
    {
      title: "Tasbih (Glory)",
      count: 33,
      badge: "Tap Counter",
      arabic: "سُبْحَانَ اللَّهِ",
      translit: "SubhanAllah",
      trans: "Glory be to Allah.",
      ref: "Sahih Muslim 597",
      isCounter: true,
    },
    {
      title: "Tahmid (Praise)",
      count: 33,
      badge: "Tap Counter",
      arabic: "الْحَمْدُ لِلَّهِ",
      translit: "Alhamdulillah",
      trans: "All praise is due to Allah.",
      ref: "Sahih Muslim 597",
      isCounter: true,
    },
    {
      title: "Takbir (Greatness)",
      count: 33,
      badge: "Tap Counter",
      arabic: "اللَّهُ أَكْبَرُ",
      translit: "Allahu Akbar",
      trans: "Allah is the Greatest.",
      ref: "Sahih Muslim 597",
      isCounter: true,
    },
    {
      title: "The Final Seal (Completing 100)",
      count: 1,
      badge: "The Finale",
      arabic:
        "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      translit: "La ilaha illallahu wahdahu la sharika lahu...",
      trans:
        "None has the right to be worshipped but Allah alone... (Completing the hundred).",
      ref: "Sahih Muslim 597 - Sins forgiven even if like foam of sea",
      isCounter: false,
    },
  ];

  let currentIndex = 0;
  let tallyValue = 0;

  // Elements
  const dom = {
    title: document.getElementById("zikr-title"),
    step: document.getElementById("zikr-step-num"),
    badge: document.getElementById("zikr-badge"),
    arabic: document.getElementById("zikr-arabic"),
    translit: document.getElementById("zikr-transliteration"),
    trans: document.getElementById("zikr-translation"),
    ref: document.getElementById("zikr-ref"),
    progress: document.getElementById("zikr-progress"),
    tallyBtn: document.getElementById("tally-btn"),
    tallyCount: document.getElementById("tally-count"),
    tallyTarget: document.getElementById("tally-target"),
    btnNext: document.getElementById("btn-next"),
    btnPrev: document.getElementById("btn-prev"),
  };

  if (dom.title) {
    // Render Function
    function loadZikr(index) {
      const data = zikrData[index];

      // Text Updates
      dom.title.textContent = data.title;
      dom.step.textContent = `Step ${index + 1} of ${zikrData.length}`;
      dom.badge.textContent = data.badge;
      dom.arabic.textContent = data.arabic;
      dom.translit.textContent = data.translit;
      dom.trans.textContent = data.trans;
      dom.ref.textContent = `Source: ${data.ref}`;

      // Progress Bar
      dom.progress.style.width = `${((index + 1) / zikrData.length) * 100}%`;

      // Button States
      dom.btnPrev.disabled = index === 0;
      if (index === zikrData.length - 1) {
        dom.btnNext.innerHTML = `Finish <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;
      } else {
        dom.btnNext.innerHTML = `Next <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>`;
      }

      // Tally Logic
      if (data.isCounter) {
        tallyValue = 0;
        dom.tallyBtn.classList.remove("hidden");
        dom.tallyBtn.classList.add("flex");
        dom.tallyCount.textContent = 0;
        dom.tallyTarget.textContent = `/ ${data.count}`;
        dom.tallyBtn.disabled = false;
        dom.tallyBtn.classList.remove("bg-gray-400");
        dom.tallyBtn.classList.add("bg-emerald-600");
      } else {
        dom.tallyBtn.classList.add("hidden");
        dom.tallyBtn.classList.remove("flex");
      }
    }

    // Global Nav Functions
    window.nextZikr = function () {
      if (currentIndex < zikrData.length - 1) {
        currentIndex++;
        loadZikr(currentIndex);
      } else {
        // Optional: Reset or Show completion
        alert("May Allah accept your worship! You have completed the Zikr.");
        currentIndex = 0;
        loadZikr(0);
      }
    };

    window.prevZikr = function () {
      if (currentIndex > 0) {
        currentIndex--;
        loadZikr(currentIndex);
      }
    };

    // Tally Button Logic
    dom.tallyBtn.addEventListener("click", function () {
      const target = zikrData[currentIndex].count;
      if (tallyValue < target) {
        tallyValue++;
        dom.tallyCount.textContent = tallyValue;

        // Vibrate on mobile for tactile feedback
        if (navigator.vibrate) navigator.vibrate(5);

        if (tallyValue === target) {
          // Success state
          dom.tallyBtn.classList.remove("bg-emerald-600");
          dom.tallyBtn.classList.add("bg-gray-400", "cursor-default");
          if (navigator.vibrate) navigator.vibrate([50, 50, 50]);

          // Auto advance option or just visual cue?
          // Let's just give visual cue
          dom.tallyBtn.disabled = true;
        }
      }
    });

    // Initialize
    loadZikr(0);
  }
})();
// ==========================================
// ZAKAT CALCULATOR LOGIC
// ==========================================
(function () {
  // DOM Elements
  const inputs = {
    rateGold: document.getElementById("rate-gold"),
    rateSilver: document.getElementById("rate-silver"),
    cash: document.getElementById("asset-cash"),
    goldG: document.getElementById("asset-gold-g"),
    silverG: document.getElementById("asset-silver-g"),
    invest: document.getElementById("asset-invest"),
    debt: document.getElementById("liability-debt"),
  };

  const outputs = {
    empty: document.getElementById("zakat-empty"),
    content: document.getElementById("zakat-content"),
    totalDue: document.getElementById("total-zakat-due"),
    netAssets: document.getElementById("result-assets"),
    nisabVal: document.getElementById("result-nisab"),
    status: document.getElementById("result-status"),
  };

  // Global function
  window.calcZakat = function () {
    // 1. Get Values (Default to 0 if empty)
    const rateGold = parseFloat(inputs.rateGold.value) || 0;
    const rateSilver = parseFloat(inputs.rateSilver.value) || 0;

    const cash = parseFloat(inputs.cash.value) || 0;
    const goldWeight = parseFloat(inputs.goldG.value) || 0;
    const silverWeight = parseFloat(inputs.silverG.value) || 0;
    const invest = parseFloat(inputs.invest.value) || 0;
    const debt = parseFloat(inputs.debt.value) || 0;

    // 2. Validate Rates
    if (rateGold === 0 && rateSilver === 0) {
      alert("Please enter the current Gold or Silver rate to calculate Nisab.");
      return;
    }

    // 3. Calculate Totals
    const goldValue = goldWeight * rateGold;
    const silverValue = silverWeight * rateSilver;
    const totalAssets = cash + goldValue + silverValue + invest;
    const netAssets = totalAssets - debt;

    // 4. Calculate Nisab (Threshold)
    // Silver Nisab is usually lower (~612.36g), making it safer for the poor.
    // Gold Nisab is ~87.48g.
    // We use Silver as default if provided, otherwise Gold.
    const silverNisabThreshold = 612.36 * rateSilver;
    const goldNisabThreshold = 87.48 * rateGold;

    let nisabValue = 0;
    // Prefer Silver standard for prudence, or whichever rate is provided
    if (rateSilver > 0) nisabValue = silverNisabThreshold;
    else nisabValue = goldNisabThreshold;

    // 5. Determine Zakat
    let zakatDue = 0;
    let isEligible = false;

    if (netAssets >= nisabValue && netAssets > 0) {
      zakatDue = netAssets * 0.025; // 2.5%
      isEligible = true;
    }

    // 6. Update UI
    outputs.empty.classList.add("hidden");
    outputs.content.classList.remove("hidden");

    // Formatter
    const fmt = (num) =>
      num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    outputs.totalDue.textContent = fmt(zakatDue);
    outputs.netAssets.textContent = fmt(netAssets);
    outputs.nisabVal.textContent = fmt(nisabValue);

    if (isEligible) {
      outputs.status.textContent = "Eligible (Must Pay)";
      outputs.status.className =
        "font-bold px-2 py-0.5 rounded bg-white text-emerald-700 text-xs uppercase";
      outputs.totalDue.parentElement.classList.remove("opacity-50");
    } else {
      outputs.status.textContent = "Below Nisab (No Zakat)";
      outputs.status.className =
        "font-bold px-2 py-0.5 rounded bg-white/10 text-gray-300 text-xs uppercase";
      outputs.totalDue.parentElement.classList.add("opacity-50");
    }
  };

  window.resetZakat = function () {
    // Clear inputs
    Object.values(inputs).forEach((input) => (input.value = ""));

    // Reset View
    outputs.content.classList.add("hidden");
    outputs.empty.classList.remove("hidden");
  };
})();
// ==========================================
// ZAKAT CALCULATOR LOGIC (INR Version)
// ==========================================
(function () {
  // DOM Elements
  const inputs = {
    rateGold: document.getElementById("rate-gold"),
    rateSilver: document.getElementById("rate-silver"),
    cash: document.getElementById("asset-cash"),
    goldG: document.getElementById("asset-gold-g"),
    silverG: document.getElementById("asset-silver-g"),
    invest: document.getElementById("asset-invest"),
    debt: document.getElementById("liability-debt"),
  };

  const outputs = {
    empty: document.getElementById("zakat-empty"),
    content: document.getElementById("zakat-content"),
    totalDue: document.getElementById("total-zakat-due"),
    netAssets: document.getElementById("result-assets"),
    nisabVal: document.getElementById("result-nisab"),
    status: document.getElementById("result-status"),
  };

  // Global function
  window.calcZakat = function () {
    // 1. Get Values (Default to 0 if empty)
    const rateGold = parseFloat(inputs.rateGold.value) || 0;
    const rateSilver = parseFloat(inputs.rateSilver.value) || 0;

    const cash = parseFloat(inputs.cash.value) || 0;
    const goldWeight = parseFloat(inputs.goldG.value) || 0;
    const silverWeight = parseFloat(inputs.silverG.value) || 0;
    const invest = parseFloat(inputs.invest.value) || 0;
    const debt = parseFloat(inputs.debt.value) || 0;

    // 2. Validate Rates
    if (rateGold === 0 && rateSilver === 0) {
      alert("Please enter the current Gold or Silver rate to calculate Nisab.");
      return;
    }

    // 3. Calculate Totals
    const goldValue = goldWeight * rateGold;
    const silverValue = silverWeight * rateSilver;
    const totalAssets = cash + goldValue + silverValue + invest;
    const netAssets = totalAssets - debt;

    // 4. Calculate Nisab (Threshold)
    const silverNisabThreshold = 612.36 * rateSilver;
    const goldNisabThreshold = 87.48 * rateGold;

    let nisabValue = 0;
    // Prefer Silver standard for prudence, or whichever rate is provided
    if (rateSilver > 0) nisabValue = silverNisabThreshold;
    else nisabValue = goldNisabThreshold;

    // 5. Determine Zakat
    let zakatDue = 0;
    let isEligible = false;

    if (netAssets >= nisabValue && netAssets > 0) {
      zakatDue = netAssets * 0.025; // 2.5%
      isEligible = true;
    }

    // 6. Update UI
    outputs.empty.classList.add("hidden");
    outputs.content.classList.remove("hidden");

    // Formatter for Indian Rupee (en-IN)
    const fmt = (num) =>
      num.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    outputs.totalDue.textContent = fmt(zakatDue);
    outputs.netAssets.textContent = fmt(netAssets);
    outputs.nisabVal.textContent = fmt(nisabValue);

    if (isEligible) {
      outputs.status.textContent = "Eligible (Must Pay)";
      outputs.status.className =
        "font-bold px-2 py-0.5 rounded bg-white text-emerald-700 text-xs uppercase";
      outputs.totalDue.parentElement.classList.remove("opacity-50");
    } else {
      outputs.status.textContent = "Below Nisab (No Zakat)";
      outputs.status.className =
        "font-bold px-2 py-0.5 rounded bg-white/10 text-gray-300 text-xs uppercase";
      outputs.totalDue.parentElement.classList.add("opacity-50");
    }
  };

  window.resetZakat = function () {
    // Clear inputs
    Object.values(inputs).forEach((input) => (input.value = ""));

    // Reset View
    outputs.content.classList.add("hidden");
    outputs.empty.classList.remove("hidden");
  };
})();
// ==========================================
// AUTO-DATE UPDATE (FOR FOOTER/THANK YOU)
// ==========================================
(function () {
  // This looks for any element with class 'current-year' and updates it
  const yearElements = document.querySelectorAll(".current-year");
  const year = new Date().getFullYear();
  yearElements.forEach((el) => (el.textContent = year));
})();
// ==========================================
// ASMA-UL-HUSNA (99 NAMES) LOGIC
// ==========================================
(function () {
  // Curated list of names with deep reflections
  const namesData = [
    {
      id: 1,
      arabic: "ٱللَّهُ",
      english: "Allah",
      meaning: "The Greatest Name",
      reflection:
        "This is the name that encompasses all other names. Use 'Ya Allah' when you don't know exactly what to ask for, because it covers every attribute of perfection. It is the name of absolute sovereignty.",
    },
    {
      id: 2,
      arabic: "ٱلرَّحْمَٰنُ",
      english: "Ar-Rahman",
      meaning: "The Entirely Merciful",
      reflection:
        "His mercy is for everyone—believer and non-believer, in this world. Reflect on the air you breathe and the food you eat; these are gifts from Ar-Rahman given freely without you even asking.",
    },
    {
      id: 3,
      arabic: "ٱلرَّحِيمُ",
      english: "Ar-Raheem",
      meaning: "The Especially Merciful",
      reflection:
        "This implies a specific, loving mercy reserved for those who believe. Call upon Ar-Raheem when you need special care, forgiveness, or a hug for your soul during worship.",
    },
    {
      id: 4,
      arabic: "ٱلْمَلِكُ",
      english: "Al-Malik",
      meaning: "The King",
      reflection:
        "He is the Owner of everything. When you lose something worldly, remember Al-Malik owns it anyway. It frees you from attachment to material things.",
    },
    {
      id: 6,
      arabic: "ٱلسَّلَامُ",
      english: "As-Salam",
      meaning: "The Source of Peace",
      reflection:
        "If you feel anxiety or chaos, run to As-Salam. He is the only one who can place coolness and tranquility in a burning heart. True peace is found only in His remembrance.",
    },
    {
      id: 19,
      arabic: "ٱلْعَلِيمُ",
      english: "Al-'Aleem",
      meaning: "The All-Knowing",
      reflection:
        "He knows your pain even if you can't put it into words. He knows your intentions even if people misunderstand you. Find comfort that Al-'Aleem understands your story completely.",
    },
    {
      id: 26,
      arabic: "ٱلسَّمِيعُ",
      english: "As-Sami'",
      meaning: "The All-Hearing",
      reflection:
        "He hears the silent whisper of your heart just as clearly as a shout. Never think your Dua is lost in the noise of the world. As-Sami' is listening to you specifically right now.",
    },
    {
      id: 30,
      arabic: "ٱللَّطِيفُ",
      english: "Al-Lateef",
      meaning: "The Subtle One",
      reflection:
        "He helps you in ways you don't realize. A delay in traffic that saves you from an accident, a closed door that redirects you to something better. Al-Lateef is kind in the most subtle, hidden ways.",
    },
    {
      id: 35,
      arabic: "ٱلْغَفُورُ",
      english: "Al-Ghafoor",
      meaning: "The Exceedingly Forgiving",
      reflection:
        "No matter how big the mountain of your sins, the ocean of His forgiveness is deeper. Al-Ghafoor conceals your faults and protects you from their consequences.",
    },
    {
      id: 55,
      arabic: "ٱلْمَتِينُ",
      english: "Al-Mateen",
      meaning: "The Firm, The Steadfast",
      reflection:
        "When you feel weak, burnt out, or broken, lean on Al-Mateen. His strength never wavers, and He can recharge your exhausted soul instantly.",
    },
    {
      id: 87,
      arabic: "ٱلْجَامِعُ",
      english: "Al-Jami'",
      meaning: "The Gatherer",
      reflection:
        "He gathers people for the Day of Judgment, but He also gathers hearts that are separated. If you feel scattered or lost, ask Al-Jami' to gather the pieces of your heart together again.",
    },
  ];

  const listContainer = document.getElementById("asma-list");

  // Display Elements
  const dom = {
    number: document.getElementById("name-number"),
    arabic: document.getElementById("name-arabic"),
    english: document.getElementById("name-english"),
    meaning: document.getElementById("name-meaning"),
    reflection: document.getElementById("name-reflection"),
    card: document.getElementById("asma-card"),
  };

  if (listContainer && dom.arabic) {
    // 1. Render List
    listContainer.innerHTML = namesData
      .map(
        (item, index) => `
            <button onclick="loadName(${index})" class="name-btn w-full text-left px-4 py-3 rounded-xl border border-transparent hover:bg-gray-50 transition-all duration-200 flex items-center justify-between group" data-index="${index}">
                <div class="flex items-center gap-3">
                    <span class="text-xs font-mono font-bold text-gray-300 w-6">${item.id}.</span>
                    <span class="font-bold text-gray-700 group-hover:text-emerald-700">${item.english}</span>
                </div>
                <span class="font-amiri text-lg text-emerald-800/50 group-hover:text-emerald-600">${item.arabic}</span>
            </button>
        `
      )
      .join("");

    // 2. Load Function
    window.loadName = function (index) {
      const data = namesData[index];

      // Visual Active State for Buttons
      document.querySelectorAll(".name-btn").forEach((btn) => {
        if (parseInt(btn.getAttribute("data-index")) === index) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      // Animate Card Out
      dom.card.classList.add("opacity-50", "scale-[0.98]");

      setTimeout(() => {
        // Update Data
        dom.number.textContent = data.id;
        dom.arabic.textContent = data.arabic;
        dom.english.textContent = data.english;
        dom.meaning.textContent = data.meaning;
        dom.reflection.textContent = data.reflection;

        // Animate Card In
        dom.card.classList.remove("opacity-50", "scale-[0.98]");
      }, 200);
    };

    // Initialize First Name
    loadName(0);
  }
})();
// ==========================================
// DAILY DUAS CAROUSEL LOGIC
// ==========================================
(function() {
    const duasData = [
        {
            category: "Cleanliness",
            title: "After Wudu",
            icon: "💧",
            arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
            trans: "Ashhadu an la ilaha illallah wahdahu la sharika lahu wa ashhadu anna Muhammadan 'abduhu wa rasuluh.",
            meaning: "I bear witness that none has the right to be worshipped but Allah alone... and Muhammad is His slave and Messenger.",
            ref: "Muslim 1/209"
        },
        {
            category: "Eating",
            title: "Before Eating",
            icon: "🍽️",
            arabic: "بِسْمِ اللَّهِ",
            trans: "Bismillah.",
            meaning: "In the name of Allah. (If you forget, say: Bismillahi awwalahu wa akhirahu).",
            ref: "Abu Dawud 3/347"
        },
        {
            category: "Eating",
            title: "After Eating",
            icon: "🤲",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
            trans: "Alhamdu lillahil-ladzi at'amana wa saqana wa ja'alana Muslimeen.",
            meaning: "All praise belongs to Allah, who fed us and quenched our thirst and made us Muslims.",
            ref: "At-Tirmidhi"
        },
        {
            category: "Home",
            title: "Leaving Home",
            icon: "🚪",
            arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
            trans: "Bismillahi tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah.",
            meaning: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
            ref: "Abu Dawud 4/325"
        },
        {
            category: "Home",
            title: "Entering Home",
            icon: "🏡",
            arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
            trans: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Rabbina tawakkalna.",
            meaning: "In the name of Allah we enter, and in the name of Allah we leave, and upon our Lord we rely.",
            ref: "Abu Dawud 4/325"
        },
        {
            category: "Journey",
            title: "Traveling",
            icon: "🚗",
            arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
            trans: "Subhanal-ladzi sakh-khara lana hadha wa ma kunna lahu muqrinin...",
            meaning: "Glory to Him who has brought this [vehicle] under our control, though we were unable to control it ourselves...",
            ref: "Quran 43:13-14"
        },
        {
            category: "Mosque",
            title: "Entering Mosque",
            icon: "🕌",
            arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
            trans: "Allahumma-ftah li abwaba rahmatik.",
            meaning: "O Allah, open the gates of Your mercy for me.",
            ref: "Muslim 1/494"
        }
    ];

    const track = document.getElementById('dua-track');
    const prevBtn = document.getElementById('dua-prev');
    const nextBtn = document.getElementById('dua-next');

    if (track) {
        
        // 1. Render Cards
        track.innerHTML = duasData.map((item, index) => `
            <div class="min-w-[300px] md:min-w-[350px] snap-center bg-white rounded-3xl p-6 border border-emerald-50 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col relative group">
                
                <div class="flex justify-between items-start mb-4">
                    <span class="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                        ${item.category}
                    </span>
                    <button onclick="copyDua(${index})" class="text-gray-300 hover:text-emerald-500 transition-colors" title="Copy Text" id="copy-btn-${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </button>
                </div>

                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                        ${item.icon}
                    </div>
                    <h3 class="text-xl font-bold text-gray-800">${item.title}</h3>
                </div>

                <div class="text-center mt-auto space-y-4">
                    <p class="font-amiri text-2xl text-emerald-900 leading-loose dir-rtl" id="dua-text-${index}">
                        ${item.arabic}
                    </p>
                    <div class="bg-gray-50 rounded-xl p-3">
                        <p class="text-xs text-emerald-600 font-medium italic mb-2">${item.trans}</p>
                        <p class="text-xs text-gray-500 leading-relaxed border-t border-gray-200 pt-2">${item.meaning}</p>
                    </div>
                    <p class="text-[10px] text-gray-300 font-bold uppercase">${item.ref}</p>
                </div>
            </div>
        `).join('');

        // 2. Navigation Logic
        const scrollAmount = 320; // Width of card + gap

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        // 3. Copy Function
        window.copyDua = function(index) {
            const text = document.getElementById(`dua-text-${index}`).textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                const btn = document.getElementById(`copy-btn-${index}`);
                const originalHTML = btn.innerHTML;
                
                // Visual Feedback
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>`;
                btn.classList.add('animate-copy');
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('animate-copy');
                }, 1500);
            });
        };
    }
})();
// ==========================================
// DAILY DUAS CAROUSEL LOGIC
// ==========================================
(function() {
    const duasData = [
        {
            category: "Cleanliness",
            title: "After Wudu",
            icon: "💧",
            arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
            trans: "Ashhadu an la ilaha illallah wahdahu la sharika lahu wa ashhadu anna Muhammadan 'abduhu wa rasuluh.",
            meaning: "I bear witness that none has the right to be worshipped but Allah alone... and Muhammad is His slave and Messenger.",
            ref: "Muslim 1/209"
        },
        {
            category: "Eating",
            title: "Before Eating",
            icon: "🍽️",
            arabic: "بِسْمِ اللَّهِ",
            trans: "Bismillah.",
            meaning: "In the name of Allah. (If you forget, say: Bismillahi awwalahu wa akhirahu).",
            ref: "Abu Dawud 3/347"
        },
        {
            category: "Eating",
            title: "After Eating",
            icon: "🤲",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
            trans: "Alhamdu lillahil-ladzi at'amana wa saqana wa ja'alana Muslimeen.",
            meaning: "All praise belongs to Allah, who fed us and quenched our thirst and made us Muslims.",
            ref: "At-Tirmidhi"
        },
        {
            category: "Home",
            title: "Leaving Home",
            icon: "🚪",
            arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
            trans: "Bismillahi tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah.",
            meaning: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
            ref: "Abu Dawud 4/325"
        },
        {
            category: "Home",
            title: "Entering Home",
            icon: "🏡",
            arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
            trans: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Rabbina tawakkalna.",
            meaning: "In the name of Allah we enter, and in the name of Allah we leave, and upon our Lord we rely.",
            ref: "Abu Dawud 4/325"
        },
        {
            category: "Journey",
            title: "Traveling",
            icon: "🚗",
            arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
            trans: "Subhanal-ladzi sakh-khara lana hadha wa ma kunna lahu muqrinin...",
            meaning: "Glory to Him who has brought this [vehicle] under our control, though we were unable to control it ourselves...",
            ref: "Quran 43:13-14"
        },
        {
            category: "Mosque",
            title: "Entering Mosque",
            icon: "🕌",
            arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
            trans: "Allahumma-ftah li abwaba rahmatik.",
            meaning: "O Allah, open the gates of Your mercy for me.",
            ref: "Muslim 1/494"
        },
        {
            category: "Mosque",
            title: "Leaving Mosque",
            icon: "👟",
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
            trans: "Allahumma inni as'aluka min fadlik.",
            meaning: "O Allah, I ask You from Your bounty.",
            ref: "Muslim 1/494"
        }
    ];

    const track = document.getElementById('dua-track');
    const prevBtn = document.getElementById('dua-prev');
    const nextBtn = document.getElementById('dua-next');

    if (track) {
        
        // 1. Render Cards
        track.innerHTML = duasData.map((item, index) => `
            <div class="min-w-[300px] md:min-w-[350px] snap-center bg-white rounded-3xl p-6 border border-emerald-50 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col relative group">
                
                <div class="flex justify-between items-start mb-4">
                    <span class="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                        ${item.category}
                    </span>
                    <button onclick="copyDua(${index})" class="text-gray-300 hover:text-emerald-500 transition-colors" title="Copy Text" id="copy-btn-${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </button>
                </div>

                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                        ${item.icon}
                    </div>
                    <h3 class="text-xl font-bold text-gray-800">${item.title}</h3>
                </div>

                <div class="text-center mt-auto space-y-4">
                    <p class="font-amiri text-2xl text-emerald-900 leading-loose dir-rtl" id="dua-text-${index}">
                        ${item.arabic}
                    </p>
                    <div class="bg-gray-50 rounded-xl p-3">
                        <p class="text-xs text-emerald-600 font-medium italic mb-2">${item.trans}</p>
                        <p class="text-xs text-gray-500 leading-relaxed border-t border-gray-200 pt-2">${item.meaning}</p>
                    </div>
                    <p class="text-[10px] text-gray-300 font-bold uppercase">${item.ref}</p>
                </div>
            </div>
        `).join('');

        // 2. Navigation Logic
        const scrollAmount = 320; // Width of card + gap

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        // 3. Copy Function
        window.copyDua = function(index) {
            const text = document.getElementById(`dua-text-${index}`).textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                const btn = document.getElementById(`copy-btn-${index}`);
                const originalHTML = btn.innerHTML;
                
                // Visual Feedback
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>`;
                btn.classList.add('animate-copy');
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('animate-copy');
                }, 1500);
            });
        };
    }
})();