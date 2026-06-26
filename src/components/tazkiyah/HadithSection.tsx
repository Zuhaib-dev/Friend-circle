"use client";
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { HADITHS } from "@/data/tazkiyah-data";

export function HadithSection() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime() + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const todayHadith = HADITHS[dayOfYear % HADITHS.length];

  return (
    <div className="rounded-sm border border-white/10 bg-[#0f0f0f] p-8 sm:p-12 relative overflow-hidden">
      <Quote className="absolute -top-4 -left-4 h-32 w-32 text-white/3" />
      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/80 mb-6 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />HADITH OF THE DAY · {todayHadith.source}
      </div>
      <motion.blockquote initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="font-display text-2xl sm:text-4xl leading-snug text-white/95">"{todayHadith.text}"</motion.blockquote>
      <div className="mt-6 text-sm font-mono uppercase tracking-[0.25em] text-white/40">— Prophet Muhammad (ﷺ)</div>
    </div>
  );
}
