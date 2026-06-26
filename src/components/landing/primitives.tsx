"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { AlertTriangle, Activity } from "lucide-react";
import { FRAMES } from "@/data/home-data";

export function Crosshairs() {
  return (
    <>
      <span className="ch-bl" />
      <span className="ch-br" />
    </>
  );
}

export function Panel({
  code,
  title,
  signal,
  children,
  className = "",
}: {
  code: string;
  title: string;
  signal?: "LIVE" | "ALERT" | "ON" | "OFF";
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`crosshair hairline bg-bone ${className}`}
    >
      <Crosshairs />
      <header className="hairline-b flex items-center justify-between px-3 py-2 bg-bone">
        <span className="mono-label">{code}</span>
        <span className="mono-label truncate px-2 text-center">{title}</span>
        <span className="flex items-center gap-1.5">
          {signal === "LIVE" && (
            <>
              <span className="h-2 w-2 rounded-full bg-signal animate-blink" />
              <span className="mono-label text-signal">LIVE</span>
            </>
          )}
          {signal === "ALERT" && <span className="signal-chip"><AlertTriangle className="h-3 w-3" />ALERT</span>}
          {signal === "ON" && <span className="brick px-2 py-px mono-label text-bone">ON</span>}
          {!signal && <span className="mono-label opacity-60">REC</span>}
        </span>
      </header>
      <div className="p-5">{children}</div>
    </motion.section>
  );
}

export function SectionHead({ code, kicker, title, sub }: { code: string; kicker: string; title: string; sub?: string }) {
  return (
    <div className="hairline-b border-ink pb-4 mb-6 flex items-end justify-between gap-4 flex-wrap">
      <div>
        <div className="flex items-center gap-3 mono-label">
          <span className="signal-chip">{code}</span>
          <span>{kicker}</span>
        </div>
        <h2 className="display-num text-[clamp(40px,7vw,96px)] mt-2 text-ink">{title}<span className="text-signal">.</span></h2>
        {sub && <p className="font-display italic text-xl md:text-2xl text-ink/70 max-w-2xl mt-1">{sub}</p>}
      </div>
      <div className="flex items-center gap-2 mono-label">
        <Activity className="h-3.5 w-3.5 text-signal" />
        <span>SYS / NOMINAL</span>
      </div>
    </div>
  );
}

export function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="hairline p-4 crosshair bg-bone">
      <Crosshairs />
      <div className="mono-label">{label}</div>
      <div className="display-num text-[56px] md:text-[72px] mt-1">{value}</div>
      <div className="mono-label opacity-60">{sub}</div>
    </div>
  );
}

export function Marker({ children }: { children: ReactNode }) {
  return <span className="bg-signal text-bone px-1.5">{children}</span>;
}

export function FilmSprocket({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="8" r="1" fill="currentColor" />
      <circle cx="6" cy="16" r="1" fill="currentColor" />
      <circle cx="18" cy="8" r="1" fill="currentColor" />
      <circle cx="18" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

export function FrameOverlay({ code, cap, meta, isHero }: { code: string; cap: string; meta: string; isHero?: boolean }) {
  return (
    <>
      {/* film grain / scan texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, var(--ink) 2px, var(--ink) 3px)", backgroundSize: "100% 4px" }} />
      {/* corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-signal" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-signal" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-signal" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-signal" />
      {/* top code strip */}
      <div className="absolute top-0 inset-x-0 hairline-b border-ink/50 px-3 py-1.5 flex justify-between mono-label text-bone mix-blend-difference">
        <span className="flex items-center gap-1.5"><FilmSprocket className="h-3 w-3" />{code}</span>
        <span>{meta}</span>
      </div>
      {/* bottom caption strip */}
      <div className={`absolute bottom-0 inset-x-0 hairline-t border-ink/50 bg-ink/80 backdrop-blur-[1px] px-3 py-2 transition-transform duration-500 ${isHero ? "" : "translate-y-full group-hover:translate-y-0"}`}>
        <div className="mono-label text-bone truncate">{cap}</div>
      </div>
      {/* center reticle (hero only) */}
      {isHero && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 pointer-events-none">
          <div className="absolute inset-0 border border-signal/60" />
          <div className="absolute top-1/2 -left-3 w-6 h-px bg-signal/60" />
          <div className="absolute top-1/2 -right-3 w-6 h-px bg-signal/60" />
          <div className="absolute left-1/2 -top-3 h-6 w-px bg-signal/60" />
          <div className="absolute left-1/2 -bottom-3 h-6 w-px bg-signal/60" />
        </div>
      )}
      {/* live dot */}
      <div className="absolute top-1.5 right-1.5">
        <span className="h-2 w-2 rounded-full bg-signal animate-blink inline-block" />
      </div>
    </>
  );
}

export function FrameTile({ f, index }: { f: (typeof FRAMES)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const isHero = f.size === "hero";

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  const gridClass =
    f.size === "hero"
      ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
      : f.size === "wide"
        ? "col-span-2 row-span-1 md:col-span-2 md:row-span-1"
        : f.size === "tall"
          ? "col-span-1 row-span-2 md:col-span-1 md:row-span-2"
          : "col-span-1 row-span-1";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className={`${gridClass} hairline border-ink relative group overflow-hidden bg-ink cursor-crosshair`}
      onMouseMove={handleMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ x: mouse.x, y: mouse.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <Image
          src={f.src}
          alt={f.cap}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 scale-[1.15]"
        />
      </motion.div>
      <FrameOverlay code={f.code} cap={f.cap} meta={f.meta} isHero={isHero} />
      {/* hover sweep line */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-y-0 w-px bg-signal/40 animate-scan" style={{ left: "50%" }} />
      </div>
    </motion.div>
  );
}
