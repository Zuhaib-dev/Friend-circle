"use client";
import { motion } from "motion/react";
import { JUZ } from "@/data/quran-data";
import { ChevronRight } from "lucide-react";

export function JuzCard({
  juz,
  index,
  onClick,
}: {
  juz: (typeof JUZ)[number];
  index: number;
  onClick?: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.3) }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="group relative flex aspect-5/6 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/2.5 p-4 text-left backdrop-blur-md transition hover:border-emerald-300/30 hover:bg-white/4"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(70% 50% at 0% 0%, rgba(110,231,183,0.08), transparent 60%)",
        }}
      />
      <div className="flex items-start justify-between">
        <span className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Juz</span>
        <span className="text-xs tabular-nums text-emerald-200">{juz.number}</span>
      </div>
      <div>
        <div className="mb-3">
          <p
            className="text-2xl text-zinc-100 transition group-hover:text-emerald-200"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {juz.arabic}
          </p>
          <p className="mt-1 text-xs font-medium text-zinc-400 transition group-hover:text-emerald-200/80">
            {juz.name}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="truncate text-[10px] text-zinc-500">
            <span className="text-zinc-400">starts</span> · {juz.start}
          </p>
          <div className="flex items-center justify-between">
            <p className="truncate text-[10px] text-zinc-500">
              <span className="text-zinc-400">ends</span> · {juz.end}
            </p>
            <ChevronRight className="size-3 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-emerald-300" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
