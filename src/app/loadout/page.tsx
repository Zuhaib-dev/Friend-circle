"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Compass,
  Radio,
  UtensilsCrossed,
  Binoculars,
  Plus,
  Minus,
  Check,
  AlertTriangle,
  Trash2,
  RotateCcw,
  Search,
  CircleDot,
  Package,
  Scale,
  ShieldAlert,
  ChevronRight,
  Lock
} from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// ────────────────────────────────────────────────────────────────────
// Data Types
// ────────────────────────────────────────────────────────────────────
type CategoryKey = "SURVIVAL" | "NAV" | "COMMS" | "SUSTENANCE" | "OPTICS";

type Item = {
  itemId: string;
  name: string;
  code: string;
  category: CategoryKey;
  weight: number;
  qty: number;
  critical: boolean;
  packed: boolean;
};

type Trip = {
  tripId: string;
  name: string;
  code: string;
  terrain: string;
  duration: string;
  hazard: "LOW" | "MED" | "HIGH";
};

const CATEGORIES: { key: CategoryKey; label: string; icon: typeof Compass; code: string }[] = [
  { key: "SURVIVAL", label: "SURVIVAL", icon: ShieldAlert, code: "01" },
  { key: "NAV", label: "NAVIGATION", icon: Compass, code: "02" },
  { key: "COMMS", label: "COMMS", icon: Radio, code: "03" },
  { key: "SUSTENANCE", label: "SUSTENANCE", icon: UtensilsCrossed, code: "04" },
  { key: "OPTICS", label: "OPTICS", icon: Binoculars, code: "05" },
];

const MAX_PACK_WEIGHT = 18000; // grams

// ────────────────────────────────────────────────────────────────────
// Utils
// ────────────────────────────────────────────────────────────────────
const fmtKg = (g: number) => (g / 1000).toFixed(2);
const fmtG = (g: number) => `${g.toLocaleString()}g`;

