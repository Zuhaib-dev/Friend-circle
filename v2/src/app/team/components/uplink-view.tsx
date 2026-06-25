"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileUp, Image as ImageIcon, Loader2, CheckCircle2 } from "lucide-react";
import imageCompression from "browser-image-compression";
import { Panel, type Upload } from "./shared";

type QueueItem = {
  id: string;
  file: File;
  pct: number;
  status: "WAITING" | "COMPRESSING" | "UPLOADING" | "SAVING" | "DONE" | "ERROR";
  url?: string;
  postId?: string;
  caption?: string;
  captionSaved?: boolean;
};

export function UplinkView({ onAdd, onGo }: { onAdd: (u: Upload[]) => void; onGo: () => void }) {
  const [drag, setDrag] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [phase, setPhase] = useState<"IDLE" | "PROCESSING" | "CAPTIONING">("IDLE");
  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    // Limits: Max 20 files
    const validFiles = Array.from(files)
      .slice(0, 20)
      .filter(f => f.type.startsWith("image/") && f.size <= 7 * 1024 * 1024); // max 7MB

    if (validFiles.length === 0) {
      alert("Invalid files. Must be images under 7MB.");
      return;
    }

    const newItems: QueueItem[] = validFiles.map(f => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      pct: 0,
      status: "WAITING"
    }));

    setQueue(newItems);
    setPhase("PROCESSING");
    processQueue(newItems);
  };

  const processQueue = async (items: QueueItem[]) => {
    try {
      let currentQueue = [...items];

      for (let i = 0; i < currentQueue.length; i++) {
        const item = currentQueue[i];
        
        // Compress
        updateItem(item.id, { status: "COMPRESSING", pct: 10 });
        const options = {
          maxSizeMB: 1, // aggressively compress to 1MB
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          exifOrientation: 1 // Strips EXIF by enforcing orientation
        };
        const compressedBlob = await imageCompression(item.file, options);
        const compressedFile = new File([compressedBlob], item.file.name, { type: compressedBlob.type });

        console.log(`[UPLINK] Compressed ${item.file.name}: ${(item.file.size/1024/1024).toFixed(2)}MB -> ${(compressedFile.size/1024/1024).toFixed(2)}MB`);
        
        // Get fresh ImageKit Auth for each file because signatures are single-use
        const authRes = await fetch("/api/imagekit/auth");
        if (!authRes.ok) throw new Error("Failed to get auth");
        const auth = await authRes.json();

        // Upload to ImageKit
        updateItem(item.id, { status: "UPLOADING", pct: 40 });
        
        const formData = new FormData();
        formData.append("file", compressedFile);
        formData.append("fileName", item.file.name);
        formData.append("publicKey", auth.publicKey);
        formData.append("signature", auth.signature);
        formData.append("expire", auth.expire.toString());
        formData.append("token", auth.token);

        const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          updateItem(item.id, { status: "ERROR", pct: 0 });
          continue;
        }

        const uploadData = await uploadRes.json();
        const imageUrl = uploadData.url;
        const imageKitFileId = uploadData.fileId;

        // Save to MongoDB Post collection
        updateItem(item.id, { status: "SAVING", pct: 80, url: imageUrl });

        const dbRes = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl, imageKitFileId, caption: "" })
        });

        if (!dbRes.ok) {
          updateItem(item.id, { status: "ERROR", pct: 0 });
          continue;
        }

        const dbPost = await dbRes.json();

        // Done
        updateItem(item.id, { status: "DONE", pct: 100, postId: dbPost._id });
        
        // Add to uplink overview
        onAdd([{
          id: dbPost._id,
          name: item.file.name,
          url: imageUrl,
          size: compressedFile.size,
          ts: Date.now(),
          status: "PENDING" // since team members upload as pending
        }]);
      }

      // Automatically move to captioning phase if at least one succeeded
      setPhase("CAPTIONING");

    } catch (err) {
      console.error(err);
      alert("An error occurred during processing.");
      setPhase("IDLE");
    }
  };

  const updateItem = (id: string, updates: Partial<QueueItem>) => {
    setQueue(q => q.map(x => x.id === id ? { ...x, ...updates } : x));
  };

  const saveCaption = async (id: string, postId: string, caption: string) => {
    try {
      const res = await fetch("/api/posts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, caption })
      });
      if (res.ok) {
        updateItem(id, { captionSaved: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (phase === "CAPTIONING") {
    return (
      <Panel code="UL / 02" title="POST-UPLOAD · INTEL LOGGING">
        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scroll">
          <div className="mono-label opacity-60 bg-signal/10 text-signal px-3 py-2 border border-signal/20">
            TRANSMISSION SUCCESSFUL. PLEASE ATTACH CONTEXT TO INTEL BEFORE DISCONNECTING.
          </div>
          
          {queue.filter(q => q.status === "DONE").map(q => (
            <div key={q.id} className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 hairline border-ink p-4 bg-bone">
              <img src={q.url} alt="" className="w-full h-32 object-cover hairline border-ink" />
              <div className="flex flex-col gap-2">
                <div className="mono-label truncate opacity-70">{q.file.name}</div>
                <textarea 
                  disabled={q.captionSaved}
                  rows={3}
                  value={q.caption || ""}
                  onChange={(e) => updateItem(q.id, { caption: e.target.value })}
                  placeholder="Enter intel description/caption here..."
                  className="w-full bg-transparent hairline border-ink px-3 py-2 font-mono text-sm resize-none focus:ring-1 focus:ring-signal focus:outline-none disabled:opacity-50"
                />
                <div className="flex justify-end">
                  {q.captionSaved ? (
                    <div className="mono-label text-signal flex items-center gap-1.5 px-3 py-1.5 hairline border-signal/30 bg-signal/5">
                      <CheckCircle2 className="h-3 w-3" /> SAVED TO DB
                    </div>
                  ) : (
                    <button 
                      onClick={() => q.postId && saveCaption(q.id, q.postId, q.caption || "")}
                      className="brick px-4 py-1.5 mono-label text-bone hover:bg-signal transition-colors"
                    >
                      LOG CAPTION
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 flex justify-end">
            <button 
              onClick={() => { setPhase("IDLE"); setQueue([]); }}
              className="hairline border-ink px-6 py-2 mono-label hover:bg-ink hover:text-bone transition-colors"
            >
              FINISH & RETURN TO DOSSIER
            </button>
          </div>
        </div>
      </Panel>
    );
  }

  return (
    <Panel code="UL / 01" title="UPLINK · SECURE FILE TRANSFER">
      <motion.div
        onDragEnter={(e) => { e.preventDefault(); setDrag(true); }}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => phase === "IDLE" && inputRef.current?.click()}
        animate={{
          backgroundColor: drag ? "oklch(0.88 0.2 110 / 0.25)" : "transparent",
        }}
        className={`relative cursor-pointer border border-dashed border-ink p-10 md:p-14 text-center overflow-hidden group ${phase !== "IDLE" ? "opacity-50 pointer-events-none" : ""}`}
      >
        <AnimatePresence>
          {drag && (
            <motion.span
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-x-0 h-12 bg-linear-to-b from-transparent via-signal/30 to-transparent"
            />
          )}
        </AnimatePresence>

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
          {drag ? "TARGET LOCKED" : phase === "PROCESSING" ? "TRANSMITTING..." : "DROP ZONE / IDLE"}
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
            MAX 7MB / IMAGE · 20 BATCH LIMIT
          </div>
          <motion.button
            disabled={phase !== "IDLE"}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="brick px-4 py-2 mono-label text-bone hover:bg-signal transition-colors disabled:opacity-50"
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

      {queue.length > 0 && phase === "PROCESSING" && (
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
                <div className="h-10 w-10 hairline border-ink/40 grid place-items-center shrink-0">
                  {q.url ? <img src={q.url} className="w-full h-full object-cover" /> : <ImageIcon className="h-4 w-4 opacity-60" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mono-label">
                    <span className="truncate">{q.file.name}</span>
                    <span className="text-signal tabular-nums">{q.status} · {Math.round(q.pct)}%</span>
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
        <div className="mono-label opacity-60 flex items-center gap-2">
           PAYLOAD ENCRYPTED <Loader2 className={`h-3 w-3 ${phase === "PROCESSING" ? "animate-spin text-signal" : ""}`} />
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onGo}
          className="hairline border-ink px-3 py-1.5 mono-label hover:bg-ink hover:text-bone transition-colors"
        >
          GO TO DOSSIER →
        </motion.button>
      </div>
    </Panel>
  );
}
