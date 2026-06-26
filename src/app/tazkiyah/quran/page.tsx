"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Search,
  Play,
  Pause,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Volume2,
  ChevronRight,
  Sparkles,
  BookOpen,
  Hash,
  X,
  Settings2,
  Type,
  AlignJustify,
  RotateCcw,
  Minus,
  Plus,
} from "lucide-react";

type Lang = "en" | "ur" | "both";

type ReaderPrefs = {
  arabicSize: number;
  translationSize: number;
  lineHeight: number;
  arabicFont: "amiri" | "scheherazade";
  showArabic: boolean;
};

const DEFAULT_PREFS: ReaderPrefs = {
  arabicSize: 26,
  translationSize: 14,
  lineHeight: 2.2,
  arabicFont: "amiri",
  showArabic: true,
};

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

type Surah = {
  number: number;
  name: string;
  arabic: string;
  meaning: string;
  ayats: number;
  revelation: "Meccan" | "Medinan";
};

const SURAHS: Surah[] = [
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

const JUZ = Array.from({ length: 30 }, (_, i) => ({
  number: i + 1,
  arabic: `الجزء ${toArabicNumber(i + 1)}`,
  start: SAMPLE_JUZ_STARTS[i] ?? "—",
}));

type Ayah = { n: number; arabic: string; english: string; urdu: string };

const SAMPLE_AYAT: Record<number, Ayah[]> = {
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

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */

export default function QuranPage() {
  const [tab, setTab] = useState<"surah" | "juz">("surah");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Surah | null>(null);
  const [bookmark, setBookmark] = useState<{ surah: number; ayah: number } | null>({
    surah: 18,
    ayah: 54,
  });

  const filteredSurahs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SURAHS;
    return SURAHS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.meaning.toLowerCase().includes(q) ||
        String(s.number).includes(q),
    );
  }, [query]);

  const filteredJuz = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return JUZ;
    return JUZ.filter((j) => String(j.number).includes(q) || j.start.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-zinc-100 antialiased">
      {/* Ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 12% 0%, rgba(110,231,183,0.10), transparent 60%), radial-gradient(50% 35% at 88% 20%, rgba(252,211,77,0.07), transparent 60%), radial-gradient(70% 50% at 50% 110%, rgba(110,231,183,0.06), transparent 60%)",
        }}
      />
      {/* Faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <Header />
        <LastSeenBanner onResume={() => setSelected(SURAHS.find((s) => s.number === 18) ?? null)} />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SegmentedTabs tab={tab} setTab={setTab} />
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {tab === "surah" ? (
              <motion.div
                key="surah-list"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredSurahs.map((s, i) => (
                  <SurahCard
                    key={s.number}
                    surah={s}
                    index={i}
                    onClick={() => setSelected(s)}
                    bookmarked={bookmark?.surah === s.number}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="juz-list"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
              >
                {filteredJuz.map((j, i) => (
                  <JuzCard key={j.number} juz={j} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="mt-16 flex items-center justify-between border-t border-white/5 pt-6 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          <span>Tazkiyah // Qur'an Reader</span>
          <span className="flex items-center gap-2">
            <Sparkles className="size-3.5 text-emerald-300/80" /> Recite with presence
          </span>
        </footer>
      </div>

      <AnimatePresence>
        {selected && (
          <ReadingView
            surah={selected}
            onClose={() => setSelected(null)}
            bookmark={bookmark}
            setBookmark={setBookmark}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SECTIONS                                                            */
/* ------------------------------------------------------------------ */

function Header() {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4">
      <Link
        href="/tazkiyah"
        className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-zinc-300 backdrop-blur-md transition hover:border-emerald-300/30 hover:text-emerald-200 sm:gap-2 sm:px-3.5 sm:text-xs"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        <span className="hidden sm:inline">Back to Tazkiyah</span>
        <span className="sm:hidden">Back</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-w-0 text-center"
      >
        <h1
          className="truncate text-lg font-light tracking-tight text-zinc-50 sm:text-2xl lg:text-3xl"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          The Noble <span className="italic text-emerald-200">Qur'an</span>
        </h1>
        <p className="mt-1 hidden items-center justify-center gap-2 text-[10px] uppercase tracking-[0.32em] text-emerald-300/70 sm:flex">
          <span className="inline-block size-1 rounded-full bg-emerald-300/80 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
          Recite · Reflect · Remember
        </p>
      </motion.div>

      <div className="hidden w-[120px] shrink-0 sm:block" />
      <div className="size-8 shrink-0 sm:hidden" />
    </div>
  );
}

function LastSeenBanner({ onResume }: { onResume: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/[0.06] via-white/[0.02] to-amber-300/[0.04] p-6 backdrop-blur-xl sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-emerald-400/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-amber-300/[0.06] blur-3xl"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-emerald-300/80">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
            </span>
            Last Seen · Live Sync
          </div>

          <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2
              className="text-2xl font-light tracking-tight text-zinc-50 sm:text-3xl"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Surah Al-Kahf
            </h2>
            <span className="text-sm text-zinc-400">Ayat 54 / 110</span>
          </div>

          <p
            dir="rtl"
            className="mt-4 line-clamp-2 text-right text-lg leading-[2] text-zinc-200 sm:text-xl lg:text-2xl"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            وَلَقَدْ صَرَّفْنَا فِى هَٰذَا ٱلْقُرْءَانِ لِلنَّاسِ مِن كُلِّ مَثَلٍ ۚ
          </p>

          <div className="mt-5">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              <span>Progress</span>
              <span className="text-emerald-300/80">49%</span>
            </div>
            <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "49%" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-amber-200 shadow-[0_0_18px_rgba(110,231,183,0.5)]"
              />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onResume}
          className="group/btn relative inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-emerald-300/30 bg-emerald-300/[0.08] px-6 py-3 text-sm font-medium text-emerald-100 backdrop-blur-md transition hover:border-emerald-300/60 hover:bg-emerald-300/[0.14] hover:text-emerald-50 lg:w-auto"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-emerald-300/20 transition group-hover/btn:bg-emerald-300/30">
            <Play className="size-3.5 translate-x-px fill-current" />
          </span>
          Resume Reading
          <motion.span
            aria-hidden
            initial={{ x: 0 }}
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-emerald-200/70"
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
}

function SegmentedTabs({
  tab,
  setTab,
}: {
  tab: "surah" | "juz";
  setTab: (t: "surah" | "juz") => void;
}) {
  const tabs: { id: "surah" | "juz"; label: string; count: number; icon: typeof BookOpen }[] = [
    { id: "surah", label: "Surahs", count: 114, icon: BookOpen },
    { id: "juz", label: "Juz", count: 30, icon: Hash },
  ];
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md">
      {tabs.map((t) => {
        const Icon = t.icon;
        const active = tab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition"
          >
            {active && (
              <motion.span
                layoutId="tab-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.10] to-white/[0.04] ring-1 ring-emerald-300/30"
              />
            )}
            <span className="relative flex items-center gap-2">
              <Icon className={`size-3.5 ${active ? "text-emerald-200" : "text-zinc-400"}`} />
              <span className={active ? "text-zinc-50" : "text-zinc-400"}>{t.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  active ? "bg-emerald-300/15 text-emerald-200" : "bg-white/5 text-zinc-500"
                }`}
              >
                {t.count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="group relative w-full sm:w-72">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-emerald-300" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search surah, meaning, number…"
        className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-xs text-zinc-100 placeholder:text-zinc-500 backdrop-blur-md transition focus:border-emerald-300/40 focus:outline-none focus:ring-2 focus:ring-emerald-300/10"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CARDS                                                               */
/* ------------------------------------------------------------------ */

function SurahCard({
  surah,
  index,
  onClick,
  bookmarked,
}: {
  surah: Surah;
  index: number;
  onClick: () => void;
  bookmarked: boolean;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.015, 0.25) }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left backdrop-blur-md transition hover:border-emerald-300/30 hover:bg-white/[0.04]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(70% 50% at 0% 0%, rgba(110,231,183,0.08), transparent 60%)",
        }}
      />

      {/* Number badge */}
      <div className="relative flex size-11 shrink-0 items-center justify-center">
        <svg viewBox="0 0 40 40" className="absolute inset-0 size-11 text-emerald-300/40">
          <polygon
            points="20,2 36,11 36,29 20,38 4,29 4,11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <span className="relative text-xs font-medium tabular-nums text-emerald-200">
          {surah.number}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-medium text-zinc-50">{surah.name}</h3>
          {bookmarked && <BookmarkCheck className="size-3 text-amber-300" />}
        </div>
        <p className="mt-0.5 truncate text-[11px] text-zinc-500">
          {surah.meaning} · {surah.ayats} ayat · {surah.revelation}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span
          className="text-xl text-zinc-200 transition group-hover:text-emerald-200"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          {surah.arabic}
        </span>
        <ChevronRight className="size-3.5 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-emerald-300" />
      </div>
    </motion.button>
  );
}

function JuzCard({ juz, index }: { juz: (typeof JUZ)[number]; index: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.3) }}
      whileHover={{ y: -2 }}
      className="group relative flex aspect-[5/6] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left backdrop-blur-md transition hover:border-emerald-300/30 hover:bg-white/[0.04]"
    >
      <div className="flex items-start justify-between">
        <span className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Juz</span>
        <span className="text-xs tabular-nums text-emerald-200">{juz.number}</span>
      </div>
      <div>
        <p
          className="text-2xl text-zinc-100 transition group-hover:text-emerald-200"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          {juz.arabic}
        </p>
        <p className="mt-1 truncate text-[10px] text-zinc-500">starts · {juz.start}</p>
      </div>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/* READING VIEW                                                        */
/* ------------------------------------------------------------------ */

function ReadingView({
  surah,
  onClose,
  bookmark,
  setBookmark,
}: {
  surah: Surah;
  onClose: () => void;
  bookmark: { surah: number; ayah: number } | null;
  setBookmark: (b: { surah: number; ayah: number } | null) => void;
}) {
  const [playing, setPlaying] = useState<number | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [prefs, setPrefs] = useState<ReaderPrefs>(DEFAULT_PREFS);
  const [prefsOpen, setPrefsOpen] = useState(false);

  const ayat: Ayah[] =
    SAMPLE_AYAT[surah.number] ??
    Array.from({ length: Math.min(surah.ayats, 8) }, (_, i) => ({
      n: i + 1,
      arabic:
        "وَمِنْ ءَايَٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًا لِّتَسْكُنُوٓا۟ إِلَيْهَا",
      english:
        "And of His signs is that He created for you from yourselves mates that you may find tranquility in them.",
      urdu: "اور اس کی نشانیوں میں سے ہے کہ اس نے تمہارے لیے تمہی میں سے جوڑے پیدا کیے تاکہ تم ان سے سکون پاؤ۔",
    }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] isolate flex items-stretch justify-end bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 80, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-3xl flex-col border-l border-white/10 bg-[#0a0a0a]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(50% 30% at 100% 0%, rgba(110,231,183,0.08), transparent 60%), radial-gradient(40% 30% at 0% 100%, rgba(252,211,77,0.05), transparent 60%)",
          }}
        />

        {/* Header */}
        <div className="relative z-[130] flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-4 backdrop-blur-md sm:px-7">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onClose}
              className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-emerald-300/30 hover:text-emerald-200"
            >
              <ArrowLeft className="size-3.5" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  className="truncate text-base font-medium text-zinc-50"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {surah.name}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.24em] text-emerald-300/70">
                  · {surah.revelation}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500">
                {surah.meaning} · {surah.ayats} ayat
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] p-0.5">
              {([
                { id: "en", label: "EN" },
                { id: "ur", label: "اُردُو" },
                { id: "both", label: "BOTH" },
              ] as const).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setLang(opt.id)}
                  className={`relative rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition sm:px-3 sm:text-[11px] ${
                    lang === opt.id ? "text-zinc-50" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {lang === opt.id && (
                    <motion.span
                      layoutId="lang-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-emerald-300/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{opt.label}</span>
                </button>
              ))}
            </div>
            <div className="relative z-[150]">
              <button
                onClick={() => setPrefsOpen((v) => !v)}
                aria-label="Reading preferences"
                className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full border bg-white/[0.03] transition ${
                  prefsOpen
                    ? "border-emerald-300/40 text-emerald-200"
                    : "border-white/10 text-zinc-400 hover:border-emerald-300/30 hover:text-emerald-200"
                }`}
              >
                <motion.span animate={{ rotate: prefsOpen ? 60 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                  <Settings2 className="size-3.5" />
                </motion.span>
              </button>
              <AnimatePresence>
                {prefsOpen && (
                  <PrefsPanel
                    prefs={prefs}
                    setPrefs={setPrefs}
                    onReset={() => setPrefs(DEFAULT_PREFS)}
                    onClose={() => setPrefsOpen(false)}
                  />
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={onClose}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:border-red-300/30 hover:text-red-200"
            >
              <X className="size-3.5" />
            </button>
          </div>

        </div>

        {/* Body */}
        <div className="relative z-0 flex-1 overflow-y-auto px-5 py-8 sm:px-10">
          {/* Bismillah */}
          {prefs.showArabic && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-10 max-w-xl text-center"
            >
              <p
                className="leading-[1.9] text-zinc-100"
                style={{
                  fontFamily: prefs.arabicFont === "amiri" ? "'Amiri', serif" : "'Scheherazade New', serif",
                  fontSize: `${prefs.arabicSize + 6}px`,
                }}
              >
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-emerald-300/70">
                In the Name of Allah · The Most Compassionate · The Most Merciful
              </p>
            </motion.div>
          )}

          <div className="space-y-5">
            {ayat.map((a, i) => (
              <AyahRow
                key={a.n}
                ayah={a}
                surahNumber={surah.number}
                lang={lang}
                prefs={prefs}
                index={i}
                playing={playing === a.n}
                onTogglePlay={() => setPlaying(playing === a.n ? null : a.n)}
                bookmarked={bookmark?.surah === surah.number && bookmark?.ayah === a.n}
                onBookmark={() =>
                  setBookmark(
                    bookmark?.surah === surah.number && bookmark?.ayah === a.n
                      ? null
                      : { surah: surah.number, ayah: a.n },
                  )
                }
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* PREFERENCES PANEL                                                   */
/* ------------------------------------------------------------------ */

function PrefsPanel({
  prefs,
  setPrefs,
  onReset,
  onClose,
}: {
  prefs: ReaderPrefs;
  setPrefs: (p: ReaderPrefs) => void;
  onReset: () => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* invisible click-away */}
      <div className="fixed inset-0 z-[180]" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -6, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.97 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-4 right-4 top-[76px] z-[200] max-h-[calc(100svh-96px)] origin-top-right overflow-y-auto rounded-2xl border border-white/10 bg-[#0c0c0c]/95 p-4 shadow-[0_20px_70px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:left-auto sm:right-7 sm:w-[320px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 100% 0%, rgba(110,231,183,0.07), transparent 70%)",
          }}
        />
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="size-3.5 text-emerald-300" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-300">
              Reader Preferences
            </span>
          </div>
          <button
            onClick={onReset}
            className="group inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-zinc-500 transition hover:border-amber-300/30 hover:text-amber-200"
          >
            <RotateCcw className="size-2.5 transition group-hover:-rotate-45" />
            Reset
          </button>
        </div>

        {/* Arabic size */}
        <Stepper
          icon={<Type className="size-3" />}
          label="Arabic Size"
          value={prefs.arabicSize}
          suffix="px"
          min={18}
          max={44}
          step={2}
          onChange={(v) => setPrefs({ ...prefs, arabicSize: v })}
        />

        {/* Translation size */}
        <Stepper
          icon={<Type className="size-3" />}
          label="Translation Size"
          value={prefs.translationSize}
          suffix="px"
          min={11}
          max={22}
          step={1}
          onChange={(v) => setPrefs({ ...prefs, translationSize: v })}
        />

        {/* Line height */}
        <Stepper
          icon={<AlignJustify className="size-3" />}
          label="Line Height"
          value={prefs.lineHeight}
          suffix=""
          min={1.6}
          max={3.0}
          step={0.1}
          format={(v) => v.toFixed(1)}
          onChange={(v) => setPrefs({ ...prefs, lineHeight: Number(v.toFixed(1)) })}
        />

        {/* Arabic font */}
        <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-2">
          <p className="mb-1.5 px-1 text-[9px] uppercase tracking-[0.24em] text-zinc-500">
            Arabic Font
          </p>
          <div className="grid grid-cols-2 gap-1">
            {([
              { id: "amiri", label: "Amiri", sample: "ٱلْقُرْآن" },
              { id: "scheherazade", label: "Scheherazade", sample: "ٱلْقُرْآن" },
            ] as const).map((f) => (
              <button
                key={f.id}
                onClick={() => setPrefs({ ...prefs, arabicFont: f.id })}
                className={`relative flex flex-col items-center gap-0.5 rounded-lg border px-2 py-2 transition ${
                  prefs.arabicFont === f.id
                    ? "border-emerald-300/40 bg-emerald-300/[0.07] text-zinc-50"
                    : "border-white/5 bg-white/[0.02] text-zinc-400 hover:border-white/15 hover:text-zinc-200"
                }`}
              >
                <span
                  className="text-lg leading-none"
                  style={{
                    fontFamily: f.id === "amiri" ? "'Amiri', serif" : "'Scheherazade New', serif",
                  }}
                >
                  {f.sample}
                </span>
                <span className="text-[9px] uppercase tracking-wider">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Show arabic */}
        <button
          onClick={() => setPrefs({ ...prefs, showArabic: !prefs.showArabic })}
          className="mt-3 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-left transition hover:border-emerald-300/25"
        >
          <span className="text-[11px] text-zinc-300">Show Arabic Text</span>
          <span
            className={`relative inline-flex h-4 w-7 items-center rounded-full transition ${
              prefs.showArabic ? "bg-emerald-300/60" : "bg-white/10"
            }`}
          >
            <motion.span
              animate={{ x: prefs.showArabic ? 14 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="inline-block size-3 rounded-full bg-zinc-50 shadow"
            />
          </span>
        </button>
      </motion.div>
    </>
  );
}

function Stepper({
  icon,
  label,
  value,
  suffix,
  min,
  max,
  step,
  format,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  min: number;
  max: number;
  step: number;
  format?: (v: number) => string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          <span className="text-emerald-300/80">{icon}</span>
          {label}
        </span>
        <span className="text-[10px] tabular-nums text-emerald-200">
          {format ? format(value) : value}
          {suffix}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, Number((value - step).toFixed(2))))}
          className="inline-flex size-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-emerald-300/30 hover:text-emerald-200 active:scale-90"
        >
          <Minus className="size-3" />
        </button>
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-300/80 to-amber-200/70"
          />
        </div>
        <button
          onClick={() => onChange(Math.min(max, Number((value + step).toFixed(2))))}
          className="inline-flex size-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-emerald-300/30 hover:text-emerald-200 active:scale-90"
        >
          <Plus className="size-3" />
        </button>
      </div>
    </div>
  );
}

function AyahRow({
  ayah,
  surahNumber,
  lang,
  prefs,
  index,
  playing,
  onTogglePlay,
  bookmarked,
  onBookmark,
}: {
  ayah: Ayah;
  surahNumber: number;
  lang: Lang;
  prefs: ReaderPrefs;
  index: number;
  playing: boolean;
  onTogglePlay: () => void;
  bookmarked: boolean;
  onBookmark: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${ayah.arabic}\n\n${ayah.english}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const arabicFamily =
    prefs.arabicFont === "amiri" ? "'Amiri', serif" : "'Scheherazade New', serif";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -1 }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-md transition hover:border-emerald-300/25 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-zinc-500">
          <motion.span
            key={bookmarked ? "b" : "n"}
            initial={bookmarked ? { scale: 0.6 } : false}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className={`inline-flex size-6 items-center justify-center rounded-full border text-[10px] tabular-nums transition ${
              bookmarked
                ? "border-amber-300/50 bg-amber-300/15 text-amber-200 shadow-[0_0_14px_rgba(252,211,77,0.35)]"
                : "border-emerald-300/30 bg-emerald-300/[0.06] text-emerald-200"
            }`}
          >
            {ayah.n}
          </motion.span>
          <span>
            {surahNumber}:{ayah.n}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-80 transition group-hover:opacity-100 sm:opacity-60">
          <IconBtn label="Play" onClick={onTogglePlay} active={playing}>
            {playing ? <Pause className="size-3.5" /> : <Volume2 className="size-3.5" />}
          </IconBtn>
          <IconBtn label={copied ? "Copied" : "Copy"} onClick={copy} active={copied}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "ok" : "cp"}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="inline-flex"
              >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </motion.span>
            </AnimatePresence>
          </IconBtn>
          <IconBtn label="Bookmark" onClick={onBookmark} active={bookmarked}>
            {bookmarked ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
          </IconBtn>
        </div>
      </div>

      {prefs.showArabic && (
        <p
          dir="rtl"
          className="mt-4 text-right text-zinc-100"
          style={{
            fontFamily: arabicFamily,
            fontSize: `${prefs.arabicSize}px`,
            lineHeight: prefs.lineHeight,
          }}
        >
          {ayah.arabic}
        </p>
      )}

      <div className="mt-4 space-y-3 border-t border-white/5 pt-4">
        {(lang === "en" || lang === "both") && (
          <p
            className="leading-relaxed text-zinc-400"
            style={{ fontSize: `${prefs.translationSize}px` }}
          >
            {ayah.english}
          </p>
        )}
        {(lang === "ur" || lang === "both") && (
          <p
            dir="rtl"
            className="text-right leading-[2] text-zinc-300"
            style={{
              fontFamily: "'Scheherazade New', serif",
              fontSize: `${prefs.translationSize + 2}px`,
            }}
          >
            {ayah.urdu}
          </p>
        )}
      </div>

      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 6, ease: "linear" }}
            style={{ transformOrigin: "left" }}
            className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-emerald-300 to-amber-200 shadow-[0_0_14px_rgba(110,231,183,0.5)]"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function IconBtn({
  children,
  onClick,
  label,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  active?: boolean;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`inline-flex size-8 items-center justify-center rounded-full border transition ${
        active
          ? "border-emerald-300/40 bg-emerald-300/10 text-emerald-200"
          : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-emerald-300/30 hover:text-emerald-200"
      }`}
    >
      {children}
    </motion.button>
  );
}
