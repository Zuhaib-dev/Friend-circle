"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Play, Pause, Copy, Check, Bookmark, BookmarkCheck, Volume2, X, Settings2, Type, AlignJustify, RotateCcw, Minus, Plus } from "lucide-react";
import { Surah, Ayah, Lang, ReaderPrefs, DEFAULT_PREFS } from "@/data/quran-data";
import { useQuranSurah } from "@/hooks/useQuranSurah";
import { useLastSeen } from "@/hooks/useLastSeen";
import { useReaderPrefs } from "@/hooks/useReaderPrefs";

export function ReadingView({
  surah,
  onClose,
}: {
  surah: Surah;
  onClose: () => void;
}) {
  const [playing, setPlaying] = useState<number | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const { prefs, setPrefs } = useReaderPrefs();
  const { lastSeen, saveLastSeen } = useLastSeen();
  const [prefsOpen, setPrefsOpen] = useState(false);
  
  const { ayat, loading, error } = useQuranSurah(surah.number);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (playing !== null && ayat) {
      const ayah = ayat.find((a) => a.n === playing);
      if (ayah && ayah.audio && audioRef.current) {
        audioRef.current.src = ayah.audio;
        audioRef.current.play().catch(() => setPlaying(null));
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [playing, ayat]);

  const handleAudioEnded = () => {
    if (!ayat || playing === null) return;
    const currentIndex = ayat.findIndex((a) => a.n === playing);
    if (currentIndex !== -1 && currentIndex < ayat.length - 1) {
      setPlaying(ayat[currentIndex + 1].n); // Auto play next
    } else {
      setPlaying(null);
    }
  };

  useEffect(() => {
    if (ayat && !loading) {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#ayah-")) {
        const ayahId = hash.replace("#", "");
        // Use a short timeout to ensure rendering is complete
        setTimeout(() => {
          const el = document.getElementById(ayahId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.classList.add("ring-2", "ring-emerald-400/50", "bg-emerald-300/10");
            setTimeout(() => {
              el.classList.remove("ring-2", "ring-emerald-400/50", "bg-emerald-300/10");
            }, 3000);
          }
        }, 400);
      }
    }
  }, [ayat, loading]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-100 isolate flex items-stretch justify-end bg-black/60 backdrop-blur-md"
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
        <div className="relative z-130 flex items-center justify-between border-b border-white/10 bg-white/2 px-5 py-4 backdrop-blur-md sm:px-7">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onClose}
              className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/3 text-zinc-300 transition hover:border-emerald-300/30 hover:text-emerald-200"
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
            <div className="inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/3 p-0.5">
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
                      className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-emerald-300/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{opt.label}</span>
                </button>
              ))}
            </div>
            <div className="relative z-150">
              <button
                onClick={() => setPrefsOpen((v) => !v)}
                aria-label="Reading preferences"
                className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full border bg-white/3 transition ${
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
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/3 text-zinc-400 transition hover:border-red-300/30 hover:text-red-200"
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

          {loading && (
            <div className="flex items-center justify-center py-20 text-emerald-300/50">
              <span className="flex size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span className="ml-3 text-xs uppercase tracking-widest">Loading Ayahs...</span>
            </div>
          )}

          {!loading && error && (
            <div className="flex items-center justify-center py-20 text-red-400">
              <span className="text-sm">Failed to load Surah data.</span>
            </div>
          )}

          {!loading && ayat && (
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
                  bookmarked={lastSeen?.surah === surah.number && lastSeen?.ayah === a.n}
                  onBookmark={() =>
                    saveLastSeen(surah.number, a.n, a.arabic)
                  }
                />
              ))}
            </div>
          )}
        </div>
        <audio ref={audioRef} onEnded={handleAudioEnded} className="hidden" />
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
      <div className="fixed inset-0 z-180" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -6, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.97 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-4 right-4 top-[76px] z-200 max-h-[calc(100svh-96px)] origin-top-right overflow-y-auto rounded-2xl border border-white/10 bg-[#0c0c0c]/95 p-4 shadow-[0_20px_70px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:left-auto sm:right-7 sm:w-[320px]"
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
        <div className="mt-3 rounded-xl border border-white/10 bg-white/2 p-2">
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
                    ? "border-emerald-300/40 bg-emerald-300/7 text-zinc-50"
                    : "border-white/5 bg-white/2 text-zinc-400 hover:border-white/15 hover:text-zinc-200"
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
          className="mt-3 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/2 px-3 py-2 text-left transition hover:border-emerald-300/25"
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
    <div className="mt-2 rounded-xl border border-white/10 bg-white/2 p-2.5">
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
          className="inline-flex size-6 items-center justify-center rounded-md border border-white/10 bg-white/3 text-zinc-300 transition hover:border-emerald-300/30 hover:text-emerald-200 active:scale-90"
        >
          <Minus className="size-3" />
        </button>
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/6">
          <motion.div
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="h-full rounded-full bg-linear-to-r from-emerald-300/80 to-amber-200/70"
          />
        </div>
        <button
          onClick={() => onChange(Math.min(max, Number((value + step).toFixed(2))))}
          className="inline-flex size-6 items-center justify-center rounded-md border border-white/10 bg-white/3 text-zinc-300 transition hover:border-emerald-300/30 hover:text-emerald-200 active:scale-90"
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
      id={`ayah-${ayah.n}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -1 }}
      className="group relative rounded-2xl border border-white/10 bg-white/2.5 p-5 backdrop-blur-md transition-all duration-700 hover:border-emerald-300/25 sm:p-6"
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
                : "border-emerald-300/30 bg-emerald-300/6 text-emerald-200"
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
            className="text-right leading-loose text-zinc-300"
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
            className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-linear-to-r from-emerald-300 to-amber-200 shadow-[0_0_14px_rgba(110,231,183,0.5)]"
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
          : "border-white/10 bg-white/3 text-zinc-400 hover:border-emerald-300/30 hover:text-emerald-200"
      }`}
    >
      {children}
    </motion.button>
  );
}
