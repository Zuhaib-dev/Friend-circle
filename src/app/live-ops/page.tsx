"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  Radio,
  MapPin,
  Mountain,
  Thermometer,
  Wind,
  Battery,
  Satellite,
  Navigation,
  AlertTriangle,
  Pause,
  Play,
  Radar,
  Crosshair,
  Signal,
  ChevronRight,
} from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { Crosshairs } from "@/components/auth-shell";

/* ------------------------------- DATA ---------------------------------- */

type Convoy = {
  id: string;
  callsign: string;
  status: "ACTIVE" | "HOLD" | "RTB";
  operators: number;
  vehicles: string[];
  start: string;
  destination: string;
  // SVG path coords (0–1000 viewBox)
  path: { x: number; y: number; label?: string; elev: number; t: string }[];
  progress: number; // 0..1 along path
  battery: number;
  temp: number;
  wind: number;
  lastBeacon: string;
};

const CONVOYS: Convoy[] = [
  {
    id: "alpha",
    callsign: "ALPHA-01",
    status: "ACTIVE",
    operators: 6,
    vehicles: ["THAR-4x4", "GYPSY", "ROYAL-ENFIELD x2"],
    start: "SRINAGAR",
    destination: "GUREZ VALLEY",
    path: [
      { x: 180, y: 640, label: "SRINAGAR", elev: 1585, t: "06:12" },
      { x: 285, y: 575, elev: 1820, t: "07:40" },
      { x: 360, y: 520, label: "BANDIPORA", elev: 1620, t: "08:55" },
      { x: 455, y: 430, elev: 2410, t: "10:22" },
      { x: 540, y: 360, label: "RAZDAN PASS", elev: 3300, t: "11:48" },
      { x: 640, y: 305, elev: 2780, t: "13:05" },
      { x: 745, y: 248, label: "DAWAR", elev: 2440, t: "14:30" },
    ],
    progress: 0.62,
    battery: 78,
    temp: 4,
    wind: 22,
    lastBeacon: "00:42 AGO",
  },
  {
    id: "bravo",
    callsign: "BRAVO-02",
    status: "HOLD",
    operators: 4,
    vehicles: ["THAR-4x4", "HIMALAYAN x2"],
    start: "PAHALGAM",
    destination: "ARU MEADOWS",
    path: [
      { x: 420, y: 760, label: "PAHALGAM", elev: 2130, t: "07:00" },
      { x: 488, y: 705, elev: 2380, t: "08:15" },
      { x: 555, y: 660, label: "ARU", elev: 2414, t: "09:30" },
      { x: 620, y: 600, elev: 2780, t: "10:55" },
      { x: 695, y: 540, label: "LIDDERWAT", elev: 2900, t: "12:40" },
    ],
    progress: 0.45,
    battery: 54,
    temp: 8,
    wind: 11,
    lastBeacon: "02:18 AGO",
  },
  {
    id: "charlie",
    callsign: "CHARLIE-03",
    status: "RTB",
    operators: 3,
    vehicles: ["GYPSY", "ROYAL-ENFIELD"],
    start: "SONMARG",
    destination: "ZOJI LA",
    path: [
      { x: 565, y: 555, label: "SONMARG", elev: 2730, t: "05:45" },
      { x: 640, y: 480, elev: 3100, t: "07:20" },
      { x: 720, y: 420, label: "ZOJI LA", elev: 3528, t: "09:10" },
      { x: 660, y: 470, elev: 3100, t: "11:00" },
      { x: 590, y: 540, elev: 2780, t: "12:15" },
    ],
    progress: 0.88,
    battery: 31,
    temp: -2,
    wind: 34,
    lastBeacon: "00:11 AGO",
  },
];

const WAYPOINTS = [
  { x: 180, y: 640, name: "SRINAGAR", code: "BASE-01", type: "BASE" },
  { x: 420, y: 760, name: "PAHALGAM", code: "FOB-02", type: "FOB" },
  { x: 565, y: 555, name: "SONMARG", code: "FOB-03", type: "FOB" },
  { x: 720, y: 420, name: "ZOJI LA", code: "PASS-04", type: "PASS" },
  { x: 540, y: 360, name: "RAZDAN", code: "PASS-05", type: "PASS" },
  { x: 745, y: 248, name: "DAWAR", code: "OBJ-06", type: "OBJ" },
];

