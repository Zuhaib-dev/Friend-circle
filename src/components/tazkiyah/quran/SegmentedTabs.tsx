"use client";
import { motion } from "motion/react";
import { BookOpen, Hash } from "lucide-react";

export function SegmentedTabs({
  tab,
  setTab,
}: {
  tab: "surah" | "juz";
  setTab: (t: "surah" | "juz") => void;
}) {
  const tabs: { id: "surah" | "juz"; label: string; count: number; icon: typeof BookOpen }[] = [
    { id: "surah", label: "Surahs", count: 114, icon: BookOpen },
    { id: "juz", label: "Juz", count: 30, icon: Hash },
  ];
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/3 p-1 backdrop-blur-md">
      {tabs.map((t) => {
        const Icon = t.icon;
        const active = tab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition"
          >
            {active && (
              <motion.span
                layoutId="tab-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-full bg-linear-to-b from-white/10 to-white/4 ring-1 ring-emerald-300/30"
              />
            )}
            <span className="relative flex items-center gap-2">
              <Icon className={`size-3.5 ${active ? "text-emerald-200" : "text-zinc-400"}`} />
              <span className={active ? "text-zinc-50" : "text-zinc-400"}>{t.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  active ? "bg-emerald-300/15 text-emerald-200" : "bg-white/5 text-zinc-500"
                }`}
              >
                {t.count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

