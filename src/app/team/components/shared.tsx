
"use client";
import { motion } from "motion/react";
import { Radar } from "lucide-react";

export type Upload = {
  id: string;
  name: string;
  url: string; // data URL
  size: number;
  ts: number;
  status: "VERIFIED" | "PENDING";
};

export const STORE = "fc.uploads";

export function loadUploads(): Upload[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORE) ?? "[]");
  } catch {
    return [];
  }
}
export function saveUploads(u: Upload[]) {
  localStorage.setItem(STORE, JSON.stringify(u));
}

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
  right,
  children,
  className = "",
}: {
  code: string;
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`crosshair hairline bg-bone ${className}`}>
      <Crosshairs />
      <header className="hairline-b flex items-center justify-between px-3 py-2 bg-bone">
        <span className="mono-label">{code}</span>
        <span className="mono-label truncate px-2 opacity-80">{title}</span>
        <span className="flex items-center gap-1.5">
          {right ?? (
            <>
              <span className="h-2 w-2 rounded-full bg-signal animate-blink" />
              <span className="mono-label text-signal">LIVE</span>
            </>
          )}
        </span>
      </header>
      <div className="p-4 md:p-5">{children}</div>
    </section>
  );
}

export type View = "overview" | "dossier" | "uplink";

export function NavBtn({
  id,
  current,
  setView,
  icon: Icon,
  label,
  code,
}: {
  id: View;
  current: View;
  setView: (v: View) => void;
  icon: typeof Radar;
  label: string;
  code: string;
}) {
  const active = current === id;
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => setView(id)}
      className={`w-full relative flex items-center justify-between gap-2 px-2.5 py-2 hairline mono-label transition-colors ${
        active ? "brick text-bone border-ink" : "border-ink/30 hover:bg-ink hover:text-bone"
      }`}
    >
      <span className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <span className="opacity-60">{code}</span>
      {active && (
        <motion.span
          layoutId="navdot"
          className="absolute left-[-6px] top-1/2 -translate-y-1/2 h-2 w-2 bg-signal hairline border-ink"
        />
      )}
    </motion.button>
  );
}

import Link from "next/link";
export function LinkBtn({
  href,
  icon: Icon,
  label,
  code,
}: {
  href: string;
  icon: typeof Radar;
  label: string;
  code: string;
}) {
  return (
    <Link
      href={href}
      className={`w-full relative flex items-center justify-between gap-2 px-2.5 py-2 hairline mono-label transition-colors border-ink/30 hover:bg-ink hover:text-bone group`}
    >
      <span className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <span className="opacity-60">{code}</span>
    </Link>
  );
}

export function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between mono-label">
      <span className="opacity-60">{k}</span>
      <span className={accent ? "text-signal" : ""}>{v}</span>
    </div>
  );
}
