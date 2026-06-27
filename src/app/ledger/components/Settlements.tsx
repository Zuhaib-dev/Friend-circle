"use client";
import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { inr, SQUAD } from "../data";

function Callsign({ c, size = 26 }: { c: string; size?: number }) {
  const s = SQUAD.find((x) => x.call === c);
  const initials = s?.call.slice(0, 2) ?? c.slice(0, 2);
  return (
    <span
      className={`inline-flex items-center justify-center hairline border-ink mono-label text-bone ${s?.color ?? "bg-ink"}`}
      style={{ width: size, height: size, fontSize: Math.max(8, size * 0.34) }}
      title={`${c} · ${s?.name ?? ""}`}
    >
      {initials}
    </span>
  );
}

export function Settlements({ 
  settlements, 
  onSettleDebt 
}: { 
  settlements: { from: string; to: string; amt: number }[];
  onSettleDebt: (from: string, to: string) => void;
}) {
  return (
    <section className="px-4 md:px-8 pb-8">
      <div className="hairline border-ink bg-bone p-4 sm:p-6">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="mono-label opacity-60 flex items-center gap-2">
              <span className="brick text-bone px-1.5 py-0.5 text-[10px]">RT / 04</span>
              SQUAD SETTLEMENTS
            </div>
            <div className="font-display text-2xl mt-1">MINIMUM-HOP DEBT RESOLUTION</div>
          </div>
          <div className="mono-label text-signal px-3 py-1.5 hairline border-signal bg-signal/10 whitespace-nowrap">
            {settlements.length} ACTIVE TRANSFER(S)
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {settlements.map((s, i) => (
            <motion.div 
              key={`${s.from}-${s.to}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="hairline border-ink bg-acid/5 p-4 flex flex-col justify-between group hover:bg-acid/15 transition-colors relative"
            >
              <div className="mono-label opacity-50 mb-3">TX / {(i+1).toString().padStart(2, '0')} · PENDING</div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col items-center gap-1">
                  <Callsign c={s.from} size={32} />
                  <span className="mono-label text-[10px] opacity-60">FROM</span>
                  <span className="font-mono text-xs uppercase font-bold">{s.from}</span>
                </div>
                
                <ArrowRight className="h-4 w-4 opacity-30 text-signal group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col items-center gap-1">
                  <Callsign c={s.to} size={32} />
                  <span className="mono-label text-[10px] opacity-60">TO</span>
                  <span className="font-mono text-xs uppercase font-bold">{s.to}</span>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="font-display text-3xl leading-none text-ink">{inr(s.amt)}</div>
                <div className="mono-label text-[10px] opacity-50 mt-1">DISPATCH AMOUNT</div>
              </div>

              <button 
                onClick={() => onSettleDebt(s.from, s.to)}
                className="w-full brick text-bone py-2 mono-label text-xs hover:bg-signal transition-colors flex items-center justify-center gap-1"
              >
                <Check className="h-3 w-3" /> SETTLE · MARK CLEARED
              </button>
            </motion.div>
          ))}
          
          {settlements.length === 0 && (
            <div className="col-span-full p-8 text-center mono-label opacity-40 tick">
              NO ACTIVE DEBTS · SQUAD SETTLED
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
