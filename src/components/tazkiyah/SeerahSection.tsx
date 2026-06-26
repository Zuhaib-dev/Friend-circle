"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { SEERAH_CHAPTERS } from "@/data/tazkiyah-data";

export function SeerahSection() {
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
                className={`w-full grid grid-cols-[44px_1fr_auto] items-center gap-3 px-5 py-4 text-left border-b border-white/5 transition-colors ${sel ? "bg-emerald-300/6" : "hover:bg-white/3"}`}>
                <span className={`font-mono text-xs ${sel ? "text-emerald-300" : "text-white/40"}`}>{c.n}</span>
                <span>
                  <div className="text-sm text-white">{c.title}</div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">{c.meta}</div>
                </span>
                <ChevronRight className={`h-3.5 w-3.5 ${sel ? "text-emerald-300" : "text-white/30"}`} />
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
            <button key={label} className="px-4 py-3 border border-white/10 rounded-sm hover:border-emerald-300/40 hover:bg-emerald-300/4 text-[10px] font-mono uppercase tracking-[0.25em] text-white/70 hover:text-emerald-300 transition-colors">
              0{i + 1} · {label}
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute -bottom-10 -right-6 text-[180px] text-white/3 select-none" style={{ fontFamily: "'Amiri', serif" }}>ﷺ</div>
      </motion.div>
    </div>
  );
}
