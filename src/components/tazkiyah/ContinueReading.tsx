"use client";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import { EASE } from "./utils";

export function ContinueReading() {
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
          <p className="mt-4 text-right text-2xl sm:text-3xl leading-loose text-white/90" style={{ fontFamily: "'Amiri', serif" }} dir="rtl">
            إِذْ أَوَى ٱلْفِتْيَةُ إِلَى ٱلْكَهْفِ...
          </p>
          <p className="mt-2 text-white/55 text-sm italic">"When the youths retreated to the cave..."</p>
          <div className="mt-5">
            <div className="h-[2px] w-full bg-white/10 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "9%" }} transition={{ delay: 0.6, duration: 1.4, ease: "easeOut" }}
                className="h-full bg-linear-to-r from-emerald-300 to-amber-200" />
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
