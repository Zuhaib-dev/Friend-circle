"use client";
import { motion } from "motion/react";
import { Navigation, MapPin, Clock, Flag, TrendingUp } from "lucide-react";
import { Crosshairs } from "@/components/crosshairs";
import { fadeUp, PanelHeader } from "./shared";

const WAYPOINTS = [
  { id: "WP-01", name: "LAL CHOWK", t: "04:30", km: 0, elev: 1585, x: 60, y: 240 },
  { id: "WP-02", name: "PAMPORE", t: "05:12", km: 18, elev: 1610, x: 140, y: 220 },
  { id: "WP-03", name: "AVANTIPORA", t: "06:05", km: 42, elev: 1640, x: 230, y: 235 },
  { id: "WP-04", name: "BIJBEHARA", t: "07:18", km: 78, elev: 1675, x: 340, y: 210 },
  { id: "WP-05", name: "ANANTNAG", t: "08:02", km: 95, elev: 1720, x: 430, y: 180 },
  { id: "WP-06", name: "PAHALGAM", t: "09:12", km: 142, elev: 2130, x: 560, y: 130 },
  { id: "WP-07", name: "ARU VALLEY", t: "11:40", km: 168, elev: 2414, x: 660, y: 90 },
  { id: "WP-08", name: "SNOW PATCH", t: "13:55", km: 188, elev: 2740, x: 740, y: 55 },
];

const ROUTE_PATH =
  "M 60 240 Q 110 215 140 220 T 230 235 Q 285 245 340 210 T 430 180 Q 495 155 560 130 T 660 90 Q 710 70 740 55";

