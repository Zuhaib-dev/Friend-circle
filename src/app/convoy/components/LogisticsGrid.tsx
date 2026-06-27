"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Check, Fuel, Gauge, MapPin, Route as RouteIcon, Thermometer, Zap } from "lucide-react";
import { Panel } from "./Shared";
import { FOOD_DUTIES, PRAYERS, ROSTER, WAYPOINTS } from "../data";
import { Crosshairs } from "@/components/auth-shell";

export function WaypointPanel() {
  const WP_KIND_COLOR: Record<string, string> = {
    RALLY: "bg-signal",
    PICKUP: "bg-ink",
    FUEL: "bg-acid",
    BREAK: "bg-ink/50",
    OBJ: "bg-signal",
  };

  return (
    <Panel code="RT-01" title="Route Waypoints" right={`${WAYPOINTS.length} STOPS`}>
      <ol className="relative pl-6">
        <span className="absolute left-[7px] top-1 bottom-1 w-px bg-ink/30" />
        {WAYPOINTS.map((w, i) => (
          <motion.li
            key={w.code}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="relative pb-3 last:pb-0 group"
          >
            <span
              className={`absolute -left-px top-1.5 h-3.5 w-3.5 hairline border-ink ${WP_KIND_COLOR[w.kind] || "bg-bone"}`}
            />
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="mono-label opacity-50">{w.code}</span>
                <span className="font-display text-base truncate">{w.name}</span>
              </div>
              <div className="mono-label opacity-70 flex items-center gap-2 shrink-0">
                <span className="text-signal">{w.kind}</span>
                <span>·</span>
                <span>{w.time}</span>
                <span>·</span>
                <span>{w.km}KM</span>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </Panel>
  );
}

export function FuelPanel({ total, perHead, km }: { total: number; perHead: number; km: number }) {
  const cap = 18000;
  const pct = Math.min(100, Math.round((total / cap) * 100));
  return (
    <Panel code="FL-02" title="Fuel Split" right={`₹ ${total.toLocaleString()}`}>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <FuelStat label="DIST RT" value={`${km * 2}KM`} icon={RouteIcon} />
        <FuelStat label="PER HEAD" value={`₹${perHead}`} icon={Gauge} />
        <FuelStat label="UNITS" value={ROSTER.length.toString()} icon={Fuel} />
      </div>

      <div className="mono-label flex items-center justify-between mb-1.5">
        <span className="opacity-60">BUDGET / CAP</span>
        <span className="text-signal">{pct}%</span>
      </div>
      <div className="hairline border-ink h-3 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-signal relative"
        >
          <span className="absolute inset-y-0 right-0 w-px bg-bone animate-blink" />
        </motion.div>
        <div className="absolute inset-0 tick opacity-30 pointer-events-none" />
      </div>
      <div className="mono-label opacity-50 mt-1.5 flex justify-between">
        <span>₹0</span>
        <span>CAP ₹{cap.toLocaleString()}</span>
      </div>

      <div className="hairline-t border-ink/40 mt-4 pt-3 grid grid-cols-2 gap-2">
        {ROSTER.slice(0, 4).map((o) => (
          <div key={o.id} className="flex items-center justify-between mono-label">
            <span className="opacity-70 truncate">{o.callsign}</span>
            <span className="text-ink">₹{perHead}</span>
          </div>
        ))}
        {ROSTER.length > 4 && (
          <div className="col-span-2 mono-label opacity-50">+ {ROSTER.length - 4} MORE OPERATORS</div>
        )}
      </div>
    </Panel>
  );
}

function FuelStat({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Fuel }) {
  return (
    <div className="hairline border-ink p-2">
      <div className="flex items-center gap-1.5 mono-label opacity-60">
        <Icon className="h-3 w-3 text-signal" /> {label}
      </div>
      <div className="font-display text-xl mt-0.5">{value}</div>
    </div>
  );
}

export function FoodPanel() {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const total = FOOD_DUTIES.length;
  const ok = Object.values(done).filter(Boolean).length;
  return (
    <Panel
      code="FD-03"
      title="Food Duties"
      right={`${ok.toString().padStart(2, "0")}/${total.toString().padStart(2, "0")}`}
    >
      <ul className="divide-y divide-ink/15">
        {FOOD_DUTIES.map((f, i) => {
          const checked = !!done[i];
          return (
            <li key={f.item}>
              <button
                type="button"
                onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
                className="w-full min-h-[44px] flex items-center gap-3 py-2.5 px-1 group hover:bg-acid/15 transition-colors text-left"
              >
                <motion.span
                  whileTap={{ scale: 0.88 }}
                  className={`h-5 w-5 shrink-0 hairline border-ink flex items-center justify-center ${
                    checked ? "bg-signal border-signal" : "bg-bone"
                  }`}
                >
                  <AnimatePresence>
                    {checked && (
                      <motion.span
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="h-3.5 w-3.5 text-bone" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>
                <span className="flex-1 min-w-0 relative">
                  <span
                    className={`font-display text-base truncate block transition-colors ${
                      checked ? "opacity-40" : ""
                    }`}
                  >
                    {f.item}
                  </span>
                  <motion.span
                    initial={false}
                    animate={{ scaleX: checked ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 right-0 top-1/2 h-px bg-ink origin-left"
                  />
                </span>
                {f.crit && !checked && (
                  <span className="mono-label text-signal flex items-center gap-1 shrink-0">
                    <AlertTriangle className="h-3 w-3" /> CRIT
                  </span>
                )}
                <span className="mono-label opacity-60 shrink-0">[{f.who}]</span>
              </button>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

export function PrayerPanel() {
  return (
    <Panel code="PR-04" title="Prayer Stops" right="SALAH SYNC">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {PRAYERS.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.code}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="hairline border-ink p-2.5 bg-bone hover:bg-acid/15 transition-colors crosshair"
            >
              <Crosshairs />
              <div className="flex items-center justify-between">
                <span className="mono-label">{p.code}</span>
                <Icon className="h-3.5 w-3.5 text-signal" />
              </div>
              <div className="font-display text-xl mt-1 leading-none">{p.time}</div>
              <div className="mono-label opacity-60 mt-1.5 flex items-center gap-1">
                <MapPin className="h-2.5 w-2.5" /> {p.wp}
              </div>
              <div className="mono-label text-signal mt-0.5">{p.status}</div>
            </motion.div>
          );
        })}
      </div>
      <div className="mono-label opacity-60 mt-3 flex items-center gap-2">
        <Thermometer className="h-3 w-3 text-signal" />
        AUTO-SYNCED · QIBLA 274° · GMT+05:30
      </div>
    </Panel>
  );
}

export function GearPanel({ title, code, items }: { title: string; code: string; items: string[] }) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const ok = Object.values(done).filter(Boolean).length;
  return (
    <Panel
      code={code}
      title={title}
      right={`${ok.toString().padStart(2, "0")}/${items.length.toString().padStart(2, "0")}`}
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        {items.map((g, i) => {
          const checked = !!done[i];
          return (
            <li key={g}>
              <button
                type="button"
                onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
                className="w-full min-h-[44px] flex items-center gap-2.5 py-1.5 px-1 group hover:bg-acid/15 transition-colors text-left"
              >
                <motion.span
                  whileTap={{ scale: 0.85 }}
                  className={`h-4 w-4 shrink-0 hairline border-ink flex items-center justify-center ${
                    checked ? "bg-ink" : "bg-bone"
                  }`}
                >
                  <AnimatePresence>
                    {checked && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check className="h-3 w-3 text-bone" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>
                <span className="flex-1 min-w-0 relative">
                  <span
                    className={`font-mono text-[13px] tracking-wide truncate block ${
                      checked ? "opacity-40" : ""
                    }`}
                  >
                    {g}
                  </span>
                  <motion.span
                    initial={false}
                    animate={{ scaleX: checked ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 right-0 top-1/2 h-px bg-ink origin-left"
                  />
                </span>
                <Zap
                  className={`h-3 w-3 shrink-0 transition-colors ${
                    checked ? "text-signal" : "text-ink/30"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
