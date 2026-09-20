
export type Lang = "en" | "ur" | "both";

export type ReaderPrefs = {
  arabicSize: number;
  translationSize: number;
  lineHeight: number;
  arabicFont: "amiri" | "scheherazade";
  showArabic: boolean;
};

export const DEFAULT_PREFS: ReaderPrefs = {
  arabicSize: 26,
  translationSize: 14,
  lineHeight: 2.2,
  arabicFont: "amiri",
  showArabic: true,
};


export type Surah = {
  number: number;
  name: string;
  arabic: string;
  meaning: string;
  ayats: number;
  revelation: "Meccan" | "Medinan";
};

export const SURAHS: Surah[] = [
  { number: 1, name: "Al-Fatihah", arabic: "ٱلْفَاتِحَة", meaning: "The Opening", ayats: 7, revelation: "Meccan" },
  { number: 2, name: "Al-Baqarah", arabic: "ٱلْبَقَرَة", meaning: "The Cow", ayats: 286, revelation: "Medinan" },
  { number: 3, name: "Aal-E-Imran", arabic: "آلِ عِمْرَان", meaning: "The Family of Imran", ayats: 200, revelation: "Medinan" },
  { number: 4, name: "An-Nisa", arabic: "ٱلنِّسَاء", meaning: "The Women", ayats: 176, revelation: "Medinan" },
  { number: 5, name: "Al-Ma'idah", arabic: "ٱلْمَائِدَة", meaning: "The Table Spread", ayats: 120, revelation: "Medinan" },
  { number: 6, name: "Al-An'am", arabic: "ٱلْأَنْعَام", meaning: "The Cattle", ayats: 165, revelation: "Meccan" },
  { number: 7, name: "Al-A'raf", arabic: "ٱلْأَعْرَاف", meaning: "The Heights", ayats: 206, revelation: "Meccan" },
  { number: 8, name: "Al-Anfal", arabic: "ٱلْأَنْفَال", meaning: "The Spoils of War", ayats: 75, revelation: "Medinan" },
  { number: 9, name: "At-Tawbah", arabic: "ٱلتَّوْبَة", meaning: "The Repentance", ayats: 129, revelation: "Medinan" },
  { number: 10, name: "Yunus", arabic: "يُونُس", meaning: "Jonah", ayats: 109, revelation: "Meccan" },
  { number: 11, name: "Hud", arabic: "هُود", meaning: "Hud", ayats: 123, revelation: "Meccan" },
  { number: 12, name: "Yusuf", arabic: "يُوسُف", meaning: "Joseph", ayats: 111, revelation: "Meccan" },
  { number: 13, name: "Ar-Ra'd", arabic: "ٱلرَّعْد", meaning: "The Thunder", ayats: 43, revelation: "Medinan" },
  { number: 14, name: "Ibrahim", arabic: "إِبْرَاهِيم", meaning: "Abraham", ayats: 52, revelation: "Meccan" },
  { number: 15, name: "Al-Hijr", arabic: "ٱلْحِجْر", meaning: "The Rocky Tract", ayats: 99, revelation: "Meccan" },
  { number: 16, name: "An-Nahl", arabic: "ٱلنَّحْل", meaning: "The Bee", ayats: 128, revelation: "Meccan" },
  { number: 17, name: "Al-Isra", arabic: "ٱلْإِسْرَاء", meaning: "The Night Journey", ayats: 111, revelation: "Meccan" },
  { number: 18, name: "Al-Kahf", arabic: "ٱلْكَهْف", meaning: "The Cave", ayats: 110, revelation: "Meccan" },
  { number: 19, name: "Maryam", arabic: "مَرْيَم", meaning: "Mary", ayats: 98, revelation: "Meccan" },
  { number: 20, name: "Ta-Ha", arabic: "طه", meaning: "Ta-Ha", ayats: 135, revelation: "Meccan" },
  { number: 21, name: "Al-Anbiya", arabic: "ٱلْأَنْبِيَاء", meaning: "The Prophets", ayats: 112, revelation: "Meccan" },
  { number: 22, name: "Al-Hajj", arabic: "ٱلْحَجّ", meaning: "The Pilgrimage", ayats: 78, revelation: "Medinan" },
  { number: 23, name: "Al-Mu'minun", arabic: "ٱلْمُؤْمِنُون", meaning: "The Believers", ayats: 118, revelation: "Meccan" },
  { number: 24, name: "An-Nur", arabic: "ٱلنُّور", meaning: "The Light", ayats: 64, revelation: "Medinan" },
  { number: 25, name: "Al-Furqan", arabic: "ٱلْفُرْقَان", meaning: "The Criterion", ayats: 77, revelation: "Meccan" },
  { number: 26, name: "Ash-Shu'ara", arabic: "ٱلشُّعَرَاء", meaning: "The Poets", ayats: 227, revelation: "Meccan" },
  { number: 27, name: "An-Naml", arabic: "ٱلنَّمْل", meaning: "The Ant", ayats: 93, revelation: "Meccan" },
  { number: 28, name: "Al-Qasas", arabic: "ٱلْقَصَص", meaning: "The Stories", ayats: 88, revelation: "Meccan" },
  { number: 29, name: "Al-Ankabut", arabic: "ٱلْعَنْكَبُوت", meaning: "The Spider", ayats: 69, revelation: "Meccan" },
  { number: 30, name: "Ar-Rum", arabic: "ٱلرُّوم", meaning: "The Romans", ayats: 60, revelation: "Meccan" },
  { number: 31, name: "Luqman", arabic: "لُقْمَان", meaning: "Luqman", ayats: 34, revelation: "Meccan" },
  { number: 32, name: "As-Sajdah", arabic: "ٱلسَّجْدَة", meaning: "The Prostration", ayats: 30, revelation: "Meccan" },
  { number: 33, name: "Al-Ahzab", arabic: "ٱلْأَحْزَاب", meaning: "The Combined Forces", ayats: 73, revelation: "Medinan" },
  { number: 34, name: "Saba", arabic: "سَبَأ", meaning: "Sheba", ayats: 54, revelation: "Meccan" },
  { number: 35, name: "Fatir", arabic: "فَاطِر", meaning: "Originator", ayats: 45, revelation: "Meccan" },
  { number: 36, name: "Ya-Sin", arabic: "يس", meaning: "Ya-Sin", ayats: 83, revelation: "Meccan" },
  { number: 37, name: "As-Saffat", arabic: "ٱلصَّافَّات", meaning: "Those Who Set the Ranks", ayats: 182, revelation: "Meccan" },
  { number: 38, name: "Sad", arabic: "ص", meaning: "Sad", ayats: 88, revelation: "Meccan" },
  { number: 39, name: "Az-Zumar", arabic: "ٱلزُّمَر", meaning: "The Troops", ayats: 75, revelation: "Meccan" },
  { number: 40, name: "Ghafir", arabic: "غَافِر", meaning: "The Forgiver", ayats: 85, revelation: "Meccan" },
  { number: 41, name: "Fussilat", arabic: "فُصِّلَت", meaning: "Explained in Detail", ayats: 54, revelation: "Meccan" },
  { number: 42, name: "Ash-Shura", arabic: "ٱلشُّورَىٰ", meaning: "The Consultation", ayats: 53, revelation: "Meccan" },
  { number: 43, name: "Az-Zukhruf", arabic: "ٱلزُّخْرُف", meaning: "The Ornaments of Gold", ayats: 89, revelation: "Meccan" },
  { number: 44, name: "Ad-Dukhan", arabic: "ٱلدُّخَان", meaning: "The Smoke", ayats: 59, revelation: "Meccan" },
  { number: 45, name: "Al-Jathiyah", arabic: "ٱلْجَاثِيَة", meaning: "The Crouching", ayats: 37, revelation: "Meccan" },
  { number: 46, name: "Al-Ahqaf", arabic: "ٱلْأَحْقَاف", meaning: "The Wind-Curved Sandhills", ayats: 35, revelation: "Meccan" },
  { number: 47, name: "Muhammad", arabic: "مُحَمَّد", meaning: "Muhammad", ayats: 38, revelation: "Medinan" },
  { number: 48, name: "Al-Fath", arabic: "ٱلْفَتْح", meaning: "The Victory", ayats: 29, revelation: "Medinan" },
  { number: 49, name: "Al-Hujurat", arabic: "ٱلْحُجُرَات", meaning: "The Rooms", ayats: 18, revelation: "Medinan" },
  { number: 50, name: "Qaf", arabic: "ق", meaning: "Qaf", ayats: 45, revelation: "Meccan" },
  { number: 51, name: "Adh-Dhariyat", arabic: "ٱلذَّارِيَات", meaning: "The Winnowing Winds", ayats: 60, revelation: "Meccan" },
  { number: 52, name: "At-Tur", arabic: "ٱلطُّور", meaning: "The Mount", ayats: 49, revelation: "Meccan" },
  { number: 53, name: "An-Najm", arabic: "ٱلنَّجْم", meaning: "The Star", ayats: 62, revelation: "Meccan" },
  { number: 54, name: "Al-Qamar", arabic: "ٱلْقَمَر", meaning: "The Moon", ayats: 55, revelation: "Meccan" },
  { number: 55, name: "Ar-Rahman", arabic: "ٱلرَّحْمَٰن", meaning: "The Most Merciful", ayats: 78, revelation: "Medinan" },
  { number: 56, name: "Al-Waqi'ah", arabic: "ٱلْوَاقِعَة", meaning: "The Inevitable", ayats: 96, revelation: "Meccan" },
  { number: 57, name: "Al-Hadid", arabic: "ٱلْحَدِيد", meaning: "The Iron", ayats: 29, revelation: "Medinan" },
  { number: 58, name: "Al-Mujadila", arabic: "ٱلْمُجَادِلَة", meaning: "The Pleading Woman", ayats: 22, revelation: "Medinan" },
  { number: 59, name: "Al-Hashr", arabic: "ٱلْحَشْر", meaning: "The Exile", ayats: 24, revelation: "Medinan" },
  { number: 60, name: "Al-Mumtahanah", arabic: "ٱلْمُمْتَحَنَة", meaning: "She That Is to Be Examined", ayats: 13, revelation: "Medinan" },
  { number: 61, name: "As-Saff", arabic: "ٱلصَّفّ", meaning: "The Ranks", ayats: 14, revelation: "Medinan" },
  { number: 62, name: "Al-Jumu'ah", arabic: "ٱلْجُمُعَة", meaning: "The Congregation", ayats: 11, revelation: "Medinan" },
  { number: 63, name: "Al-Munafiqun", arabic: "ٱلْمُنَافِقُون", meaning: "The Hypocrites", ayats: 11, revelation: "Medinan" },
  { number: 64, name: "At-Taghabun", arabic: "ٱلتَّغَابُن", meaning: "The Mutual Disillusion", ayats: 18, revelation: "Medinan" },
  { number: 65, name: "At-Talaq", arabic: "ٱلطَّلَاق", meaning: "The Divorce", ayats: 12, revelation: "Medinan" },
  { number: 66, name: "At-Tahrim", arabic: "ٱلتَّحْرِيم", meaning: "The Prohibition", ayats: 12, revelation: "Medinan" },
  { number: 67, name: "Al-Mulk", arabic: "ٱلْمُلْك", meaning: "The Sovereignty", ayats: 30, revelation: "Meccan" },
  { number: 68, name: "Al-Qalam", arabic: "ٱلْقَلَم", meaning: "The Pen", ayats: 52, revelation: "Meccan" },
  { number: 69, name: "Al-Haqqah", arabic: "ٱلْحَاقَّة", meaning: "The Reality", ayats: 52, revelation: "Meccan" },
  { number: 70, name: "Al-Ma'arij", arabic: "ٱلْمَعَارِج", meaning: "The Ascending Stairways", ayats: 44, revelation: "Meccan" },
  { number: 71, name: "Nuh", arabic: "نُوح", meaning: "Noah", ayats: 28, revelation: "Meccan" },
  { number: 72, name: "Al-Jinn", arabic: "ٱلْجِنّ", meaning: "The Jinn", ayats: 28, revelation: "Meccan" },
  { number: 73, name: "Al-Muzzammil", arabic: "ٱلْمُزَّمِّل", meaning: "The Enshrouded One", ayats: 20, revelation: "Meccan" },
  { number: 74, name: "Al-Muddaththir", arabic: "ٱلْمُدَّثِّر", meaning: "The Cloaked One", ayats: 56, revelation: "Meccan" },
  { number: 75, name: "Al-Qiyamah", arabic: "ٱلْقِيَامَة", meaning: "The Resurrection", ayats: 40, revelation: "Meccan" },
  { number: 76, name: "Al-Insan", arabic: "ٱلْإِنْسَان", meaning: "The Human", ayats: 31, revelation: "Medinan" },
  { number: 77, name: "Al-Mursalat", arabic: "ٱلْمُرْسَلَات", meaning: "The Emissaries", ayats: 50, revelation: "Meccan" },
  { number: 78, name: "An-Naba", arabic: "ٱلنَّبَأ", meaning: "The Tidings", ayats: 40, revelation: "Meccan" },
  { number: 79, name: "An-Nazi'at", arabic: "ٱلنَّازِعَات", meaning: "Those Who Drag Forth", ayats: 46, revelation: "Meccan" },
  { number: 80, name: "Abasa", arabic: "عَبَسَ", meaning: "He Frowned", ayats: 42, revelation: "Meccan" },
  { number: 81, name: "At-Takwir", arabic: "ٱلتَّكْوِير", meaning: "The Overthrowing", ayats: 29, revelation: "Meccan" },
  { number: 82, name: "Al-Infitar", arabic: "ٱلْإِنْفِطَار", meaning: "The Cleaving", ayats: 19, revelation: "Meccan" },
  { number: 83, name: "Al-Mutaffifin", arabic: "ٱلْمُطَفِّفِين", meaning: "The Defrauding", ayats: 36, revelation: "Meccan" },
  { number: 84, name: "Al-Inshiqaq", arabic: "ٱلْإِنْشِقَاق", meaning: "The Sundering", ayats: 25, revelation: "Meccan" },
  { number: 85, name: "Al-Buruj", arabic: "ٱلْبُرُوج", meaning: "The Mansions of the Stars", ayats: 22, revelation: "Meccan" },
  { number: 86, name: "At-Tariq", arabic: "ٱلطَّارِق", meaning: "The Morning Star", ayats: 17, revelation: "Meccan" },
  { number: 87, name: "Al-A'la", arabic: "ٱلْأَعْلَىٰ", meaning: "The Most High", ayats: 19, revelation: "Meccan" },
  { number: 88, name: "Al-Ghashiyah", arabic: "ٱلْغَاشِيَة", meaning: "The Overwhelming", ayats: 26, revelation: "Meccan" },
  { number: 89, name: "Al-Fajr", arabic: "ٱلْفَجْر", meaning: "The Dawn", ayats: 30, revelation: "Meccan" },
  { number: 90, name: "Al-Balad", arabic: "ٱلْبَلَد", meaning: "The City", ayats: 20, revelation: "Meccan" },
  { number: 91, name: "Ash-Shams", arabic: "ٱلشَّمْس", meaning: "The Sun", ayats: 15, revelation: "Meccan" },
  { number: 92, name: "Al-Lail", arabic: "ٱلَّيْل", meaning: "The Night", ayats: 21, revelation: "Meccan" },
  { number: 93, name: "Ad-Duhaa", arabic: "ٱلضُّحَىٰ", meaning: "The Morning Hours", ayats: 11, revelation: "Meccan" },
  { number: 94, name: "Ash-Sharh", arabic: "ٱلشَّرْح", meaning: "The Relief", ayats: 8, revelation: "Meccan" },
  { number: 95, name: "At-Tin", arabic: "ٱلتِّين", meaning: "The Fig", ayats: 8, revelation: "Meccan" },
  { number: 96, name: "Al-Alaq", arabic: "ٱلْعَلَق", meaning: "The Clot", ayats: 19, revelation: "Meccan" },
  { number: 97, name: "Al-Qadr", arabic: "ٱلْقَدْر", meaning: "The Power", ayats: 5, revelation: "Meccan" },
  { number: 98, name: "Al-Bayyinah", arabic: "ٱلْبَيِّنَة", meaning: "The Clear Proof", ayats: 8, revelation: "Medinan" },
  { number: 99, name: "Az-Zalzalah", arabic: "ٱلزَّلْزَلَة", meaning: "The Earthquake", ayats: 8, revelation: "Medinan" },
  { number: 100, name: "Al-Adiyat", arabic: "ٱلْعَادِيَات", meaning: "The Courser", ayats: 11, revelation: "Meccan" },
  { number: 101, name: "Al-Qari'ah", arabic: "ٱلْقَارِعَة", meaning: "The Calamity", ayats: 11, revelation: "Meccan" },
  { number: 102, name: "At-Takathur", arabic: "ٱلتَّكَاثُر", meaning: "The Rivalry in World Increase", ayats: 8, revelation: "Meccan" },
  { number: 103, name: "Al-Asr", arabic: "ٱلْعَصْر", meaning: "The Declining Day", ayats: 3, revelation: "Meccan" },
  { number: 104, name: "Al-Humazah", arabic: "ٱلْهُمَزَة", meaning: "The Traducer", ayats: 9, revelation: "Meccan" },
  { number: 105, name: "Al-Fil", arabic: "ٱلْفِيل", meaning: "The Elephant", ayats: 5, revelation: "Meccan" },
  { number: 106, name: "Quraysh", arabic: "قُرَيْش", meaning: "Quraysh", ayats: 4, revelation: "Meccan" },
  { number: 107, name: "Al-Ma'un", arabic: "ٱلْمَاعُون", meaning: "The Small Kindnesses", ayats: 7, revelation: "Meccan" },
  { number: 108, name: "Al-Kawthar", arabic: "ٱلْكَوْثَر", meaning: "The Abundance", ayats: 3, revelation: "Meccan" },
  { number: 109, name: "Al-Kafirun", arabic: "ٱلْكَافِرُون", meaning: "The Disbelievers", ayats: 6, revelation: "Meccan" },
  { number: 110, name: "An-Nasr", arabic: "ٱلنَّصْر", meaning: "The Divine Support", ayats: 3, revelation: "Medinan" },
  { number: 111, name: "Al-Masad", arabic: "ٱلْمَسَد", meaning: "The Palm Fibre", ayats: 5, revelation: "Meccan" },
  { number: 112, name: "Al-Ikhlas", arabic: "ٱلْإِخْلَاص", meaning: "The Sincerity", ayats: 4, revelation: "Meccan" },
  { number: 113, name: "Al-Falaq", arabic: "ٱلْفَلَق", meaning: "The Daybreak", ayats: 5, revelation: "Meccan" },
  { number: 114, name: "An-Nas", arabic: "ٱلنَّاس", meaning: "Mankind", ayats: 6, revelation: "Meccan" },
];

