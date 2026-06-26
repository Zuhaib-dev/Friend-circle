import { motion } from "motion/react";
import { BookmarkCheck, ChevronRight } from "lucide-react";
import { Surah } from "@/data/quran-data";

export function SurahCard({
  surah,
  index,
  onClick,
  bookmarked,
}: {
  surah: Surah;
  index: number;
  onClick: () => void;
  bookmarked: boolean;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.015, 0.25) }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/2.5 p-4 text-left backdrop-blur-md transition hover:border-emerald-300/30 hover:bg-white/4"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(70% 50% at 0% 0%, rgba(110,231,183,0.08), transparent 60%)",
        }}
      />

      {/* Number badge */}
      <div className="relative flex size-11 shrink-0 items-center justify-center">
        <svg viewBox="0 0 40 40" className="absolute inset-0 size-11 text-emerald-300/40">
          <polygon
            points="20,2 36,11 36,29 20,38 4,29 4,11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <span className="relative text-xs font-medium tabular-nums text-emerald-200">
          {surah.number}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-medium text-zinc-50">{surah.name}</h3>
          {bookmarked && <BookmarkCheck className="size-3 text-amber-300" />}
        </div>
        <p className="mt-0.5 truncate text-[11px] text-zinc-500">
          {surah.meaning} · {surah.ayats} ayat · {surah.revelation}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span
          className="text-xl text-zinc-200 transition group-hover:text-emerald-200"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          {surah.arabic}
        </span>
        <ChevronRight className="size-3.5 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-emerald-300" />
      </div>
    </motion.button>
  );
}

