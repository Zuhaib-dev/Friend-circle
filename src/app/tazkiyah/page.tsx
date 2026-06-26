"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  BookOpen, Bookmark, Copy, Share2, Play, Pause, Search, Compass,
  Moon, Sun, Sunrise, Sunset, CloudMoon, X, Check, ChevronRight,
  RotateCcw, Heart, Sparkles, Quote, Hexagon,
} from "lucide-react";
import { TopNav } from "@/components/top-nav";

/* ===== MOCK DATA ===== */
type Ayat = { n: number; ar: string; en: string; ur: string };
type Surah = { n: number; name: string; arName: string; meaning: string; type: "Meccan" | "Medinan"; count: number; ayats: Ayat[] };

const SURAHS: Surah[] = [
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

const JUZ_LIST = Array.from({ length: 30 }, (_, i) => ({
  n: i + 1,
  start: i === 0 ? "Al-Fatihah 1" : `Juz ${i + 1} · Start`,
  ayats: 200 + ((i * 37) % 80),
}));

const HADITH = {
  text: "The most beloved of deeds to Allah are those that are most consistent, even if they are few.",
  narrator: "Narrated by Aisha (R.A)",
  source: "Sahih al-Bukhari 6464",
};

const SEERAH_CHAPTERS = [
  { n: "01", title: "The Year of the Elephant", meta: "570 CE · Makkah", desc: "Birth in the city of light, in the year Abraha's army fell." },
  { n: "02", title: "The Cave of Hira", meta: "610 CE · Jabal an-Nour", desc: "The first revelation — 'Iqra' bismi rabbika alladhi khalaq.'" },
  { n: "03", title: "The Hijrah", meta: "622 CE · Makkah → Madinah", desc: "A journey that became the dawn of an Ummah." },
  { n: "04", title: "Treaty of Hudaybiyyah", meta: "628 CE", desc: "A patience that history would call a clear victory." },
  { n: "05", title: "The Farewell Sermon", meta: "632 CE · Arafat", desc: "A final, luminous testament to mercy and justice." },
];

const PRAYERS = [
  { name: "Fajr", time: "04:42", icon: Sunrise },
  { name: "Dhuhr", time: "12:38", icon: Sun },
  { name: "Asr", time: "16:21", icon: Sun },
  { name: "Maghrib", time: "19:14", icon: Sunset },
  { name: "Isha", time: "20:47", icon: CloudMoon },
];

const NINETY_NINE_PREVIEW = [
  { ar: "ٱلرَّحْمَٰن", en: "Ar-Rahman" },
  { ar: "ٱلرَّحِيم", en: "Ar-Rahim" },
  { ar: "ٱلْمَلِك", en: "Al-Malik" },
  { ar: "ٱلْقُدُّوس", en: "Al-Quddus" },
  { ar: "ٱلسَّلَام", en: "As-Salam" },
  { ar: "ٱلْمُؤْمِن", en: "Al-Mu'min" },
];

const TASBIH_PHRASES = [
  { ar: "سُبْحَانَ ٱللَّه", tr: "SubhanAllah", target: 33 },
  { ar: "ٱلْحَمْدُ لِلَّه", tr: "Alhamdulillah", target: 33 },
  { ar: "ٱللَّهُ أَكْبَر", tr: "Allahu Akbar", target: 34 },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: EASE },
};

function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function useNowMinutes() {
  const [m, setM] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => { const d = new Date(); setM(d.getHours() * 60 + d.getMinutes()); };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return m;
}

