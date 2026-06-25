
"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileUp, Image as ImageIcon } from "lucide-react";
import { Panel, type Upload } from "./shared";


export function UplinkView({ onAdd, onGo }: { onAdd: (u: Upload[]) => void; onGo: () => void }) {
  const [drag, setDrag] = useState(false);
  const [queue, setQueue] = useState<{ id: string; name: string; size: number; pct: number; url?: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).slice(0, 12).forEach((f) => {
      if (!f.type.startsWith("image/")) return;
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const reader = new FileReader();
      reader.onload = () => {
        const url = String(reader.result);
        // simulate upload tick
        let pct = 0;
        const tick = setInterval(() => {
          pct += Math.random() * 18 + 6;
          if (pct >= 100) {
            pct = 100;
            clearInterval(tick);
            // commit
            onAdd([
              {
                id,
                name: f.name,
                url,
                size: f.size,
                ts: Date.now(),
                status: Math.random() > 0.4 ? "VERIFIED" : "PENDING",
              },
            ]);
            setTimeout(() => setQueue((q) => q.filter((x) => x.id !== id)), 800);
          }
          setQueue((q) => q.map((x) => (x.id === id ? { ...x, pct, url } : x)));
        }, 220);
      };
      reader.readAsDataURL(f);
      setQueue((q) => [...q, { id, name: f.name, size: f.size, pct: 0 }]);
    });
  };

  return (
    <>
      <Panel code="UL / 01" title="UPLINK · SECURE FILE TRANSFER">
        <motion.div
          onDragEnter={(e) => { e.preventDefault(); setDrag(true); }}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          animate={{
            backgroundColor: drag ? "oklch(0.88 0.2 110 / 0.25)" : "transparent",
          }}
          className="relative cursor-pointer border border-dashed border-ink p-10 md:p-14 text-center overflow-hidden group"
        >
          {/* scanning radar bar */}
          <AnimatePresence>
            {drag && (
              <motion.span
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-signal/30 to-transparent"
              />
            )}
          </AnimatePresence>

          {/* corner pulse */}
          <motion.span
            className="absolute top-2 left-2 h-2 w-2 bg-signal rounded-full"
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <motion.span
            className="absolute top-2 right-2 mono-label text-signal"
            animate={{ opacity: drag ? [1, 0.3, 1] : 1 }}
            transition={{ duration: 0.6, repeat: drag ? Infinity : 0 }}
          >
            {drag ? "TARGET LOCKED" : "DROP ZONE / IDLE"}
          </motion.span>

          <motion.div
            animate={{ y: drag ? -4 : 0 }}
            className="flex flex-col items-center gap-3"
          >
            <motion.div
              animate={{ rotate: drag ? [0, 8, -8, 0] : 0 }}
              transition={{ duration: 0.6, repeat: drag ? Infinity : 0 }}
              className="hairline border-ink p-3 brick"
            >
              <FileUp className="h-7 w-7 text-bone" />
            </motion.div>
            <div className="display-num text-3xl md:text-4xl">DROP FILES TO TRANSMIT</div>
            <div className="mono-label opacity-70">
              .JPG · .PNG · .WEBP · MAX 12 FILES / BATCH
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              className="brick px-4 py-2 mono-label text-bone hover:bg-signal transition-colors"
            >
              SELECT FROM DISK →
            </motion.button>
          </motion.div>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </motion.div>

        {/* Queue */}
        {queue.length > 0 && (
          <div className="mt-5 space-y-2">
            <div className="mono-label opacity-60">// ACTIVE TRANSMISSIONS · {queue.length}</div>
            {queue.map((q) => {
              const blocks = 20;
              const filled = Math.round((q.pct / 100) * blocks);
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hairline border-ink p-3 flex items-center gap-3"
                >
                  {q.url ? (
                    <img src={q.url} alt="" className="h-10 w-10 object-cover hairline border-ink/40" />
                  ) : (
                    <div className="h-10 w-10 hairline border-ink/40 grid place-items-center">
                      <ImageIcon className="h-4 w-4 opacity-60" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mono-label">
                      <span className="truncate">{q.name}</span>
                      <span className="text-signal tabular-nums">{Math.round(q.pct)}%</span>
                    </div>
                    <div className="mt-1 font-mono text-xs tracking-tight leading-none flex">
                      <span className="text-ink">[</span>
                      <span className="text-signal whitespace-pre">{"|".repeat(filled)}</span>
                      <span className="text-ink/30 whitespace-pre">{" ".repeat(blocks - filled).replace(/ /g, "·")}</span>
                      <span className="text-ink">]</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 hairline-t border-ink/30 pt-3">
          <div className="mono-label opacity-60">PAYLOAD ENCRYPTED · AES-256 · CHANNEL 433.92</div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onGo}
            className="hairline border-ink px-3 py-1.5 mono-label hover:bg-ink hover:text-bone transition-colors"
          >
            GO TO DOSSIER →
          </motion.button>
        </div>
      </Panel>
    </>
  );
}