/* ------------------------------ HELPERS -------------------------------- */

function buildPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1];
    const c = pts[i];
    const mx = (p.x + c.x) / 2;
    const my = (p.y + c.y) / 2;
    d += ` Q ${p.x} ${p.y} ${mx} ${my}`;
    if (i === pts.length - 1) d += ` T ${c.x} ${c.y}`;
  }
  return d;
}

function pointOnPath(pts: { x: number; y: number }[], t: number) {
  if (pts.length === 0) return { x: 0, y: 0 };
  const totalSegments = pts.length - 1;
  const scaled = t * totalSegments;
  const i = Math.min(Math.floor(scaled), totalSegments - 1);
  const local = scaled - i;
  const a = pts[i];
  const b = pts[i + 1];
  return { x: a.x + (b.x - a.x) * local, y: a.y + (b.y - a.y) * local };
}

function useUtc() {
  const [t, setT] = useState<string>("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT(
        `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}:${String(d.getUTCSeconds()).padStart(2, "0")}`,
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/* -------------------------------- PAGE --------------------------------- */

export default function LiveOpsPage() {
  const utc = useUtc();
  const [selectedId, setSelectedId] = useState<string>("alpha");
  const [playing, setPlaying] = useState(true);
  const [tick, setTick] = useState(0);

  // sweep & breadcrumb animation tick
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setTick((x) => x + 1), 80);
    return () => clearInterval(id);
  }, [playing]);

  const selected = useMemo(() => CONVOYS.find((c) => c.id === selectedId)!, [selectedId]);

  const totalElev = useMemo(() => {
    let gain = 0;
    for (let i = 1; i < selected.path.length; i++) {
      const d = selected.path[i].elev - selected.path[i - 1].elev;
      if (d > 0) gain += d;
    }
    return gain;
  }, [selected]);

  const currentPos = pointOnPath(selected.path, selected.progress);

  return (
    <div className="min-h-screen bg-bone text-ink">
      <TopNav />

      {/* HUD BAR */}
      <div className="hairline-b border-ink bg-ink text-bone">
        <div className="px-4 py-2 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Radio className="h-3.5 w-3.5 text-signal animate-blink" />
            <span className="mono-label text-signal">LIVE-OPS // MISSION CONTROL</span>
            <span className="mono-label opacity-50">v3.14 · ENCRYPTED</span>
          </div>
          <div className="flex items-center gap-4 mono-label">
            <span className="opacity-60">UTC</span>
            <span className="text-acid" suppressHydrationWarning>{utc}</span>
            <span className="opacity-30">·</span>
            <span className="opacity-60">SAT</span>
            <span className="flex items-center gap-1">
              <Satellite className="h-3 w-3 text-acid" />
              <span className="text-acid">14/16</span>
            </span>
            <span className="opacity-30">·</span>
            <span className="opacity-60">CONVOYS</span>
            <span className="text-signal">{CONVOYS.length} ACTIVE</span>
          </div>
        </div>
      </div>

      {/* TITLE BLOCK */}
      <section className="px-4 md:px-8 py-8 hairline-b border-ink">
        <div className="grid md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-8">
            <div className="mono-label opacity-60 mb-2">OPS / 04 · REAL-TIME EXPEDITION TRACKER</div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.92] tracking-tight">
              CONVOYS<br />ON THE WIRE.
            </h1>
            <p className="font-sans text-sm md:text-base opacity-70 mt-4 max-w-xl">
              Live telemetry from active expeditions across the Kashmir valley. Beacons every 90s.
              Elevation, temperature, and bearing piped through the field net.
            </p>
          </div>
          <div className="md:col-span-4 grid grid-cols-3 gap-2">
            <Stat k="ACTIVE" v="03" tone="signal" />
            <Stat k="OPS" v="13" />
            <Stat k="KM/24H" v="412" tone="acid" />
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="px-4 md:px-8 py-6 grid lg:grid-cols-12 gap-4">
        {/* MAP PANEL */}
        <div className="lg:col-span-8 relative hairline border-ink bg-bone">
          <PanelHeader code="// MAP-01" title="TERRAIN · KASHMIR THEATER" right={
            <button
              onClick={() => setPlaying((p) => !p)}
              className="flex items-center gap-1.5 px-2 py-0.5 hairline border-ink hover:bg-ink hover:text-bone transition-colors mono-label"
            >
              {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              {playing ? "LIVE" : "PAUSED"}
            </button>
          } />
          <div className="relative aspect-[4/3] overflow-hidden">
            <Crosshairs />
            <MapSvg
              tick={tick}
              selected={selected}
              onSelect={(id) => setSelectedId(id)}
              currentPos={currentPos}
            />
            {/* HUD overlays */}
            <div className="absolute top-3 left-3 mono-label bg-bone/90 hairline border-ink px-2 py-1 backdrop-blur">
              LAT 34.0837° N · LON 74.7973° E
            </div>
            <div className="absolute top-3 right-3 mono-label bg-bone/90 hairline border-ink px-2 py-1 backdrop-blur flex items-center gap-1.5">
              <Crosshair className="h-3 w-3 text-signal" /> ZOOM 1:250k
            </div>
            <div className="absolute bottom-3 left-3 mono-label bg-bone/90 hairline border-ink px-2 py-1 backdrop-blur">
              GRID NJ-43-07 · WGS84
            </div>
            <div className="absolute bottom-3 right-3 mono-label bg-ink/90 text-bone hairline border-ink px-2 py-1 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
              TRACKING · {selected.callsign}
            </div>
          </div>

          {/* LEGEND */}
          <div className="hairline-t border-ink px-3 py-2 grid grid-cols-2 md:grid-cols-4 gap-2 mono-label">
            <LegendDot color="signal" label="ACTIVE CONVOY" />
            <LegendDot color="acid" label="WAYPOINT" />
            <LegendDot color="ink" label="COMPLETED LEG" />
            <LegendDot color="signal" label="BEACON PING" dashed />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* CONVOY SELECTOR */}
          <div className="hairline border-ink bg-bone">
            <PanelHeader code="// FLT-02" title="ACTIVE CONVOYS" />
            <div>
              {CONVOYS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={`w-full text-left px-3 py-3 hairline-b border-ink/30 last:border-b-0 transition-colors group ${
                    selectedId === c.id ? "bg-ink text-bone" : "hover:bg-ink/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          c.status === "ACTIVE"
                            ? "bg-signal animate-blink"
                            : c.status === "HOLD"
                              ? "bg-acid"
                              : "bg-bone/40"
                        }`}
                      />
                      <span className="font-display text-base">{c.callsign}</span>
                    </div>
                    <ChevronRight className="h-3 w-3 opacity-40 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="mono-label opacity-60 mt-1 flex items-center gap-2">
                    <span>{c.start}</span>
                    <span>→</span>
                    <span>{c.destination}</span>
                  </div>
                  <div className="mt-2 h-1 w-full bg-ink/10 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-signal"
                      initial={{ width: 0 }}
                      animate={{ width: `${c.progress * 100}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between mono-label opacity-70">
                    <span>{Math.round(c.progress * 100)}% COMPLETE</span>
                    <span>{c.status}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* TELEMETRY */}
          <div className="hairline border-ink bg-bone">
            <PanelHeader
              code="// TLM-03"
              title={`${selected.callsign} · TELEMETRY`}
              right={<span className="mono-label text-signal flex items-center gap-1"><Signal className="h-3 w-3" /> {selected.lastBeacon}</span>}
            />
            <div className="grid grid-cols-2">
              <Telem icon={Mountain} label="ELEV GAIN" value={`${totalElev}m`} />
              <Telem icon={Thermometer} label="TEMP" value={`${selected.temp}°C`} tone={selected.temp < 0 ? "signal" : undefined} />
              <Telem icon={Wind} label="WIND" value={`${selected.wind} km/h`} />
              <Telem icon={Battery} label="BATTERY" value={`${selected.battery}%`} tone={selected.battery < 40 ? "signal" : undefined} />
            </div>
            <div className="hairline-t border-ink/40 p-3">
              <div className="mono-label opacity-60 mb-1.5">VEHICLES</div>
              <div className="flex flex-wrap gap-1.5">
                {selected.vehicles.map((v) => (
                  <span key={v} className="mono-label hairline border-ink px-1.5 py-0.5">{v}</span>
                ))}
              </div>
            </div>
            <div className="hairline-t border-ink/40 p-3 flex items-center justify-between mono-label">
              <span className="opacity-60">OPERATORS</span>
              <span className="font-display text-2xl text-ink">{selected.operators}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ELEVATION PROFILE */}
      <section className="px-4 md:px-8 pb-6">
        <div className="hairline border-ink bg-bone">
          <PanelHeader code="// ELV-04" title={`ELEVATION PROFILE · ${selected.callsign}`} right={
            <span className="mono-label opacity-60">GAIN +{totalElev}m</span>
          } />
          <ElevationProfile path={selected.path} progress={selected.progress} />
        </div>
      </section>

      {/* WAYPOINTS + BEACON LOG */}
      <section className="px-4 md:px-8 pb-12 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 hairline border-ink bg-bone">
          <PanelHeader code="// WPT-05" title="WAYPOINT INDEX" />
          <div className="grid grid-cols-2 md:grid-cols-3">
            {WAYPOINTS.map((w, i) => (
              <motion.div
                key={w.code}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: "easeOut" }}
                className="hairline-r hairline-b border-ink/30 p-3"
              >
                <div className="flex items-center justify-between mono-label">
                  <span className="opacity-60">{w.code}</span>
                  <span className="text-signal">{w.type}</span>
                </div>
                <div className="font-display text-xl mt-1">{w.name}</div>
                <div className="mono-label opacity-50 mt-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {(w.x / 10).toFixed(2)}E · {(w.y / 10).toFixed(2)}N
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 hairline border-ink bg-ink text-bone">
          <PanelHeader code="// LOG-06" title="BEACON TRANSMISSION LOG" dark right={
            <span className="mono-label text-acid flex items-center gap-1"><Activity className="h-3 w-3 animate-pulse" /> STREAMING</span>
          } />
          <BeaconLog selected={selected} />
        </div>
      </section>

      <footer className="hairline-t border-ink px-4 md:px-8 py-6 flex items-center justify-between mono-label">
        <span className="opacity-60">END OF FEED · FRIEND CIRCLE / KMR</span>
        <span className="flex items-center gap-2 text-signal">
          <AlertTriangle className="h-3 w-3" />
          FOR OPERATOR USE ONLY
        </span>
      </footer>
    </div>
  );
}

/* ----------------------------- SUB COMPONENTS -------------------------- */

function PanelHeader({
  code,
  title,
  right,
  dark = false,
}: {
  code: string;
  title: string;
  right?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between px-3 py-2 hairline-b ${dark ? "border-bone/30" : "border-ink"}`}>
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-acid" : "bg-signal"} animate-blink`} />
        <span className="mono-label opacity-60">{code}</span>
        <span className="mono-label">{title}</span>
      </div>
      {right}
    </div>
  );
}

