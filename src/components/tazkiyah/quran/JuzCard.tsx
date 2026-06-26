import { motion } from "motion/react";
import { JUZ } from "@/data/quran-data";

export function JuzCard({ juz, index }: { juz: (typeof JUZ)[number]; index: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.3) }}
      whileHover={{ y: -2 }}
      className="group relative flex aspect-5/6 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/2.5 p-4 text-left backdrop-blur-md transition hover:border-emerald-300/30 hover:bg-white/4"
    >
      <div className="flex items-start justify-between">
        <span className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Juz</span>
        <span className="text-xs tabular-nums text-emerald-200">{juz.number}</span>
      </div>
      <div>
        <p
          className="text-2xl text-zinc-100 transition group-hover:text-emerald-200"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          {juz.arabic}
        </p>
        <p className="mt-1 truncate text-[10px] text-zinc-500">starts · {juz.start}</p>
      </div>
    </motion.button>
  );
}

