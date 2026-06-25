
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Panel, fmtAgo, type LogEntry } from "./shared";


export function OverviewView({
  stats,
  logs,
  mounted,
}: {
  stats: { operators: number; pendingOps: number; intel: number; pendingIntel: number };
  logs: LogEntry[];
  mounted: boolean;
}) {
  return (
    <>
      <Panel code="CMD / 01" title="COMMAND OVERVIEW">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="OPERATORS" value={stats.operators} suffix="ACTIVE" mounted={mounted} />
          <StatCard label="OPS QUEUE" value={stats.pendingOps} suffix="PENDING" mounted={mounted} signal />
          <StatCard label="INTEL FILES" value={stats.intel} suffix="ARCHIVED" mounted={mounted} />
          <StatCard label="INTEL QUEUE" value={stats.pendingIntel} suffix="REVIEW" mounted={mounted} signal />
        </div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
        <Panel code="CMD / 02" title="GLOBAL SWEEP" right={<span className="mono-label text-signal">SCANNING</span>}>
          <GlobalRadar />
        </Panel>

        <Panel code="CMD / 03" title="ACTIVITY FEED" right={<span className="mono-label text-signal">REALTIME</span>}>
          <div className="font-mono text-[11px] space-y-1.5 max-h-[340px] overflow-auto pr-1">
            <AnimatePresence initial={false}>
              {logs.map((l) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hairline-b border-ink/20 pb-1.5 flex items-start gap-2"
                >
                  <span
                    className={`mt-1 h-1.5 w-1.5 shrink-0 ${
                      l.kind === "ok" ? "bg-signal" : l.kind === "warn" ? "bg-acid" : "bg-ink/40"
                    }`}
                  />
                  <span className="opacity-50 shrink-0">[{fmtAgo(l.ts)}]</span>
                  <span className="truncate">{l.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Panel>
      </div>
    </>
  );
}

export function StatCard({
  label,
  value,
  suffix,
  signal,
  mounted,
}: {
  label: string;
  value: number;
  suffix: string;
  signal?: boolean;
  mounted: boolean;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!mounted) return;
    let raf = 0;
    const start = performance.now();
    const dur = 900;
    const from = 0;
    const to = value;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [mounted, value]);

  return (
    <div className="hairline border-ink/60 relative overflow-hidden group">
      <motion.span
        className="absolute inset-x-0 top-0 h-px bg-signal"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{ transformOrigin: "left" }}
      />
      <div className="px-3 py-2 hairline-b border-ink/30 flex items-center justify-between">
        <span className="mono-label opacity-70">{label}</span>
        <span className={`mono-label ${signal ? "text-signal" : "opacity-50"}`}>{suffix}</span>
      </div>
      <div className="p-3">
        <div className="display-num text-5xl md:text-6xl tabular-nums" suppressHydrationWarning>
          {n.toString().padStart(2, "0")}
        </div>
        <div className="mt-2 h-1 w-full tick opacity-50" />
      </div>
    </div>
  );
}

// ---------- Radar SVG ----------
export function GlobalRadar() {
  return (
    <div className="relative mx-auto w-full max-w-[420px] aspect-square">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="adminSweep" cx="100" cy="100" r="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="oklch(0.62 0.24 28)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.62 0.24 28)" stopOpacity="0" />
          </radialGradient>
          <clipPath id="adminDial">
            <circle cx="100" cy="100" r="95" />
          </clipPath>
        </defs>

        {/* Rings */}
        {[20, 40, 60, 80, 95].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.5" />
        ))}
        {/* Cross */}
        <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.5" />
        <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.5" />

        {/* Abstract continents */}
        <g stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.6" fill="none">
          <path d="M 40 75 Q 55 65 70 72 T 95 80 Q 100 90 88 95 L 70 92 Q 55 90 48 85 Z" />
          <path d="M 110 60 Q 130 55 145 65 Q 155 80 148 92 L 130 95 Q 118 88 112 78 Z" />
          <path d="M 60 115 Q 80 110 100 118 Q 120 122 138 115 L 145 135 Q 120 145 95 142 Q 75 138 60 130 Z" />
          <path d="M 80 150 Q 100 155 120 152 L 125 165 Q 100 170 75 165 Z" />
        </g>

        {/* Sweep */}
        <g clipPath="url(#adminDial)">
          <motion.g
            style={{ transformOrigin: "100px 100px", transformBox: "view-box" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          >
            {/* invisible full-circle anchor so bbox is centered on (100,100) */}
            <circle cx="100" cy="100" r="95" fill="none" stroke="none" />
            <path d="M 100 100 L 100 5 A 95 95 0 0 1 195 100 Z" fill="url(#adminSweep)" />
          </motion.g>
        </g>

        {/* Contacts */}
        {[
          { x: 78, y: 82, d: 0 },
          { x: 132, y: 78, d: 0.4 },
          { x: 120, y: 130, d: 0.8 },
          { x: 70, y: 140, d: 1.2 },
        ].map((c, i) => (
          <g key={i}>
            <motion.circle
              cx={c.x}
              cy={c.y}
              r="2"
              fill="oklch(0.62 0.24 28)"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: c.d }}
            />
            <motion.circle
              cx={c.x}
              cy={c.y}
              r="2"
              fill="none"
              stroke="oklch(0.62 0.24 28)"
              animate={{ r: [2, 10], opacity: [0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: c.d }}
            />
          </g>
        ))}

        {/* Center */}
        <circle cx="100" cy="100" r="2.5" fill="currentColor" />
      </svg>

      <div className="absolute top-2 left-2 mono-label opacity-60">N 34.08°</div>
      <div className="absolute top-2 right-2 mono-label opacity-60">E 74.79°</div>
      <div className="absolute bottom-2 left-2 mono-label text-signal">CONTACTS · 04</div>
      <div className="absolute bottom-2 right-2 mono-label opacity-60">RNG 95KM</div>
    </div>
  );
}

