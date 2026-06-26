"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Compass, Moon, Heart } from "lucide-react";
import { HADITHS, DUAS } from "@/data/tazkiyah-data";
import { useAladhanData } from "./utils";

export function BentoGrid() {
  const aladhan = useAladhanData();
  const [streak, setStreak] = React.useState<number | null>(null);

  React.useEffect(() => {
    setStreak(parseInt(localStorage.getItem("dhikr_streak") || "12"));
  }, []);

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime() + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const todayHadith = HADITHS[dayOfYear % HADITHS.length];
  const todayDua = DUAS[dayOfYear % DUAS.length];

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl sm:text-4xl text-white">Daily Companions</h2>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">06 MODULES</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4">
        <BentoCard className="lg:col-span-2 lg:row-span-2" tone="emerald">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/80 mb-3">DUA OF THE DAY</div>
          <p className="text-right text-2xl sm:text-3xl text-white leading-[2.2]" style={{ fontFamily: "'Amiri', serif" }} dir="rtl">{todayDua.ar}</p>
          <p className="mt-4 text-white/60 italic text-sm">"{todayDua.en}"</p>
          <div className="mt-auto pt-6 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">{todayDua.ref}</div>
        </BentoCard>
        <BentoCard>
          <Compass className="h-5 w-5 text-emerald-300/80" />
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mt-3">QIBLA</div>
          <div className="font-display text-4xl text-white mt-1">
            {aladhan?.qibla ? Math.round(aladhan.qibla) : "294"}°
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">
            {aladhan?.qibla ? "FROM NORTH" : "NW · MAKKAH"}
          </div>
        </BentoCard>
        <BentoCard>
          <Moon className="h-5 w-5 text-amber-200/80" />
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mt-3">HIJRI</div>
          {aladhan ? (
            <>
              <div className="font-display text-3xl text-white mt-1">{aladhan.hijri.day} {aladhan.hijri.month.en}</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">{aladhan.hijri.year} {aladhan.hijri.designation.abbreviated}</div>
            </>
          ) : (
            <>
              <div className="font-display text-3xl text-white mt-1">12 Muharram</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">1447 AH</div>
            </>
          )}
        </BentoCard>
        <BentoCard className="sm:col-span-2">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/80 mb-2">HADITH · TODAY</div>
          <p className="font-display text-xl text-white leading-snug">"{todayHadith.text}"</p>
          <div className="mt-auto pt-3 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">{todayHadith.source}</div>
        </BentoCard>
        <BentoCard>
          <Heart className="h-5 w-5 text-rose-300/80" />
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mt-3">STREAK</div>
          <div className="font-display text-4xl text-white mt-1">{streak !== null ? streak : "..."} <span className="text-base text-white/40">days</span></div>
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
      className={`group relative rounded-sm border border-white/10 bg-[#0f0f0f] p-5 flex flex-col hover:border-emerald-300/30 transition-colors overflow-hidden ${className}`}>
      {tone === "emerald" && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(110,200,170,0.08),transparent_60%)] pointer-events-none" />}
      <div className="relative flex-1 flex flex-col">{children}</div>
      <span className="absolute top-2 right-2 text-[9px] font-mono text-white/20 group-hover:text-emerald-300/70 transition-colors">◆</span>
    </motion.div>
  );
}
