
"use client";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Trash2, Image as ImageIcon } from "lucide-react";
import { Panel, EmptyState, fmtAgo, type Intel } from "./shared";


export function IntelView({
  items,
  onVerify,
  onClassify,
}: {
  items: Intel[];
  onVerify: (it: Intel) => void;
  onClassify: (it: Intel) => void;
}) {
  return (
    <Panel
      code="CMD / 03"
      title="MEDIA INTEL · APPROVAL QUEUE"
      right={<span className="mono-label text-signal">{items.length} FRAMES</span>}
    >
      {items.length === 0 ? (
        <EmptyState icon={ImageIcon} label="ARCHIVE CLEAR" hint="All intel verified." />
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 [column-fill:_balance]">
          <AnimatePresence initial={false}>
            {items.map((it, i) => (
              <motion.div
                key={it.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="mb-3 break-inside-avoid hairline border-ink/60 group relative overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={it.url}
                    alt={it.id}
                    loading="lazy"
                    className="w-full block grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Top-meta strip */}
                  <div className="absolute top-0 inset-x-0 px-2 py-1 flex items-center justify-between mono-label text-bone bg-ink/70">
                    <span>#{it.id}</span>
                    <span className="text-acid">PENDING</span>
                  </div>

                  {/* Glass overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-ink/40 backdrop-blur-sm flex flex-col justify-end p-3 gap-2">
                    <div className="text-bone overflow-hidden">
                      <div className="mono-label opacity-70">CALL-SIGN</div>
                      <div className="font-display text-2xl leading-tight">{it.uploader}</div>
                      <div className="mono-label opacity-70 mt-1 flex items-center justify-between">
                        <span>{fmtAgo(it.ts)} AGO</span>
                        <span>{it.size}</span>
                      </div>
                      <div className="mt-2 text-sm font-mono opacity-90 break-words line-clamp-3">
                        "{it.caption}"
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => onClassify(it)}
                        className="hairline border-bone/70 px-2 py-1.5 mono-label text-bone hover:bg-bone hover:text-ink transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Trash2 className="h-3 w-3" />
                        CLASSIFY
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => onVerify(it)}
                        className="bg-signal px-2 py-1.5 mono-label text-bone hover:bg-bone hover:text-ink transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="h-3 w-3" />
                        VERIFY INTEL
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Footer always visible */}
                <div className="px-2 py-1.5 hairline-t border-ink/30 flex items-center justify-between mono-label">
                  <span className="opacity-70">UP · {it.uploader}</span>
                  <span className="text-signal">{fmtAgo(it.ts)}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </Panel>
  );
}