export function RouteTraceSection() {
  return (
    <section className="px-4 md:px-8 mt-12">
      <motion.div {...fadeUp} className="crosshair hairline border-ink bg-bone relative">
        <Crosshairs />
        <PanelHeader
          code="TRACE / 08"
          title="CONVOY ROUTE · 08 WAYPOINTS · 188 KM"
          right={
            <span className="flex items-center gap-1.5 mono-label">
              <Navigation className="h-3 w-3 text-signal" />
              <span className="text-signal">PLOTTED</span>
            </span>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          <div className="lg:col-span-3 hairline-b lg:hairline-b-0 lg:hairline-r border-ink relative bg-ink overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(to right, oklch(0.955 0.012 85 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.955 0.012 85 / 0.12) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 4.5, ease: "linear", repeat: Infinity }}
              className="absolute inset-y-0 w-1/3 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.62 0.24 28 / 0.18), transparent)",
              }}
            />

            <div className="relative p-3 md:p-4">
              <div className="flex items-center justify-between mono-label text-bone/70 mb-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-signal" /> SECTOR / KMR-S
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
                  <span className="text-signal">TRACKING</span>
                </span>
              </div>

              <svg viewBox="0 0 800 300" className="w-full h-auto">
                <defs>
                  <linearGradient id="routeGrad" x1="0" x2="1">
                    <stop offset="0%" stopColor="oklch(0.88 0.2 110)" />
                    <stop offset="100%" stopColor="oklch(0.62 0.24 28)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {[0, 1, 2, 3].map((i) => (
                  <path
                    key={i}
                    d={`M 0 ${80 + i * 50} Q 200 ${60 + i * 50} 400 ${90 + i * 50} T 800 ${70 + i * 50}`}
                    stroke="oklch(0.955 0.012 85 / 0.08)"
                    strokeWidth="1"
                    fill="none"
                  />
                ))}

                <path
                  d={ROUTE_PATH}
                  stroke="oklch(0.955 0.012 85 / 0.18)"
                  strokeWidth="2"
                  strokeDasharray="3 5"
                  fill="none"
                />

                <motion.path
                  d={ROUTE_PATH}
                  stroke="url(#routeGrad)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 2.4, ease: "easeInOut" }}
                />

                {WAYPOINTS.map((w, i) => (
                  <motion.g
                    key={w.id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.18, ease: "backOut" }}
                  >
                    <motion.circle
                      cx={w.x}
                      cy={w.y}
                      r="6"
                      fill="none"
                      stroke="oklch(0.62 0.24 28)"
                      strokeWidth="1.5"
                      animate={{ r: [6, 16], opacity: [0.8, 0] }}
                      transition={{
                        duration: 2,
                        delay: 0.4 + i * 0.18,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    <line
                      x1={w.x - 8}
                      y1={w.y}
                      x2={w.x + 8}
                      y2={w.y}
                      stroke="oklch(0.955 0.012 85)"
                      strokeWidth="1"
                    />
                    <line
                      x1={w.x}
                      y1={w.y - 8}
                      x2={w.x}
                      y2={w.y + 8}
                      stroke="oklch(0.955 0.012 85)"
                      strokeWidth="1"
                    />
                    <circle
                      cx={w.x}
                      cy={w.y}
                      r="3.5"
                      fill={
                        i === 0 || i === WAYPOINTS.length - 1
                          ? "oklch(0.62 0.24 28)"
                          : "oklch(0.88 0.2 110)"
                      }
                      stroke="oklch(0.13 0.01 60)"
                      strokeWidth="1"
                    />
                    <text
                      x={w.x + 10}
                      y={w.y - 10}
                      fill="oklch(0.955 0.012 85)"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                      letterSpacing="0.15em"
                    >
                      {w.id}
                    </text>
                    <text
                      x={w.x + 10}
                      y={w.y + 2}
                      fill="oklch(0.88 0.2 110)"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                      letterSpacing="0.1em"
                    >
                      {w.name}
                    </text>
                  </motion.g>
                ))}

                <motion.circle
                  r="5"
                  fill="oklch(0.62 0.24 28)"
                  stroke="oklch(0.955 0.012 85)"
                  strokeWidth="1.5"
                  filter="url(#glow)"
                  initial={{ offsetDistance: "0%" }}
                  whileInView={{ offsetDistance: "100%" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 4, ease: "easeInOut", delay: 0.3 }}
                  style={{
                    offsetPath: `path("${ROUTE_PATH}")`,
                  }}
                />

                <g>
                  <rect x={42} y={252} width={36} height={12} fill="oklch(0.62 0.24 28)" />
                  <text
                    x={60}
                    y={261}
                    textAnchor="middle"
                    fill="oklch(0.955 0.012 85)"
                    fontSize="8"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="0.18em"
                  >
                    START
                  </text>
                  <rect x={722} y={30} width={36} height={12} fill="oklch(0.88 0.2 110)" />
                  <text
                    x={740}
                    y={39}
                    textAnchor="middle"
                    fill="oklch(0.13 0.01 60)"
                    fontSize="8"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="0.18em"
                  >
                    SUMMIT
                  </text>
                </g>
              </svg>

              <div className="mt-2 grid grid-cols-3 gap-2 text-bone">
                {[
                  { l: "DEPLOYED", v: "04:30 UTC", I: Clock },
                  { l: "RECOVERED", v: "22:52 UTC", I: Flag },
                  { l: "PEAK ELEV", v: "2,740 M", I: TrendingUp },
                ].map((c) => (
                  <div key={c.l} className="hairline border-bone/30 px-2 py-1.5">
                    <div className="mono-label text-bone/60 flex items-center gap-1.5">
                      <c.I className="h-3 w-3 text-signal" />
                      {c.l}
                    </div>
                    <div className="font-mono text-xs md:text-sm text-acid mt-0.5">{c.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <div className="hairline-b border-ink p-3 md:p-4">
              <div className="flex items-center justify-between mono-label opacity-60 mb-2">
                <span>ELEVATION PROFILE</span>
                <span>1585 → 2740 M</span>
              </div>
              <div className="flex items-end gap-1 h-20">
                {WAYPOINTS.map((w, i) => {
                  const pct = ((w.elev - 1500) / (2800 - 1500)) * 100;
                  return (
                    <motion.div
                      key={w.id}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                      className="flex-1 bg-ink relative group cursor-pointer"
                      title={`${w.name} · ${w.elev}m`}
                    >
                      <span className="absolute inset-x-0 -top-4 mono-label text-[8px] text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {w.elev}
                      </span>
                      <span className="absolute inset-x-0 top-0 h-[2px] bg-signal" />
                    </motion.div>
                  );
                })}
              </div>
              <div className="hairline-t border-ink/30 mt-1 pt-1 flex justify-between mono-label opacity-50 text-[9px]">
                <span>WP-01</span>
                <span>WP-08</span>
              </div>
            </div>

            <div className="flex-1 p-3 md:p-4 overflow-hidden">
              <div className="mono-label opacity-60 mb-2">WAYPOINT LOG</div>
              <ol className="relative">
                <span className="absolute left-[7px] top-1 bottom-1 w-px bg-ink/30" />
                {WAYPOINTS.map((w, i) => (
                  <motion.li
                    key={w.id}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    className="relative pl-6 py-1.5 flex items-center justify-between group hover:bg-acid/30 transition-colors px-1"
                  >
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 h-[15px] w-[15px] hairline border-ink ${
                        i === 0 || i === WAYPOINTS.length - 1 ? "bg-signal" : "bg-acid"
                      } flex items-center justify-center mono-label text-[8px] text-ink`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-xs md:text-sm truncate">{w.name}</div>
                      <div className="mono-label opacity-50">
                        {w.id} · {w.km} KM
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <div className="font-mono text-xs text-signal">{w.t}</div>
                      <div className="mono-label opacity-50">{w.elev}M</div>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
