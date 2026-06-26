"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Mountain, Radio, Activity } from "lucide-react";
import { TRANSMISSIONS } from "@/data/home-data";
import { SectionHead, Crosshairs } from "./primitives";

export function Waveform() {
  const bars = 36;
  return (
    <div className="flex items-end gap-[3px] h-16 w-full">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="flex-1 bg-ink"
          initial={{ scaleY: 0.2 }}
          animate={{ scaleY: [0.2, 0.95, 0.45, 0.8, 0.3] }}
          transition={{
            duration: 1.6 + (i % 5) * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i * 0.04) % 1.2,
          }}
          style={{ transformOrigin: "bottom", height: "100%" }}
        />
      ))}
    </div>
  );
}

export function CompassDial() {
  return (
    <div className="relative aspect-square w-full max-w-[260px] mx-auto">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink" />
        <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink/40" strokeDasharray="2 4" />
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i * 6 * Math.PI) / 180;
          const r1 = i % 5 === 0 ? 82 : 87;
          const r = (n: number) => Math.round(n * 1e4) / 1e4;
          const x1 = r(100 + Math.cos(a) * r1);
          const y1 = r(100 + Math.sin(a) * r1);
          const x2 = r(100 + Math.cos(a) * 92);
          const y2 = r(100 + Math.sin(a) * 92);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" className="text-ink" />;
        })}
        {["N", "E", "S", "W"].map((d, i) => {
          const a = (i * 90 - 90) * (Math.PI / 180);
          const x = 100 + Math.cos(a) * 60;
          const y = 100 + Math.sin(a) * 60 + 4;
          return (
            <text key={d} x={x} y={y} textAnchor="middle" className="fill-ink" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.22em" }}>{d}</text>
          );
        })}
      </svg>
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [0, 18, -8, 24, 14] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 50%" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon points="100,18 106,100 100,108 94,100" className="fill-signal" />
          <polygon points="100,182 106,100 100,92 94,100" className="fill-ink" />
          <circle cx="100" cy="100" r="5" className="fill-bone stroke-ink" strokeWidth="1.5" />
        </svg>
      </motion.div>
      <div className="absolute inset-x-0 -bottom-6 text-center mono-label">HEADING / 014°NE</div>
    </div>
  );
}

export function ElevationProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.2"] });
  const pathLen = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // 24 sample points; deterministic, ridge-shaped
  const pts = useMemo(() => {
    const xs = Array.from({ length: 24 }, (_, i) => i);
    const ys = xs.map((i) => {
      const a = Math.sin(i * 0.55) * 18;
      const b = Math.cos(i * 0.31) * 10;
      const ridge = -Math.abs(i - 12) * 2.2 + 28;
      return 70 - (a + b + ridge);
    });
    const r2 = (n: number) => Math.round(n * 100) / 100;
    return xs.map((x, i) => `${r2((x / 23) * 380 + 10)},${r2(ys[i] + 10)}`).join(" ");
  }, []);
  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 400 100" className="w-full h-32">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="100" stroke="currentColor" strokeWidth="0.5" className="text-ink/15" />
        ))}
        <polyline points={`10,90 ${pts} 390,90`} className="fill-signal/10 stroke-signal/30" strokeWidth="1" />
        <motion.polyline
          points={pts}
          fill="none"
          className="stroke-ink"
          strokeWidth="1.6"
          style={{ pathLength: pathLen }}
        />
        <motion.circle r="3" className="fill-signal" style={{ offsetPath: `path("M ${pts}")` as unknown as string }}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <div className="flex justify-between mono-label opacity-60 mt-1">
        <span>0 KM · 1580m</span>
        <span>HAIJEN · 3340m</span>
        <span>47 KM · 2110m</span>
      </div>
    </div>
  );
}

export function TransmissionLog() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const msg = TRANSMISSIONS[idx].msg;
  useEffect(() => {
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(msg.slice(0, i));
      if (i >= msg.length) {
        clearInterval(id);
        const hold = setTimeout(() => setIdx((p) => (p + 1) % TRANSMISSIONS.length), 1800);
        return () => clearTimeout(hold);
      }
    }, 22);
    return () => clearInterval(id);
  }, [idx, msg]);
  const cur = TRANSMISSIONS[idx];
  return (
    <div className="hairline border-ink/60 bg-bone p-3 min-h-[160px] relative overflow-hidden">
      <div className="flex items-center justify-between mono-label">
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-signal animate-blink" /> CH 7 · OPEN</span>
        <span className="opacity-60">PKT {String(idx + 1).padStart(2, "0")}/{String(TRANSMISSIONS.length).padStart(2, "0")}</span>
      </div>
      <div className="hairline-t border-ink/30 mt-2 pt-2 space-y-1.5">
        <div className="mono-label flex items-center gap-2">
          <span className="bg-ink text-bone px-1.5">{cur.t}</span>
          <span className="text-signal">{cur.from}</span>
          <span className="opacity-50">→ ALL UNITS</span>
        </div>
        <p className="font-display text-lg leading-snug min-h-[3.5em]">
          {typed}
          <motion.span className="inline-block w-[10px] h-[1em] bg-ink align-[-2px] ml-0.5"
            animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-signal/40">
        <motion.div key={idx} className="h-full bg-signal" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: msg.length * 0.022 + 1.8, ease: "linear" }} />
      </div>
    </div>
  );
}

