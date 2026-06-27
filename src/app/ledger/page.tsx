"use client";
import { useState, useMemo } from "react";
import { TopNav } from "@/components/top-nav";
import { Header } from "./components/Header";
import { Balances } from "./components/Balances";
import { Transactions } from "./components/Transactions";
import { Settlements } from "./components/Settlements";
import { TXNS, Txn, computeBalances, computeSettlements } from "./data";

export default function LedgerPage() {
  const [txns, setTxns] = useState<Txn[]>(TXNS);
  const [logOpen, setLogOpen] = useState(false);

  const bal = useMemo(() => computeBalances(txns), [txns]);
  const settlements = useMemo(() => computeSettlements(bal), [bal]);

  const total = txns.reduce((s, t) => s + t.amount, 0);
  const pending = txns.filter((t) => !t.settled).reduce((s, t) => s + t.amount, 0);

  const settleTxn = (id: string) =>
    setTxns((arr) => arr.map((t) => (t.id === id ? { ...t, settled: true } : t)));

  const settleDebt = (from: string, to: string) => {
    setTxns((arr) =>
      arr.map((t) =>
        !t.settled && t.paidBy === to && t.split.includes(from) ? { ...t, settled: true } : t,
      ),
    );
  };

  return (
    <main className="min-h-screen bg-bone text-ink">
      <TopNav />
      <Header 
        total={total} 
        pending={pending} 
        onLog={() => setLogOpen(true)} 
      />
      <Balances 
        bal={bal} 
        settlements={settlements} 
      />
      <Transactions 
        txns={txns} 
        onSettle={settleTxn} 
      />
      <Settlements
        settlements={settlements}
        onSettleDebt={settleDebt}
      />
      
      {/* TODO: Add expense logging modal logic here */}
      {logOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm">
          <div className="bg-bone hairline border-ink w-full max-w-md p-6 relative crosshair">
            <button onClick={() => setLogOpen(false)} className="absolute top-4 right-4 mono-label hover:text-signal">CLOSE [X]</button>
            <div className="font-display text-2xl mb-4">LOG EXPENSE</div>
            <div className="mono-label opacity-60 text-center py-10 tick">
              MODAL COMPONENT PENDING BACKEND INTEGRATION
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
