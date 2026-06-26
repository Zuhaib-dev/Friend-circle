"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Gauge, CircleDot, Target, Activity, Radio } from "lucide-react";
import { LOADOUT } from "@/data/home-data";
import { SectionHead, Crosshairs, Marker } from "./primitives";

export function GearIcon({ kind }: { kind: string }) {
  const stroke = "oklch(0.13 0.01 60)";
  switch (kind) {
    case "GR-01": // Jerry can
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.g animate={{ rotate: [0, -2, 0, 2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "50px 80px" }}>
            <rect x="22" y="20" width="50" height="65" fill="none" stroke={stroke} strokeWidth="2" />
            <rect x="72" y="32" width="10" height="14" fill="none" stroke={stroke} strokeWidth="2" />
            <rect x="32" y="14" width="20" height="10" fill="none" stroke={stroke} strokeWidth="2" />
            <line x1="28" y1="32" x2="66" y2="32" stroke={stroke} strokeWidth="1" />
            <line x1="28" y1="42" x2="66" y2="42" stroke={stroke} strokeWidth="1" />
            <line x1="28" y1="52" x2="66" y2="52" stroke={stroke} strokeWidth="1" />
            <text x="47" y="72" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill={stroke}>20L</text>
          </motion.g>
        </svg>
      );
    case "GR-02": // Lantern with glow
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M40 14 L60 14 L60 22 L40 22 Z" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M30 22 L70 22 L66 32 L34 32 Z" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="34" y="32" width="32" height="40" fill="none" stroke={stroke} strokeWidth="2" />
          <motion.circle cx="50" cy="52" r="9" fill="oklch(0.88 0.2 110)"
            animate={{ opacity: [0.4, 1, 0.6, 1, 0.5], scale: [1, 1.08, 0.96, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
          <motion.path d="M46 52 Q50 44 54 52 Q52 56 50 56 Q48 56 46 52 Z" fill="oklch(0.62 0.24 28)"
            animate={{ scaleY: [1, 0.85, 1.1, 0.95, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }} style={{ transformOrigin: "50px 52px" }} />
          <path d="M30 72 L70 72 L66 82 L34 82 Z" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="14" stroke={stroke} strokeWidth="2" />
        </svg>
      );
    case "GR-03": // Samovar with steam
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {[0, 1, 2].map((i) => (
            <motion.path key={i} d={`M${44 + i * 6} 28 Q${42 + i * 6} 20 ${46 + i * 6} 14 Q${50 + i * 6} 8 ${44 + i * 6} 2`}
              fill="none" stroke={stroke} strokeWidth="1.2" strokeLinecap="round"
              animate={{ opacity: [0, 0.7, 0], y: [-2, -10, -16] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }} />
          ))}
          <ellipse cx="50" cy="34" rx="20" ry="6" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M30 34 Q28 60 50 70 Q72 60 70 34 Z" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M70 46 Q82 50 76 60" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="42" y="70" width="16" height="6" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="36" y="76" width="28" height="6" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="40" y1="50" x2="60" y2="50" stroke={stroke} strokeWidth="1" />
        </svg>
      );
    case "GR-04": // Knife
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.g animate={{ rotate: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "50px 50px" }}>
            <path d="M14 58 L70 42 L82 50 L70 58 Z" fill="none" stroke={stroke} strokeWidth="2" />
            <line x1="22" y1="56" x2="66" y2="46" stroke={stroke} strokeWidth="0.8" />
            <rect x="70" y="50" width="18" height="10" fill="none" stroke={stroke} strokeWidth="2" />
            <line x1="74" y1="52" x2="74" y2="58" stroke={stroke} strokeWidth="1" />
            <line x1="78" y1="52" x2="78" y2="58" stroke={stroke} strokeWidth="1" />
            <line x1="82" y1="52" x2="82" y2="58" stroke={stroke} strokeWidth="1" />
          </motion.g>
        </svg>
      );
    case "GR-05": // Compass spinning needle
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="52" r="32" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="50" cy="52" r="26" fill="none" stroke={stroke} strokeWidth="1" />
          {["N", "E", "S", "W"].map((c, i) => (
            <text key={c} x={50 + Math.sin((i * Math.PI) / 2) * 22} y={52 - Math.cos((i * Math.PI) / 2) * 22 + 3}
              textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill={stroke}>{c}</text>
          ))}
          <motion.g animate={{ rotate: [0, 360] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "50px 52px" }}>
            <path d="M50 28 L54 52 L50 76 L46 52 Z" fill="oklch(0.62 0.24 28)" stroke={stroke} strokeWidth="1" />
          </motion.g>
          <circle cx="50" cy="52" r="2" fill={stroke} />
          <rect x="38" y="14" width="24" height="6" fill="none" stroke={stroke} strokeWidth="2" />
        </svg>
      );
    case "GR-06": // Cassette spinning reels
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="14" y="28" width="72" height="44" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="20" y="34" width="60" height="14" fill="none" stroke={stroke} strokeWidth="1" />
          <line x1="22" y1="40" x2="78" y2="40" stroke={stroke} strokeWidth="0.6" />
          {[32, 68].map((cx) => (
            <motion.g key={cx} animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: `${cx}px 60px` }}>
              <circle cx={cx} cy="60" r="7" fill="none" stroke={stroke} strokeWidth="2" />
              <line x1={cx - 7} y1="60" x2={cx + 7} y2="60" stroke={stroke} strokeWidth="1.5" />
              <line x1={cx} y1="53" x2={cx} y2="67" stroke={stroke} strokeWidth="1.5" />
            </motion.g>
          ))}
          <line x1="14" y1="72" x2="86" y2="72" stroke={stroke} strokeWidth="1" />
          <text x="50" y="82" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill={stroke}>C90 · SIDE A</text>
        </svg>
      );
    default:
      return null;
  }
}

