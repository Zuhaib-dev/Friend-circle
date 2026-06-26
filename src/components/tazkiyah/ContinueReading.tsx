"use client";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import Link from "next/link";
import { useLastSeen } from "@/hooks/useLastSeen";
import { SURAHS } from "@/data/quran-data";
import { EASE } from "./utils";

export function ContinueReading({ onResume }: { onResume?: (surah: number) => void }) {
  const { lastSeen, mounted } = useLastSeen();

  if (!mounted || !lastSeen) return null;

  const surah = SURAHS.find((s) => s.number === lastSeen.surah) || SURAHS[0];
  const progress = Math.round((lastSeen.ayah / surah.ayats) * 100);

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
      className="mt-10 group relative overflow-hidden rounded-sm border border-white/10 bg-[#141414] hover:border-emerald-300/30 transition-colors">
      <div className="grid sm:grid-cols-[1fr_auto] gap-6 p-6 sm:p-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />LAST SEEN
          </div>
          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <h2 className="font-display text-3xl sm:text-4xl text-white">Surah {surah.name}</h2>
            <span className="text-white/40 text-sm font-mono">AYAT {lastSeen.ayah} / {surah.ayats}</span>
          </div>
          {lastSeen.arabicSnippet && (
            <p className="mt-4 text-right text-2xl sm:text-3xl leading-loose text-white/90 line-clamp-2" style={{ fontFamily: "'Amiri', serif" }} dir="rtl">
              {lastSeen.arabicSnippet}
            </p>
          )}
          <div className="mt-5">
            <div className="h-[2px] w-full bg-white/10 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ delay: 0.6, duration: 1.4, ease: "easeOut" }}
                className="h-full bg-linear-to-r from-emerald-300 to-amber-200" />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
              <span>{progress}% COMPLETE</span>
            </div>
          </div>
        </div>
        <div className="sm:self-end">
          {onResume ? (
            <motion.button onClick={() => {
              window.location.hash = `ayah-${lastSeen.ayah}`;
              onResume(lastSeen.surah);
            }} whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center gap-3 px-6 py-3.5 bg-white text-[#0a0a0a] font-mono uppercase tracking-[0.2em] text-xs hover:bg-emerald-300 transition-colors">
              <Play className="h-3.5 w-3.5 fill-current" />Resume Reading
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
            </motion.button>
          ) : (
            <Link href={`/tazkiyah/quran?surah=${lastSeen.surah}#ayah-${lastSeen.ayah}`} passHref legacyBehavior>
              <motion.a whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}
                className="relative inline-flex items-center gap-3 px-6 py-3.5 bg-white text-[#0a0a0a] font-mono uppercase tracking-[0.2em] text-xs hover:bg-emerald-300 transition-colors">
                <Play className="h-3.5 w-3.5 fill-current" />Resume Reading
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
              </motion.a>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
