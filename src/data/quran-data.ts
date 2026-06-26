
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
  { number: 36, name: "Ya-Sin", arabic: "يس", meaning: "Ya-Sin", ayats: 83, revelation: "Meccan" },
  { number: 55, name: "Ar-Rahman", arabic: "ٱلرَّحْمَٰن", meaning: "The Most Merciful", ayats: 78, revelation: "Medinan" },
  { number: 56, name: "Al-Waqi'ah", arabic: "ٱلْوَاقِعَة", meaning: "The Inevitable", ayats: 96, revelation: "Meccan" },
  { number: 67, name: "Al-Mulk", arabic: "ٱلْمُلْك", meaning: "The Sovereignty", ayats: 30, revelation: "Meccan" },
  { number: 112, name: "Al-Ikhlas", arabic: "ٱلْإِخْلَاص", meaning: "The Sincerity", ayats: 4, revelation: "Meccan" },
  { number: 113, name: "Al-Falaq", arabic: "ٱلْفَلَق", meaning: "The Daybreak", ayats: 5, revelation: "Meccan" },
  { number: 114, name: "An-Nas", arabic: "ٱلنَّاس", meaning: "Mankind", ayats: 6, revelation: "Meccan" },
];

function toArabicNumber(n: number) {
  return String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
}

const SAMPLE_JUZ_STARTS = [
  "Al-Fatihah 1", "Al-Baqarah 142", "Al-Baqarah 253", "Aal-E-Imran 93",
  "An-Nisa 24", "An-Nisa 148", "Al-Ma'idah 82", "Al-An'am 111",
  "Al-A'raf 88", "Al-Anfal 41", "At-Tawbah 93", "Hud 6",
  "Yusuf 53", "Al-Hijr 1", "Al-Isra 1", "Al-Kahf 75",
  "Al-Anbiya 1", "Al-Mu'minun 1", "Al-Furqan 21", "An-Naml 56",
  "Al-Ankabut 46", "Al-Ahzab 31", "Ya-Sin 28", "Az-Zumar 32",
  "Fussilat 47", "Al-Ahqaf 1", "Adh-Dhariyat 31", "Al-Mujadila 1",
  "Al-Mulk 1", "An-Naba 1",
];

export const JUZ = Array.from({ length: 30 }, (_, i) => ({
  number: i + 1,
  arabic: `الجزء ${toArabicNumber(i + 1)}`,
  start: SAMPLE_JUZ_STARTS[i] ?? "—",
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