/* ===== PAGE ===== */
export default function TazkiyahPage() {
  const [tab, setTab] = useState<"quran" | "hadith" | "tasbih" | "seerah">("quran");
  return (
    <div className="min-h-screen bg-bone text-ink">
      <TopNav />
      <div className="bg-[#0a0a0a] text-white/90 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(180,160,90,0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(60,140,110,0.12),transparent_50%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
          <Header />
          <ContinueReading />
          <PrayerStrip />
          <Tabs tab={tab} setTab={setTab} />
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {tab === "quran"  && <motion.div key="quran"  {...fadeUp}><QuranSection /></motion.div>}
              {tab === "hadith" && <motion.div key="hadith" {...fadeUp}><HadithSection /></motion.div>}
              {tab === "tasbih" && <motion.div key="tasbih" {...fadeUp}><TasbihSection /></motion.div>}
              {tab === "seerah" && <motion.div key="seerah" {...fadeUp}><SeerahSection /></motion.div>}
            </AnimatePresence>
          </div>
          <BentoGrid />
          <Footer />
        </div>
      </div>
    </div>
  );
}

/* ===== HEADER ===== */
function Header() {
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
        <span className="flex items-center gap-2"><Hexagon className="h-3 w-3 text-emerald-300/70" />TZK / 00 · INNER PURIFICATION</span>
        <span className="hidden sm:flex items-center gap-2"><Compass className="h-3 w-3" />QIBLA · 294° NW</span>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute -top-6 right-0 text-[140px] sm:text-[220px] leading-none text-white/[0.04] select-none" style={{ fontFamily: "'Amiri', serif" }}>تزكية</div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}
          className="font-display font-black tracking-tight text-[14vw] sm:text-[10vw] md:text-[8rem] leading-[0.85] text-white">Tazkiyah</motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-3 max-w-xl text-white/55 text-sm sm:text-base leading-relaxed">
          A quiet room inside our digital campfire. Read, remember, return — at your own pace.
        </motion.p>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.65,0,0.35,1] as [number,number,number,number] }}
          className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent origin-left" />
      </div>
    </div>
  );
}