function Stat({ k, v, tone }: { k: string; v: string; tone?: "signal" | "acid" }) {
  return (
    <div className="hairline border-ink p-2">
      <div className="mono-label opacity-60">{k}</div>
      <div className={`font-display text-2xl ${tone === "signal" ? "text-signal" : tone === "acid" ? "text-acid" : "text-ink"}`}>{v}</div>
    </div>
  );
}

function Telem({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Mountain;
  label: string;
  value: string;
  tone?: "signal";
}) {
  return (
    <div className="hairline-r hairline-b border-ink/30 p-3">
      <div className="mono-label opacity-60 flex items-center gap-1">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className={`font-display text-xl mt-0.5 ${tone === "signal" ? "text-signal" : ""}`}>{value}</div>
    </div>
  );
}

function LegendDot({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  const bg = color === "signal" ? "bg-signal" : color === "acid" ? "bg-acid" : "bg-ink";
  return (
    <div className="flex items-center gap-1.5 opacity-70">
      <span className={`h-2 ${dashed ? "w-4 border-t border-dashed border-ink" : `w-2 ${bg} rounded-full`}`} />
      <span>{label}</span>
    </div>
  );
}

/* ------------------------------- MAP SVG ------------------------------- */

function MapSvg({
  tick,
  selected,
  onSelect,
  currentPos,
}: {
  tick: number;
  selected: Convoy;
  onSelect: (id: string) => void;
  currentPos: { x: number; y: number };
}) {
  const sweepAngle = (tick * 4) % 360;

  return (
    <svg viewBox="0 0 1000 750" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.13 0.01 60 / 0.08)" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="ridges" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="oklch(0.13 0.01 60 / 0.04)" />
          <stop offset="100%" stopColor="oklch(0.13 0.01 60 / 0.18)" />
        </radialGradient>
        <radialGradient id="sweep" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.7 0.22 30 / 0.35)" />
          <stop offset="100%" stopColor="oklch(0.7 0.22 30 / 0)" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="1000" height="750" fill="oklch(0.96 0.01 90)" />
      <rect width="1000" height="750" fill="url(#grid)" />

      {/* Stylized ridges */}
      <g opacity="0.55">
        <path d="M 50 580 Q 200 480 350 540 T 700 460 T 980 400" fill="none" stroke="oklch(0.13 0.01 60 / 0.35)" strokeWidth="1" />
        <path d="M 50 520 Q 250 410 420 470 T 760 380 T 980 320" fill="none" stroke="oklch(0.13 0.01 60 / 0.35)" strokeWidth="1" />
        <path d="M 50 460 Q 220 330 400 400 T 720 290 T 980 230" fill="none" stroke="oklch(0.13 0.01 60 / 0.35)" strokeWidth="1" />
        <path d="M 50 400 Q 240 250 440 320 T 760 220 T 980 150" fill="none" stroke="oklch(0.13 0.01 60 / 0.35)" strokeWidth="1" />
        <path d="M 50 340 Q 260 200 460 270 T 760 150 T 980 90" fill="none" stroke="oklch(0.13 0.01 60 / 0.35)" strokeWidth="1" />
      </g>

      {/* Mountain shading */}
      <path d="M 0 750 L 0 350 Q 200 250 380 320 T 700 200 T 1000 130 L 1000 750 Z" fill="url(#ridges)" />

      {/* Rivers */}
      <path
        d="M 80 700 Q 200 640 280 590 T 480 520 T 720 470 T 940 400"
        fill="none"
        stroke="oklch(0.55 0.08 230 / 0.55)"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />

      {/* Radar sweep around selected current pos */}
      <g style={{ transform: `rotate(${sweepAngle}deg)`, transformOrigin: `${currentPos.x}px ${currentPos.y}px`, transformBox: "view-box" }}>
        <circle cx={currentPos.x} cy={currentPos.y} r="90" fill="url(#sweep)" />
        <line x1={currentPos.x} y1={currentPos.y} x2={currentPos.x + 90} y2={currentPos.y} stroke="oklch(0.7 0.22 30 / 0.7)" strokeWidth="1" />
      </g>
      <circle cx={currentPos.x} cy={currentPos.y} r="35" fill="none" stroke="oklch(0.7 0.22 30 / 0.25)" strokeDasharray="2 4" />
      <circle cx={currentPos.x} cy={currentPos.y} r="60" fill="none" stroke="oklch(0.7 0.22 30 / 0.18)" strokeDasharray="2 6" />

      {/* Waypoints */}
      {WAYPOINTS.map((w) => (
        <g key={w.code}>
          <rect x={w.x - 4} y={w.y - 4} width="8" height="8" fill="oklch(0.85 0.18 95)" stroke="oklch(0.13 0.01 60)" strokeWidth="1" />
          <text x={w.x + 10} y={w.y + 4} fontFamily="JetBrains Mono" fontSize="10" fill="oklch(0.13 0.01 60)">
            {w.name}
          </text>
        </g>
      ))}

      {/* All convoy paths (non-selected dim) */}
      {CONVOYS.map((c) => {
        const isSel = c.id === selected.id;
        const d = buildPath(c.path);
        return (
          <g key={c.id} onClick={() => onSelect(c.id)} style={{ cursor: "pointer" }}>
            {/* completed leg */}
            <path
              d={d}
              fill="none"
              stroke={isSel ? "oklch(0.7 0.22 30)" : "oklch(0.13 0.01 60 / 0.35)"}
              strokeWidth={isSel ? 2.5 : 1.5}
              strokeDasharray={isSel ? "0" : "4 4"}
              filter={isSel ? "url(#glow)" : undefined}
            />
            {/* breadcrumb dots */}
            {c.path.map((p, i) => (
              <motion.circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={isSel ? 3.5 : 2}
                fill={isSel ? "oklch(0.7 0.22 30)" : "oklch(0.13 0.01 60 / 0.5)"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              />
            ))}
            {/* current beacon for active convoy */}
            {isSel && (
              <>
                <motion.circle
                  cx={pointOnPath(c.path, c.progress).x}
                  cy={pointOnPath(c.path, c.progress).y}
                  r="12"
                  fill="none"
                  stroke="oklch(0.7 0.22 30)"
                  strokeWidth="1.5"
                  animate={{ r: [12, 22, 12], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
                <circle
                  cx={pointOnPath(c.path, c.progress).x}
                  cy={pointOnPath(c.path, c.progress).y}
                  r="5"
                  fill="oklch(0.7 0.22 30)"
                  stroke="oklch(0.96 0.01 90)"
                  strokeWidth="1.5"
                />
                <text
                  x={pointOnPath(c.path, c.progress).x + 12}
                  y={pointOnPath(c.path, c.progress).y - 8}
                  fontFamily="JetBrains Mono"
                  fontSize="10"
                  fill="oklch(0.7 0.22 30)"
                  fontWeight="600"
                >
                  {c.callsign}
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* Compass rose */}
      <g transform="translate(920, 90)" opacity="0.7">
        <circle r="32" fill="none" stroke="oklch(0.13 0.01 60)" strokeWidth="1" />
        <line x1="0" y1="-32" x2="0" y2="32" stroke="oklch(0.13 0.01 60)" strokeWidth="1" />
        <line x1="-32" y1="0" x2="32" y2="0" stroke="oklch(0.13 0.01 60)" strokeWidth="1" />
        <polygon points="0,-32 -5,-20 5,-20" fill="oklch(0.7 0.22 30)" />
        <text x="0" y="-38" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="oklch(0.13 0.01 60)">N</text>
      </g>

      {/* Scale bar */}
      <g transform="translate(40, 700)">
        <line x1="0" y1="0" x2="120" y2="0" stroke="oklch(0.13 0.01 60)" strokeWidth="1.5" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="oklch(0.13 0.01 60)" strokeWidth="1.5" />
        <line x1="60" y1="-3" x2="60" y2="3" stroke="oklch(0.13 0.01 60)" strokeWidth="1" />
        <line x1="120" y1="-4" x2="120" y2="4" stroke="oklch(0.13 0.01 60)" strokeWidth="1.5" />
        <text x="0" y="18" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.13 0.01 60)">0</text>
        <text x="120" y="18" textAnchor="end" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.13 0.01 60)">25 KM</text>
      </g>
    </svg>
  );
}

/* ------------------------ ELEVATION PROFILE ---------------------------- */

function ElevationProfile({
  path,
  progress,
}: {
  path: Convoy["path"];
  progress: number;
}) {
  const w = 1000;
  const h = 200;
  const padX = 40;
  const padY = 24;
  const elevs = path.map((p) => p.elev);
  const minE = Math.min(...elevs) - 100;
  const maxE = Math.max(...elevs) + 100;
  const pts = path.map((p, i) => ({
    x: padX + (i / (path.length - 1)) * (w - padX * 2),
    y: padY + (1 - (p.elev - minE) / (maxE - minE)) * (h - padY * 2),
    elev: p.elev,
    label: p.label,
    t: p.t,
  }));
  const area =
    `M ${pts[0].x} ${h - padY} ` +
    pts.map((p) => `L ${p.x} ${p.y}`).join(" ") +
    ` L ${pts[pts.length - 1].x} ${h - padY} Z`;
  const line = "M " + pts.map((p) => `${p.x} ${p.y}`).join(" L ");
  const cursorX = padX + progress * (w - padX * 2);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-44 block">
        {/* grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((g) => (
          <line
            key={g}
            x1={padX}
            x2={w - padX}
            y1={padY + g * (h - padY * 2)}
            y2={padY + g * (h - padY * 2)}
            stroke="oklch(0.13 0.01 60 / 0.12)"
            strokeWidth="0.5"
          />
        ))}
        <motion.path
          d={area}
          fill="oklch(0.7 0.22 30 / 0.12)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="oklch(0.7 0.22 30)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3" fill="oklch(0.13 0.01 60)" />
            {p.label && (
              <text x={p.x} y={p.y - 10} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.13 0.01 60)">
                {p.label}
              </text>
            )}
            <text x={p.x} y={h - 6} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.13 0.01 60 / 0.6)">
              {p.elev}m
            </text>
          </g>
        ))}
        {/* progress cursor */}
        <line x1={cursorX} y1={padY} x2={cursorX} y2={h - padY} stroke="oklch(0.7 0.22 30)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx={cursorX} cy={padY} r="4" fill="oklch(0.7 0.22 30)" />
      </svg>
    </div>
  );
}

/* ------------------------------ BEACON LOG ----------------------------- */

function BeaconLog({ selected }: { selected: Convoy }) {
  const pool = useMemo(
    () => [
      { msg: `BEACON RX ${selected.callsign} · ELV 2440m · SAT 14/16`, kind: "ok" as const },
      { msg: `WPT REACHED: DAWAR · OPS HOLD 4 MIN`, kind: "ok" as const },
      { msg: `TEMP DROP ${selected.temp + 2}°→${selected.temp}°C`, kind: "warn" as const },
      { msg: `BATTERY ${selected.battery + 3}% → ${selected.battery}%`, kind: "ok" as const },
      { msg: `WIND GUST ${selected.wind + 8} km/h NE`, kind: "warn" as const },
      { msg: `COMMS RELAY · ${selected.callsign} → ALPHA-01`, kind: "ok" as const },
      { msg: `RIDGE CROSSED · BEARING 067°`, kind: "ok" as const },
      { msg: `OPERATOR CHECK-IN 6/6 NOMINAL`, kind: "ok" as const },
      { msg: `SIGNAL LOCK · 14 SATS`, kind: "ok" as const },
      { msg: `HEADING ADJUST +4° NE`, kind: "ok" as const },
    ],
    [selected],
  );

  type Line = { id: number; t: string; msg: string; kind: "ok" | "warn" };
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    const now = Date.now();
    const initial = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now - i * 90_000);
      return {
        id: now - i * 90_000,
        t: `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}:${String(d.getUTCSeconds()).padStart(2, "0")}`,
        ...pool[i % pool.length],
      };
    });
    setLines(initial);
  }, [pool]);

  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      const next = pool[Math.floor(Math.random() * pool.length)];
      setLines((prev) =>
        [
          {
            id: Date.now(),
            t: `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}:${String(d.getUTCSeconds()).padStart(2, "0")}`,
            ...next,
          },
          ...prev,
        ].slice(0, 8),
      );
    }, 2800);
    return () => clearInterval(id);
  }, [pool]);

  return (
    <div className="font-mono text-[11px] leading-relaxed p-3 h-[340px] overflow-hidden">
      <AnimatePresence initial={false}>
        {lines.map((l) => (
          <motion.div
            key={l.id}
            layout
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              opacity: { duration: 0.35, ease: "easeOut" },
              y: { duration: 0.35, ease: "easeOut" },
              height: { duration: 0.35, ease: "easeOut" },
              layout: { duration: 0.35, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <div className="flex items-start gap-2 py-1 hairline-b border-bone/10">
              <span className="opacity-50 shrink-0">{l.t}</span>
              <span className={l.kind === "warn" ? "text-acid" : "text-bone"}>
                {l.kind === "warn" ? "▲" : "›"}
              </span>
              <span className="opacity-90">{l.msg}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="flex items-center gap-2 mt-2 opacity-70">
        <Radar className="h-3 w-3 text-signal animate-pulse" />
        <span>AWAITING NEXT BEACON…</span>
        <span className="ml-auto opacity-50">END_LOG</span>
      </div>
    </div>
  );
}

