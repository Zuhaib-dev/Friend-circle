"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SURAHS, Surah } from "@/data/quran-data";
import { ReadingView } from "@/components/tazkiyah/quran/ReadingView";
import { TopNav } from "@/components/top-nav";
import { fadeUp } from "@/components/tazkiyah/utils";
import { Header } from "@/components/tazkiyah/Header";
import { ContinueReading } from "@/components/tazkiyah/ContinueReading";
import { PrayerStrip } from "@/components/tazkiyah/PrayerStrip";
import { Tabs } from "@/components/tazkiyah/Tabs";
import { QuranSection } from "@/components/tazkiyah/QuranSection";
import { HadithSection } from "@/components/tazkiyah/HadithSection";
import { TasbihSection } from "@/components/tazkiyah/TasbihSection";
import { SeerahSection } from "@/components/tazkiyah/SeerahSection";
import { QiblaFinder } from "@/components/tazkiyah/QiblaFinder";
import { DailyAyahSpotlight } from "@/components/tazkiyah/DailyAyahSpotlight";
import { AsmaulHusnaSection } from "@/components/tazkiyah/AsmaulHusnaSection";
import { BentoGrid } from "@/components/tazkiyah/BentoGrid";
import { Footer } from "@/components/tazkiyah/Footer";

export default function TazkiyahPage() {
  const [tab, setTab] = useState<"quran" | "hadith" | "tasbih" | "seerah" | "qibla">("quran");
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  
  return (
    <div className="min-h-screen bg-bone text-ink">
      <TopNav />
      <div className="bg-[#0a0a0a] text-white/90 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(180,160,90,0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(60,140,110,0.12),transparent_50%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[18px_18px] opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
          <Header />
          <ContinueReading onResume={(surahId) => setSelectedSurah(SURAHS.find(s => s.number === surahId) ?? null)} />
          <PrayerStrip />
          <Tabs tab={tab} setTab={setTab} />
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {tab === "quran"  && <motion.div key="quran"  {...fadeUp}><QuranSection /></motion.div>}
              {tab === "hadith" && <motion.div key="hadith" {...fadeUp}><HadithSection /></motion.div>}
              {tab === "tasbih" && <motion.div key="tasbih" {...fadeUp}><TasbihSection /></motion.div>}
              {tab === "seerah" && <motion.div key="seerah" {...fadeUp}><SeerahSection /></motion.div>}
              {tab === "qibla" && <motion.div key="qibla" {...fadeUp}><QiblaFinder /></motion.div>}
            </AnimatePresence>
          </div>
          <DailyAyahSpotlight />
          <AsmaulHusnaSection />
          <BentoGrid />
          <Footer />
        </div>
      </div>

      <AnimatePresence>
        {selectedSurah && (
          <ReadingView
            surah={selectedSurah}
            onClose={() => setSelectedSurah(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
