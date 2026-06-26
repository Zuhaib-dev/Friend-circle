"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import { SURAHS, JUZ, Surah } from "@/data/quran-data";
import { QuranHeader } from "@/components/tazkiyah/quran/QuranHeader";
import { LastSeenBanner } from "@/components/tazkiyah/quran/LastSeenBanner";
import { SegmentedTabs } from "@/components/tazkiyah/quran/SegmentedTabs";
import { SearchBar } from "@/components/tazkiyah/quran/SearchBar";
import { SurahCard } from "@/components/tazkiyah/quran/SurahCard";
import { JuzCard } from "@/components/tazkiyah/quran/JuzCard";
import { ReadingView } from "@/components/tazkiyah/quran/ReadingView";

import { useLastSeen } from "@/hooks/useLastSeen";

export default function QuranPage() {
  const [tab, setTab] = useState<"surah" | "juz">("surah");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Surah | null>(null);
  const { lastSeen, saveLastSeen } = useLastSeen();

  const filteredSurahs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SURAHS;
    return SURAHS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.meaning.toLowerCase().includes(q) ||
        String(s.number).includes(q),
    );
  }, [query]);

  const filteredJuz = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return JUZ;
    return JUZ.filter((j) => String(j.number).includes(q) || j.start.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-zinc-100 antialiased">
      {/* Ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 12% 0%, rgba(110,231,183,0.10), transparent 60%), radial-gradient(50% 35% at 88% 20%, rgba(252,211,77,0.07), transparent 60%), radial-gradient(70% 50% at 50% 110%, rgba(110,231,183,0.06), transparent 60%)",
        }}
      />
      {/* Faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <QuranHeader />
        <LastSeenBanner onResume={(surahId) => setSelected(SURAHS.find((s) => s.number === surahId) ?? null)} />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SegmentedTabs tab={tab} setTab={setTab} />
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {tab === "surah" ? (
              <motion.div
                key="surah-list"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredSurahs.map((s, i) => (
                  <SurahCard
                    key={s.number}
                    surah={s}
                    index={i}
                    onClick={() => setSelected(s)}
                    bookmarked={lastSeen?.surah === s.number}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="juz-list"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
              >
                {filteredJuz.map((j, i) => (
                  <JuzCard key={j.number} juz={j} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="mt-16 flex items-center justify-between border-t border-white/5 pt-6 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          <span>Tazkiyah // Qur'an Reader</span>
          <span className="flex items-center gap-2">
            <Sparkles className="size-3.5 text-emerald-300/80" /> Recite with presence
          </span>
        </footer>
      </div>

      <AnimatePresence>
        {selected && (
          <ReadingView
            surah={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}


