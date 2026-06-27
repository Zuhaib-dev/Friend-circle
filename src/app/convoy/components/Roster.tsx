"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Bike, Car, Crosshair, Phone, Shield, Truck } from "lucide-react";
import { Crosshairs } from "@/components/auth-shell";
import { Operator, Rig } from "../data";

const RIG_ICON: Record<Rig, typeof Bike> = { BIKE: Bike, CAR: Car, TRUCK: Truck };

export function OperatorCard({ op, index }: { op: Operator; index: number }) {
  const [flip, setFlip] = useState(false);
  const RigIcon = RIG_ICON[op.rig];
  const isLead = op.role === "LEAD";

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(i_delay(index), 0.35), ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setFlip(true)}
      onHoverEnd={() => setFlip(false)}
      onFocus={() => setFlip(true)}
      onBlur={() => setFlip(false)}
      tabIndex={0}
      className="group hairline border-ink bg-bone crosshair outline-none focus-visible:bg-acid/20"
    >
      <Crosshairs />
      <header className="hairline-b border-ink flex items-center justify-between px-2.5 py-1.5">
        <span className="mono-label opacity-60">{op.id}</span>
        <span className="flex items-center gap-1.5">
          {isLead && (
            <span className="mono-label text-signal flex items-center gap-1">
              <Shield className="h-3 w-3" /> LEAD
            </span>
          )}
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
        </span>
      </header>

      <div className="grid grid-cols-[88px_1fr]">
        {/* Avatar */}
        <div className="relative aspect-square overflow-hidden bg-ink hairline-r border-ink">
          {op.img && (
            <img
              src={op.img}
              alt={op.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover grayscale opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
            />
          )}
          <div className="absolute top-1 left-1 mono-label text-bone/80 flex items-center gap-1">
            <Crosshair className="h-2.5 w-2.5 text-signal" />
          </div>
          <span className="absolute top-0 left-0 h-1.5 w-1.5 border-t border-l border-bone/70" />
          <span className="absolute top-0 right-0 h-1.5 w-1.5 border-t border-r border-bone/70" />
          <span className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-bone/70" />
          <span className="absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-bone/70" />
        </div>

        {/* Info / Flip */}
        <div className="relative min-h-[88px]">
          <AnimatePresence mode="wait" initial={false}>
            {!flip ? (
              <motion.div
                key="front"
                initial={{ opacity: 0, rotateX: -25 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: 25 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 p-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg leading-none uppercase truncate">{op.name}</h3>
                    <span className="mono-label text-signal shrink-0">[{op.callsign}]</span>
                  </div>
                  <div className="mono-label opacity-60 mt-1">{op.role} · {op.pickup}</div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 mono-label">
                    <RigIcon className="h-3.5 w-3.5 text-signal" />
                    <span className="truncate">{op.vehicle}</span>
                  </span>
                  <span className="mono-label opacity-50 hidden sm:inline">{op.plate}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ opacity: 0, rotateX: 25 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: -25 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 p-2.5 bg-ink text-bone flex flex-col justify-between"
              >
                <div>
                  <div className="mono-label text-signal flex items-center gap-1.5">
                    <AlertTriangle className="h-3 w-3" /> ICE / EMERGENCY
                  </div>
                  <div className="font-display text-lg mt-1 leading-none uppercase">{op.ice.name}</div>
                </div>
                <a
                  href={`tel:${op.ice.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-between gap-2 hairline border-bone/40 px-2 py-1 hover:bg-signal hover:border-signal transition-colors"
                >
                  <span className="flex items-center gap-1.5 mono-label">
                    <Phone className="h-3 w-3" /> DIAL
                  </span>
                  <span className="font-mono text-xs tracking-wider">{op.ice.phone}</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

function i_delay(i: number) {
  return i * 0.04;
}
