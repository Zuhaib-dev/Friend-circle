document.addEventListener('DOMContentLoaded', () => {
    
    // Data Store: Add more Hadiths here to increase variety
    const hadithCollection = [
    {
        arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
        urdu: "تمام اعمال کا دارومدار نیت پر ہے۔",
        source: "Sahih Al-Bukhari"
    },
    {
        arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
        urdu: "تم میں سے بہترین وہ ہے جو قرآن سیکھے اور سکھائے۔",
        source: "Sahih Al-Bukhari"
    },
    {
        arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
        urdu: "تم میں سے کوئی مومن نہیں ہو سکتا جب تک وہ اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔",
        source: "Sahih Muslim"
    },
    {
        arabic: "الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ",
        urdu: "دنیا مومن کے لیے قید خانہ اور کافر کے لیے جنت ہے۔",
        source: "Sahih Muslim"
    },
    {
        arabic: "أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا",
        urdu: "مومنوں میں سب سے کامل ایمان والا وہ ہے جس کا اخلاق سب سے اچھا ہو۔",
        source: "Sunan Abu Dawood"
    },

    {
        arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
        urdu: "جو اللہ اور آخرت پر ایمان رکھتا ہے وہ اچھی بات کہے یا خاموش رہے۔",
        source: "Sahih Al-Bukhari"
    },
    {
        arabic: "الطُّهُورُ شَطْرُ الْإِيمَانِ",
        urdu: "پاکیزگی ایمان کا نصف ہے۔",
        source: "Sahih Muslim"
    },
    {
        arabic: "الدِّينُ النَّصِيحَةُ",
        urdu: "دین خیرخواہی کا نام ہے۔",
        source: "Sahih Muslim"
    },
    {
        arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَٰنُ",
        urdu: "رحم کرنے والوں پر رحمٰن رحم فرماتا ہے۔",
        source: "Jami` at-Tirmidhi"
    },
    {
        arabic: "مَنْ لَا يَرْحَمْ لَا يُرْحَمْ",
        urdu: "جو رحم نہیں کرتا اس پر رحم نہیں کیا جاتا۔",
        source: "Sahih Al-Bukhari"
    },
    {
        arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",
        urdu: "اپنے بھائی کے چہرے پر مسکرانا صدقہ ہے۔",
        source: "Jami` at-Tirmidhi"
    },
    {
        arabic: "الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى",
        urdu: "اوپر والا ہاتھ نیچے والے ہاتھ سے بہتر ہے۔",
        source: "Sahih Al-Bukhari"
    },
    {
        arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
        urdu: "سب سے بہترین لوگ وہ ہیں جو لوگوں کو سب سے زیادہ فائدہ پہنچائیں۔",
        source: "Al-Mu'jam Al-Awsat"
    },
    {
        arabic: "مَنْ صَمَتَ نَجَا",
        urdu: "جو خاموش رہا وہ نجات پا گیا۔",
        source: "Musnad Ahmad"
    },
    {
        arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ",
        urdu: "جہاں کہیں بھی ہو اللہ سے ڈرو۔",
        source: "Jami` at-Tirmidhi"
    },
    {
        arabic: "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ",
        urdu: "بے شک اللہ خوبصورت ہے اور خوبصورتی کو پسند کرتا ہے۔",
        source: "Sahih Muslim"
    },
    {
        arabic: "الْمُؤْمِنُ مِرْآةُ الْمُؤْمِنِ",
        urdu: "مومن، مومن کا آئینہ ہوتا ہے۔",
        source: "Sunan Abu Dawood"
    },
    {
        arabic: "خَيْرُ الْأُمُورِ أَوْسَطُهَا",
        urdu: "تمام کاموں میں بہترین اعتدال ہے۔",
        source: "Al-Bayhaqi"
    },
    {
        arabic: "إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَلَا إِلَى أَجْسَادِكُمْ",
        urdu: "اللہ تمہاری شکلوں اور جسموں کو نہیں دیکھتا۔",
        source: "Sahih Muslim"
    },
    {
        arabic: "مَنْ دَلَّ عَلَى خَيْرٍ فَلَهُ مِثْلُ أَجْرِ فَاعِلِهِ",
        urdu: "جو کسی نیکی کی رہنمائی کرے اسے بھی وہی اجر ملتا ہے۔",
        source: "Sahih Muslim"
    }
];


    // Select Elements
    const arabicEl = document.getElementById('hadith-arabic');
    const urduEl = document.getElementById('hadith-urdu');
    const sourceEl = document.getElementById('hadith-source');

    // Logic to pick a hadith based on the day of the year
    // This ensures everyone sees the same Hadith for 24 hours
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Use Modulo (%) to loop through the array endlessly
    const dailyIndex = dayOfYear % hadithCollection.length;
    const todaysHadith = hadithCollection[dailyIndex];

    // Inject Content
    arabicEl.textContent = todaysHadith.arabic;
    urduEl.textContent = todaysHadith.urdu;
    sourceEl.textContent = todaysHadith.source;
});