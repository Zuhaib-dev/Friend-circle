"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { VOICES } from "@/data/home-data";

export function VoicesSection() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % VOICES.length), 5000);
    return () => clearInterval(t);
  }, []);
  const v = VOICES[i];
  return (
    <section className="px-4 md:px-8 py-16 brick hairline-t border-ink">
      <div className="hairline-b border-bone/30 pb-4 mb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mono-label text-bone">
            <span className="signal-chip">TRX / 07</span>
            <span>INTERCEPTED COMMS</span>
          </div>
          <h2 className="display-num text-bone text-[clamp(40px,7vw,96px)] mt-2">Unfiltered<span className="text-signal">.</span></h2>
        </div>
        <div className="flex gap-2">
          {VOICES.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-2 w-8 ${idx === i ? "bg-signal" : "bg-bone/30"}`} aria-label={`Voice ${idx + 1}`} />
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="font-display italic text-bone text-3xl md:text-5xl max-w-4xl leading-tight"
        >
          "{v.q}"
          <footer className="mono-label text-bone/70 mt-6 not-italic font-sans">— {v.who} / CORE UNIT</footer>
        </motion.blockquote>
      </AnimatePresence>
    </section>
  );
}
