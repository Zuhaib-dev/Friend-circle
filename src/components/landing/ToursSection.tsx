"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { TOURS } from "@/data/home-data";
import { SectionHead } from "./primitives";

export function ToursSection() {
  return (
    <section id="tours" className="px-4 md:px-8 py-16 hairline-t border-ink">
      <SectionHead code="OPS / 03" kicker="FIELD ROUTES" title="The ridge ledger" sub="Logged tours, with weight, weather, and warnings — pick your line." />

      <div className="grid grid-cols-12 gap-0 hairline border-ink">
        {TOURS.map((t, i) => {
          const featured = i === 0;
          return (
            <motion.article
              key={t.code}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              className={`${featured ? "col-span-12 lg:col-span-8 lg:row-span-2" : "col-span-12 sm:col-span-6 lg:col-span-4"} hairline-b lg:hairline-r border-ink/50 relative bg-bone group overflow-hidden`}
            >
              <div className={`relative overflow-hidden ${featured ? "aspect-video" : "aspect-4/3"}`}>
                <Image src={t.img} alt={t.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-bone/10 mix-blend-multiply" />
                <div className="absolute top-2 left-2 right-2 flex justify-between mono-label text-bone mix-blend-difference">
                  <span>{t.code}</span>
                  <span className="signal-chip">{t.diff}</span>
                </div>
                {featured && (
                  <div className="absolute bottom-3 left-3 right-3 mono-label text-bone mix-blend-difference flex justify-between">
                    <span>FEATURED / TOP TIER</span>
                    <span>{t.region.toUpperCase()}</span>
                  </div>
                )}
              </div>
              <div className="p-4 hairline-t border-ink/50">
                <div className="flex items-baseline justify-between">
                  <h3 className={`display-num ${featured ? "text-5xl md:text-6xl" : "text-3xl"}`}>{t.name}<span className="text-signal">.</span></h3>
                  <span className="mono-label">{t.region.toUpperCase()}</span>
                </div>
                <p className="font-display italic text-ink/70 mt-1">{t.note}</p>
                <div className="grid grid-cols-3 mt-3 hairline-t border-ink/40 pt-2">
                  <div><div className="mono-label opacity-60">DIST</div><div className="display-num text-2xl">{t.km}<span className="text-xs ml-1 font-mono">KM</span></div></div>
                  <div><div className="mono-label opacity-60">TIME</div><div className="display-num text-2xl">{t.hours}<span className="text-xs ml-1 font-mono">H</span></div></div>
                  <div><div className="mono-label opacity-60">GRADE</div><div className="display-num text-2xl">{t.diff}</div></div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
