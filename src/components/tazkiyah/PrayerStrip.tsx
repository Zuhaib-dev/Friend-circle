"use client";
import { useMemo } from "react";
import { motion } from "motion/react";
import { Moon } from "lucide-react";
import { useNowMinutes, timeToMinutes, useAladhanData, format12Hour } from "./utils";
import { PRAYERS } from "@/data/tazkiyah-data";

export function PrayerStrip() {
  const nowM = useNowMinutes();
  const aladhan = useAladhanData();
  
  const prayers = useMemo(() => {
    if (!aladhan) return PRAYERS;
    return [
      { ...PRAYERS[0], time: aladhan.timings.Fajr },
      { ...PRAYERS[1], time: aladhan.timings.Dhuhr },
      { ...PRAYERS[2], time: aladhan.timings.Asr },
      { ...PRAYERS[3], time: aladhan.timings.Maghrib },
      { ...PRAYERS[4], time: aladhan.timings.Isha },
    ];
  }, [aladhan]);

  const nextIdx = useMemo(() => {
    if (nowM == null) return 0;
    const idx = prayers.findIndex((p) => timeToMinutes(p.time) > nowM);
    return idx === -1 ? 0 : idx;
  }, [nowM, prayers]);

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
      className="mt-6 rounded-sm border border-white/10 bg-[#0f0f0f]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 flex items-center gap-2">
          <Moon className="h-3 w-3 text-amber-200/70" />SALAH · SRINAGAR
          {aladhan && (
            <span className="hidden sm:inline"> · {aladhan.hijri.day} {aladhan.hijri.month.en} {aladhan.hijri.year} {aladhan.hijri.designation.abbreviated}</span>
          )}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/70 hidden sm:block">
          NEXT · {prayers[nextIdx].name.toUpperCase()}
        </span>
      </div>
      <div className="grid grid-cols-5 divide-x divide-white/5">
        {prayers.map((p, i) => {
          const Icon = p.icon;
          const isNext = i === nextIdx && nowM != null;
          return (
            <motion.div key={p.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.06 }}
              className={`relative px-2 sm:px-4 py-4 sm:py-5 text-center ${isNext ? "bg-emerald-300/5" : ""}`}>
              {isNext && <motion.span layoutId="prayer-pulse" className="absolute inset-0 ring-1 ring-inset ring-emerald-300/40" />}
              <Icon className={`h-4 w-4 mx-auto mb-2 ${isNext ? "text-emerald-300" : "text-white/40"}`} />
              <div className={`text-[10px] font-mono uppercase tracking-[0.25em] ${isNext ? "text-emerald-300" : "text-white/50"}`}>{p.name}</div>
              <div className={`mt-1 font-display text-lg sm:text-xl ${isNext ? "text-white" : "text-white/70"}`}>{format12Hour(p.time)}</div>
              {isNext && <motion.div className="mt-2 mx-auto h-1 w-1 rounded-full bg-emerald-300"
                animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
