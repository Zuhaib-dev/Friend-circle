import { Fuel, Utensils, Tent, Wrench } from "lucide-react";

export type Cat = "FUEL" | "FOOD" | "STAY" | "GEAR";
export const CAT_ICON: Record<Cat, typeof Fuel> = { FUEL: Fuel, FOOD: Utensils, STAY: Tent, GEAR: Wrench };

export const SQUAD = [
  { call: "ALPHA",   name: "Faizan", color: "bg-signal" },
  { call: "BRAVO",   name: "Owais",  color: "bg-acid" },
  { call: "CHARLIE", name: "Hamid",  color: "bg-ink" },
  { call: "DELTA",   name: "Junaid", color: "bg-signal" },
  { call: "ECHO",    name: "Suhail", color: "bg-acid" },
] as const;

export const ME = "ALPHA";

export type Txn = {
  id: string; ts: string; cat: Cat; desc: string;
  paidBy: string; amount: number; split: string[]; settled: boolean;
};

export const TXNS: Txn[] = [
  { id: "T-0411", ts: "27/06 · 14:32", cat: "FUEL", desc: "TOP-UP // SONAMARG CHECKPOINT", paidBy: "BRAVO",   amount: 4200, split: ["ALPHA","BRAVO","CHARLIE","DELTA","ECHO"], settled: false },
  { id: "T-0410", ts: "27/06 · 12:10", cat: "FOOD", desc: "WAZWAN // DAL LAKE CANTEEN",   paidBy: "ALPHA",   amount: 3600, split: ["ALPHA","BRAVO","CHARLIE","DELTA"],        settled: false },
  { id: "T-0409", ts: "26/06 · 22:48", cat: "STAY", desc: "TENT PERMIT // PAHALGAM 9K",   paidBy: "CHARLIE", amount: 5000, split: ["ALPHA","BRAVO","CHARLIE","DELTA","ECHO"], settled: false },
  { id: "T-0408", ts: "26/06 · 17:05", cat: "GEAR", desc: "RECOVERY STRAP // EMERGENCY",  paidBy: "DELTA",   amount: 1800, split: ["ALPHA","DELTA","ECHO"],                   settled: true  },
  { id: "T-0407", ts: "26/06 · 09:14", cat: "FUEL", desc: "DIESEL // QAZIGUND PUMP-04",   paidBy: "BRAVO",   amount: 3000, split: ["ALPHA","BRAVO","CHARLIE","DELTA","ECHO"], settled: true  },
  { id: "T-0406", ts: "25/06 · 20:22", cat: "FOOD", desc: "TUJJI + KAHWA // SRINAGAR",    paidBy: "ECHO",    amount: 1400, split: ["ALPHA","BRAVO","ECHO"],                   settled: false },
];

export function inr(n: number) { return "₹" + n.toLocaleString("en-IN"); }

export function computeBalances(txns: Txn[]) {
  const bal: Record<string, number> = {};
  for (const s of SQUAD) bal[s.call] = 0;
  for (const t of txns) {
    if (t.settled) continue;
    const share = t.amount / t.split.length;
    bal[t.paidBy] += t.amount;
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
