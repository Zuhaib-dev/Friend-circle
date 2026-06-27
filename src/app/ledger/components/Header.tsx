"use client";
import { Radio, Plus, Activity, Lock } from "lucide-react";
import { inr, SQUAD } from "../data";

function StatCell({ code, label, value, accent }: { code: string; label: string; value: string; accent?: string }) {
  return (
    <div className="p-3 sm:p-4 hairline-r border-ink/40 last:border-r-0">
      <div className="flex items-center justify-between mono-label opacity-60">
        <span>{label}</span><span>{code}</span>
      </div>
      <div className={`font-display text-2xl sm:text-3xl mt-1 leading-none ${accent ?? "text-ink"}`}>{value}</div>
    </div>
  );
}

export function Header({ total, pending, onLog }: { total: number; pending: number; onLog: () => void }) {
  return (
    <section className="hairline-b border-ink">
      <div className="px-4 md:px-8 py-6 md:py-10 relative">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mono-label opacity-70">
              <Radio className="h-3 w-3 text-signal animate-blink" />
              <span>SECURE CHANNEL · ENCRYPTED</span>
              <span className="hidden sm:inline opacity-50">// FC/FIN/v2.0</span>
            </div>
            <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl leading-[0.85] tracking-tight mt-2">
              LEDGER<span className="text-signal">/</span>MSN-11
            </h1>
            <p className="mono-label opacity-70 mt-2">TACTICAL EXPENSE SPLITTER · SQUAD-05</p>
          </div>
          <button
            onClick={onLog}
            className="hidden sm:inline-flex brick text-bone px-4 py-2.5 mono-label hairline border-ink items-center gap-2 hover:bg-signal transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> LOG EXPENSE
          </button>
        </div>
      </div>

      {/* Meta strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 hairline-t border-ink">
        <StatCell code="01" label="TOTAL EXPENSE" value={inr(total)} />
        <StatCell code="02" label="OUTSTANDING" value={inr(pending)} accent="text-signal" />
        <StatCell code="03" label="ACTIVE SQUAD" value={`${SQUAD.length} UNIT`} />
        <div className="p-3 sm:p-4 flex items-center justify-between">
          <div>
            <div className="mono-label opacity-60">CHANNEL</div>
            <div className="flex items-center gap-2 mt-1">
              <Activity className="h-4 w-4 text-signal animate-pulse" />
              <span className="font-display text-2xl sm:text-3xl leading-none">LIVE</span>
            </div>
          </div>
          <Lock className="h-5 w-5 opacity-40" />
        </div>
      </div>
    </section>
  );
}
