import { Sunrise, Sun, Sunset, Moon, CloudMoon } from "lucide-react";

export type Ayat = { n: number; ar: string; en: string; ur: string };
export type Surah = { n: number; name: string; arName: string; meaning: string; type: "Meccan" | "Medinan"; count: number; ayats: Ayat[] };

export const SPOTLIGHT_AYAHS = [
  {
    surah: "Ash-Sharh",
    ref: "94 : 5-6",
    ar: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا  إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
    en: "So, verily, with every hardship, there is ease. Verily, with every hardship, there is ease.",
    ur: "پس بے شک ہر تنگی کے ساتھ آسانی ہے۔ بے شک ہر تنگی کے ساتھ آسانی ہے۔",
    revealed: "Meccan",
    theme: "Hope · Patience",
  },
  {
    surah: "Al-Baqarah",
    ref: "2 : 286",
    ar: "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    en: "Allah does not burden a soul beyond that it can bear.",
    ur: "اللہ کسی جان پر اس کی طاقت سے بڑھ کر بوجھ نہیں ڈالتا۔",
    revealed: "Medinan",
    theme: "Mercy · Capacity",
  },
  {
    surah: "At-Talaq",
    ref: "65 : 3",
    ar: "وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُۥ",
    en: "And whoever places his trust in Allah — He is sufficient for him.",
    ur: "اور جو اللہ پر بھروسا کرے، وہ اُس کے لیے کافی ہے۔",
    revealed: "Medinan",
    theme: "Tawakkul · Trust",
  },
];

