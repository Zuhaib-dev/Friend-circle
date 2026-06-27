"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, Inbox, ChevronDown, ChevronUp, ExternalLink, Phone } from "lucide-react";
import { Panel, EmptyState, fmtAgo, type Operator } from "./shared";
import Image from "next/image";

export function OperatorsView({
  operators,
  onGrant,
  onPurge,
}: {
  operators: Operator[];
  onGrant: (op: Operator) => void;
  onPurge: (op: Operator) => void;
}) {
  return (
    <Panel
      code="CMD / 02"
      title="OPERATOR VERIFICATION"
      right={<span className="mono-label text-signal">{operators.length} PENDING</span>}
    >
      {operators.length === 0 ? (
        <EmptyState icon={Inbox} label="QUEUE CLEAR" hint="No pending enlistments." />
      ) : (
        <div className="space-y-2">
          {/* Header row */}
          <div className="hidden md:grid grid-cols-[100px_1fr_1fr_80px_220px] gap-3 px-3 py-2 hairline-b border-ink/40 mono-label opacity-60">
            <span>ID</span>
            <span>CALL-SIGN / NAME</span>
            <span>EMAIL</span>
            <span>RECVD</span>
            <span className="text-right">ACTION</span>
          </div>

          <AnimatePresence initial={false}>
            {operators.map((op) => (
              <OperatorRow key={op.id} op={op} onGrant={onGrant} onPurge={onPurge} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </Panel>
  );
}

function OperatorRow({ 
  op, 
  onGrant, 
  onPurge 
}: { 
  op: Operator; 
  onGrant: (op: Operator) => void; 
  onPurge: (op: Operator) => void; 
}) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 300, transition: { duration: 0.3 } }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="hairline border-ink/40 group relative overflow-hidden flex flex-col"
    >
      <motion.span
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-signal"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        style={{ transformOrigin: "top" }}
      />
      <div 
        className="grid grid-cols-2 md:grid-cols-[100px_1fr_1fr_80px_220px] gap-3 items-center px-3 py-3 cursor-pointer hover:bg-ink/5"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="mono-label opacity-70 flex items-center gap-1">
          {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          OP-{op.id.slice(-5).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="font-display text-lg leading-tight truncate">
            {op.callsign}
          </div>
          <div className="mono-label opacity-60 truncate">{op.name}</div>
        </div>
        <span className="mono-label opacity-80 truncate">{op.email}</span>
        <span className="mono-label text-signal">{fmtAgo(op.ts)}</span>
        <div className="col-span-2 md:col-span-1 flex gap-2 justify-end" onClick={e => e.stopPropagation()}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onPurge(op)}
            className="hairline border-ink px-2.5 py-1.5 mono-label hover:bg-ink hover:text-bone transition-colors flex items-center gap-1.5"
          >
            <XCircle className="h-3 w-3" />
            PURGE
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onGrant(op)}
            className="brick px-2.5 py-1.5 mono-label text-bone hover:bg-signal hover:border-signal transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="h-3 w-3" />
            GRANT CLEARANCE
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-ink/5 hairline-t border-ink/20 flex flex-col md:flex-row gap-6">
              {op.image ? (
                <div className="shrink-0 w-32 h-40">
                  <Image src={op.image} alt="Avatar" width={128} height={160} className="object-cover grayscale hairline border-ink aspect-3/4 h-full w-full" />
                </div>
              ) : (
                <div className="shrink-0 w-32 h-40 bg-ink/10 hairline border-ink/20 flex flex-col items-center justify-center mono-label text-[10px] opacity-40">
                  NO IMAGE
                </div>
              )}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="mono-label opacity-50 mb-1 text-[10px]">OPERATOR BIO / SUMMARY</div>
                  <p className="font-mono text-sm leading-relaxed whitespace-pre-wrap opacity-90">
                    {op.bio || "No summary provided."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  {op.phone && (
                    <div className="flex items-center gap-1.5 mono-label text-xs">
                      <Phone className="h-3 w-3 text-signal" />
                      {op.phone}
                    </div>
                  )}
                  {op.socialHandle && (
                    <div className="flex items-center gap-1.5 mono-label text-xs">
                      <ExternalLink className="h-3 w-3 text-signal" />
                      <a href={op.socialHandle.startsWith('http') ? op.socialHandle : `https://instagram.com/${op.socialHandle.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="hover:text-signal hover:underline">
                        {op.socialHandle}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
