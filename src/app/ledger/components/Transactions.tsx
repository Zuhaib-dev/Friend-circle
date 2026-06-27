"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Receipt, Check, Banknote } from "lucide-react";
import { Txn, CAT_ICON, inr } from "../data";

export function Transactions({ 
  squad,
  txns, 
  onSettle 
}: { 
  squad: import('../data').SquadMember[];
  txns: Txn[]; 
  onSettle: (id: string) => void;
}) {
  const getName = (call: string) => squad.find(s => s.call === call)?.name || call;

  const [filter, setFilter] = useState<"ALL" | "PENDING" | "SETTLED">("ALL");

  const visible = txns.filter((t) =>
    filter === "ALL" ? true : filter === "PENDING" ? !t.settled : t.settled
  );

  return (
    <section className="px-4 md:px-8 pb-8">
      <div className="hairline border-ink bg-bone">
        <header className="hairline-b border-ink flex items-center justify-between px-3 py-2 gap-2 flex-wrap">
          <span className="mono-label flex items-center gap-1.5">
            <Receipt className="h-3.5 w-3.5 text-signal" /> FEED / 03 · TRANSACTION LOG
          </span>
          <div className="flex items-center gap-0 hairline border-ink">
            {(["ALL","PENDING","SETTLED"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-2.5 py-1 mono-label transition-colors ${filter === f ? "bg-ink text-bone" : "hover:bg-acid/40"}`}>
                {f}
              </button>
            ))}
          </div>
        </header>

        <div className="hidden md:grid grid-cols-[110px_40px_1fr_120px_120px_120px] gap-3 px-3 py-2 hairline-b border-ink/40 mono-label opacity-60 tick">
          <span>TIMESTAMP</span><span>CAT</span><span>DESCRIPTION</span><span>PAID BY</span><span className="text-right">AMOUNT</span><span className="text-right">STATUS</span>
        </div>

        <ul>
          <AnimatePresence initial={false}>
            {visible.map((t, i) => {
              const Icon = CAT_ICON[t.cat];
              return (
                <motion.li key={t._id || t.id} layout
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="group hairline-b border-ink/20 last:border-b-0 hover:bg-acid/10 transition-colors"
                >
                  {/* desktop row */}
                  <div className="hidden md:grid grid-cols-[110px_40px_1fr_120px_120px_120px] gap-3 items-center px-3 py-2.5">
                    <span className="mono-label opacity-60">{t.ts}</span>
                    <span className="flex items-center justify-center bg-ink/10 h-8 w-8 rounded-full">
                      <Icon className="h-4 w-4 text-ink" />
                    </span>
                    <span className="font-mono text-sm uppercase tracking-wide truncate">{t.desc}</span>
                    <span className="mono-label">{getName(t.paidBy)}</span>
                    <span className="text-right font-display text-lg leading-none">{inr(t.amount)}</span>
                    <div className="flex justify-end">
                      {t.settled ? (
                        <span className="flex items-center gap-1 mono-label text-ink/50"><Check className="h-3.5 w-3.5" /> SETTLED</span>
                      ) : (
                        <button onClick={() => onSettle(t._id || t.id || "")} className="flex items-center gap-1 mono-label text-signal hover:underline">
                          <Banknote className="h-3.5 w-3.5" /> SETTLE
                        </button>
                      )}
                    </div>
                  </div>

                  {/* mobile row */}
                  <div className="md:hidden flex flex-col p-3 gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <span className="flex items-center justify-center bg-ink/10 h-7 w-7 rounded-full shrink-0">
                          <Icon className="h-3.5 w-3.5 text-ink" />
                        </span>
                        <span className="font-mono text-sm uppercase tracking-wide truncate">{t.desc}</span>
                      </div>
                      <span className="font-display text-lg">{inr(t.amount)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="mono-label opacity-60">{t.ts} · {getName(t.paidBy)}</span>
                      {t.settled ? (
                        <span className="flex items-center gap-1 mono-label text-ink/50"><Check className="h-3.5 w-3.5" /> SETTLED</span>
                      ) : (
                        <button onClick={() => onSettle(t._id || t.id || "")} className="flex items-center gap-1 mono-label text-signal hover:underline">
                          <Banknote className="h-3.5 w-3.5" /> SETTLE
                        </button>
                      )}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
        {visible.length === 0 && (
          <div className="p-10 text-center mono-label opacity-50 tick">NO TRANSACTIONS FOUND</div>
        )}
      </div>
    </section>
  );
}
