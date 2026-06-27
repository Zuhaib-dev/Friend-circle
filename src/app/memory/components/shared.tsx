"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export const CREW = [
  { callsign: "ALPHA", name: "Sahil Wani", rig: "Mahindra Thar / KL-01" },
  { callsign: "BRAVO", name: "Umar Bhat", rig: "Maruti Gypsy / KL-07" },
  { callsign: "CHARLIE", name: "Faisal Dar", rig: "Force Gurkha / KL-03" },
  { callsign: "DELTA", name: "Junaid Malik", rig: "Royal Enfield 411" },
  { callsign: "ECHO", name: "Bilal Reshi", rig: "Mahindra Scorpio-N" },
  { callsign: "FOXTROT", name: "Adil Lone", rig: "Isuzu V-Cross" },
];

export const QUOTES = [
  { t: "14:02", c: "ALPHA", msg: "I think we lost the exhaust pipe." },
  { t: "14:03", c: "BRAVO", msg: "Negative. That was Charlie's bumper." },
  { t: "16:41", c: "DELTA", msg: "Found maggi stall. Repeat. MAGGI SECURED." },
  { t: "19:08", c: "ECHO", msg: "Snow patch at 2,800m. Sending coordinates." },
  { t: "21:55", c: "CHARLIE", msg: "Wawan was a war crime. 10/10 would repeat." },
];

export const MEDIA = [
  { seed: "pahalgam01", h: "h-72", featured: true },
  { seed: "pahalgam02", h: "h-44" },
  { seed: "pahalgam03", h: "h-56" },
  { seed: "pahalgam04", h: "h-40" },
  { seed: "pahalgam05", h: "h-64" },
  { seed: "pahalgam06", h: "h-48" },
  { seed: "pahalgam07", h: "h-52" },
  { seed: "pahalgam08", h: "h-44" },
];

export const META = [
  { label: "DATE", value: "14 JUN 2026", code: "T-00" },
  { label: "DISTANCE", value: "412 KM", code: "ODO" },
  { label: "WEATHER", value: "8°C · DRIZZLE", code: "MET" },
  { label: "STATUS", value: "SECURE", code: "SEC" },
];

export const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.35, ease: "easeOut" as const },
};

export function UTCClock() {
  const [t, setT] = useState<string>("--:--:--");
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
  return <span className="mono-label text-signal">{t}</span>;
}

export function PanelHeader({ code, title, right }: { code: string; title: string; right?: React.ReactNode }) {
  return (
    <header className="hairline-b border-ink flex items-center justify-between px-3 py-2 bg-bone">
      <span className="mono-label">{code}</span>
      <span className="mono-label truncate px-2">{title}</span>
      <span className="flex items-center gap-1.5">
        {right ?? (
          <>
            <span className="h-2 w-2 rounded-full bg-signal animate-blink" />
            <span className="mono-label text-signal">LIVE</span>
          </>
        )}
      </span>
    </header>
  );
}
