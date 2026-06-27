
"use client";
import { motion } from "motion/react";
import { Radar, Inbox, Terminal, Users } from "lucide-react";

// ---------- Types ----------
export type Operator = {
  id: string;
  callsign: string;
  name: string;
  email: string;
  ts: number;
  phone?: string;
  socialHandle?: string;
  bio?: string;
  image?: string;
};
export type Intel = {
  id: string;
  uploader: string;
  url: string;
  ts: number;
  size: string;
  caption: string;
};
export type LogEntry = { id: string; ts: number; text: string; kind: "ok" | "warn" | "info" };

export type View = "overview" | "operators" | "intel" | "tours" | "liveops" | "personnel" | "loadout" | "convoy";


// ---------- Shared bits ----------
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

export function fmtAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}


// ---------- Sidebar bits ----------
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
          layoutId="admindot"
          className="absolute left-[-6px] top-1/2 -translate-y-1/2 h-2 w-2 bg-signal hairline border-ink"
        />
      )}
    </motion.button>
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


export function EmptyState({
  icon: Icon,
  label,
  hint,
}: {
  icon: typeof Inbox;
  label: string;
  hint: string;
}) {
  return (
    <div className="hairline border-ink/30 p-10 flex flex-col items-center justify-center gap-3 text-center">
      <Icon className="h-8 w-8 text-signal" />
      <div className="font-display text-2xl">{label}</div>
      <div className="mono-label opacity-60">{hint}</div>
      <div className="mt-3 flex items-center gap-2 mono-label">
        <Terminal className="h-3 w-3 text-signal" />
        <Users className="h-3 w-3 opacity-40" />
        <span className="opacity-60">SYSTEM STANDBY</span>
      </div>
    </div>
  );
}