export const SURAHS: Surah[] = [
  { n: 1, name: "Al-Fatihah", arName: "ٱلْفَاتِحَة", meaning: "The Opening", type: "Meccan", count: 7, ayats: [
    { n: 1, ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", en: "In the name of Allah, the Most Gracious, the Most Merciful.", ur: "اللہ کے نام سے جو نہایت مہربان رحم والا ہے۔" },
    { n: 2, ar: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ", en: "All praise is due to Allah, Lord of all worlds.", ur: "سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا رب ہے۔" },
    { n: 3, ar: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", en: "The Most Gracious, the Most Merciful.", ur: "نہایت مہربان رحم والا۔" },
    { n: 4, ar: "مَٰلِكِ يَوْمِ ٱلدِّينِ", en: "Master of the Day of Judgment.", ur: "روزِ جزا کا مالک۔" },
    { n: 5, ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", en: "You alone we worship, and You alone we ask for help.", ur: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد چاہتے ہیں۔" },
    { n: 6, ar: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ", en: "Guide us upon the Straight Path.", ur: "ہمیں سیدھے راستے پر چلا۔" },
    { n: 7, ar: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ", en: "The path of those upon whom You have bestowed favor.", ur: "ان لوگوں کا راستہ جن پر تو نے انعام کیا۔" },
  ]},
  { n: 18, name: "Al-Kahf", arName: "ٱلْكَهْف", meaning: "The Cave", type: "Meccan", count: 110, ayats: [
    { n: 1, ar: "ٱلْحَمْدُ لِلَّهِ ٱلَّذِىٓ أَنزَلَ عَلَىٰ عَبْدِهِ ٱلْكِتَٰبَ وَلَمْ يَجْعَل لَّهُۥ عِوَجَا", en: "All praise is due to Allah, who has sent down upon His Servant the Book.", ur: "سب تعریف اللہ کے لیے ہے۔" },
    { n: 10, ar: "إِذْ أَوَى ٱلْفِتْيَةُ إِلَى ٱلْكَهْفِ فَقَالُوا۟ رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةً", en: "When the youths retreated to the cave and said, 'Our Lord, grant us mercy from Yourself.'", ur: "جب وہ نوجوان غار میں پناہ گزین ہوئے۔" },
    { n: 11, ar: "فَضَرَبْنَا عَلَىٰٓ ءَاذَانِهِمْ فِى ٱلْكَهْفِ سِنِينَ عَدَدًا", en: "So We cast a cover of sleep over their ears in the cave for a number of years.", ur: "پس ہم نے ان کے کانوں پر پردہ ڈال دیا۔" },
    { n: 13, ar: "نَّحْنُ نَقُصُّ عَلَيْكَ نَبَأَهُم بِٱلْحَقِّ", en: "It is We who relate to you their story in truth.", ur: "ہم تجھے ان کا قصہ سچ کے ساتھ سناتے ہیں۔" },
  ]},
  { n: 36, name: "Ya-Sin", arName: "يس", meaning: "Ya-Sin", type: "Meccan", count: 83, ayats: [
    { n: 1, ar: "يسٓ", en: "Ya, Sin.", ur: "یٰس۔" },
    { n: 2, ar: "وَٱلْقُرْءَانِ ٱلْحَكِيمِ", en: "By the wise Qur'an.", ur: "قسم ہے قرآنِ حکیم کی۔" },
    { n: 3, ar: "إِنَّكَ لَمِنَ ٱلْمُرْسَلِينَ", en: "Indeed you are from among the messengers.", ur: "بے شک تم رسولوں میں سے ہو۔" },
  ]},
  { n: 55, name: "Ar-Rahman", arName: "ٱلرَّحْمَٰن", meaning: "The Most Merciful", type: "Medinan", count: 78, ayats: [
    { n: 1, ar: "ٱلرَّحْمَٰنُ", en: "The Most Merciful.", ur: "رحمٰن نے۔" },
    { n: 2, ar: "عَلَّمَ ٱلْقُرْءَانَ", en: "Taught the Qur'an.", ur: "قرآن سکھایا۔" },
    { n: 3, ar: "خَلَقَ ٱلْإِنسَٰنَ", en: "Created man.", ur: "انسان کو پیدا کیا۔" },
    { n: 13, ar: "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ", en: "So which of the favors of your Lord would you both deny?", ur: "تو تم اپنے رب کی کون کون سی نعمت کو جھٹلاؤ گے؟" },
  ]},
  { n: 112, name: "Al-Ikhlas", arName: "ٱلْإِخْلَاص", meaning: "Sincerity", type: "Meccan", count: 4, ayats: [
    { n: 1, ar: "قُلْ هُوَ ٱللَّهُ أَحَدٌ", en: "Say: He is Allah, the One.", ur: "کہو: وہ اللہ ایک ہے۔" },
    { n: 2, ar: "ٱللَّهُ ٱلصَّمَدُ", en: "Allah, the Eternal Refuge.", ur: "اللہ بے نیاز ہے۔" },
    { n: 3, ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ", en: "He neither begets nor is born.", ur: "نہ اس کی اولاد ہے۔" },
    { n: 4, ar: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ", en: "Nor is there to Him any equivalent.", ur: "اور کوئی اس کا ہمسر نہیں۔" },
  ]},
];

export const JUZ_LIST = Array.from({ length: 30 }, (_, i) => ({
  n: i + 1,
  start: i === 0 ? "Al-Fatihah 1" : `Juz ${i + 1} · Start`,
  ayats: 200 + ((i * 37) % 80),
}));

export const HADITHS = [
  {
    text: "The most beloved of deeds to Allah are those that are most consistent, even if they are few.",
    source: "Sahih al-Bukhari 6464",
  },
  {
    text: "None of you truly believes until he loves for his brother what he loves for himself.",
    source: "Sahih al-Bukhari 13",
  },
  {
    text: "He who does not show mercy to others will not be shown mercy.",
    source: "Sahih Muslim 2318",
  },
  {
    text: "A good word is charity.",
    source: "Sahih al-Bukhari 2989",
  },
  {
    text: "The strong man is not the good wrestler, but the strong man is he who controls himself when he is angry.",
    source: "Sahih al-Bukhari 6114",
  }
];

export const DUAS = [
  {
    ar: "ٱللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا",
    en: "O Allah, by You we enter the morning and by You we enter the evening...",
    ref: "Hisn al-Muslim · 76",
  },
  {
    ar: "رَبِّ زِدْنِي عِلْمًا",
    en: "My Lord, increase me in knowledge.",
    ref: "Surah Ta-Ha · 114",
  },
  {
    ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
    en: "Our Lord, give us in this world [that which is] good...",
    ref: "Surah Al-Baqarah · 201",
  },
  {
    ar: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
    en: "Our Lord, let not our hearts deviate after You have guided us...",
    ref: "Surah Ali 'Imran · 8",
  }
];

export const PRAYERS = [
  { name: "Fajr", time: "04:42", icon: Sunrise },
  { name: "Dhuhr", time: "12:38", icon: Sun },
  { name: "Asr", time: "16:21", icon: Sun },
  { name: "Maghrib", time: "19:14", icon: Sunset },
  { name: "Isha", time: "20:47", icon: CloudMoon },
];

export const NINETY_NINE_PREVIEW = [
  { ar: "ٱلرَّحْمَٰن", en: "Ar-Rahman" },
  { ar: "ٱلرَّحِيم", en: "Ar-Rahim" },
  { ar: "ٱلْمَلِك", en: "Al-Malik" },
  { ar: "ٱلْقُدُّوس", en: "Al-Quddus" },
  { ar: "ٱلسَّلَام", en: "As-Salam" },
  { ar: "ٱلْمُؤْمِن", en: "Al-Mu'min" },
];

export const TASBIH_PHRASES = [
  { ar: "سُبْحَانَ ٱللَّه", tr: "SubhanAllah", target: 33 },
  { ar: "ٱلْحَمْدُ لِلَّه", tr: "Alhamdulillah", target: 33 },
  { ar: "ٱللَّهُ أَكْبَر", tr: "Allahu Akbar", target: 34 },
];
