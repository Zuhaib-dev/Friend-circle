"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw } from "lucide-react";
import { TASBIH_PHRASES, NINETY_NINE_PREVIEW } from "@/data/tazkiyah-data";
import { queueOfflineAction } from "@/lib/offline-sync";
import { toast } from "sonner";

export function TasbihSection() {
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
      // Offline Sync hook
      if (!navigator.onLine) {
        queueOfflineAction("tasbih_sync", { phrase: phrase.tr, target: phrase.target });
        toast.info("Dhikr completed offline. Will sync when reconnected.");
      } else {
        toast.success(`Completed ${phrase.tr}`);
      }
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
                className={`w-full p-4 text-left border rounded-sm transition-colors ${phraseIdx === i ? "border-emerald-300/40 bg-emerald-300/5" : "border-white/10 hover:border-white/30"}`}>
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <span className="text-xl text-white" style={{ fontFamily: "'Amiri', serif" }} dir="rtl">{p.ar}</span>
                    <span className="ml-3 text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">{p.tr}</span>
                  </div>
                  <span className={`text-sm font-mono tabular-nums ${done ? "text-emerald-300" : "text-white/60"}`}>{c} / {p.target}</span>
                </div>
                <div className="h-[2px] bg-white/10 overflow-hidden">
                  <motion.div animate={{ width: `${ratio * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 22 }}
                    className={`h-full ${done ? "bg-emerald-300" : "bg-white/60"}`} />
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
