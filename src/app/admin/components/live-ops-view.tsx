"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Radar, Loader2, Plus, Terminal, Activity, X, Info, Route } from "lucide-react";
import { Panel, Crosshairs } from "./shared";

type Convoy = {
  convoyId: string;
  callsign: string;
  status: "ACTIVE" | "HOLD" | "RTB";
  operators: number;
  vehicles: string[];
  start: string;
  destination: string;
  path: { lat: number; lon: number; label?: string; elev: number; t: string }[];
  progress: number;
  battery: number;
  temp: number;
  wind: number;
  lastBeacon: string;
};

export function LiveOpsView() {
  const [convoys, setConvoys] = useState<Convoy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    convoyId: "",
    callsign: "",
    status: "ACTIVE",
    operators: "",
    vehicles: "",
    start: "",
    destination: "",
    pathStr: "", // JSON string for path
    progress: "0",
    battery: "100",
    temp: "0",
    wind: "0",
    lastBeacon: "00:00 AGO",
  });

  useEffect(() => {
    fetch("/api/convoys")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setConvoys(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let parsedPath = [];
      try {
        parsedPath = JSON.parse(formState.pathStr);
      } catch (err) {
        alert("Invalid JSON format for path.");
        return;
      }

      const payload = {
        convoyId: formState.convoyId.toLowerCase().replace(/\s+/g, '-'),
        callsign: formState.callsign,
        status: formState.status,
        operators: parseInt(formState.operators) || 0,
        vehicles: formState.vehicles.split(',').map(v => v.trim()).filter(Boolean),
        start: formState.start,
        destination: formState.destination,
        path: parsedPath,
        progress: parseFloat(formState.progress) || 0,
        battery: parseInt(formState.battery) || 100,
        temp: parseInt(formState.temp) || 0,
        wind: parseInt(formState.wind) || 0,
        lastBeacon: formState.lastBeacon,
      };
      
      const res = await fetch("/api/convoys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const updated = await res.json();
        if (editingId) {
          setConvoys(convoys.map(c => c.convoyId === editingId ? updated : c));
        } else {
          setConvoys([updated, ...convoys]);
        }
        setShowForm(false);
        setEditingId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (c: Convoy) => {
    setFormState({
      convoyId: c.convoyId,
      callsign: c.callsign,
      status: c.status,
      operators: c.operators.toString(),
      vehicles: c.vehicles.join(', '),
      start: c.start,
      destination: c.destination,
      pathStr: JSON.stringify(c.path, null, 2),
      progress: c.progress.toString(),
      battery: c.battery.toString(),
      temp: c.temp.toString(),
      wind: c.wind.toString(),
      lastBeacon: c.lastBeacon,
    });
    setEditingId(c.convoyId);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirm termination of this convoy track?")) return;
    try {
      await fetch(`/api/convoys?convoyId=${id}`, { method: "DELETE" });
      setConvoys((l) => l.filter((c) => c.convoyId !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/convoys", {
        method: "POST", // We can use the same POST endpoint since it upserts
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ convoyId: id, status: newStatus }),
      });
      if (res.ok) {
        setConvoys((l) => l.map((c) => c.convoyId === id ? { ...c, status: newStatus as any } : c));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormState({
      convoyId: "", callsign: "", status: "ACTIVE", operators: "", vehicles: "", start: "", destination: "",
      pathStr: '[\n  { "lat": 34.0837, "lon": 74.7973, "label": "BASE", "elev": 1585, "t": "06:00" }\n]',
      progress: "0", battery: "100", temp: "0", wind: "0", lastBeacon: "00:00 AGO"
    });
  };

  return (
    <div className="space-y-6">
      <Panel
        code="OPS-01"
        title="LIVE OPS CONSOLE"
        right={<Radar className="h-4 w-4 opacity-50" />}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="font-mono text-sm opacity-70">
            &gt; {convoys.length} CONVOYS ON GRID
          </div>
          <button
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                setEditingId(null);
                resetForm();
              } else {
                resetForm();
                setShowForm(true);
              }
            }}
            className="hairline border-ink bg-ink text-bone px-3 py-1.5 mono-label flex items-center gap-2 hover:bg-transparent hover:text-ink transition-colors"
          >
            {showForm ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            {showForm ? "ABORT DISPATCH" : "DISPATCH CONVOY"}
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="mb-8 p-4 hairline border-ink bg-ink/5 space-y-4 overflow-hidden crosshair"
            >
              <Crosshairs />
              <div className="mono-label text-signal mb-2 flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5" /> {editingId ? "MODIFY CONVOY" : "INITIALIZE CONVOY"}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="mono-label opacity-70">CONVOY ID (SYSTEM)</label>
                  <input
                    required
                    disabled={!!editingId}
                    value={formState.convoyId}
                    onChange={(e) => setFormState({ ...formState, convoyId: e.target.value })}
                    className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal disabled:opacity-50"
                    placeholder="e.g. echo-05"
                  />
                </div>
                <div className="space-y-1">
                  <label className="mono-label opacity-70">CALLSIGN</label>
                  <input
                    required
                    value={formState.callsign}
                    onChange={(e) => setFormState({ ...formState, callsign: e.target.value })}
                    className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                    placeholder="e.g. ECHO-05"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="mono-label opacity-70">START LOCATION</label>
                  <input
                    required
                    value={formState.start}
                    onChange={(e) => setFormState({ ...formState, start: e.target.value })}
                    className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                    placeholder="e.g. SRINAGAR"
                  />
                </div>
                <div className="space-y-1">
                  <label className="mono-label opacity-70">DESTINATION</label>
                  <input
                    required
                    value={formState.destination}
                    onChange={(e) => setFormState({ ...formState, destination: e.target.value })}
                    className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                    placeholder="e.g. GUREZ"
                  />
                </div>

                <div className="space-y-1">
                  <label className="mono-label opacity-70">VEHICLES (COMMA SEPARATED)</label>
                  <input
                    value={formState.vehicles}
                    onChange={(e) => setFormState({ ...formState, vehicles: e.target.value })}
                    className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                    placeholder="e.g. THAR-4x4, GYPSY"
                  />
                </div>
                <div className="space-y-1 flex gap-2">
                  <div className="flex-1 space-y-1">
                    <label className="mono-label opacity-70">OPERATORS</label>
                    <input
                      type="number"
                      value={formState.operators}
                      onChange={(e) => setFormState({ ...formState, operators: e.target.value })}
                      className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="mono-label opacity-70">STATUS</label>
                    <select
                      value={formState.status}
                      onChange={(e) => setFormState({ ...formState, status: e.target.value as any })}
                      className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal appearance-none rounded-none"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="HOLD">HOLD</option>
                      <option value="RTB">RTB</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 flex gap-2">
                  <div className="flex-1 space-y-1">
                    <label className="mono-label opacity-70">PROGRESS (0-1)</label>
                    <input
                      type="number" step="0.01"
                      value={formState.progress}
                      onChange={(e) => setFormState({ ...formState, progress: e.target.value })}
                      className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="mono-label opacity-70">BATTERY %</label>
                    <input
                      type="number"
                      value={formState.battery}
                      onChange={(e) => setFormState({ ...formState, battery: e.target.value })}
                      className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                    />
                  </div>
                </div>

                <div className="space-y-1 flex gap-2">
                  <div className="flex-1 space-y-1">
                    <label className="mono-label opacity-70">TEMP (°C)</label>
                    <input
                      type="number"
                      value={formState.temp}
                      onChange={(e) => setFormState({ ...formState, temp: e.target.value })}
                      className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="mono-label opacity-70">WIND (KM/H)</label>
                    <input
                      type="number"
                      value={formState.wind}
                      onChange={(e) => setFormState({ ...formState, wind: e.target.value })}
                      className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="mono-label opacity-70">WAYPOINTS (JSON ARRAY)</label>
                <textarea
                  required
                  value={formState.pathStr}
                  onChange={(e) => setFormState({ ...formState, pathStr: e.target.value })}
                  className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-xs focus:outline-none focus:border-signal min-h-[120px]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full hairline border-ink bg-signal text-bone py-2 mono-label flex items-center justify-center gap-2 hover:bg-ink transition-colors"
                >
                  <Activity className="h-3 w-3" /> {editingId ? "UPDATE TELEMETRY" : "DISPATCH NOW"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="py-12 flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-signal animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {convoys.map((c) => (
              <div key={c.convoyId} className="hairline border-ink p-3 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group hover:bg-ink/5 transition-colors">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`h-1.5 w-1.5 rounded-full ${c.status === 'ACTIVE' ? 'bg-signal animate-blink' : c.status === 'HOLD' ? 'bg-acid' : 'bg-ink opacity-40'}`} />
                      <span className="font-display text-xl truncate">{c.callsign}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] opacity-70 mt-2">
                      <span className="flex items-center gap-1"><Route className="h-3 w-3" /> {c.start} TO {c.destination}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] opacity-50 mt-1">
                      <span>PROG: {Math.round(c.progress * 100)}%</span>
                      <span>BAT: {c.battery}%</span>
                      <span>TMP: {c.temp}°C</span>
                      <span>WND: {c.wind} KM/H</span>
                      <span>OPS: {c.operators}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto mt-3 md:mt-0">
                  <select
                    value={c.status}
                    onChange={(e) => updateStatus(c.convoyId, e.target.value)}
                    className="bg-transparent hairline border-ink px-2 py-1 font-mono text-[10px] uppercase appearance-none"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="HOLD">HOLD</option>
                    <option value="RTB">RTB</option>
                  </select>
                  <button
                    onClick={() => handleEdit(c)}
                    className="hairline border-ink px-2 py-1 mono-label hover:bg-ink hover:text-bone transition-colors"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDelete(c.convoyId)}
                    className="hairline border-ink px-2 py-1 mono-label hover:bg-red-500 hover:text-white transition-colors"
                  >
                    PURGE
                  </button>
                </div>
              </div>
            ))}
            
            {convoys.length === 0 && (
              <div className="py-10 text-center mono-label opacity-50 flex flex-col items-center gap-2">
                <Info className="h-5 w-5" />
                NO CONVOYS ACTIVE ON GRID
              </div>
            )}
          </div>
        )}
      </Panel>
    </div>
  );
}
