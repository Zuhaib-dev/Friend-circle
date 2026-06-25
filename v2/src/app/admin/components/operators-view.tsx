
"use client";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, Inbox } from "lucide-react";
import { Panel, EmptyState, fmtAgo, type Operator } from "./shared";


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
              <motion.div
                key={op.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 300, transition: { duration: 0.3 } }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="hairline border-ink/40 group relative overflow-hidden"
              >
                <motion.span
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-signal"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  style={{ transformOrigin: "top" }}
                />
                <div className="grid grid-cols-2 md:grid-cols-[100px_1fr_1fr_80px_220px] gap-3 items-center px-3 py-3">
                  <span className="mono-label opacity-70">{op.id}</span>
                  <div className="min-w-0">
                    <div className="font-display text-lg leading-tight truncate">
                      {op.callsign}
                    </div>
                    <div className="mono-label opacity-60 truncate">{op.name}</div>
                  </div>
                  <span className="mono-label opacity-80 truncate">{op.email}</span>
                  <span className="mono-label text-signal">{fmtAgo(op.ts)}</span>
                  <div className="col-span-2 md:col-span-1 flex gap-2 justify-end">
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </Panel>
  );
}

