"use client";
import { motion } from "motion/react";
import { BookOpen, Quote, Heart, Sparkles, Compass } from "lucide-react";

export function Tabs({ tab, setTab }: { tab: string; setTab: (t: any) => void }) {
  const TABS = [
    { id: "quran", label: "Qur'an", icon: BookOpen },
    { id: "hadith", label: "Hadith", icon: Quote },
    { id: "tasbih", label: "Tasbih", icon: Heart },
    { id: "seerah", label: "Seerah", icon: Sparkles },
    { id: "qibla", label: "Qibla", icon: Compass },
  ] as const;
  return (
    <div className="mt-10 inline-flex rounded-sm border border-white/10 bg-[#101010] p-1 relative">
      {TABS.map((t) => {
        const Icon = t.icon; const active = tab === t.id;
        return (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="relative px-4 sm:px-5 py-2 text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 z-10">
            {active && <motion.span layoutId="tab-indicator" className="absolute inset-0 bg-white rounded-sm -z-10"
              transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <Icon className={`h-3.5 w-3.5 ${active ? "text-[#0a0a0a]" : "text-white/50"}`} />
            <span className={active ? "text-[#0a0a0a]" : "text-white/60"}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
