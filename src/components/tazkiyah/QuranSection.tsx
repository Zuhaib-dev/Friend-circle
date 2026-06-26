"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Bookmark, Copy, Share2, Play, Pause, Check, X } from "lucide-react";
import { SURAHS, JUZ, Surah, Ayah } from "@/data/quran-data";
import { useQuranSurah } from "@/hooks/useQuranSurah";
import { useLastSeen } from "@/hooks/useLastSeen";
import { useRef } from "react";

export function QuranSection() {
  const [mode, setMode] = useState<"surahs" | "juz">("surahs");
  const [lang, setLang] = useState<"en" | "ur">("en");
  const [active, setActive] = useState<Surah>(SURAHS[0]);
  const [query, setQuery] = useState("");
  const [selectedAyat, setSelectedAyat] = useState<Ayah | null>(null);
  
  const { ayat, loading, error } = useQuranSurah(active.number);
  
  const filtered = SURAHS.filter((s) => `${s.number} ${s.name} ${s.meaning}`.toLowerCase().includes(query.toLowerCase()));
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
            <motion.button key={s.number} onClick={() => setActive(s)} whileHover={{ x: 2 }}
              className={`w-full grid grid-cols-[36px_1fr_auto] items-center gap-3 px-4 py-3 text-left border-b border-white/5 transition-colors ${active.number === s.number ? "bg-emerald-300/6" : "hover:bg-white/3"}`}>
              <span className={`font-mono text-xs ${active.number === s.number ? "text-emerald-300" : "text-white/40"}`}>{String(s.number).padStart(3, "0")}</span>
              <span>
                <div className="text-sm text-white">{s.name}</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">{s.meaning} · {s.ayats} Ayat</div>
              </span>
              <span className="text-right text-base text-white/80" style={{ fontFamily: "'Amiri', serif" }}>{s.arabic}</span>
            </motion.button>
          )) : JUZ.map((j) => (
            <button key={j.number} className="w-full grid grid-cols-[36px_1fr_auto] items-center gap-3 px-4 py-3 text-left border-b border-white/5 hover:bg-white/3 transition-colors">
              <span className="font-mono text-xs text-white/40">{String(j.number).padStart(2, "0")}</span>
              <span>
                <div className="text-sm text-white">Juz {j.number}</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">{j.start}</div>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-sm border border-white/10 bg-[#0f0f0f] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-xl text-white">{active.name}</span>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">{active.meaning} · {active.revelation}</span>
          </div>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        {active.number !== 9 && (
          <div className="px-6 py-6 text-center border-b border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(110,200,170,0.06),transparent_70%)]">
            <p className="text-2xl sm:text-3xl text-white/90" style={{ fontFamily: "'Amiri', serif" }} dir="rtl">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
          </div>
        )}
        <div className="divide-y divide-white/5">
          {loading && (
            <div className="py-12 flex items-center justify-center text-emerald-300/50">
              <span className="animate-pulse text-xs uppercase tracking-[0.2em]">Loading ayahs...</span>
            </div>
          )}
          {!loading && ayat && ayat.map((a, i) => (
            <motion.button key={a.n} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02, duration: 0.4 }}
              onClick={() => setSelectedAyat(a)} className="w-full text-left px-5 sm:px-8 py-6 hover:bg-white/2 transition-colors group">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex items-center justify-center h-7 w-7 border border-white/15 rounded-full text-[10px] font-mono text-white/60 group-hover:border-emerald-300/50 group-hover:text-emerald-300 transition-colors shrink-0">{a.n}</span>
                <p className="flex-1 text-right text-2xl sm:text-[28px] leading-[2.2] text-white" style={{ fontFamily: "'Amiri', serif" }} dir="rtl">{a.arabic}</p>
              </div>
              <p className={`mt-3 text-sm sm:text-base text-white/65 leading-relaxed ${lang === "ur" ? "text-right" : "text-left"}`}
                style={lang === "ur" ? { fontFamily: "'Scheherazade New', serif", fontSize: "1.1rem" } : undefined}
                dir={lang === "ur" ? "rtl" : "ltr"}>
                {lang === "en" ? a.english : a.urdu}
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

function AyatModal({ ayat, surah, onClose }: { ayat: Ayah | null; surah: Surah; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { saveLastSeen } = useLastSeen();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!ayat) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ayat, onClose]);

  useEffect(() => {
    if (playing && ayat?.audio && audioRef.current) {
      audioRef.current.src = ayat.audio;
      audioRef.current.play().catch(() => setPlaying(false));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [playing, ayat]);

  const copy = () => {
    if (!ayat) return;
    navigator.clipboard?.writeText(`${ayat.arabic}\n\n${ayat.english}\n— Surah ${surah.name} ${surah.number}:${ayat.n}`);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };

  const share = async () => {
    if (!ayat) return;
    const text = `${ayat.arabic}\n\n${ayat.english}\n— Surah ${surah.name} ${surah.number}:${ayat.n}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Quran Ayat", text });
      } catch (e) {
        // user cancelled or failed
      }
    } else {
      copy();
    }
  };

  const ACTIONS = [
    { icon: Bookmark, label: "Mark as Last Read", code: "01", onClick: () => { if (ayat) { saveLastSeen(surah.number, ayat.n, ayat.arabic); onClose(); } } },
    { icon: copied ? Check : Copy, label: copied ? "Copied" : "Copy Ayat", code: "02", onClick: copy },
    { icon: Share2, label: "Share", code: "03", onClick: share },
    { icon: playing ? Pause : Play, label: playing ? "Pause Audio" : "Play Audio", code: "04", onClick: () => setPlaying((p) => !p) },
  ];
  return (
    <AnimatePresence>
      {ayat && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6" onClick={onClose}>
          <motion.div initial={{ y: 60, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }} onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-t-lg sm:rounded-sm overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">Surah {surah.name} · {surah.number}:{ayat.n}</span>
              </div>
              <button onClick={onClose} className="h-7 w-7 grid place-items-center text-white/50 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-6 sm:px-8 py-8 bg-[radial-gradient(ellipse_at_top,rgba(110,200,170,0.07),transparent_60%)]">
              <p className="text-right text-2xl sm:text-3xl leading-[2.2] text-white" style={{ fontFamily: "'Amiri', serif" }} dir="rtl">{ayat.arabic}</p>
              <p className="mt-5 text-white/70 italic text-base leading-relaxed">{ayat.english}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/5 divide-x divide-white/5">
              {ACTIONS.map((a) => {
                const Icon = a.icon;
                return (
                  <button key={a.label} onClick={a.onClick}
                    className="group px-4 py-4 flex flex-col items-center gap-2 hover:bg-white/4 transition-colors text-center">
                    <Icon className="h-4 w-4 text-white/60 group-hover:text-emerald-300 transition-colors" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/70 group-hover:text-white">{a.label}</span>
                    <span className="text-[9px] font-mono text-white/30">{a.code}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
          <audio ref={audioRef} onEnded={() => setPlaying(false)} className="hidden" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
