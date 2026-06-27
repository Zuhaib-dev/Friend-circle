"use client";

import { Flag } from "lucide-react";
import { ROSTER } from "../data";

export function Header({ utc }: { utc: string }) {
  return (
    <section className="hairline-b border-ink relative overflow-hidden">
      <div className="px-4 md:px-8 py-8 md:py-12 grid md:grid-cols-12 gap-6 items-end">
        <div className="md:col-span-8">
          <div className="flex items-center gap-2 mono-label opacity-60 mb-3 flex-wrap">
            <span className="brick text-bone px-2 py-[1px]">MSN / 11</span>
            <span>·</span>
            <span>CONVOY PLANNER</span>
            <span>·</span>
            <span className="text-signal flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" /> PLANNING
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
            Mission <span className="italic text-signal">Pahalgam</span>
            <br />
            convoy / dawn rally.
          </h1>
          <p className="mt-4 max-w-xl text-ink/70 text-sm md:text-base">
            Lock the roster. Sync the rigs. Stage food, fuel, prayer stops and gear in one tactical board
            before the column rolls.
          </p>
        </div>
        <div className="md:col-span-4 grid grid-cols-2 gap-2">
          <BigStat label="UNITS" value={ROSTER.length.toString().padStart(2, "0")} />
          <BigStat label="UTC" value={utc.slice(0, 5)} mono />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1.5 tick opacity-50" />
    </section>
  );
}

function BigStat({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="hairline border-ink p-2 relative">
      <span className="mono-label opacity-50">{label}</span>
      <div className={`mt-1 ${mono ? "font-mono text-sm" : "font-display text-2xl"} text-ink`}>{value}</div>
      <span className="absolute top-1 right-1 h-1 w-1 bg-signal animate-blink" />
    </div>
  );
}

export function MetaCell({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Flag }) {
  return (
    <div className="hairline-r border-ink/40 last:border-r-0 px-3 py-3 flex items-center gap-3 group hover:bg-acid/10 transition-colors">
      <Icon className="h-4 w-4 text-signal shrink-0" />
      <div className="min-w-0">
        <div className="mono-label opacity-50">{label}</div>
        <div className="font-mono text-sm tracking-wider truncate">{value}</div>
      </div>
    </div>
  );
}