/* ===== CONTINUE READING ===== */
function ContinueReading() {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
      className="mt-10 group relative overflow-hidden rounded-sm border border-white/10 bg-[#141414] hover:border-emerald-300/30 transition-colors">
      <div className="grid sm:grid-cols-[1fr_auto] gap-6 p-6 sm:p-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />LAST SEEN · 2 HOURS AGO
          </div>
          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <h2 className="font-display text-3xl sm:text-4xl text-white">Surah Al-Kahf</h2>
            <span className="text-white/40 text-sm font-mono">AYAT 10 / 110</span>
          </div>
          <p className="mt-4 text-right text-2xl sm:text-3xl leading-[2] text-white/90" style={{ fontFamily: "'Amiri', serif" }} dir="rtl">
            إِذْ أَوَى ٱلْفِتْيَةُ إِلَى ٱلْكَهْفِ...
          </p>
          <p className="mt-2 text-white/55 text-sm italic">"When the youths retreated to the cave..."</p>
          <div className="mt-5">
            <div className="h-[2px] w-full bg-white/10 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "9%" }} transition={{ delay: 0.6, duration: 1.4, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-300 to-amber-200" />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
              <span>9% COMPLETE</span><span>100 AYAT REMAINING</span>
            </div>
          </div>
        </div>
        <div className="sm:self-end">
          <motion.button whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center gap-3 px-6 py-3.5 bg-white text-[#0a0a0a] font-mono uppercase tracking-[0.2em] text-xs hover:bg-emerald-300 transition-colors">
            <Play className="h-3.5 w-3.5 fill-current" />Resume Reading
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ===== PRAYER STRIP ===== */
function PrayerStrip() {
  const nowM = useNowMinutes();
  const nextIdx = useMemo(() => {
    if (nowM == null) return 0;
    const idx = PRAYERS.findIndex((p) => timeToMinutes(p.time) > nowM);
    return idx === -1 ? 0 : idx;
  }, [nowM]);
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
      className="mt-6 rounded-sm border border-white/10 bg-[#0f0f0f]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 flex items-center gap-2">
          <Moon className="h-3 w-3 text-amber-200/70" />SALAH · SRINAGAR · 34.08° N
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/70 hidden sm:block">
          NEXT · {PRAYERS[nextIdx].name.toUpperCase()}
        </span>
      </div>
      <div className="grid grid-cols-5 divide-x divide-white/5">
        {PRAYERS.map((p, i) => {
          const Icon = p.icon;
          const isNext = i === nextIdx && nowM != null;
          return (
            <motion.div key={p.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.06 }}
              className={`relative px-2 sm:px-4 py-4 sm:py-5 text-center ${isNext ? "bg-emerald-300/[0.05]" : ""}`}>
              {isNext && <motion.span layoutId="prayer-pulse" className="absolute inset-0 ring-1 ring-inset ring-emerald-300/40" />}
              <Icon className={`h-4 w-4 mx-auto mb-2 ${isNext ? "text-emerald-300" : "text-white/40"}`} />
              <div className={`text-[10px] font-mono uppercase tracking-[0.25em] ${isNext ? "text-emerald-300" : "text-white/50"}`}>{p.name}</div>
              <div className={`mt-1 font-display text-lg sm:text-xl ${isNext ? "text-white" : "text-white/70"}`}>{p.time}</div>
              {isNext && <motion.div className="mt-2 mx-auto h-1 w-1 rounded-full bg-emerald-300"
                animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ===== TABS ===== */
function Tabs({ tab, setTab }: { tab: string; setTab: (t: any) => void }) {
  const TABS = [
    { id: "quran", label: "Qur'an", icon: BookOpen },
    { id: "hadith", label: "Hadith", icon: Quote },
    { id: "tasbih", label: "Tasbih", icon: Heart },
    { id: "seerah", label: "Seerah", icon: Sparkles },
  ] as const;
  return (
    <div className="mt-10 inline-flex rounded-sm border border-white/10 bg-[#101010] p-1 relative">
      {TABS.map((t) => {
        const Icon = t.icon; const active = tab === t.id;
        return (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="relative px-4 sm:px-5 py-2 text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 z-10">
            {active && <motion.span layoutId="tab-indicator" className="absolute inset-0 bg-white rounded-sm -z-10"
              transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <Icon className={`h-3.5 w-3.5 ${active ? "text-[#0a0a0a]" : "text-white/50"}`} />
            <span className={active ? "text-[#0a0a0a]" : "text-white/60"}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ===== QURAN ===== */
function QuranSection() {
  const [mode, setMode] = useState<"surahs" | "juz">("surahs");
  const [lang, setLang] = useState<"en" | "ur">("en");
  const [active, setActive] = useState<Surah>(SURAHS[1]);
  const [query, setQuery] = useState("");
  const [selectedAyat, setSelectedAyat] = useState<Ayat | null>(null);
  const filtered = SURAHS.filter((s) => \`\${s.n} \${s.name} \${s.meaning}\`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-6">
      <div className="rounded-sm border border-white/10 bg-[#0f0f0f] overflow-hidden">
        <div className="p-3 border-b border-white/5">
          <div className="relative inline-flex w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-1">
            {(["surahs", "juz"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className="relative flex-1 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.25em] z-10">
                {mode === m && <motion.span layoutId="seg-mode" className="absolute inset-0 bg-emerald-300/90 rounded-sm -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className={mode === m ? "text-[#0a0a0a]" : "text-white/60"}>{m === "surahs" ? "114 Surah" : "30 Juz"}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={mode === "surahs" ? "Search surah..." : "Search juz..."}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm pl-9 pr-3 py-2 text-sm placeholder-white/30 focus:outline-none focus:border-emerald-300/50 transition-colors" />
          </div>
        </div>
        <div className="max-h-[460px] overflow-y-auto">
          {mode === "surahs" ? filtered.map((s) => (
            <motion.button key={s.n} onClick={() => setActive(s)} whileHover={{ x: 2 }}
              className={\`w-full grid grid-cols-[36px_1fr_auto] items-center gap-3 px-4 py-3 text-left border-b border-white/5 transition-colors \${active.n === s.n ? "bg-emerald-300/[0.06]" : "hover:bg-white/[0.03]"}\`}>
              <span className={\`font-mono text-xs \${active.n === s.n ? "text-emerald-300" : "text-white/40"}\`}>{String(s.n).padStart(3, "0")}</span>
              <span>
                <div className="text-sm text-white">{s.name}</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">{s.meaning} · {s.count} Ayat</div>
              </span>
              <span className="text-right text-base text-white/80" style={{ fontFamily: "'Amiri', serif" }}>{s.arName}</span>
            </motion.button>
          )) : JUZ_LIST.map((j) => (
            <button key={j.n} className="w-full grid grid-cols-[36px_1fr_auto] items-center gap-3 px-4 py-3 text-left border-b border-white/5 hover:bg-white/[0.03] transition-colors">
              <span className="font-mono text-xs text-white/40">{String(j.n).padStart(2, "0")}</span>
              <span>
                <div className="text-sm text-white">Juz {j.n}</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">{j.start}</div>
              </span>
              <span className="text-[10px] font-mono text-white/40">{j.ayats}A</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-sm border border-white/10 bg-[#0f0f0f] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-xl text-white">{active.name}</span>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">{active.meaning} · {active.type}</span>
          </div>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        {active.n !== 9 && (
          <div className="px-6 py-6 text-center border-b border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(110,200,170,0.06),transparent_70%)]">
            <p className="text-2xl sm:text-3xl text-white/90" style={{ fontFamily: "'Amiri', serif" }} dir="rtl">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
          </div>
        )}
        <div className="divide-y divide-white/5">
          {active.ayats.map((a, i) => (
            <motion.button key={a.n} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.4 }}
              onClick={() => setSelectedAyat(a)} className="w-full text-left px-5 sm:px-8 py-6 hover:bg-white/[0.02] transition-colors group">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex items-center justify-center h-7 w-7 border border-white/15 rounded-full text-[10px] font-mono text-white/60 group-hover:border-emerald-300/50 group-hover:text-emerald-300 transition-colors shrink-0">{a.n}</span>
                <p className="flex-1 text-right text-2xl sm:text-[28px] leading-[2.2] text-white" style={{ fontFamily: "'Amiri', serif" }} dir="rtl">{a.ar}</p>
              </div>
              <p className={\`mt-3 text-sm sm:text-base text-white/65 leading-relaxed \${lang === "ur" ? "text-right" : "text-left"}\`}
                style={lang === "ur" ? { fontFamily: "'Scheherazade New', serif", fontSize: "1.1rem" } : undefined}
                dir={lang === "ur" ? "rtl" : "ltr"}>
                {lang === "en" ? a.en : a.ur}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
      <AyatModal ayat={selectedAyat} surah={active} onClose={() => setSelectedAyat(null)} />
    </div>
  );
}

function LangToggle({ lang, setLang }: { lang: "en" | "ur"; setLang: (l: "en" | "ur") => void }) {
  return (
    <div className="inline-flex bg-[#0a0a0a] border border-white/10 rounded-sm p-1 relative">
      {(["en", "ur"] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} className="relative px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] z-10">
          {lang === l && <motion.span layoutId="lang-pill" className="absolute inset-0 bg-white rounded-sm -z-10"
            transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
          <span className={lang === l ? "text-[#0a0a0a]" : "text-white/50"}>{l === "en" ? "English" : "اردو"}</span>
        </button>
      ))}
    </div>
  );
}

/* ===== AYAT MODAL ===== */
function AyatModal({ ayat, surah, onClose }: { ayat: Ayat | null; surah: Surah; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!ayat) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ayat, onClose]);
  const copy = () => {
    if (!ayat) return;
    navigator.clipboard?.writeText(\`\${ayat.ar}\n\n\${ayat.en}\n— Surah \${surah.name} \${surah.n}:\${ayat.n}\`);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };
  const ACTIONS = [
    { icon: Bookmark, label: "Mark as Last Read", code: "01", onClick: () => {} },
    { icon: copied ? Check : Copy, label: copied ? "Copied" : "Copy Ayat", code: "02", onClick: copy },
    { icon: Share2, label: "Share", code: "03", onClick: () => {} },
    { icon: playing ? Pause : Play, label: playing ? "Pause Audio" : "Play Audio", code: "04", onClick: () => setPlaying((p) => !p) },
  ];
  return (
    <AnimatePresence>
      {ayat && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6" onClick={onClose}>
          <motion.div initial={{ y: 60, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }} onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-t-lg sm:rounded-sm overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">Surah {surah.name} · {surah.n}:{ayat.n}</span>
              </div>
              <button onClick={onClose} className="h-7 w-7 grid place-items-center text-white/50 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-6 sm:px-8 py-8 bg-[radial-gradient(ellipse_at_top,rgba(110,200,170,0.07),transparent_60%)]">
              <p className="text-right text-2xl sm:text-3xl leading-[2.2] text-white" style={{ fontFamily: "'Amiri', serif" }} dir="rtl">{ayat.ar}</p>
              <p className="mt-5 text-white/70 italic text-base leading-relaxed">{ayat.en}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/5 divide-x divide-white/5">
              {ACTIONS.map((a) => {
                const Icon = a.icon;
                return (
                  <button key={a.label} onClick={a.onClick}
                    className="group px-4 py-4 flex flex-col items-center gap-2 hover:bg-white/[0.04] transition-colors text-center">
                    <Icon className="h-4 w-4 text-white/60 group-hover:text-emerald-300 transition-colors" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/70 group-hover:text-white">{a.label}</span>
                    <span className="text-[9px] font-mono text-white/30">{a.code}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ===== HADITH ===== */
function HadithSection() {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0f0f0f] p-8 sm:p-12 relative overflow-hidden">
      <Quote className="absolute -top-4 -left-4 h-32 w-32 text-white/[0.03]" />
      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/80 mb-6 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />HADITH OF THE DAY · {HADITH.source}
      </div>
      <motion.blockquote initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="font-display text-2xl sm:text-4xl leading-snug text-white/95">"{HADITH.text}"</motion.blockquote>
      <div className="mt-6 text-sm font-mono uppercase tracking-[0.25em] text-white/40">— {HADITH.narrator}</div>
    </div>
  );
}

/* ===== TASBIH ===== */
function TasbihSection() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const [pulse, setPulse] = useState(0);
  const phrase = TASBIH_PHRASES[phraseIdx];
  const count = counts[phraseIdx];
  const pct = Math.min(1, count / phrase.target);
  const tap = () => {
    setCounts((c) => c.map((v, i) => (i === phraseIdx ? v + 1 : v)));
    setPulse((p) => p + 1);
    if (typeof window !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(8);
    if (count + 1 >= phrase.target && phraseIdx < TASBIH_PHRASES.length - 1) {
      setTimeout(() => setPhraseIdx((i) => i + 1), 400);
    }
  };
  const reset = () => setCounts([0, 0, 0]);
  const total = counts.reduce((a, b) => a + b, 0);
  const grandTarget = TASBIH_PHRASES.reduce((a, p) => a + p.target, 0);
  return (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
      <div className="rounded-sm border border-white/10 bg-[#0f0f0f] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(110,200,170,0.08),transparent_60%)]" />
        <div className="relative text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">DHIKR · {phraseIdx + 1} OF {TASBIH_PHRASES.length}</div>
        <button onClick={tap} className="relative mt-6 group" aria-label="Tap to count">
          <svg viewBox="0 0 220 220" className="w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] -rotate-90">
            <circle cx="110" cy="110" r="100" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
            <motion.circle cx="110" cy="110" r="100" stroke="url(#tasbihGrad)" strokeWidth="3" strokeLinecap="round" fill="none"
              strokeDasharray={2 * Math.PI * 100}
              animate={{ strokeDashoffset: 2 * Math.PI * 100 * (1 - pct) }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }} />
            <defs>
              <linearGradient id="tasbihGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#fcd34d" />
              </linearGradient>
            </defs>
          </svg>
          <AnimatePresence>
            <motion.span key={pulse} initial={{ scale: 0.4, opacity: 0.6 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ duration: 0.7 }}
              className="absolute inset-0 m-auto rounded-full border border-emerald-300/40" />
          </AnimatePresence>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div key={count} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 360, damping: 18 }}
              className="font-display text-7xl sm:text-8xl text-white tabular-nums">{count}</motion.div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mt-1">/ {phrase.target}</div>
          </div>
        </button>
        <div className="mt-6 text-3xl sm:text-4xl text-white" style={{ fontFamily: "'Amiri', serif" }} dir="rtl">{phrase.ar}</div>
        <div className="mt-1 text-sm text-white/50 font-mono uppercase tracking-[0.25em]">{phrase.tr}</div>
        <div className="mt-6 flex items-center gap-2">
          <button onClick={reset} className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:border-white/30 text-[10px] font-mono uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors rounded-sm">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">TAP · ANYWHERE INSIDE</div>
        </div>
      </div>

      <div className="rounded-sm border border-white/10 bg-[#0f0f0f] p-6">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-4">SESSION · {total} / {grandTarget}</div>
        <div className="space-y-3">
          {TASBIH_PHRASES.map((p, i) => {
            const c = counts[i]; const done = c >= p.target; const ratio = Math.min(1, c / p.target);
            return (
              <button key={p.tr} onClick={() => setPhraseIdx(i)}
                className={\`w-full p-4 text-left border rounded-sm transition-colors \${phraseIdx === i ? "border-emerald-300/40 bg-emerald-300/[0.05]" : "border-white/10 hover:border-white/30"}\`}>
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <span className="text-xl text-white" style={{ fontFamily: "'Amiri', serif" }} dir="rtl">{p.ar}</span>
                    <span className="ml-3 text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">{p.tr}</span>
                  </div>
                  <span className={\`text-sm font-mono tabular-nums \${done ? "text-emerald-300" : "text-white/60"}\`}>{c} / {p.target}</span>
                </div>
                <div className="h-[2px] bg-white/10 overflow-hidden">
                  <motion.div animate={{ width: \`\${ratio * 100}%\` }} transition={{ type: "spring", stiffness: 120, damping: 22 }}
                    className={\`h-full \${done ? "bg-emerald-300" : "bg-white/60"}\`} />
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-6 pt-6 border-t border-white/5">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-3">99 NAMES · PREVIEW</div>
          <div className="grid grid-cols-2 gap-2">
            {NINETY_NINE_PREVIEW.map((n, i) => (
              <motion.div key={n.en} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="px-3 py-2 border border-white/10 rounded-sm hover:border-emerald-300/40 transition-colors group">
                <div className="flex items-baseline justify-between">
                  <span className="text-base text-white group-hover:text-emerald-300 transition-colors" style={{ fontFamily: "'Amiri', serif" }}>{n.ar}</span>
                  <span className="text-[9px] font-mono text-white/40">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 mt-0.5">{n.en}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== SEERAH ===== */
function SeerahSection() {
  const [active, setActive] = useState(0);
  const ch = SEERAH_CHAPTERS[active];
  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
      <div className="rounded-sm border border-white/10 bg-[#0f0f0f] overflow-hidden">
        <div className="px-5 py-3 border-b border-white/5 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">SEERAH · LIFE OF THE PROPHET ﷺ</div>
        <div>
          {SEERAH_CHAPTERS.map((c, i) => {
            const sel = i === active;
            return (
              <button key={c.n} onClick={() => setActive(i)}
                className={\`w-full grid grid-cols-[44px_1fr_auto] items-center gap-3 px-5 py-4 text-left border-b border-white/5 transition-colors \${sel ? "bg-emerald-300/[0.06]" : "hover:bg-white/[0.03]"}\`}>
                <span className={\`font-mono text-xs \${sel ? "text-emerald-300" : "text-white/40"}\`}>{c.n}</span>
                <span>
                  <div className="text-sm text-white">{c.title}</div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">{c.meta}</div>
                </span>
                <ChevronRight className={\`h-3.5 w-3.5 \${sel ? "text-emerald-300" : "text-white/30"}\`} />
              </button>
            );
          })}
        </div>
      </div>
      <motion.div key={ch.n} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="rounded-sm border border-white/10 bg-[#0f0f0f] p-8 relative overflow-hidden">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/80">CHAPTER {ch.n} · {ch.meta}</div>
        <h3 className="mt-3 font-display text-4xl text-white">{ch.title}</h3>
        <p className="mt-4 text-white/65 leading-relaxed text-base">{ch.desc}</p>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {["Read", "Listen", "Reflect"].map((label, i) => (
            <button key={label} className="px-4 py-3 border border-white/10 rounded-sm hover:border-emerald-300/40 hover:bg-emerald-300/[0.04] text-[10px] font-mono uppercase tracking-[0.25em] text-white/70 hover:text-emerald-300 transition-colors">
              0{i + 1} · {label}
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute -bottom-10 -right-6 text-[180px] text-white/[0.03] select-none" style={{ fontFamily: "'Amiri', serif" }}>ﷺ</div>
      </motion.div>
    </div>
  );
}

/* ===== BENTO ===== */
function BentoGrid() {
  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl sm:text-4xl text-white">Daily Companions</h2>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">06 MODULES</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4">
        <BentoCard className="lg:col-span-2 lg:row-span-2" tone="emerald">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/80 mb-3">DUA OF THE MORNING</div>
          <p className="text-right text-2xl sm:text-3xl text-white leading-[2.2]" style={{ fontFamily: "'Amiri', serif" }} dir="rtl">ٱللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا</p>
          <p className="mt-4 text-white/60 italic text-sm">"O Allah, by You we enter the morning and by You we enter the evening..."</p>
          <div className="mt-auto pt-6 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">Hisn al-Muslim · 76</div>
        </BentoCard>
        <BentoCard>
          <Compass className="h-5 w-5 text-emerald-300/80" />
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mt-3">QIBLA</div>
          <div className="font-display text-4xl text-white mt-1">294°</div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">NW · MAKKAH</div>
        </BentoCard>
        <BentoCard>
          <Moon className="h-5 w-5 text-amber-200/80" />
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mt-3">HIJRI</div>
          <div className="font-display text-3xl text-white mt-1">12 Muharram</div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">1447 AH</div>
        </BentoCard>
        <BentoCard className="sm:col-span-2">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/80 mb-2">HADITH · TODAY</div>
          <p className="font-display text-xl text-white leading-snug">"{HADITH.text}"</p>
          <div className="mt-auto pt-3 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">{HADITH.source}</div>
        </BentoCard>
        <BentoCard>
          <Heart className="h-5 w-5 text-rose-300/80" />
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mt-3">STREAK</div>
          <div className="font-display text-4xl text-white mt-1">12 <span className="text-base text-white/40">days</span></div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">CONSISTENT DHIKR</div>
        </BentoCard>
      </div>
    </div>
  );
}

function BentoCard({ children, className = "", tone = "default" }:
  { children: React.ReactNode; className?: string; tone?: "default" | "emerald" }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [4, -4]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-4, 4]), { stiffness: 200, damping: 20 });
  return (
    <motion.div ref={ref}
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); mx.set(e.clientX - r.left - r.width / 2); my.set(e.clientY - r.top - r.height / 2); }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      whileHover={{ y: -2 }}
      className={\`group relative rounded-sm border border-white/10 bg-[#0f0f0f] p-5 flex flex-col hover:border-emerald-300/30 transition-colors overflow-hidden \${className}\`}>
      {tone === "emerald" && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(110,200,170,0.08),transparent_60%)] pointer-events-none" />}
      <div className="relative flex-1 flex flex-col">{children}</div>
      <span className="absolute top-2 right-2 text-[9px] font-mono text-white/20 group-hover:text-emerald-300/70 transition-colors">◆</span>
    </motion.div>
  );
}

/* ===== FOOTER ===== */
function Footer() {
  return (
    <div className="mt-16 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
      <span>TZK / END OF TRANSMISSION</span>
      <span className="text-white/30">"And remember Me — I will remember you." · Al-Baqarah 2:152</span>
    </div>
  );
}
