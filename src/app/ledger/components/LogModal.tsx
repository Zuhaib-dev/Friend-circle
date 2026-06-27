"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Check, X, Plus } from "lucide-react";
import { Cat, SquadMember } from "../data";
import { Crosshairs } from "@/components/auth-shell";

export function LogModal({ 
  me,
  squad,
  onClose, 
  onSave 
}: { 
  me: string;
  squad: SquadMember[];
  onClose: () => void; 
  onSave: (cat: Cat, desc: string, amt: number, paidBy: string, split: string[]) => void;
}) {
  const [cat, setCat] = useState<Cat>("FUEL");
  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState("");
  const [paidBy, setPaidBy] = useState<string>(me || (squad[0]?.call ?? "ALPHA"));
  const [split, setSplit] = useState<string[]>(squad.map(s => s.call));

  const toggleSplit = (call: string) => {
    if (split.includes(call)) setSplit(split.filter(s => s !== call));
    else setSplit([...split, call]);
  };

  const handleSave = () => {
    if (!desc || !amt || isNaN(Number(amt)) || split.length === 0) return;
    onSave(cat, desc, Number(amt), paidBy, split);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-bone hairline border-ink w-full max-w-md p-6 relative crosshair my-8"
      >
        <Crosshairs />
        <button onClick={onClose} className="absolute top-4 right-4 mono-label hover:text-signal p-2 flex items-center gap-1"><X className="h-4 w-4" /> CLOSE</button>
        
        <div className="mono-label opacity-60 mb-2">LOG / NEW · TRANSACTION INTAKE</div>
        
        <div className="space-y-6 mt-6">
          {/* CATEGORY */}
          <div>
            <label className="mono-label opacity-60 block mb-2">CATEGORY</label>
            <div className="grid grid-cols-4 gap-2">
              {(["FUEL", "FOOD", "STAY", "GEAR"] as Cat[]).map(c => (
                <button 
                  key={c}
                  onClick={() => setCat(c)}
                  className={`hairline border-ink py-2 mono-label text-xs transition-colors ${cat === c ? "bg-ink text-bone" : "bg-bone hover:bg-acid/20"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="mono-label opacity-60 block mb-2">DESCRIPTION</label>
            <input 
              type="text" 
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="DIESEL // SONAMARG"
              className="w-full hairline border-ink bg-bone px-3 py-2.5 font-mono text-sm uppercase placeholder:opacity-30 focus:bg-acid/10 focus:outline-none"
            />
          </div>

          {/* AMOUNT */}
          <div>
            <label className="mono-label opacity-60 block mb-2">AMOUNT ₹</label>
            <input 
              type="number" 
              value={amt}
              onChange={e => setAmt(e.target.value)}
              placeholder="0000"
              className="w-full hairline border-ink bg-bone px-3 py-2.5 font-display text-2xl placeholder:opacity-30 focus:bg-acid/10 focus:outline-none"
            />
          </div>

          {/* PAID BY */}
          <div>
            <label className="mono-label opacity-60 block mb-2">PAID BY</label>
            <div className="flex flex-wrap gap-2">
              {squad.map(s => (
                <button 
                  key={s.call}
                  onClick={() => setPaidBy(s.call)}
                  className={`hairline border-ink px-3 py-1.5 mono-label text-xs transition-colors ${paidBy === s.call ? "bg-ink text-bone" : "bg-bone hover:bg-acid/20"}`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* SPLIT BETWEEN */}
          <div className="hairline-t border-ink/40 pt-4">
            <div className="flex items-center justify-between mb-3">
              <label className="mono-label opacity-60">SPLIT BETWEEN</label>
              <span className="mono-label">{split.length} UNIT(S)</span>
            </div>
            
            <div className="space-y-2">
              {squad.map(s => {
                const checked = split.includes(s.call);
                return (
                  <button 
                    key={s.call}
                    onClick={() => toggleSplit(s.call)}
                    className="w-full flex items-center gap-3 p-2 hairline border-ink bg-bone hover:bg-acid/10 transition-colors text-left group"
                  >
                    <div className={`h-4 w-4 shrink-0 hairline border-ink flex items-center justify-center transition-colors ${checked ? "bg-ink" : "bg-bone"}`}>
                      {checked && <Check className="h-3 w-3 text-bone" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center hairline border-ink mono-label text-bone ${s.color} h-6 w-6 text-[8px]`}>
                        {s.call.slice(0, 2)}
                      </span>
                      <span className={`font-mono text-xs uppercase tracking-wider ${!checked && "opacity-50"}`}>
                        {s.name} · {s.call}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={!desc || !amt || isNaN(Number(amt)) || split.length === 0}
            className="w-full brick text-bone py-3.5 mono-label flex items-center justify-center gap-2 hover:bg-signal transition-colors disabled:opacity-50 disabled:hover:bg-ink"
          >
            {(!desc || !amt || split.length === 0) ? "AWAITING INPUT" : <><Plus className="h-4 w-4" /> CONFIRM · LOG TRANSACTION</>}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