function useUTC() {
  const [t, setT] = useState<string>("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT(d.toISOString().slice(11, 19));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// ────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────
export default function LoadoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [trips, setTrips] = useState<Trip[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [trip, setTrip] = useState<Trip | null>(null);
  
  const [filter, setFilter] = useState<CategoryKey | "ALL">("ALL");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const utc = useUTC();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      const role = (session?.user as any)?.role;
      if (role !== 'ADMIN' && role !== 'TEAM_MEMBER') {
        router.push('/');
      } else {
        // Fetch data
        Promise.all([
          fetch('/api/loadout/trips').then(r => r.json()),
          fetch('/api/loadout/items').then(r => r.json())
        ]).then(([tripData, itemData]) => {
          if (Array.isArray(tripData)) {
            setTrips(tripData);
            if (tripData.length > 0) setTrip(tripData[0]);
          }
          if (Array.isArray(itemData)) {
            setItems(itemData);
          }
          setLoading(false);
        }).catch(err => {
          console.error(err);
          setLoading(false);
        });
      }
    }
  }, [status, router, session]);

  const updateItem = async (updates: Partial<Item> & { itemId: string }) => {
    setItems(items.map(i => i.itemId === updates.itemId ? { ...i, ...updates } : i));
    try {
      await fetch('/api/loadout/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch (e) {
      console.error(e);
    }
  };

  const togglePacked = (itemId: string, currentPacked: boolean) => {
    updateItem({ itemId, packed: !currentPacked });
  };
  
  const setQty = (itemId: string, currentQty: number, delta: number) => {
    updateItem({ itemId, qty: Math.max(1, currentQty + delta) });
  };
  
  const packAllCritical = async () => {
    const criticalUnpacked = items.filter(i => i.critical && !i.packed);
    if (criticalUnpacked.length === 0) return;
    
    setItems(items.map(i => i.critical ? { ...i, packed: true } : i));
    try {
      await fetch('/api/loadout/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(criticalUnpacked.map(i => ({ itemId: i.itemId, packed: true })))
      });
    } catch (e) {
      console.error(e);
    }
  };

  const totals = useMemo(() => {
    const packed = items.filter((i) => i.packed);
    const totalWeight = packed.reduce((s, i) => s + i.weight * i.qty, 0);
    const allWeight = items.reduce((s, i) => s + i.weight * i.qty, 0);
    const packedCount = packed.length;
    const totalCount = items.length;
    const criticalMissing = items.filter((i) => i.critical && !i.packed);
    const overload = totalWeight > MAX_PACK_WEIGHT;
    return { totalWeight, allWeight, packedCount, totalCount, criticalMissing, overload };
  }, [items]);

  const byCategory = useMemo(() => {
    const map: Record<CategoryKey, { total: number; packed: number; weight: number }> = {
      SURVIVAL: { total: 0, packed: 0, weight: 0 },
      NAV: { total: 0, packed: 0, weight: 0 },
      COMMS: { total: 0, packed: 0, weight: 0 },
      SUSTENANCE: { total: 0, packed: 0, weight: 0 },
      OPTICS: { total: 0, packed: 0, weight: 0 },
    };
    items.forEach((i) => {
      if (map[i.category]) {
        map[i.category].total += 1;
        if (i.packed) {
          map[i.category].packed += 1;
          map[i.category].weight += i.weight * i.qty;
        }
      }
    });
    return map;
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (filter !== "ALL" && i.category !== filter) return false;
      if (query && !`${i.name} ${i.code}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [items, filter, query]);

  const progress = totals.totalCount ? (totals.packedCount / totals.totalCount) * 100 : 0;
  const weightPct = Math.min(100, (totals.totalWeight / MAX_PACK_WEIGHT) * 100);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center mono-label text-signal">
        ESTABLISHING SECURE LINK...
      </div>
    );
  }

  if (status === 'unauthenticated' || ((session?.user as any)?.role !== 'ADMIN' && (session?.user as any)?.role !== 'TEAM_MEMBER')) {
    return (
      <div className="min-h-screen bg-bone flex flex-col items-center justify-center mono-label text-signal gap-2">
        <Lock className="h-8 w-8 text-signal mb-2" />
        ACCESS DENIED
        <div className="opacity-50 text-ink text-xs">AUTHORIZED PERSONNEL ONLY</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone text-ink">
      <TopNav />

      {/* HEADER */}
      <section className="hairline-b border-ink relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="mono-label opacity-60 mb-2 flex items-center gap-2">
                <CircleDot className="h-3 w-3 text-signal animate-blink" />
                <span>FC // FILE 10 · GEAR MANIFEST</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tight">
                LOADOUT<span className="text-signal">.</span>
              </h1>
              <p className="mono-label opacity-70 mt-2 max-w-xl">
                INTERACTIVE PACKING MANIFEST · WEIGHT / CRITICALITY / CATEGORY · LIVE ALERTS
              </p>
            </div>

            {trip && (
              <div className="hairline border-ink grid grid-cols-3 divide-x divide-ink/20 w-full sm:w-auto sm:min-w-[280px]">
                <HudStat label="UTC" value={utc} />
                <HudStat label="TRIP" value={trip.code} />
                <HudStat label="HZRD" value={trip.hazard} accent={trip.hazard === "HIGH"} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CRITICAL ALERT BANNER */}
      <AnimatePresence>
        {totals.criticalMissing.length > 0 && (
          <motion.section
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="hairline-b border-signal bg-signal/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 mono-label text-signal shrink-0">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <AlertTriangle className="h-4 w-4" />
                </motion.span>
                MISSING CRITICAL · {totals.criticalMissing.length} ITEM{totals.criticalMissing.length > 1 ? "S" : ""}
              </div>
              <div className="flex gap-1.5 flex-wrap flex-1 w-full">
                {totals.criticalMissing.slice(0, 6).map((i) => (
                  <span key={i.itemId} className="mono-label hairline border-signal text-signal px-2 py-0.5 text-[10px]">
                    {i.code}
                  </span>
                ))}
                {totals.criticalMissing.length > 6 && (
                  <span className="mono-label text-signal text-[10px] px-2 py-0.5">
                    +{totals.criticalMissing.length - 6} MORE
                  </span>
                )}
              </div>
              <button
                onClick={packAllCritical}
                className="brick text-bone px-3 py-1.5 mono-label hover:bg-signal hover:border-signal transition-colors w-full sm:w-auto text-center"
              >
                PACK ALL CRITICAL →
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* TRIP SELECTOR */}
      <section className="hairline-b border-ink/40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 overflow-x-auto">
          <span className="mono-label opacity-60 shrink-0">DEPLOY //</span>
          {trips.map((t) => {
            const active = trip?.tripId === t.tripId;
            return (
              <button
                key={t.tripId}
                onClick={() => setTrip(t)}
                className={`shrink-0 hairline px-3 py-1.5 mono-label transition-colors ${
                  active ? "bg-ink text-bone border-ink" : "border-ink/40 hover:bg-ink hover:text-bone"
                }`}
              >
                <span className="opacity-60 mr-2">{t.code}</span>
                {t.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* LEFT: items */}
        <div className="space-y-4 order-2 lg:order-1 min-w-0">
          {/* Filter bar */}
          <div className="hairline border-ink p-3 flex flex-col md:flex-row gap-3 md:items-center w-full min-w-0">
            <div className="flex items-center gap-2 flex-1 hairline border-ink/40 px-2 py-1.5 w-full">
              <Search className="h-3.5 w-3.5 opacity-60 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH GEAR / CODE..."
                className="bg-transparent outline-none mono-label text-ink placeholder:text-ink/40 w-full min-w-0"
              />
              {query && (
                <button onClick={() => setQuery("")} className="mono-label opacity-60 hover:text-signal shrink-0">
                  CLR
                </button>
              )}
            </div>
            <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 -mb-1 no-scrollbar">
              <CatChip active={filter === "ALL"} onClick={() => setFilter("ALL")} label="ALL" code="00" />
              {CATEGORIES.map((c) => (
                <CatChip
                  key={c.key}
                  active={filter === c.key}
                  onClick={() => setFilter(c.key)}
                  label={c.label}
                  code={c.code}
                  Icon={c.icon}
                />
              ))}
            </div>
          </div>

          {/* Items list */}
          <div className="hairline border-ink">
            <div className="hairline-b border-ink/40 px-3 py-2 mono-label flex items-center justify-between bg-ink/2">
              <span className="opacity-60">
                MANIFEST · {filtered.length}/{items.length} ITEMS
              </span>
            </div>
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <div className="p-10 text-center mono-label opacity-50">
                  <Package className="h-6 w-6 mx-auto mb-2" />
                  NO MATCHING GEAR
                </div>
              ) : (
                filtered.map((item, idx) => (
                  <ItemRow
                    key={item.itemId}
                    item={item}
                    idx={idx}
                    onToggle={() => togglePacked(item.itemId, item.packed)}
                    onQty={(d) => setQty(item.itemId, item.qty, d)}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: telemetry */}
        <aside className="space-y-4 lg:sticky lg:top-20 self-start order-1 lg:order-2 min-w-0">
          {/* Weight gauge */}
          <div className="hairline border-ink">
            <div className="hairline-b border-ink/40 px-3 py-2 mono-label flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Scale className="h-3 w-3 text-signal" /> PACK WEIGHT
              </span>
              <span className="opacity-60">MAX {fmtKg(MAX_PACK_WEIGHT)}KG</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-baseline gap-2">
                <motion.div
                  key={totals.totalWeight}
                  initial={{ scale: 1.1, color: "oklch(0.6 0.22 30)" }}
                  animate={{ scale: 1, color: "oklch(0.13 0.01 60)" }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-5xl leading-none"
                >
                  {fmtKg(totals.totalWeight)}
                </motion.div>
                <span className="mono-label opacity-60">KG</span>
                {totals.overload && (
                  <span className="ml-auto mono-label text-signal animate-blink">OVERLOAD</span>
                )}
              </div>
              {/* Brick weight bar */}
              <div className="relative h-3 hairline border-ink overflow-hidden">
                <motion.div
                  className={`h-full ${totals.overload ? "bg-signal" : "bg-ink"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${weightPct}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                {/* Tick marks */}
                {[25, 50, 75].map((p) => (
                  <div
                    key={p}
                    className="absolute top-0 bottom-0 w-px bg-bone/60"
                    style={{ left: `${p}%` }}
                  />
                ))}
              </div>
              <div className="mono-label opacity-60 flex justify-between">
                <span>PACKED {fmtG(totals.totalWeight)}</span>
                <span>TOTAL AVAIL {fmtG(totals.allWeight)}</span>
              </div>
            </div>
          </div>

          {/* Progress radial */}
          <div className="hairline border-ink p-4 flex items-center gap-4">
            <ProgressRing pct={progress} />
            <div className="flex-1">
              <div className="mono-label opacity-60">READINESS</div>
              <div className="font-display text-2xl leading-none">
                {totals.packedCount}/{totals.totalCount}
              </div>
              <div className="mono-label text-signal mt-1">
                {progress >= 100 ? "MISSION READY" : progress >= 70 ? "STAGING" : "PREP"}
              </div>
            </div>
          </div>

          {/* Category breakdown */}
          <div className="hairline border-ink">
            <div className="hairline-b border-ink/40 px-3 py-2 mono-label">CATEGORY MATRIX</div>
            <div>
              {CATEGORIES.map((c) => {
                const data = byCategory[c.key];
                const pct = data.total ? (data.packed / data.total) * 100 : 0;
                const Icon = c.icon;
                return (
                  <button
                    key={c.key}
                    onClick={() => setFilter(filter === c.key ? "ALL" : c.key)}
                    className="w-full hairline-b border-ink/20 px-3 py-2 flex items-center gap-3 hover:bg-ink/4 transition-colors text-left last:border-b-0"
                  >
                    <Icon className="h-3.5 w-3.5 text-signal" />
                    <div className="flex-1 min-w-0">
                      <div className="mono-label flex justify-between gap-2">
                        <span className="truncate">{c.label}</span>
                        <span className="opacity-60 shrink-0">{data.packed}/{data.total}</span>
                      </div>
                      <div className="h-1 mt-1 bg-ink/10 relative overflow-hidden">
                        <motion.div
                          className="h-full bg-ink"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>
                    <span className="mono-label opacity-50">{fmtKg(data.weight)}KG</span>
                    <ChevronRight className="h-3 w-3 opacity-40" />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </section>

      <footer className="hairline-t border-ink/40 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 mono-label opacity-60 flex justify-between flex-wrap gap-2">
          <span>FC // LOADOUT.v1 · TERMINAL BRUTALIST</span>
          <span>END OF MANIFEST</span>
        </div>
      </footer>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Subcomponents
// ────────────────────────────────────────────────────────────────────
function HudStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="px-3 py-2">
      <div className="mono-label opacity-60 text-[10px]">{label}</div>
      <div
        className={`font-mono text-sm leading-none mt-1 ${accent ? "text-signal" : "text-ink"}`}
        suppressHydrationWarning
      >
        {value}
      </div>
    </div>
  );
}

function CatChip({
  active,
  onClick,
  label,
  code,
  Icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  code: string;
  Icon?: typeof Compass;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 flex items-center gap-1.5 hairline px-2.5 py-1.5 mono-label transition-colors ${
        active ? "bg-ink text-bone border-ink" : "border-ink/40 hover:bg-ink hover:text-bone"
      }`}
    >
      {Icon && <Icon className="h-3 w-3" />}
      <span className="opacity-60">{code}</span>
      <span>{label}</span>
    </button>
  );
}

function ItemRow({
  item,
  idx,
  onToggle,
  onQty,
}: {
  item: Item;
  idx: number;
  onToggle: () => void;
  onQty: (delta: number) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.18, delay: idx * 0.015, ease: "easeOut" }}
      className={`hairline-b border-ink/20 px-3 py-3 flex items-center gap-3 group last:border-b-0 ${
        item.packed ? "bg-ink/3" : ""
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={`relative shrink-0 h-5 w-5 hairline transition-colors ${
          item.packed ? "bg-ink border-ink" : "border-ink hover:bg-ink/10"
        }`}
        aria-label={item.packed ? "Unpack" : "Pack"}
      >
        <AnimatePresence>
          {item.packed && (
            <motion.span
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center text-bone"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="mono-label opacity-50 text-[10px]">{item.code}</span>
          {item.critical && (
            <span
              className={`mono-label text-[9px] px-1.5 py-0.5 hairline ${
                item.packed ? "border-ink/30 opacity-50" : "border-signal text-signal"
              }`}
            >
              CRIT
            </span>
          )}
          <span className="mono-label opacity-40 text-[10px]">CAT/{item.category}</span>
        </div>
        <div
          className={`font-display text-base leading-tight truncate transition-all ${
            item.packed ? "line-through opacity-50" : ""
          }`}
        >
          {item.name}
        </div>
      </div>

      {/* Qty stepper */}
      <div className="flex items-center hairline border-ink/40 shrink-0">
        <button
          onClick={() => onQty(-1)}
          className="px-1.5 py-1 hover:bg-ink hover:text-bone transition-colors"
          aria-label="Decrease"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="px-2 mono-label min-w-[26px] text-center">{item.qty}</span>
        <button
          onClick={() => onQty(1)}
          className="px-1.5 py-1 hover:bg-ink hover:text-bone transition-colors"
          aria-label="Increase"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      {/* Weight */}
      <div className="text-right shrink-0 hidden sm:block min-w-[64px]">
        <div className="font-mono text-sm leading-none">{fmtG(item.weight * item.qty)}</div>
        <div className="mono-label opacity-40 text-[9px] mt-1">{item.weight}g × {item.qty}</div>
      </div>
    </motion.div>
  );
}

function ProgressRing({ pct }: { pct: number }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative shrink-0">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="oklch(0.13 0.01 60 / 0.15)" strokeWidth="3" />
        <motion.circle
          cx={36}
          cy={36}
          r={r}
          fill="none"
          stroke="oklch(0.6 0.22 30)"
          strokeWidth="3"
          strokeLinecap="butt"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          transform="rotate(-90 36 36)"
        />
        {/* Tick ring */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const x1 = 36 + Math.cos(a) * 33;
          const y1 = 36 + Math.sin(a) * 33;
          const x2 = 36 + Math.cos(a) * 35;
          const y2 = 36 + Math.sin(a) * 35;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" opacity="0.4" />;
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-mono text-xs">
        {Math.round(pct)}%
      </div>
    </div>
  );
}
