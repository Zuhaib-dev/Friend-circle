"use client";

import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { FRAMES } from "@/data/home-data";
import { SectionHead, Crosshairs, FrameTile } from "./primitives";

export function GalleryMetaTile({ label, value, sub, delay }: { label: string; value: string; sub: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="hairline border-ink bg-bone p-4 flex flex-col justify-between crosshair"
    >
      <Crosshairs />
      <div className="mono-label opacity-60">{label}</div>
      <div className="display-num text-5xl md:text-6xl mt-2">{value}</div>
      <div className="mono-label mt-2">{sub}</div>
    </motion.div>
  );
}

export function GalleryDiagramTile({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="hairline border-ink bg-bone p-4 crosshair overflow-hidden"
    >
      <Crosshairs />
      <div className="mono-label mb-3 flex items-center gap-2">
        <Camera className="h-3.5 w-3.5 text-signal" />
        OPTICS / DIAGRAM
      </div>
      <svg viewBox="0 0 200 120" className="w-full h-auto">
        {/* aperture blades */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const r = (n: number) => Math.round(n * 1e4) / 1e4;
          const x1 = r(100 + Math.cos(angle) * 40);
          const y1 = r(60 + Math.sin(angle) * 40);
          const x2 = r(100 + Math.cos(angle + Math.PI / 8) * 35);
          const y2 = r(60 + Math.sin(angle + Math.PI / 8) * 35);
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="var(--ink)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: delay + i * 0.08 }}
            />
          );
        })}
        <motion.circle
          cx="100" cy="60" r="18"
          fill="none" stroke="var(--signal)" strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        />
        <motion.circle
          cx="100" cy="60" r="8"
          fill="var(--signal)"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + 0.8 }}
        />
        {/* grid */}
        <line x1="0" y1="60" x2="200" y2="60" stroke="var(--ink)" strokeWidth="0.5" opacity="0.3" />
        <line x1="100" y1="0" x2="100" y2="120" stroke="var(--ink)" strokeWidth="0.5" opacity="0.3" />
        {/* labels */}
        <text x="4" y="14" fill="var(--ink)" fontSize="7" fontFamily="var(--font-mono)">f/2.8</text>
        <text x="4" y="116" fill="var(--ink)" fontSize="7" fontFamily="var(--font-mono)">ISO 400</text>
        <text x="160" y="14" fill="var(--ink)" fontSize="7" fontFamily="var(--font-mono)">1/250</text>
        <text x="160" y="116" fill="var(--ink)" fontSize="7" fontFamily="var(--font-mono)">50mm</text>
      </svg>
    </motion.div>
  );
}

export function GallerySection() {
  return (
    <section className="px-4 md:px-8 py-16 hairline-t border-ink">
      <SectionHead code="ARC / 05" kicker="THE ARCHIVE" title="Frames from the field" sub="Sameem's ledger — every laugh, every ridge, every cup of kahwa." />

      {/* bento grid: 4 cols on desktop, auto rows */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-px hairline border-ink bg-ink">
        {FRAMES.slice(0, 3).map((f, i) => (
          <FrameTile key={f.code} f={f} index={i} />
        ))}

        {/* meta tile 1 */}
        <GalleryMetaTile label="FRAMES LOGGED" value="10,472" sub="SHUTTER / SINCE 2018" delay={0.18} />

        {FRAMES.slice(3, 6).map((f, i) => (
          <FrameTile key={f.code} f={f} index={i + 3} />
        ))}

        {/* aperture diagram tile */}
        <GalleryDiagramTile delay={0.36} />

        {FRAMES.slice(6).map((f, i) => (
          <FrameTile key={f.code} f={f} index={i + 6} />
        ))}

        {/* meta tile 2 */}
        <GalleryMetaTile label="FILM EQUIV" value="+∞" sub="ALL DIGITAL · NO FILM" delay={0.42} />
      </div>

      {/* bottom strip */}
      <div className="mt-6 hairline border-ink bg-bone px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 mono-label">
          <span className="signal-chip"><Camera className="h-3 w-3" />OPTICS / SAMEEM</span>
          <span className="hidden sm:inline opacity-60">PRIMARY BODY: SONY A7 IV · LENS: 24-70 GM II</span>
        </div>
        <div className="flex items-center gap-2 mono-label opacity-60">
          <span className="h-1.5 w-1.5 bg-signal rounded-full animate-blink" />
          ARCHIVE LIVE
        </div>
      </div>
    </section>
  );
}
