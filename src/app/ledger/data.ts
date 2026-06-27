import { Fuel, Utensils, Tent, Wrench } from "lucide-react";

export type Cat = "FUEL" | "FOOD" | "STAY" | "GEAR" | "SETTLEMENT";
export const CAT_ICON: Record<Cat, typeof Fuel> = { FUEL: Fuel, FOOD: Utensils, STAY: Tent, GEAR: Wrench, SETTLEMENT: Wrench };

export type SquadMember = {
  call: string;
  name: string;
  color: string; // Tailwind class
};

export type Txn = {
  _id?: string;
  id?: string;
  ts: string;
  cat: Cat;
  desc: string;
  paidBy: string;
  amount: number;
  split: string[];
  settled: boolean;
};

export function inr(n: number) { return "₹" + n.toLocaleString("en-IN"); }

export function computeBalances(txns: Txn[], squad: SquadMember[]) {
  const bal: Record<string, number> = {};
  for (const s of squad) bal[s.call] = 0;
  
  for (const t of txns) {
    if (t.settled) continue;
    
    if (t.cat === "SETTLEMENT") {
      // Settlement logic: paidBy is the sender, the FIRST person in split is the receiver.
      // So paidBy balances goes UP, receiver balance goes DOWN by amount.
      if (t.split.length > 0) {
        if (bal[t.paidBy] !== undefined) bal[t.paidBy] += t.amount;
        if (bal[t.split[0]] !== undefined) bal[t.split[0]] -= t.amount;
      }
      continue;
    }
    
    // Normal expense logic
    const share = t.amount / (t.split.length || 1);
    if (bal[t.paidBy] !== undefined) bal[t.paidBy] += t.amount;
    for (const p of t.split) {
      if (bal[p] === undefined) bal[p] = 0;
      bal[p] -= share;
    }
  }
  return bal;
}

export function computeSettlements(bal: Record<string, number>) {
  const creditors = Object.entries(bal).filter(([,v]) => v > 0.5).map(([k,v]) => ({ k, v }));
  const debtors   = Object.entries(bal).filter(([,v]) => v < -0.5).map(([k,v]) => ({ k, v: -v }));
  creditors.sort((a,b) => b.v - a.v);
  debtors.sort((a,b) => b.v - a.v);
  const out: { from: string; to: string; amt: number }[] = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].v, creditors[j].v);
    out.push({ from: debtors[i].k, to: creditors[j].k, amt: Math.round(pay) });
    debtors[i].v -= pay; creditors[j].v -= pay;
    if (debtors[i].v < 0.5) i++;
    if (creditors[j].v < 0.5) j++;
  }
  return out;
}
