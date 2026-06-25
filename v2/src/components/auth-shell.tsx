"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Activity, AlertTriangle, ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function Crosshairs() {
  return (
    <>
      <span className="ch-tl" />
      <span className="ch-tr" />
      <span className="ch-bl" />
      <span className="ch-br" />
    </>
  );
}

export function AuthPanel({
  code,
  title,
  signal = "LIVE",
  children,
}: {
  code: string;
  title: string;
  signal?: "LIVE" | "ON";
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="crosshair hairline bg-bone relative w-full max-w-md"
    >
      <Crosshairs />
      <header className="hairline-b flex items-center justify-between px-3 py-2 bg-bone">
        <span className="mono-label">{code}</span>
        <span className="mono-label truncate px-2 text-center">{title}</span>
        <span className="flex items-center gap-1.5">
          {signal === "LIVE" ? (
            <>
              <span className="h-2 w-2 rounded-full bg-signal animate-blink" />
              <span className="mono-label text-signal">LIVE</span>
            </>
          ) : (
            <span className="brick px-2 py-[1px] mono-label text-bone">ON</span>
          )}
        </span>
      </header>
      <div className="p-5 md:p-7">{children}</div>
    </motion.section>
  );
}

export function AuthShell({ children, topRight }: { children: ReactNode; topRight?: ReactNode }) {
  return (
    <main className="min-h-screen bg-bone text-ink relative overflow-hidden flex flex-col">
      {/* dotted-grid bg comes from styles.css body bg, but ensure here too */}
      <div className="hairline-b border-ink bg-bone sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-2 gap-4 text-[10px] mono-label">
          <div className="flex items-center gap-3">
            <span className="brick px-2 py-[1px] text-bone">FC/2026</span>
            <Link href="/" className="flex items-center gap-1.5 hover:text-signal transition-colors">
              <ArrowLeft className="h-3 w-3" /> RETURN / BASE
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {topRight}
            <span className="hidden md:flex items-center gap-1.5">
              <Activity className="h-3 w-3 text-signal" /> SECURE CHANNEL
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-10 md:py-16 relative">
        {/* faint coordinate strips */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 tick opacity-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 tick opacity-40" />
        {children}
      </div>

      <footer className="hairline-t border-ink px-4 py-2 flex items-center justify-between mono-label text-[10px]">
        <span>AUTH / GATEWAY · v2.0</span>
        <span className="flex items-center gap-1.5">
          <AlertTriangle className="h-3 w-3 text-signal" /> AUTHORIZED PERSONNEL ONLY
        </span>
      </footer>
    </main>
  );
}

export function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.3-7.2 2.3-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.2 5.2C41.1 35.5 44 30.2 44 24c0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  );
}

export function FieldRow({
  label,
  code,
  children,
}: {
  label: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <label className="block group">
      <div className="flex items-end justify-between mb-1.5">
        <span className="mono-label">{label}</span>
        <span className="mono-label opacity-50">{code}</span>
      </div>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full hairline bg-bone px-3 py-2.5 text-ink font-mono text-sm tracking-wider placeholder:text-ink/30 focus:outline-none focus:bg-acid/20 focus:border-signal transition-colors";