function toArabicNumber(n: number) {
  return String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
}

const JUZ_DATA = [
  { number: 1, name: "Alif Lam Meem", start: "Al-Fatihah 1", end: "Al-Baqarah 141" },
  { number: 2, name: "Sayaqool", start: "Al-Baqarah 142", end: "Al-Baqarah 252" },
  { number: 3, name: "Tilkal Rusull", start: "Al-Baqarah 253", end: "Aal-E-Imran 92" },
  { number: 4, name: "Lan Tana Loo", start: "Aal-E-Imran 93", end: "An-Nisa 23" },
  { number: 5, name: "Wal Mohsanat", start: "An-Nisa 24", end: "An-Nisa 147" },
  { number: 6, name: "La Yuhibbullah", start: "An-Nisa 148", end: "Al-Ma'idah 81" },
  { number: 7, name: "Wa Iza Samiu", start: "Al-Ma'idah 82", end: "Al-An'am 110" },
  { number: 8, name: "Wa Lau Annana", start: "Al-An'am 111", end: "Al-A'raf 87" },
  { number: 9, name: "Qalal Malao", start: "Al-A'raf 88", end: "Al-Anfal 40" },
  { number: 10, name: "Wa A'lamu", start: "Al-Anfal 41", end: "At-Tawbah 92" },
  { number: 11, name: "Yatazeroon", start: "At-Tawbah 93", end: "Hud 5" },
  { number: 12, name: "Wa Mamin Da'abat", start: "Hud 6", end: "Yusuf 52" },
  { number: 13, name: "Wa Ma Ubrioo", start: "Yusuf 53", end: "Ibrahim 52" },
  { number: 14, name: "Rubama", start: "Al-Hijr 1", end: "An-Nahl 128" },
  { number: 15, name: "Subhanallazi", start: "Al-Isra 1", end: "Al-Kahf 74" },
  { number: 16, name: "Qal Alam", start: "Al-Kahf 75", end: "Ta-Ha 135" },
  { number: 17, name: "Aqtarabo", start: "Al-Anbiya 1", end: "Al-Hajj 78" },
  { number: 18, name: "Qadd Aflaha", start: "Al-Mu'minun 1", end: "An-Nur 64" },
  { number: 19, name: "Wa Qalallazina", start: "Al-Furqan 21", end: "An-Naml 55" },
  { number: 20, name: "A'man Khalaq", start: "An-Naml 56", end: "Al-Qasas 88" },
  { number: 21, name: "Utlu Ma Oohi", start: "Al-Ankabut 46", end: "As-Sajdah 30" },
  { number: 22, name: "Wa Manyaqnut", start: "Al-Ahzab 31", end: "Fatir 45" },
  { number: 23, name: "Wa Mali", start: "Ya-Sin 28", end: "Sad 88" },
  { number: 24, name: "Faman Azlam", start: "Az-Zumar 32", end: "Ghafir 85" },
  { number: 25, name: "Elahe Yuraddo", start: "Fussilat 47", end: "Al-Jathiyah 37" },
  { number: 26, name: "Ha'a Meem", start: "Al-Ahqaf 1", end: "Qaf 45" },
  { number: 27, name: "Qala Fama Khatbukum", start: "Adh-Dhariyat 31", end: "Al-Hadid 29" },
  { number: 28, name: "Qadd Sami Allah", start: "Al-Mujadila 1", end: "At-Tahrim 12" },
  { number: 29, name: "Tabarakallazi", start: "Al-Mulk 1", end: "Al-Mursalat 50" },
  { number: 30, name: "Amma Yatasa'aloon", start: "An-Naba 1", end: "An-Nas 6" },
];

