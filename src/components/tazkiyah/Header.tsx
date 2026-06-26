"use client";
import { motion } from "motion/react";
import { Hexagon, Compass } from "lucide-react";
import { EASE } from "./utils";

export function Header() {
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
        <span className="flex items-center gap-2"><Hexagon className="h-3 w-3 text-emerald-300/70" />TZK / 00 · INNER PURIFICATION</span>
        <span className="hidden sm:flex items-center gap-2"><Compass className="h-3 w-3" />QIBLA · 294° NW</span>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute -top-6 right-0 text-[140px] sm:text-[220px] leading-none text-white/4 select-none" style={{ fontFamily: "'Amiri', serif" }}>تزكية</div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}
          className="font-display font-black tracking-tight text-[14vw] sm:text-[10vw] md:text-[8rem] leading-[0.85] text-white">Tazkiyah</motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-3 max-w-xl text-white/55 text-sm sm:text-base leading-relaxed">
          A quiet room inside our digital campfire. Read, remember, return — at your own pace.
        </motion.p>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.65,0,0.35,1] as [number,number,number,number] }}
          className="mt-6 h-px w-full bg-linear-to-r from-transparent via-emerald-300/40 to-transparent origin-left" />
      </div>
    </div>
  );
}