export function WeatherCard() {
  const [wx, setWx] = useState<{ temp: number, wind: number, location: string, time: string } | null>(null);

  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setWx(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="hairline border-ink/60 bg-bone p-4 relative overflow-hidden">
      <div className="mono-label flex items-center justify-between">
        <span className="truncate pr-2">WX / {wx ? `${wx.location} · ${wx.time}` : "SRINAGAR · --:--"}</span>
        <span className="text-signal flex items-center gap-1 shrink-0"><Activity className="h-3 w-3" /> LIVE</span>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-3 items-center">
        <div>
          <div className="mono-label opacity-60">TEMP</div>
          <div className="display-num text-4xl">{wx ? wx.temp : "--"}°<span className="text-signal">.</span></div>
        </div>
        <div className="relative h-20">
          <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full">
            <path d="M 8 50 A 42 42 0 0 1 92 50" fill="none" className="stroke-ink/30" strokeWidth="1" strokeDasharray="2 3" />
            <motion.circle r="4" className="fill-signal"
              animate={{ offsetDistance: ["10%", "90%", "10%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              style={{ offsetPath: `path("M 8 50 A 42 42 0 0 1 92 50")` as unknown as string }}
            />
            <line x1="0" y1="50" x2="100" y2="50" className="stroke-ink" strokeWidth="1" />
          </svg>
          <div className="absolute inset-x-0 bottom-0 text-center mono-label opacity-60">SUN ARC</div>
        </div>
        <div>
          <div className="mono-label opacity-60">WIND</div>
          <div className="display-num text-4xl">{wx ? wx.wind : "--"}<span className="text-base mono-label">KM/H</span></div>
          <div className="mt-1 flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.span key={i} className="block h-px bg-ink"
                initial={{ width: 6 }}
                animate={{ width: [6, 22, 10, 18, 6] }}
                transition={{ duration: 2.2, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TelemetrySection() {
  return (
    <section id="telemetry" className="px-4 md:px-8 py-20 hairline-t border-ink relative">
      <SectionHead
        code="TLM / 07"
        kicker="FIELD INSTRUMENTS · LIVE TELEMETRY"
        title="Instrument cluster"
        sub="The pocket dashboard we read by torchlight — heading, weather, last words on the radio."
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Compass */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, ease: "easeOut" }}
          className="lg:col-span-4 hairline border-ink crosshair bg-bone p-5"
        >
          <Crosshairs />
          <div className="mono-label flex items-center justify-between">
            <span>NAV / COMPASS</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 bg-signal animate-blink" />TRACKING</span>
          </div>
          <div className="mt-6 mb-8"><CompassDial /></div>
          <div className="grid grid-cols-3 hairline border-ink/60">
            <div className="p-2 hairline-r border-ink/60"><div className="mono-label opacity-60">LAT</div><div className="font-mono text-[13px]">34.0151°N</div></div>
            <div className="p-2 hairline-r border-ink/60"><div className="mono-label opacity-60">LON</div><div className="font-mono text-[13px]">74.7973°E</div></div>
            <div className="p-2"><div className="mono-label opacity-60">ALT</div><div className="font-mono text-[13px]">2114 m</div></div>
          </div>
        </motion.div>

        {/* Right column */}
        <div className="lg:col-span-8 grid grid-cols-1 gap-4">
          {/* Elevation */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, ease: "easeOut" }}
            className="hairline border-ink crosshair bg-bone p-5"
          >
            <Crosshairs />
            <div className="mono-label flex items-center justify-between">
              <span>ELV / ROUTE T-01 HAIJEN</span>
              <span className="flex items-center gap-2"><Mountain className="h-3.5 w-3.5 text-signal" /> DRAWN ON SCROLL</span>
            </div>
            <div className="mt-4"><ElevationProfile /></div>
          </motion.div>

          {/* Waveform + Weather + Log */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
              className="hairline border-ink crosshair bg-bone p-5"
            >
              <Crosshairs />
              <div className="mono-label flex items-center justify-between mb-3">
                <span>SIG / 433 MHz</span>
                <span className="text-signal flex items-center gap-1.5"><span className="h-1.5 w-1.5 bg-signal animate-blink" />CARRIER</span>
              </div>
              <Waveform />
              <div className="mt-3 flex items-center justify-between mono-label opacity-60">
                <span>RX -62 dBm</span><span>SNR 21</span><span>BW 25k</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="crosshair"
            >
              <Crosshairs />
              <WeatherCard />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="hairline border-ink crosshair bg-bone p-5"
          >
            <Crosshairs />
            <div className="mono-label flex items-center justify-between mb-3">
              <span>LOG / TRX 7 · LAST 6 PACKETS</span>
              <span className="flex items-center gap-1.5"><Radio className="h-3.5 w-3.5 text-signal" />DECRYPTED</span>
            </div>
            <TransmissionLog />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
