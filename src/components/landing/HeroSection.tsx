"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { MapPin, Wind, Radio, CircleDot, ArrowUpRight, Target, Crosshair } from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { TICKER, STATS } from "@/data/home-data";

export function TopBar() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT(
        `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}:${String(d.getUTCSeconds()).padStart(2, "0")} UTC`
      );
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <>
      {/* Tiny clock strip */}
      <div className="hairline-b border-ink/40 bg-bone">
        <div className="flex items-center justify-between px-4 py-1 gap-4 text-[10px] mono-label">
          <span className="flex items-center gap-2">
            <span className="brick px-2 py-px">FC/2026</span>
            <span className="hidden sm:inline opacity-60">FIELD MANUAL — REV 02.6</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
            <span className="tabular-nums">{t}</span>
          </span>
        </div>
      </div>
      <TopNav />
    </>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <header ref={ref} className="relative hairline-b border-ink">
      {/* Coord strip */}
      <div className="hairline-b border-ink/30 px-4 py-2 flex items-center justify-between mono-label gap-4 flex-wrap">
        <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-signal" /> 34.0837°N · 74.7973°E — SRINAGAR / KMR</span>
        <span className="flex items-center gap-2"><Wind className="h-3.5 w-3.5" /> 14KT NW · 4°C · QIBLA 282°</span>
        <span className="hidden md:flex items-center gap-2"><Radio className="h-3.5 w-3.5 text-signal animate-blink" /> CHANNEL 7 OPEN</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]">
        {/* Left: monumental headline */}
        <div className="p-6 md:p-10 lg:p-14 hairline-r border-ink/80">
          <div className="flex items-center gap-3 mono-label mb-6">
            <span className="signal-chip"><CircleDot className="h-3 w-3" />HQ / 01</span>
            <span>VOL. 01 — ISSUE 06 — KASHMIR FIELD MANUAL</span>
          </div>

          <h1 className="display-num text-ink text-[clamp(64px,13vw,180px)]">
            THE<br />
            DIGITAL<br />
            <span className="bg-signal text-bone px-3">CAMPFIRE</span>
            <span className="text-signal">.</span>
          </h1>

          <p className="font-display italic text-2xl md:text-3xl mt-6 text-ink/80 max-w-xl leading-tight">
            Where the wild meets the heart — a brotherhood logged in tire-tracks, trout, and tasbih.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#crew" className="hairline brick px-5 py-3 mono-label text-bone hover:bg-signal hover:border-signal transition-colors flex items-center gap-2">
              MEET THE UNITS <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a href="#tours" className="hairline px-5 py-3 mono-label hover:brick hover:text-bone transition-colors flex items-center gap-2">
              FIELD ROUTES <Target className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-0 hairline-t border-ink/60 pt-3">
            {[
              ["EST.", "2018"],
              ["UNITS", "19"],
              ["BASE", "KMR"],
            ].map(([k, v]) => (
              <div key={k} className="hairline-r last:border-r-0 border-ink/30 px-2">
                <div className="mono-label opacity-60">{k}</div>
                <div className="display-num text-3xl">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Center spine */}
        <div className="hidden lg:flex w-8 tick-v border-ink" />

        {/* Right: cinematic image panel */}
        <div className="relative overflow-hidden hairline-l border-ink/80 min-h-[420px] lg:min-h-0">
          <motion.div style={{ y }} className="absolute inset-0">
            <Image src="/hero-mountains.jpg" alt="Kashmir ridgeline" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover grayscale contrast-125" />
            <div className="absolute inset-0 bg-bone/10 mix-blend-multiply" />
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(oklch(0.13 0.01 60 / 0.18) 1px, transparent 1px)", backgroundSize: "6px 6px" }} />
          </motion.div>

          {/* HUD overlays */}
          <div className="absolute top-3 left-3 right-3 flex justify-between mono-label text-bone mix-blend-difference">
            <span className="flex items-center gap-1.5"><Crosshair className="h-3.5 w-3.5" /> TGT / RIDGE-07</span>
            <span className="flex items-center gap-1.5">F/2.8 · 1/250 · ISO 200</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end mono-label text-bone mix-blend-difference">
            <div>
              <div>FRAME 0432</div>
              <div className="display-num not-italic text-5xl text-bone">04:38<span className="text-signal">.</span></div>
              <div>FAJR — TANGMARG</div>
            </div>
            <div className="text-right">
              <div>ELEV 2,840 M</div>
              <div>BEARING 282°</div>
            </div>
          </div>

          {/* corner reticle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none">
            <div className="absolute inset-0 border border-signal/80" />
            <div className="absolute top-1/2 -left-3 w-6 h-px bg-signal" />
            <div className="absolute top-1/2 -right-3 w-6 h-px bg-signal" />
            <div className="absolute left-1/2 -top-3 h-6 w-px bg-signal" />
            <div className="absolute left-1/2 -bottom-3 h-6 w-px bg-signal" />
          </div>
        </div>
      </div>
    </header>
  );
}

export function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="brick hairline-b border-ink overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {items.map((t, i) => (
          <span key={i} className="mono-label text-bone px-6 flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-signal rounded-full" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StatsRow() {
  return (
    <section className="px-4 md:px-8 py-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 hairline border-ink">
        {STATS.map((s, i) => (
          <div key={s.label} className={`p-5 ${i < STATS.length - 1 ? "lg:hairline-r" : ""} ${i < 2 ? "hairline-b lg:hairline-b-0" : ""} ${i === 0 ? "hairline-r" : ""} ${i === 2 ? "hairline-r" : ""} border-ink/40 bg-bone`}>
            <div className="mono-label">{s.label}</div>
            <div className="display-num text-[44px] md:text-[64px] mt-1">{s.value}</div>
            <div className="mono-label opacity-60">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
