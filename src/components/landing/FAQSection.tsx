"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { FAQ } from "@/data/home-data";
import { SectionHead } from "./primitives";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-4 md:px-8 py-16 hairline-t border-ink">
      <SectionHead code="FAQ / 08" kicker="DECRYPTED QUESTIONS" title="What you'll ask" sub="No PR voice. Straight answers from the bench." />
      <div className="hairline border-ink">
        {FAQ.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`${i < FAQ.length - 1 ? "hairline-b" : ""} border-ink/60`}>
              <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 px-4 py-4 hover:bg-paper transition-colors text-left">
                <div className="flex items-center gap-4">
                  <span className="mono-label">Q/{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-xl md:text-2xl">{f.q}</span>
                </div>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="h-7 w-7 hairline border-ink flex items-center justify-center">
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-4 pb-5 pl-16 text-ink/80 max-w-3xl leading-snug">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
