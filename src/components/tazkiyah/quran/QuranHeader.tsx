"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function QuranHeader() {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4">
      <Link
        href="/tazkiyah"
        className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-[11px] text-zinc-300 backdrop-blur-md transition hover:border-emerald-300/30 hover:text-emerald-200 sm:gap-2 sm:px-3.5 sm:text-xs"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        <span className="hidden sm:inline">Back to Tazkiyah</span>
        <span className="sm:hidden">Back</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-w-0 text-center"
      >
        <h1
          className="truncate text-lg font-light tracking-tight text-zinc-50 sm:text-2xl lg:text-3xl"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          The Noble <span className="italic text-emerald-200">Qur'an</span>
        </h1>
        <p className="mt-1 hidden items-center justify-center gap-2 text-[10px] uppercase tracking-[0.32em] text-emerald-300/70 sm:flex">
          <span className="inline-block size-1 rounded-full bg-emerald-300/80 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
          Recite · Reflect · Remember
        </p>
      </motion.div>

      <div className="hidden w-[120px] shrink-0 sm:block" />
      <div className="size-8 shrink-0 sm:hidden" />
    </div>
  );
}

