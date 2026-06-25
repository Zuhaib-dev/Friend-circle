
"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Clock, Trash2, Radar } from "lucide-react";
import { Panel, type Upload } from "./shared";


export function DossierView({ uploads, setUploads }: { uploads: Upload[]; setUploads: (u: Upload[]) => void }) {
  const [filter, setFilter] = useState<"ALL" | "VERIFIED" | "PENDING">("ALL");

  const filtered = uploads.filter((u) => (filter === "ALL" ? true : u.status === filter));

  const remove = (id: string) => setUploads(uploads.filter((u) => u.id !== id));
  const toggle = (id: string) =>
    setUploads(uploads.map((u) => (u.id === id ? { ...u, status: u.status === "VERIFIED" ? "PENDING" : "VERIFIED" } : u)));

  return (
    <Panel
      code="DS / 01"
      title="DOSSIER · CLASSIFIED MEDIA ARCHIVE"
      right={
        <div className="flex items-center gap-1">
          {(["ALL", "VERIFIED", "PENDING"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`mono-label px-2 py-[2px] hairline transition-colors ${
                filter === f ? "brick text-bone border-ink" : "border-ink/30 hover:bg-ink hover:text-bone"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      }
    >
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <Radar className="h-10 w-10 mx-auto opacity-40" />
          <div className="display-num text-3xl mt-3">ARCHIVE EMPTY</div>
          <div className="mono-label opacity-60 mt-1">// initiate UPLINK to populate dossier</div>
        </div>
      ) : (
        <div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 [column-fill:_balance]"
        >
          {filtered.map((u, i) => (
            <motion.figure
              key={u.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i, 12) * 0.04, ease: "easeOut" }}
              className="break-inside-avoid mb-3 group relative hairline border-ink bg-bone overflow-hidden"
            >
              <div className="relative">
                <img src={u.url} alt={u.name} className="w-full h-auto block" />
                {/* scan sweep */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-signal opacity-0 group-hover:opacity-100 animate-scan" />
                {/* status chip */}
                <span className={`absolute top-2 left-2 mono-label px-2 py-[2px] hairline border-ink ${
                  u.status === "VERIFIED" ? "bg-acid text-ink" : "bg-bone text-ink"
                }`}>
                  {u.status === "VERIFIED" ? "✓ VERIFIED" : "◌ PENDING"}
                </span>
              </div>

              {/* hover overlay */}
              <motion.div
                initial={false}
                className="absolute inset-0 bg-ink/85 text-bone opacity-0 group-hover:opacity-100 transition-opacity flex flex-col"
              >
                <div className="p-3 hairline-b border-bone/30 flex items-center justify-between mono-label">
                  <span>{new Date(u.ts).toISOString().slice(0, 16).replace("T", " · ")}</span>
                  <span className="text-signal flex items-center gap-1">
                    {u.status === "VERIFIED" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                    {u.status}
                  </span>
                </div>
                <div className="p-3 flex-1">
                  <div className="mono-label opacity-60">FILE</div>
                  <div className="font-mono text-xs truncate">{u.name}</div>
                  <div className="mt-3 grid grid-cols-2 gap-2 mono-label">
                    <span className="hairline border-bone/40 px-2 py-1 flex justify-between"><span className="opacity-60">SIZE</span><span>{(u.size / 1024).toFixed(0)}KB</span></span>
                    <span className="hairline border-bone/40 px-2 py-1 flex justify-between"><span className="opacity-60">ID</span><span className="truncate">{u.id.slice(-6).toUpperCase()}</span></span>
                  </div>
                </div>
                <div className="hairline-t border-bone/30 grid grid-cols-2">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggle(u.id)}
                    className="mono-label px-3 py-2.5 hover:bg-acid hover:text-ink transition-colors hairline-r border-bone/30 flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="h-3 w-3" /> TOGGLE
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => remove(u.id)}
                    className="mono-label px-3 py-2.5 hover:bg-signal hover:text-bone transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="h-3 w-3" /> PURGE
                  </motion.button>
                </div>
              </motion.div>
            </motion.figure>
          ))}
        </div>
      )}
    </Panel>
  );
}

