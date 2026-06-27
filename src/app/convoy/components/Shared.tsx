"use client";

import { motion } from "motion/react";
import { Crosshairs } from "@/components/auth-shell";
import { ReactNode } from "react";

export function Section({
  code,
  title,
  tag,
  children,
}: {
  code: string;
  title: string;
  tag?: string;
  children: ReactNode;
}) {
  return (
    <section className="px-4 md:px-8 py-8">
      <header className="flex items-end justify-between gap-4 mb-4 flex-wrap">
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="brick text-bone px-2 py-px mono-label">{code}</span>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight truncate">{title}</h2>
        </div>
        {tag && (
          <span className="mono-label flex items-center gap-2 opacity-70">
            <span className="h-1.5 w-1.5 bg-signal animate-blink" /> {tag}
          </span>
        )}
      </header>
      {children}
    </section>
  );
}

export function Panel({
  code,
  title,
  right,
  children,
}: {
  code: string;
  title: string;
  right?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="hairline border-ink bg-bone crosshair h-full"
    >
      <Crosshairs />
      <header className="hairline-b border-ink flex items-center justify-between px-2.5 py-1.5">
        <span className="flex items-center gap-2">
          <span className="brick text-bone px-1.5 py-px mono-label">{code}</span>
          <span className="mono-label opacity-70">{title}</span>
        </span>
        {right && (
          <span className="mono-label text-signal flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-signal animate-blink" /> {right}
          </span>
        )}
      </header>
      <div className="p-3 md:p-4">{children}</div>
    </motion.div>
  );
}
