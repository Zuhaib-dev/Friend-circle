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
            urdu: "تم میں سے کوئی مومن نہیں ہو سکتا جب تک کہ وہ اپنے بھائی کے لیے وہی نہ پسند کرے جو اپنے لیے پسند کرتا ہے۔",
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