// Mapping of Juz number -> first surah number in that Juz (for opening a surah when clicking a Juz)
export const JUZ_FIRST_SURAH: Record<number, number> = {
  1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 7, 10: 8,
  11: 9, 12: 11, 13: 12, 14: 15, 15: 17, 16: 18, 17: 21, 18: 23,
  19: 25, 20: 27, 21: 29, 22: 33, 23: 36, 24: 39, 25: 41, 26: 46,
  27: 51, 28: 58, 29: 67, 30: 78,
};

export const JUZ = JUZ_DATA.map((j) => ({
  number: j.number,
  name: j.name,
  arabic: `الجزء ${toArabicNumber(j.number)}`,
  start: j.start,
  end: j.end,
}));

export type Ayah = { n: number; arabic: string; english: string; urdu: string; audio?: string };

export const SAMPLE_AYAT: Record<number, Ayah[]> = {
  1: [
    {
      n: 1,
      arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
      english: "All praise is for Allah—Lord of all worlds,",
      urdu: "تمام تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا رب ہے۔",
    },
    {
      n: 2,
      arabic: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      english: "the Most Compassionate, Most Merciful,",
      urdu: "بڑا مہربان، نہایت رحم والا۔",
    },
    {
      n: 3,
      arabic: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
      english: "Master of the Day of Judgment.",
      urdu: "جزا کے دن کا مالک۔",
    },
    {
      n: 4,
      arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      english: "You ˹alone˺ we worship and You ˹alone˺ we ask for help.",
      urdu: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد چاہتے ہیں۔",
    },
    {
      n: 5,
      arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
      english: "Guide us along the Straight Path,",
      urdu: "ہمیں سیدھے راستے پر چلا۔",
    },
    {
      n: 6,
      arabic: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
      english:
        "the Path of those You have blessed—not those You are displeased with, or those who are astray.",
      urdu: "ان لوگوں کا راستہ جن پر تو نے انعام کیا، نہ کہ ان کا جن پر غضب ہوا اور نہ گمراہوں کا۔",
    },
  ],
  112: [
    { n: 1, arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ", english: "Say, ˹O Prophet,˺ \"He is Allah—One,", urdu: "کہہ دو، وہ اللہ ایک ہے۔" },
    { n: 2, arabic: "ٱللَّهُ ٱلصَّمَدُ", english: "Allah—the Sustainer ˹needed by all˺.", urdu: "اللہ بے نیاز ہے۔" },
    { n: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", english: "He has never had offspring, nor was He born.", urdu: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی سے پیدا ہوا۔" },
    { n: 4, arabic: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ", english: "And there is none comparable to Him.\"", urdu: "اور اس کا کوئی ہمسر نہیں۔" },
  ],
};
