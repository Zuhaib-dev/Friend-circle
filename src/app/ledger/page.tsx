"use client";
import { useState, useMemo } from "react";
import { AnimatePresence } from "motion/react";
import { TopNav } from "@/components/top-nav";
import { Header } from "./components/Header";
import { Balances } from "./components/Balances";
import { Transactions } from "./components/Transactions";
import { Settlements } from "./components/Settlements";
import { LogModal } from "./components/LogModal";
import { TXNS, Txn, computeBalances, computeSettlements, Cat } from "./data";

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

  const handleLogExpense = (cat: Cat, desc: string, amt: number, paidBy: string, split: string[]) => {
    const newTxn: Txn = {
      id: `T-${Math.floor(Math.random() * 10000)}`,
      ts: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" }) + " · " + new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      cat,
      desc,
      paidBy,
      amount: amt,
      split,
      settled: false
    };
    setTxns([newTxn, ...txns]);
    setLogOpen(false);
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
      
      {logOpen && (
        <AnimatePresence>
          <LogModal 
            onClose={() => setLogOpen(false)} 
            onSave={handleLogExpense} 
          />
        </AnimatePresence>
      )}
    </main>
  );
}