export function WeightCounter({ target }: { target: number }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const dur = 1200;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setV(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{v.toFixed(1)}</span>;
}

export function LoadoutSection() {
  const total = LOADOUT.reduce((a, b) => a + b.weight, 0);
  const [armed, setArmed] = useState(false);
  return (
    <section id="loadout" className="px-4 md:px-8 py-20 hairline-t border-ink bg-bone relative overflow-hidden">
      <SectionHead code="GEAR / 08" kicker="LOADOUT MANIFEST" title="What rides in the boot" sub="Six items. No more, no less. Pre-flight check before every dispatch." />

      {/* Top status bar */}
      <div className="hairline border-ink crosshair p-3 mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Crosshairs />
        <div className="mono-label flex items-center gap-2"><Gauge className="h-3.5 w-3.5 text-signal" />MANIFEST / V2.6</div>
        <div className="mono-label flex items-center gap-2"><CircleDot className="h-3.5 w-3.5 text-signal animate-blink" />6 / 6 UNITS</div>
        <div className="mono-label flex items-center gap-2"><Target className="h-3.5 w-3.5" />PAYLOAD <Marker>{total.toFixed(1)} KG</Marker></div>
        <button
          onClick={() => setArmed((s) => !s)}
          className={`mono-label hairline border-ink px-2 py-1 transition-colors ${armed ? "brick text-bone" : "bg-bone text-ink hover:bg-ink hover:text-bone"}`}
        >
          {armed ? "● ARMED · DISPATCH" : "○ ARM CONVOY"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Gear grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0 hairline border-ink">
          {LOADOUT.map((item, i) => (
            <motion.article
              key={item.code}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              whileHover="hover"
              className="group relative bg-bone p-4 hairline-b hairline-r border-ink last:hairline-r-0"
            >
              {/* sweeping scan line on hover */}
              <motion.span
                variants={{ hover: { y: ["-100%", "200%"] } }}
                transition={{ duration: 1.2, ease: "linear" }}
                className="pointer-events-none absolute inset-x-0 h-px bg-signal/70"
                style={{ top: 0 }}
              />
              <header className="flex items-center justify-between mb-2">
                <span className="signal-chip">{item.code}</span>
                <span className="mono-label flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${item.status === "PLAYING" ? "bg-signal animate-blink" : "bg-ink"}`} />
                  {item.status}
                </span>
              </header>

              <motion.div
                variants={{ hover: { scale: 1.06, rotate: -1 } }}
                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                className="aspect-square w-full bg-bone hairline border-ink crosshair p-3 overflow-hidden"
              >
                <Crosshairs />
                {/* grid backdrop */}
                <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden>
                  <defs>
                    <pattern id={`g-${item.code}`} width="8" height="8" patternUnits="userSpaceOnUse">
                      <path d="M8 0H0V8" fill="none" stroke="oklch(0.13 0.01 60)" strokeWidth="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#g-${item.code})`} />
                </svg>
                <div className="relative w-full h-full">
                  <GearIcon kind={item.code} />
                </div>
                {/* dimension ticks */}
                <span className="absolute top-1 left-1 mono-label opacity-50">0</span>
                <span className="absolute bottom-1 right-1 mono-label opacity-50">100</span>
              </motion.div>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <div className="font-display font-black text-xl leading-none tracking-tighter">{item.name}<span className="text-signal">.</span></div>
                  <div className="mono-label opacity-70 mt-1">{item.spec}</div>
                </div>
                <div className="text-right">
                  <div className="display-num text-3xl leading-none"><WeightCounter target={item.weight} /></div>
                  <div className="mono-label opacity-60">KG</div>
                </div>
              </div>

              <footer className="mt-3 hairline-t border-ink pt-2 flex items-center justify-between mono-label">
                <span className="opacity-70">OWNER</span>
                <span className="brick text-bone px-1.5 py-px">{item.owner}</span>
              </footer>
            </motion.article>
          ))}
        </div>

        {/* Side: checklist + radar */}
        <aside className="space-y-6">
          <div className="hairline border-ink crosshair bg-bone">
            <Crosshairs />
            <header className="hairline-b border-ink flex items-center justify-between px-3 py-2">
              <span className="mono-label">CHK / PRE-FLIGHT</span>
              <span className="mono-label flex items-center gap-1.5 text-signal"><Activity className="h-3.5 w-3.5" />RUNNING</span>
            </header>
            <ul className="p-3 space-y-2">
              {[
                "Tyre pressure 32psi",
                "Fuel reserve > 1/2",
                "First-aid kit sealed",
                "Wazwan invitation declined",
                "Power bank @ 100%",
                "Asr prayer scheduled",
              ].map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
                  className="flex items-center gap-3 mono-label text-[11px]"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 300, damping: 18 }}
                    className="h-3 w-3 hairline border-ink bg-signal grid place-items-center"
                  >
                    <span className="block h-1 w-1.5 border-b-2 border-r-2 border-bone -rotate-45 -translate-y-px" />
                  </motion.span>
                  <span className="flex-1 hairline-b border-ink/30 pb-1">{line}</span>
                  <span className="opacity-60">OK</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Radar */}
          <div className="hairline border-ink crosshair bg-bone p-4">
            <Crosshairs />
            <div className="mono-label flex items-center justify-between mb-3">
              <span>RDR / PROXIMITY</span>
              <span className="flex items-center gap-1.5 text-signal"><Radio className="h-3.5 w-3.5" />SWEEP</span>
            </div>
            <div className="relative aspect-square">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {[40, 70, 100].map((r) => (
                  <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="oklch(0.13 0.01 60)" strokeWidth="1" strokeDasharray="2 4" />
                ))}
                <line x1="0" y1="100" x2="200" y2="100" stroke="oklch(0.13 0.01 60)" strokeWidth="0.6" />
                <line x1="100" y1="0" x2="100" y2="200" stroke="oklch(0.13 0.01 60)" strokeWidth="0.6" />
                {/* sweep */}
                <motion.g animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "100px 100px", transformBox: "view-box" }}>
                  <circle cx="100" cy="100" r="100" fill="none" stroke="none" />
                  <defs>
                    <linearGradient id="sweep" x1="0" x2="1">
                      <stop offset="0" stopColor="oklch(0.62 0.24 28)" stopOpacity="0.6" />
                      <stop offset="1" stopColor="oklch(0.62 0.24 28)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M100 100 L100 0 A100 100 0 0 1 200 100 Z" fill="url(#sweep)" />
                </motion.g>
                {/* contacts */}
                {[{ x: 70, y: 60, l: "AQIB" }, { x: 140, y: 80, l: "SAHIL" }, { x: 110, y: 150, l: "FRQN" }, { x: 60, y: 130, l: "SMEM" }].map((c, i) => (
                  <g key={c.l}>
                    <motion.circle cx={c.x} cy={c.y} r="3" fill="oklch(0.62 0.24 28)"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }} />
                    <text x={c.x + 6} y={c.y + 3} fontFamily="JetBrains Mono" fontSize="7" fill="oklch(0.13 0.01 60)">{c.l}</text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="mono-label flex justify-between mt-2 opacity-70">
              <span>RANGE 12 KM</span>
              <span>4 CONTACTS</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom totals bar */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 hairline border-ink">
        {[
          { l: "TOTAL UNITS", v: "06", s: "PACKED" },
          { l: "TOTAL MASS", v: `${total.toFixed(1)}`, s: "KG" },
          { l: "CONVOY", v: "02", s: "VEHICLES" },
          { l: "ETA HAIJEN", v: "04:12", s: "HH:MM" },
        ].map((t, i) => (
          <motion.div
            key={t.l}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            className={`p-4 ${i < 3 ? "hairline-r border-ink" : ""}`}
          >
            <div className="mono-label">{t.l}</div>
            <div className="display-num text-4xl md:text-5xl mt-1">{t.v}</div>
            <div className="mono-label opacity-60">{t.s}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
