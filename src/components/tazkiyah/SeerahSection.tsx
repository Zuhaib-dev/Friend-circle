"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, X, BookOpen } from "lucide-react";
import { SEERAH_CHAPTERS, SeerahChapter } from "@/data/seerah-data";

export function SeerahSection() {
  const [active, setActive] = useState(0);
  const [readingChapter, setReadingChapter] = useState<SeerahChapter | null>(null);
  const ch = SEERAH_CHAPTERS[active];

  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
      <div className="rounded-sm border border-white/10 bg-[#0f0f0f] overflow-hidden">
        <div className="px-5 py-3 border-b border-white/5 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
          SEERAH · LIFE OF THE PROPHET ﷺ
        </div>
        <div>
          {SEERAH_CHAPTERS.map((c, i) => {
            const sel = i === active;
            return (
              <button key={c.n} onClick={() => setActive(i)}
                className={`w-full grid grid-cols-[44px_1fr_auto] items-center gap-3 px-5 py-4 text-left border-b border-white/5 transition-colors ${sel ? "bg-emerald-300/6" : "hover:bg-white/3"}`}>
                <span className={`font-mono text-xs ${sel ? "text-emerald-300" : "text-white/40"}`}>{c.n}</span>
                <span>
                  <div className="text-sm text-white">{c.title}</div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">{c.meta}</div>
                </span>
                <ChevronRight className={`h-3.5 w-3.5 ${sel ? "text-emerald-300" : "text-white/30"}`} />
              </button>
            );
          })}
        </div>
      </div>
      <motion.div key={ch.n} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="rounded-sm border border-white/10 bg-[#0f0f0f] p-8 relative overflow-hidden flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/80">CHAPTER {ch.n} · {ch.meta}</div>
          <h3 className="mt-3 font-display text-4xl text-white">{ch.title}</h3>
          <p className="mt-4 text-white/65 leading-relaxed text-base relative z-10">{ch.desc}</p>
        </div>
        
        <div className="mt-10 relative z-10">
          <button 
            onClick={() => setReadingChapter(ch)}
            className="group px-6 py-4 border border-emerald-300/30 bg-emerald-300/5 rounded-sm flex items-center justify-between w-full hover:bg-emerald-300/10 transition-colors">
            <span className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-emerald-300/80" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/90">Read Chapter</span>
            </span>
            <ChevronRight className="h-4 w-4 text-white/50 group-hover:text-emerald-300 transition-colors" />
          </button>
        </div>
        <div className="pointer-events-none absolute -bottom-10 -right-6 text-[180px] text-white/5 select-none" style={{ fontFamily: "'Amiri', serif" }}>ﷺ</div>
      </motion.div>

      <SeerahReadingModal chapter={readingChapter} onClose={() => setReadingChapter(null)} />
    </div>
  );
}

function SeerahReadingModal({ chapter, onClose }: { chapter: SeerahChapter | null; onClose: () => void }) {
  useEffect(() => {
    if (!chapter) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "auto";
    };
  }, [chapter, onClose]);

  return (
    <AnimatePresence>
      {chapter && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col overflow-hidden">
          
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
                Chapter {chapter.n} · {chapter.title}
              </span>
            </div>
            <button onClick={onClose} className="h-9 w-9 grid place-items-center text-white/50 hover:text-white hover:bg-white/10 rounded-sm transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto w-full">
            <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-300/80 mb-6 text-center">
                  {chapter.meta}
                </div>
                <h1 className="font-display text-4xl sm:text-6xl text-center text-white mb-16 leading-tight">
                  {chapter.title}
                </h1>
                
                <div className="space-y-8">
                  {chapter.content.map((paragraph, idx) => (
                    <motion.p 
                      key={idx}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + (idx * 0.05), duration: 0.5 }}
                      className="text-lg sm:text-xl text-white/80 leading-relaxed font-serif tracking-wide">
                      {idx === 0 && <span className="text-4xl text-emerald-300 float-left mr-3 mt-1 font-display">{paragraph.charAt(0)}</span>}
                      {idx === 0 ? paragraph.slice(1) : paragraph}
                    </motion.p>
                  ))}
                </div>
                
                <div className="mt-20 pt-10 border-t border-white/10 text-center">
                  <div className="text-[40px] text-white/20 select-none" style={{ fontFamily: "'Amiri', serif" }}>ﷺ</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
