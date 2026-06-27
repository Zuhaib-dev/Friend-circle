"use client";
import { motion } from "motion/react";
import { TrendingDown, TrendingUp, ArrowRight, Wallet } from "lucide-react";
import { Crosshairs } from "@/components/auth-shell";
import { inr, SquadMember } from "../data";

function Callsign({ c, squad, size = 26 }: { c: string; squad: SquadMember[]; size?: number }) {
  const s = squad.find((x) => x.call === c);
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

export function Balances({ 
  me,
  squad,
  bal, 
  settlements 
}: { 
  me: string;
  squad: SquadMember[];
  bal: Record<string, number>;
  settlements: { from: string; to: string; amt: number }[];
}) {
  const myBal = bal[me] ?? 0;
  const youOwe = myBal < 0 ? Math.round(-myBal) : 0;
  const youOwed = myBal > 0 ? Math.round(myBal) : 0;

  return (
    <section className="px-4 md:px-8 py-6 md:py-10 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="crosshair hairline border-ink bg-bone lg:col-span-2 relative"
      >
        <Crosshairs />
        <header className="hairline-b border-ink flex items-center justify-between px-3 py-2">
          <span className="mono-label">BAL / 01 · OPERATOR DASHBOARD</span>
          {me && (
            <span className="flex items-center gap-1.5 mono-label">
              <Callsign c={me} squad={squad} size={18} /> <span>{squad.find(x => x.call === me)?.name || me} · YOU</span>
            </span>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <motion.div whileHover={{ y: -2 }}
            className="p-5 md:p-7 hairline-r border-ink/50 group cursor-default transition-colors hover:bg-signal/10">
            <div className="flex items-center justify-between mono-label opacity-70">
              <span className="flex items-center gap-1.5"><TrendingDown className="h-3 w-3" /> YOU OWE</span>
              <span>NEG</span>
            </div>
            <div className="font-display font-black text-5xl sm:text-6xl text-signal mt-2 leading-none tabular-nums">
              {inr(youOwe)}
            </div>
            <div className="mono-label opacity-60 mt-3 flex items-center gap-1.5">
              <ArrowRight className="h-3 w-3" /> DISPATCH TO {settlements.find(s => s.from === me)?.to ?? "—"}
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -2 }}
            className="p-5 md:p-7 group cursor-default transition-colors hover:bg-acid/40">
            <div className="flex items-center justify-between mono-label opacity-70">
              <span className="flex items-center gap-1.5"><TrendingUp className="h-3 w-3" /> YOU ARE OWED</span>
              <span>POS</span>
            </div>
            <div className="font-display font-black text-5xl sm:text-6xl mt-2 leading-none tabular-nums">
              <span className="bg-acid text-ink px-2 -mx-2">{inr(youOwed)}</span>
            </div>
            <div className="mono-label opacity-60 mt-3 flex items-center gap-1.5">
              <Wallet className="h-3 w-3" /> {settlements.filter(s => s.to === me).length} INCOMING SETTLEMENT(S)
            </div>
          </motion.div>
        </div>

        <div className="hairline-t border-ink px-3 py-2 flex items-center justify-between mono-label">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
            {myBal < 0 ? "FUNDS DUE · DISPATCH ADVISED" : myBal > 0 ? "FUNDS SECURED · INBOUND" : "LEDGER ZEROED"}
          </span>
          <span className="opacity-60">NET / {inr(Math.abs(Math.round(myBal)))}</span>
        </div>
      </motion.div>

      {/* Squad balances */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
        className="hairline border-ink bg-bone"
      >
        <header className="hairline-b border-ink flex items-center justify-between px-3 py-2">
          <span className="mono-label">BAL / 02 · SQUAD NET</span>
          <span className="mono-label opacity-60">{squad.length} UNITS</span>
        </header>
        <ul className="max-h-[300px] overflow-y-auto">
          {squad.map((s, i) => {
            const v = Math.round(bal[s.call] ?? 0);
            const pos = v > 0, neg = v < 0;
            return (
              <motion.li key={s.call}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.08 + i * 0.05 }}
                className="flex items-center justify-between gap-3 px-3 py-2.5 hairline-b border-ink/20 last:border-b-0 hover:bg-acid/20 transition-colors"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <Callsign c={s.call} squad={squad} size={22} />
                  <span className="mono-label truncate">{s.name} · {s.call}</span>
                </span>
                <span className={`mono-label tabular-nums ${pos ? "text-ink" : neg ? "text-signal" : "opacity-50"}`}>
                  {pos ? "+" : neg ? "−" : ""}{inr(Math.abs(v))}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
}
