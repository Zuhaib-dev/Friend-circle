"use client";
import { motion } from "motion/react";
import { fadeUp, PanelHeader, CREW } from "./shared";

function CrewCard({ m, i }: { m: (typeof CREW)[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: i * 0.04, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="hairline border-ink bg-bone group relative overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-ink/5">
        <img
          src={`https://api.dicebear.com/9.x/glass/svg?seed=${m.callsign}`}
          alt={m.callsign}
          className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute top-1.5 left-1.5 mono-label text-bone bg-ink/80 px-1.5 py-[1px]">
          {String(i + 1).padStart(2, "0")}
        </div>
        <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-signal text-bone px-2 py-1 mono-label flex items-center justify-between">
          <span>ON ROSTER</span>
          <span className="h-1.5 w-1.5 rounded-full bg-bone animate-blink" />
        </div>
      </div>
      <div className="p-2.5 hairline-t border-ink">
        <div className="font-display text-lg leading-none">{m.callsign}</div>
        <div className="mono-label opacity-60 mt-1 truncate">{m.name}</div>
        <div className="mono-label text-signal mt-1.5 truncate">{m.rig}</div>
      </div>
    </motion.div>
  );
}

export function CrewManifest() {
  return (
    <section className="px-4 md:px-8 mt-12">
      <motion.div {...fadeUp} className="hairline border-ink bg-bone">
        <PanelHeader code="MANIFEST / 02" title="CREW · 06 OPERATORS DEPLOYED" />
        <div className="p-3 md:p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {CREW.map((m, i) => (
            <CrewCard key={m.callsign} m={m} i={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
