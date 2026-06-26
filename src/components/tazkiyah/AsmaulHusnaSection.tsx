"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X, ChevronRight } from "lucide-react";
import { ASMAUL_HUSNA, type NameOfAllah } from "@/lib/asmaul-husna";

export function AsmaulHusnaSection() {
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("fc-tazkiyah-99names");
      if (raw) setMarked(new Set(JSON.parse(raw)));
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("fc-tazkiyah-99names", JSON.stringify([...marked]));
  }, [marked, mounted]);

  const toggleMark = (n: number) => {
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  };

  const first12 = ASMAUL_HUSNA.slice(0, 12);
  const progress = Math.round((marked.size / ASMAUL_HUSNA.length) * 100);

  if (!mounted) return null; // Hydration safe

  return (
    <section className="mt-16 sm:mt-24 relative">
      <div className="pointer-events-none absolute -top-16 right-0 text-[200px] sm:text-[320px] leading-none text-white/2.5 select-none font-display font-black">
        99
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-200" />
            TZK / 04 · ASMA UL-HUSNA
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 hidden sm:block">
            {ASMAUL_HUSNA.length} ATTRIBUTES
          </span>
        </div>

        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
          Asma ul-Husna
        </h2>
        <p className="mt-2 text-sm text-white/55 max-w-lg">
          The 99 Beautiful Names of Allah. Hover to reflect on their meaning.
          Click the signal dot to mark as memorized.
        </p>
      </div>

      {/* Grid - Only 12 items */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 relative z-10">
        {first12.map((name, i) => (
          <NameCard
            key={name.n}
            name={name}
            index={i}
            marked={marked.has(name.n)}
            onToggle={() => toggleMark(name.n)}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center relative z-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group px-6 py-4 border border-emerald-300/30 bg-emerald-300/5 rounded-sm flex items-center justify-between w-full max-w-sm hover:bg-emerald-300/10 transition-colors"
        >
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/90">View All 99 Names</span>
          <ChevronRight className="h-4 w-4 text-white/50 group-hover:text-emerald-300 transition-colors" />
        </button>
      </div>

      <AsmaulHusnaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        marked={marked} 
        setMarked={setMarked} 
        toggleMark={toggleMark}
        progress={progress}
      />
    </section>
  );
}

function AsmaulHusnaModal({ isOpen, onClose, marked, setMarked, toggleMark, progress }: any) {
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      document.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "auto";
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [isOpen, onClose]);

  const filtered = useMemo(() => {
    if (!query.trim()) return ASMAUL_HUSNA;
    const q = query.toLowerCase().trim();
    return ASMAUL_HUSNA.filter(
      (n) =>
        n.en.toLowerCase().includes(q) ||
        n.meaning.toLowerCase().includes(q) ||
        n.ar.includes(q)
    );
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col overflow-hidden"
        >
          <div className="shrink-0 flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
                ASMA UL-HUSNA · 99 NAMES
              </span>
            </div>
            <button onClick={onClose} className="h-9 w-9 grid place-items-center text-white/50 hover:text-white hover:bg-white/10 rounded-sm transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto w-full">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              <div className="relative max-w-2xl mx-auto text-center mb-12">
                <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
                  Asma ul-Husna
                </h2>
                
                {/* Telemetry bar */}
                <div className="mt-8 flex items-center gap-4 text-left">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-white/50 mb-2">
                      <span>REFLECTED · {marked.size} / {ASMAUL_HUSNA.length}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full bg-linear-to-r from-emerald-300 to-amber-200"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                  {marked.size > 0 && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setMarked(new Set())}
                      className="shrink-0 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-signal border border-white/10 px-3 py-2 hover:border-signal/50 transition-colors"
                    >
                      RESET
                    </motion.button>
                  )}
                </div>

                {/* Search */}
                <div className="mt-8 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search name, transliteration, or meaning..."
                    className="w-full bg-[#0f0f0f] border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm placeholder-white/30 focus:outline-none focus:border-emerald-300/50 transition-colors text-white"
                  />
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
                {filtered.map((name: NameOfAllah, i: number) => (
                  <NameCard
                    key={name.n}
                    name={name}
                    index={i}
                    marked={marked.has(name.n)}
                    onToggle={() => toggleMark(name.n)}
                  />
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="py-16 text-center">
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mb-2">
                    NO RESULTS
                  </div>
                  <p className="text-white/50 text-sm">Try a different search term.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NameCard({
  name,
  index,
  marked,
  onToggle,
}: {
  name: NameOfAllah;
  index: number;
  marked: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.006,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="relative group overflow-hidden border border-white/10 bg-[#111] hover:border-emerald-300/30 transition-colors cursor-default min-h-[120px] sm:min-h-[140px]"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {/* Crosshair corners */}
        <motion.div
          className="absolute top-0 left-0 w-4 h-[2px] bg-emerald-300/70 origin-left"
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute top-0 left-0 w-[2px] h-4 bg-emerald-300/70 origin-top"
          variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute top-0 right-0 w-4 h-[2px] bg-emerald-300/70 origin-right"
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute top-0 right-0 w-[2px] h-4 bg-emerald-300/70 origin-top"
          variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-4 h-[2px] bg-emerald-300/70 origin-left"
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[2px] h-4 bg-emerald-300/70 origin-bottom"
          variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-4 h-[2px] bg-emerald-300/70 origin-right"
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[2px] h-4 bg-emerald-300/70 origin-bottom"
          variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
          transition={{ duration: 0.2 }}
        />

        <div className="p-3 sm:p-4 relative z-10 h-full flex flex-col">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-white/25">
              {String(name.n).padStart(2, "0")}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="relative h-3 w-3 rounded-full border transition-colors focus:outline-none"
              style={{
                borderColor: marked
                  ? "rgba(251,191,36,0.8)"
                  : "rgba(255,255,255,0.15)",
              }}
              aria-label={marked ? "Unmark" : "Mark as reflected"}
            >
              <AnimatePresence>
                {marked && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                    className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-amber-400"
                  />
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Center */}
          <div className="flex-1 flex flex-col items-center justify-center py-2">
            <p
              className="text-lg sm:text-2xl text-white/90 leading-tight text-center"
              style={{ fontFamily: "'Amiri', serif" }}
              dir="rtl"
            >
              {name.ar}
            </p>
            <p className="mt-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 text-center">
              {name.en}
            </p>
          </div>
        </div>

        {/* Meaning overlay */}
        <motion.div
          className="absolute inset-x-0 bottom-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-emerald-300/20 p-3 z-20"
          variants={{
            rest: { y: "100%", opacity: 0 },
            hover: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-300/90 text-center leading-relaxed">
            {name.meaning}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
