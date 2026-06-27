"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Panel, EmptyState } from "./shared";
import { Route, Plus, Search, Trash2, Check, User, Save } from "lucide-react";
import { WAYPOINTS, FOOD_DUTIES, GEAR_PERSONAL, GEAR_CONVOY, PRAYERS } from "../../convoy/data";

type UserData = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export function ConvoyView() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserData[]>([]);
  const [missionId, setMissionId] = useState("MSN-11");
  const [name, setName] = useState("Pahalgam Rally");
  const [status, setStatus] = useState<"PLANNING" | "LIVE" | "COMPLETED">("PLANNING");

  const [roster, setRoster] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // Roster Temp fields
  const [tempCallsign, setTempCallsign] = useState("");
  const [tempRole, setTempRole] = useState("LEAD");
  const [tempRig, setTempRig] = useState("CAR");
  const [tempVehicle, setTempVehicle] = useState("");
  const [tempPlate, setTempPlate] = useState("");
  const [tempPickup, setTempPickup] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Fetch existing convoy if any
    fetch("/api/admin/convoys")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.missionId) {
          setMissionId(data.missionId);
          setName(data.name);
          setStatus(data.status);
          setRoster(data.roster || []);
        }
      });

    // Fetch teammates
    fetch("/api/admin/users?view=all")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data.filter((u) => u.role === "TEAM_MEMBER" || u.role === "ADMIN"));
        }
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((u) => 
    u.name?.toLowerCase().includes(search.toLowerCase()) &&
    !roster.find((r) => (r.user._id || r.user) === u._id) // exclude already added
  );

  const addToRoster = () => {
    if (!selectedUser) return;
    setRoster((prev) => [
      ...prev,
      {
        user: selectedUser._id,
        _displayUser: selectedUser, // client side tracking only
        callsign: tempCallsign || selectedUser.name.split(" ")[0].toUpperCase(),
        role: tempRole,
        rig: tempRig,
        vehicle: tempVehicle || "Unknown",
        plate: tempPlate,
        pickup: tempPickup || "HQ",
      },
    ]);
    setSelectedUser(null);
    setSearch("");
    setTempCallsign("");
    setTempVehicle("");
    setTempPlate("");
    setTempPickup("");
  };

  const removeRoster = (idx: number) => {
    setRoster(roster.filter((_, i) => i !== idx));
  };

  const saveConvoy = async () => {
    setSaving(true);
    try {
      const payload = {
        missionId,
        name,
        status,
        roster: roster.map(r => ({
          user: r.user._id || r.user,
          callsign: r.callsign,
          role: r.role,
          rig: r.rig,
          vehicle: r.vehicle,
          plate: r.plate,
          pickup: r.pickup,
        })),
        waypoints: WAYPOINTS,
        foodDuties: FOOD_DUTIES,
        gearPersonal: GEAR_PERSONAL,
        gearConvoy: GEAR_CONVOY,
        prayers: PRAYERS,
      };
      const res = await fetch("/api/admin/convoys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) alert("Failed to save convoy");
      else alert("Convoy saved to database!");
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  if (loading) return <div className="p-10 mono-label text-center">INITIALIZING CONVOY SYSTEM...</div>;

  return (
    <div className="space-y-6">
      <Panel code="CNV/01" title="Mission Parameters" right={<Route className="h-4 w-4" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <label className="block">
            <span className="mono-label opacity-60 block mb-1">MISSION ID</span>
            <input
              type="text"
              value={missionId}
              onChange={(e) => setMissionId(e.target.value)}
              className="w-full hairline bg-bone px-3 py-2 font-mono text-sm uppercase focus:bg-acid/20 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mono-label opacity-60 block mb-1">MISSION NAME</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full hairline bg-bone px-3 py-2 font-display uppercase tracking-widest focus:bg-acid/20 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mono-label opacity-60 block mb-1">STATUS</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full hairline bg-bone px-3 py-2 font-mono text-sm focus:bg-acid/20 focus:outline-none"
            >
              <option value="PLANNING">PLANNING</option>
              <option value="LIVE">LIVE / EN ROUTE</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </label>
        </div>
      </Panel>

      <Panel code="RSTR/02" title="Convoy Roster Selector">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Picker */}
          <div>
            {!selectedUser ? (
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-40" />
                  <input
                    type="text"
                    placeholder="Search personnel..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full hairline bg-bone pl-9 pr-3 py-2.5 font-mono text-sm focus:bg-acid/20 focus:outline-none"
                  />
                </div>
                <div className="hairline border-ink h-[250px] overflow-y-auto">
                  {filteredUsers.map((u) => (
                    <button
                      key={u._id}
                      onClick={() => setSelectedUser(u)}
                      className="w-full flex items-center justify-between p-3 hairline-b border-ink/40 hover:bg-ink hover:text-bone transition-colors text-left"
                    >
                      <div>
                        <div className="font-display uppercase tracking-wider">{u.name}</div>
                        <div className="mono-label opacity-50 lowercase">{u.email}</div>
                      </div>
                      <Plus className="h-4 w-4" />
                    </button>
                  ))}
                  {filteredUsers.length === 0 && (
                    <div className="p-4 text-center mono-label opacity-50">NO MATCHES</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hairline border-ink p-4 space-y-4 relative">
                <div className="mono-label opacity-50 mb-2">CONFIGURING OPERATOR</div>
                <div className="font-display text-xl uppercase tracking-widest">{selectedUser.name}</div>
                
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="mono-label opacity-60 block mb-1">CALLSIGN</span>
                    <input type="text" value={tempCallsign} onChange={e=>setTempCallsign(e.target.value)} className="w-full hairline bg-bone px-2 py-1.5 font-mono text-xs uppercase" placeholder="e.g. ALPHA" />
                  </label>
                  <label className="block">
                    <span className="mono-label opacity-60 block mb-1">ROLE</span>
                    <select value={tempRole} onChange={e=>setTempRole(e.target.value)} className="w-full hairline bg-bone px-2 py-1.5 font-mono text-xs uppercase">
                      <option>LEAD</option><option>TAIL</option><option>NAV</option><option>MEDIC</option><option>SIGNALS</option><option>MEDIA</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mono-label opacity-60 block mb-1">RIG</span>
                    <select value={tempRig} onChange={e=>setTempRig(e.target.value)} className="w-full hairline bg-bone px-2 py-1.5 font-mono text-xs uppercase">
                      <option>BIKE</option><option>CAR</option><option>TRUCK</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mono-label opacity-60 block mb-1">VEHICLE MAKE</span>
                    <input type="text" value={tempVehicle} onChange={e=>setTempVehicle(e.target.value)} className="w-full hairline bg-bone px-2 py-1.5 font-mono text-xs uppercase" placeholder="Thar, Himalayan..." />
                  </label>
                  <label className="block">
                    <span className="mono-label opacity-60 block mb-1">PLATE (OPT)</span>
                    <input type="text" value={tempPlate} onChange={e=>setTempPlate(e.target.value)} className="w-full hairline bg-bone px-2 py-1.5 font-mono text-xs uppercase" placeholder="JK01-XXXX" />
                  </label>
                  <label className="block">
                    <span className="mono-label opacity-60 block mb-1">PICKUP POINT</span>
                    <input type="text" value={tempPickup} onChange={e=>setTempPickup(e.target.value)} className="w-full hairline bg-bone px-2 py-1.5 font-mono text-xs uppercase" placeholder="HQ" />
                  </label>
                </div>
                
                <div className="flex items-center gap-2 mt-4 pt-4 hairline-t border-ink/40">
                  <button onClick={addToRoster} className="flex-1 brick py-2 text-bone mono-label hover:bg-signal transition-colors">
                    ADD TO ROSTER
                  </button>
                  <button onClick={() => setSelectedUser(null)} className="px-4 py-2 hairline hover:bg-acid/20 mono-label transition-colors">
                    CANCEL
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Current Roster */}
          <div>
            <div className="mono-label opacity-50 mb-3 flex items-center justify-between">
              <span>CURRENT ROSTER ({roster.length})</span>
            </div>
            <div className="space-y-2">
              {roster.map((r, i) => (
                <div key={i} className="hairline p-2 flex items-center justify-between bg-bone group hover:bg-acid/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 opacity-50" />
                    <div>
                      <div className="font-mono text-sm tracking-wider uppercase">
                        {r.callsign} <span className="opacity-50">/ {r._displayUser?.name || r.user?.name || "OP"}</span>
                      </div>
                      <div className="mono-label opacity-60 mt-0.5">
                        {r.role} · {r.rig} ({r.vehicle})
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeRoster(i)} className="p-2 hover:text-signal opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {roster.length === 0 && (
                <div className="p-8 text-center border border-dashed border-ink/30 mono-label opacity-40">
                  ROSTER IS EMPTY
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={saveConvoy} 
            disabled={saving}
            className="brick text-bone px-6 py-3 mono-label flex items-center gap-2 hover:bg-signal transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "SAVING DB..." : "COMMIT CONVOY TO SYSTEM"}
          </button>
        </div>
      </Panel>
    </div>
  );
}
