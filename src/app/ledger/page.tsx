"use client";
import { useState, useMemo, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { TopNav } from "@/components/top-nav";
import { Header } from "./components/Header";
import { Balances } from "./components/Balances";
import { Transactions } from "./components/Transactions";
import { Settlements } from "./components/Settlements";
import { LogModal } from "./components/LogModal";
import { Txn, computeBalances, computeSettlements, Cat, SquadMember } from "./data";
import { useSession } from "next-auth/react";

export default function LedgerPage() {
  const { data: session } = useSession();
  const [missionName, setMissionName] = useState("MSN-XX");
  const [squad, setSquad] = useState<SquadMember[]>([]);
  const [txns, setTxns] = useState<Txn[]>([]);
  const [logOpen, setLogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // We need to figure out which callsign the current user is
  const ME = useMemo(() => {
    if (!session?.user?.email) return "";
    const member = squad.find(s => s.name === session.user.name);
    return member?.call || squad[0]?.call || "";
  }, [session, squad]);

  const fetchLedger = async () => {
    try {
      const r = await fetch("/api/ledger");
      const data = await r.json();
      if (data.mission) {
        setMissionName(data.mission.missionId);
        
        // Map roster to squad members
        const colors = ["bg-signal", "bg-acid", "bg-ink", "bg-signal", "bg-acid"];
        const mappedSquad: SquadMember[] = (data.mission.roster || []).map((r: any, i: number) => ({
          call: r.callsign || `OP-${i+1}`,
          name: r.user?.name || "Unknown",
          color: colors[i % colors.length]
        }));
        setSquad(mappedSquad);
      }
      if (data.expenses) {
        setTxns(data.expenses);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  const bal = useMemo(() => computeBalances(txns, squad), [txns, squad]);
  const settlements = useMemo(() => computeSettlements(bal), [bal]);

  const total = txns.filter(t => t.cat !== "SETTLEMENT").reduce((s, t) => s + t.amount, 0);
  const pending = txns.filter((t) => !t.settled && t.cat !== "SETTLEMENT").reduce((s, t) => s + t.amount, 0);

  const handleLogExpense = async (cat: Cat, desc: string, amt: number, paidBy: string, split: string[]) => {
    const payload = {
      missionId: undefined, // Let the backend figure it out or we need to fetch the active missionId and pass it. Wait, backend uses the active one!
      ts: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" }) + " · " + new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      cat,
      desc,
      paidBy,
      amount: amt,
      split,
      settled: false
    };
    
    // We fetch the active mission first in the backend, so we need to fix the backend POST endpoint to inject it.
    try {
      const res = await fetch("/api/ledger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchLedger();
        setLogOpen(false);
      }
    } catch(e) {}
  };

  const settleDebt = async (from: string, to: string) => {
    // A settlement is just a transaction paid by the debtor (from) to the creditor (to)
    const amount = settlements.find(s => s.from === from && s.to === to)?.amt;
    if (!amount) return;

    const payload = {
      ts: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" }) + " · " + new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      cat: "SETTLEMENT",
      desc: `DEBT RESOLUTION: ${from} TO ${to}`,
      paidBy: from,
      amount: amount,
      split: [to], // We use split[0] as the receiver in computeBalances
      settled: true
    };
    
    try {
      const res = await fetch("/api/ledger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) fetchLedger();
    } catch(e) {}
  };

  const markSettled = async (id: string) => {
    try {
      await fetch("/api/ledger", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, settled: true })
      });
      fetchLedger();
    } catch(e) {}
  };

  if (loading) {
    return <main className="min-h-screen bg-bone flex items-center justify-center mono-label">SYNCING LEDGER...</main>;
  }

  return (
    <main className="min-h-screen bg-bone text-ink">
      <TopNav />
      <Header 
        missionName={missionName}
        squadSize={squad.length}
        total={total} 
        pending={pending} 
        onLog={() => setLogOpen(true)} 
      />
      <Balances 
        me={ME}
        squad={squad}
        bal={bal} 
        settlements={settlements} 
      />
      <Transactions 
        squad={squad}
        txns={txns} 
        onSettle={markSettled} 
      />
      <Settlements
        squad={squad}
        settlements={settlements}
        onSettleDebt={settleDebt}
      />
      
      {logOpen && (
        <AnimatePresence>
          <LogModal 
            squad={squad}
            me={ME}
            onClose={() => setLogOpen(false)} 
            onSave={handleLogExpense} 
          />
        </AnimatePresence>
      )}
    </main>
  );
}
