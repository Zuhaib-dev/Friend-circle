
"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Clock, ShieldCheck, Cpu, Signal, Image as ImageIcon } from "lucide-react";
import { Panel, Crosshairs, type Upload } from "./shared";


export function OverviewView({
  stats,
  name,
  uploads,
}: {
  stats: { total: number; pending: number; verified: number; clearance: string };
  name: string;
  uploads: Upload[];
}) {
  return (
    <>
      {/* Welcome banner */}
      <Panel code="OV / 01" title="OPERATOR ACTIVE // SECURE CONNECTION">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
          <div>
            <div className="mono-label opacity-60">WELCOME BACK</div>
            <h1 className="display-num text-4xl md:text-6xl mt-1">
              {name.split(" ")[0].toUpperCase()}<span className="text-signal">.</span>
            </h1>
            <p className="font-mono text-xs md:text-sm opacity-70 mt-3 max-w-lg">
              &gt; LINK ESTABLISHED · CHANNEL 433.92MHz · GEOSTATIONARY UPLINK NOMINAL
              <br />
              &gt; PROCEED TO DOSSIER OR INITIATE UPLINK FROM SIDEBAR.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="signal-chip"><span className="h-1.5 w-1.5 rounded-full bg-bone animate-blink" /> LIVE</span>
              <span className="hairline border-ink px-2 py-[2px] mono-label">CLR · {stats.clearance}</span>
              <span className="hairline border-ink px-2 py-[2px] mono-label">CRYPTO · OK</span>
            </div>
          </div>
          <RadarSvg />
        </div>
      </Panel>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={ImageIcon} label="TOTAL UPLOADS" code="ST/01" value={stats.total} suffix="FILES" />
        <StatCard icon={Clock} label="PENDING REVIEW" code="ST/02" value={stats.pending} suffix="QUEUE" accent />
        <StatCard icon={ShieldCheck} label="CLEARANCE LEVEL" code="ST/03" value={stats.clearance} suffix={`${stats.verified} VERIFIED`} text />
      </div>

      {/* SVG topography + recent */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
        <Panel code="OV / 02" title="TOPOGRAPHY · SECTOR K-7">
          <TopographySvg />
          <div className="mt-3 grid grid-cols-4 gap-2 mono-label">
            <span className="hairline border-ink/40 px-2 py-1 flex justify-between"><span className="opacity-60">LAT</span><span>34.08°N</span></span>
            <span className="hairline border-ink/40 px-2 py-1 flex justify-between"><span className="opacity-60">LON</span><span>74.79°E</span></span>
            <span className="hairline border-ink/40 px-2 py-1 flex justify-between"><span className="opacity-60">ELV</span><span>1585m</span></span>
            <span className="hairline border-ink/40 px-2 py-1 flex justify-between"><span className="opacity-60">WND</span><span>06 kts</span></span>
          </div>
        </Panel>

        <Panel code="OV / 03" title="RECENT TRANSMISSIONS">
          {uploads.length === 0 ? (
            <div className="font-mono text-sm opacity-60 py-10 text-center">
              &gt; NO TRANSMISSIONS LOGGED
              <br />
              <span className="opacity-50">// initiate UPLINK to begin</span>
            </div>
          ) : (
            <ul className="space-y-1.5">
              {uploads.slice(0, 5).map((u, i) => (
                <motion.li
                  key={u.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hairline border-ink/40 px-2 py-1.5 flex items-center gap-2"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${u.status === "VERIFIED" ? "bg-signal" : "bg-ink/40"}`} />
                  <span className="mono-label truncate flex-1">{u.name}</span>
                  <span className="mono-label opacity-50">{new Date(u.ts).toISOString().slice(11, 16)}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}

export function StatCard({
  icon: Icon,
  label,
  code,
  value,
  suffix,
  accent,
  text,
}: {
  icon: typeof Cpu;
  label: string;
  code: string;
  value: number | string;
  suffix: string;
  accent?: boolean;
  text?: boolean;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (typeof value !== "number") return;
    const dur = 700;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      className="crosshair hairline bg-bone p-4 relative overflow-hidden group"
    >
      <Crosshairs />
      {/* scan line */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-signal opacity-0 group-hover:opacity-100 animate-scan" />
      <div className="flex items-center justify-between">
        <span className="mono-label flex items-center gap-1.5"><Icon className="h-3 w-3 text-signal" />{label}</span>
        <span className="mono-label opacity-50">{code}</span>
      </div>
      <div className={`display-num mt-3 text-5xl md:text-6xl ${accent ? "text-signal" : ""}`}>
        {text ? value : String(n).padStart(2, "0")}
      </div>
      <div className="mt-2 flex items-center justify-between mono-label opacity-60">
        <span>{suffix}</span>
        <span className="flex items-center gap-1"><Signal className="h-3 w-3" /> OK</span>
      </div>
    </motion.div>
  );
}

export function RadarSvg() {
  return (
    <div className="relative w-[180px] h-[180px] hairline border-ink p-1 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="sweep" cx="0" cy="0.5" r="1">
            <stop offset="0%" stopColor="oklch(0.62 0.24 28)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.62 0.24 28)" stopOpacity="0" />
          </radialGradient>
          <clipPath id="radar-clip">
            <circle cx="100" cy="100" r="90" />
          </clipPath>
        </defs>
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        <g clipPath="url(#radar-clip)">
          <motion.g
            style={{ transformOrigin: "center", transformBox: "fill-box" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          >
            <rect width="200" height="200" fill="none" />
            <path d="M100,100 L190,100 A90,90 0 0,0 163,36 Z" fill="url(#sweep)" />
          </motion.g>
        </g>

        {[
          [60, 70],
          [140, 120],
          [115, 60],
        ].map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="2"
            fill="oklch(0.62 0.24 28)"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </svg>
      <span className="absolute bottom-1 right-1 mono-label opacity-60">SCN/01</span>
    </div>
  );
}

export function TopographySvg() {
  return (
    <svg viewBox="0 0 600 180" className="w-full h-44">
      {[0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75].map((a, i) => (
        <motion.path
          key={i}
          d={`M0 ${160 - i * 12} Q 80 ${140 - i * 14} 160 ${150 - i * 12} T 320 ${135 - i * 12} T 480 ${145 - i * 12} T 600 ${130 - i * 12}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity={a}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: i * 0.08, ease: "easeOut" }}
        />
      ))}
      <Crosshair color="oklch(0.62 0.24 28)" x={420} y={70} />
      <Crosshair color="oklch(0.13 0.01 60)" x={140} y={120} />
    </svg>
  );
}

export function Crosshair({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="10" fill="none" stroke={color} strokeWidth="1" />
      <circle cx={x} cy={y} r="2" fill={color} />
      <line x1={x - 16} y1={y} x2={x - 4} y2={y} stroke={color} strokeWidth="1" />
      <line x1={x + 4} y1={y} x2={x + 16} y2={y} stroke={color} strokeWidth="1" />
      <line x1={x} y1={y - 16} x2={x} y2={y - 4} stroke={color} strokeWidth="1" />
      <line x1={x} y1={y + 4} x2={x} y2={y + 16} stroke={color} strokeWidth="1" />
    </g>
  );
}

