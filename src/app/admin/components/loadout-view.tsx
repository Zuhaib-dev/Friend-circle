"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Package, Compass, Plus, Terminal, X, Loader2, Trash2 } from "lucide-react";
import { Panel, EmptyState } from "./shared";

type Trip = {
  tripId: string;
  name: string;
  code: string;
  terrain: string;
  duration: string;
  hazard: string;
};

type Item = {
  itemId: string;
  name: string;
  code: string;
  category: string;
  weight: number;
  qty: number;
  critical: boolean;
};

export function LoadoutView() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // UI state for forms
  const [isAddingTrip, setIsAddingTrip] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);

  // Form states
  const [tripForm, setTripForm] = useState({ tripId: "", name: "", code: "", terrain: "", duration: "", hazard: "LOW" });
  const [itemForm, setItemForm] = useState({ itemId: "", name: "", code: "", category: "SURVIVAL", weight: 100, qty: 1, critical: false });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/loadout/trips").then(r => r.json()),
      fetch("/api/loadout/items").then(r => r.json())
    ]).then(([tripData, itemData]) => {
      if (Array.isArray(tripData)) setTrips(tripData);
      if (Array.isArray(itemData)) setItems(itemData);
      setLoading(false);
    });
  }, []);

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/loadout/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripForm),
      });
      if (res.ok) {
        const newTrip = await res.json();
        // If it's an update vs create:
        setTrips((prev) => {
          const exists = prev.find(t => t.tripId === newTrip.tripId);
          if (exists) return prev.map(t => t.tripId === newTrip.tripId ? newTrip : t);
          return [...prev, newTrip];
        });
        setIsAddingTrip(false);
        setTripForm({ tripId: "", name: "", code: "", terrain: "", duration: "", hazard: "LOW" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    if (!confirm("PURGE DEPLOYMENT TRIP?")) return;
    try {
      const res = await fetch(`/api/loadout/trips?tripId=${tripId}`, { method: "DELETE" });
      if (res.ok) {
        setTrips(trips.filter(t => t.tripId !== tripId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...itemForm, weight: Number(itemForm.weight), qty: Number(itemForm.qty) };
      const res = await fetch("/api/loadout/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const newItem = await res.json();
        setItems((prev) => {
          const exists = prev.find(i => i.itemId === newItem.itemId);
          if (exists) return prev.map(i => i.itemId === newItem.itemId ? newItem : i);
          return [...prev, newItem];
        });
        setIsAddingItem(false);
        setItemForm({ itemId: "", name: "", code: "", category: "SURVIVAL", weight: 100, qty: 1, critical: false });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("PURGE GEAR FROM MASTER LIST?")) return;
    try {
      const res = await fetch(`/api/loadout/items?itemId=${itemId}`, { method: "DELETE" });
      if (res.ok) {
        setItems(items.filter(i => i.itemId !== itemId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Panel
      code="CMD / 07"
      title="LOADOUT COMMAND"
      right={<span className="mono-label text-signal">{trips.length} DEPLOYMENTS</span>}
    >
      <div className="space-y-8">
        
        {/* --- TRIPS MANAGEMENT --- */}
        <section className="p-4 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="mono-label opacity-60">ACTIVE DEPLOYMENTS</div>
            <button
              onClick={() => setIsAddingTrip(!isAddingTrip)}
              className="brick px-3 py-1.5 mono-label text-bone hover:bg-signal transition-colors flex items-center gap-1.5"
            >
              {isAddingTrip ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              {isAddingTrip ? "CANCEL" : "DEPLOY NEW TRIP"}
            </button>
          </div>

          <AnimatePresence>
            {isAddingTrip && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-4"
              >
                <form onSubmit={handleCreateTrip} className="hairline border-ink bg-ink/5 p-4 space-y-4">
                  <div className="flex items-center gap-2 mono-label text-signal mb-2">
                    <Terminal className="h-4 w-4" /> CREATE DEPLOYMENT PROFILE
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <label className="space-y-1 block">
                      <span className="mono-label opacity-60">TRIP ID (Unique)</span>
                      <input required value={tripForm.tripId} onChange={e => setTripForm({...tripForm, tripId: e.target.value})} className="w-full bg-transparent hairline border-ink/40 px-2 py-1.5 mono-label outline-none focus:border-ink" placeholder="e.g. gurez-01" />
                    </label>
                    <label className="space-y-1 block md:col-span-2">
                      <span className="mono-label opacity-60">NAME</span>
                      <input required value={tripForm.name} onChange={e => setTripForm({...tripForm, name: e.target.value})} className="w-full bg-transparent hairline border-ink/40 px-2 py-1.5 mono-label outline-none focus:border-ink" placeholder="GUREZ // RAZDAN RIDGE" />
                    </label>
                    <label className="space-y-1 block">
                      <span className="mono-label opacity-60">CODE</span>
                      <input required value={tripForm.code} onChange={e => setTripForm({...tripForm, code: e.target.value})} className="w-full bg-transparent hairline border-ink/40 px-2 py-1.5 mono-label outline-none focus:border-ink" placeholder="GZ-11" />
                    </label>
                    <label className="space-y-1 block">
                      <span className="mono-label opacity-60">TERRAIN</span>
                      <input required value={tripForm.terrain} onChange={e => setTripForm({...tripForm, terrain: e.target.value})} className="w-full bg-transparent hairline border-ink/40 px-2 py-1.5 mono-label outline-none focus:border-ink" placeholder="HIGH ALT" />
                    </label>
                    <label className="space-y-1 block">
                      <span className="mono-label opacity-60">DURATION</span>
                      <input required value={tripForm.duration} onChange={e => setTripForm({...tripForm, duration: e.target.value})} className="w-full bg-transparent hairline border-ink/40 px-2 py-1.5 mono-label outline-none focus:border-ink" placeholder="5D-4N" />
                    </label>
                    <label className="space-y-1 block">
                      <span className="mono-label opacity-60">HAZARD LEVEL</span>
                      <select value={tripForm.hazard} onChange={e => setTripForm({...tripForm, hazard: e.target.value})} className="w-full bg-transparent hairline border-ink/40 px-2 py-2 mono-label outline-none focus:border-ink appearance-none">
                        <option value="LOW">LOW</option>
                        <option value="MED">MED</option>
                        <option value="HIGH">HIGH</option>
                      </select>
                    </label>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button type="submit" disabled={submitting} className="brick px-4 py-2 mono-label text-bone hover:bg-signal transition-colors flex items-center gap-2">
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                      EXECUTE DEPLOYMENT
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="py-8 text-center mono-label text-signal animate-pulse">FETCHING INTEL...</div>
          ) : trips.length === 0 ? (
            <EmptyState icon={Compass} label="NO DEPLOYMENTS" hint="No active trips in database." />
          ) : (
            <div className="grid gap-3">
              {trips.map((t) => (
                <div key={t.tripId} className="hairline border-ink p-3 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group hover:bg-ink/5 transition-colors">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Compass className="h-5 w-5 text-signal" />
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-xl truncate">{t.name}</div>
                      <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] opacity-70 mt-1">
                        <span>CODE: {t.code}</span>
                        <span>TERRAIN: {t.terrain}</span>
                        <span>DUR: {t.duration}</span>
                        <span className={t.hazard === 'HIGH' ? 'text-signal' : ''}>HZRD: {t.hazard}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteTrip(t.tripId)} className="opacity-0 group-hover:opacity-100 p-2 hover:text-signal transition-all">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- MASTER GEAR LIST MANAGEMENT --- */}
        <section className="p-4 pt-6 hairline-t border-ink/40">
          <div className="flex items-center justify-between mb-4">
            <div className="mono-label opacity-60">MASTER GEAR LIST</div>
            <button
              onClick={() => setIsAddingItem(!isAddingItem)}
              className="hairline border-ink px-3 py-1.5 mono-label hover:bg-ink hover:text-bone transition-colors flex items-center gap-1.5"
            >
              {isAddingItem ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              {isAddingItem ? "CANCEL" : "ADD GEAR TO LIST"}
            </button>
          </div>

          <AnimatePresence>
            {isAddingItem && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-4"
              >
                <form onSubmit={handleCreateItem} className="hairline border-ink bg-ink/5 p-4 space-y-4">
                  <div className="flex items-center gap-2 mono-label text-signal mb-2">
                    <Terminal className="h-4 w-4" /> REGISTER NEW GEAR
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label className="space-y-1 block md:col-span-2">
                      <span className="mono-label opacity-60">ITEM ID (Unique)</span>
                      <input required value={itemForm.itemId} onChange={e => setItemForm({...itemForm, itemId: e.target.value})} className="w-full bg-transparent hairline border-ink/40 px-2 py-1.5 mono-label outline-none focus:border-ink" placeholder="e.g. s6" />
                    </label>
                    <label className="space-y-1 block md:col-span-2">
                      <span className="mono-label opacity-60">NAME</span>
                      <input required value={itemForm.name} onChange={e => setItemForm({...itemForm, name: e.target.value})} className="w-full bg-transparent hairline border-ink/40 px-2 py-1.5 mono-label outline-none focus:border-ink" placeholder="Tactical Med Kit" />
                    </label>
                    <label className="space-y-1 block">
                      <span className="mono-label opacity-60">CODE</span>
                      <input required value={itemForm.code} onChange={e => setItemForm({...itemForm, code: e.target.value})} className="w-full bg-transparent hairline border-ink/40 px-2 py-1.5 mono-label outline-none focus:border-ink" placeholder="SRV-001" />
                    </label>
                    <label className="space-y-1 block">
                      <span className="mono-label opacity-60">CATEGORY</span>
                      <select value={itemForm.category} onChange={e => setItemForm({...itemForm, category: e.target.value})} className="w-full bg-transparent hairline border-ink/40 px-2 py-2 mono-label outline-none focus:border-ink appearance-none">
                        <option value="SURVIVAL">SURVIVAL</option>
                        <option value="NAV">NAV</option>
                        <option value="COMMS">COMMS</option>
                        <option value="SUSTENANCE">SUSTENANCE</option>
                        <option value="OPTICS">OPTICS</option>
                      </select>
                    </label>
                    <label className="space-y-1 block">
                      <span className="mono-label opacity-60">WEIGHT (g)</span>
                      <input type="number" required value={itemForm.weight} onChange={e => setItemForm({...itemForm, weight: Number(e.target.value)})} className="w-full bg-transparent hairline border-ink/40 px-2 py-1.5 mono-label outline-none focus:border-ink" />
                    </label>
                    <label className="space-y-1 block">
                      <span className="mono-label opacity-60">BASE QTY</span>
                      <input type="number" required value={itemForm.qty} onChange={e => setItemForm({...itemForm, qty: Number(e.target.value)})} className="w-full bg-transparent hairline border-ink/40 px-2 py-1.5 mono-label outline-none focus:border-ink" />
                    </label>
                    <label className="flex items-center gap-2 mt-4 cursor-pointer">
                      <input type="checkbox" checked={itemForm.critical} onChange={e => setItemForm({...itemForm, critical: e.target.checked})} className="accent-signal cursor-pointer" />
                      <span className="mono-label opacity-80">CRITICAL ITEM</span>
                    </label>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button type="submit" disabled={submitting} className="brick px-4 py-2 mono-label text-bone hover:bg-signal transition-colors flex items-center gap-2">
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                      REGISTER GEAR
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="py-8 text-center mono-label text-signal animate-pulse">FETCHING INTEL...</div>
          ) : items.length === 0 ? (
            <EmptyState icon={Package} label="NO GEAR" hint="No gear items in database." />
          ) : (
            <div className="grid md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2">
              {items.map((i) => (
                <div key={i.itemId} className="hairline border-ink/40 p-3 flex items-start justify-between group hover:bg-ink/5 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg truncate">{i.name}</div>
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] opacity-70 mt-1">
                      <span>{i.code}</span>
                      <span>CAT/{i.category}</span>
                      <span>{i.weight}g</span>
                      <span>x{i.qty}</span>
                      {i.critical && <span className="text-signal border border-signal/50 px-1">CRIT</span>}
                    </div>
                  </div>
                  <button onClick={() => handleDeleteItem(i.itemId)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:text-signal transition-all shrink-0">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </Panel>
  );
}
