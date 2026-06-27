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
  const [dbId, setDbId] = useState("");
  const [missionId, setMissionId] = useState("MSN-11");
  const [name, setName] = useState("Pahalgam Rally");
  const [description, setDescription] = useState("convoy / dawn rally.");
  const [status, setStatus] = useState<"PLANNING" | "LIVE" | "COMPLETED">("PLANNING");
  const [waypoints, setWaypoints] = useState<any[]>(WAYPOINTS);
  const [foodDuties, setFoodDuties] = useState<any[]>(FOOD_DUTIES);
  const [prayers, setPrayers] = useState<any[]>(PRAYERS);
  const [gearPersonal, setGearPersonal] = useState<string[]>(GEAR_PERSONAL);
  const [gearConvoy, setGearConvoy] = useState<string[]>(GEAR_CONVOY);

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
          if (data._id) setDbId(data._id);
          setMissionId(data.missionId);
          setName(data.name);
          setStatus(data.status);
          setRoster(data.roster || []);
          if (data.description) setDescription(data.description);
          if (data.waypoints) setWaypoints(data.waypoints);
          if (data.foodDuties) setFoodDuties(data.foodDuties);
          if (data.prayers) setPrayers(data.prayers);
          if (data.gearPersonal) setGearPersonal(data.gearPersonal);
          if (data.gearConvoy) setGearConvoy(data.gearConvoy);
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
        _id: dbId || undefined,
        missionId,
        name,
        description,
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
        waypoints,
        foodDuties: foodDuties.map(f => {
          let whoId = null;
          if (typeof f.who === 'string') {
            const member = roster.find(r => r.callsign === f.who);
            if (member) whoId = member.user._id || member.user;
          } else if (f.who && f.who._id) {
            whoId = f.who._id;
          } else if (f.who) {
            whoId = f.who;
          }
          return { ...f, who: whoId || undefined };
        }),
        gearPersonal,
        gearConvoy,
        prayers,
      };
      const res = await fetch("/api/admin/convoys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Backend Error:", errorData);
        alert(`Failed to save convoy: ${errorData.error}`);
      } else {
        alert("Convoy saved to database!");
      }
    } catch (err) {
      console.error("Network/Client Error:", err);
      alert("Network error: failed to save convoy");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-10 mono-label text-center">INITIALIZING CONVOY SYSTEM...</div>;

  return (
    <div className="space-y-6">
      <Panel code="CNV/01" title="Mission Parameters" right={<Route className="h-4 w-4" />}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
            <span className="mono-label opacity-60 block mb-1">DESCRIPTION</span>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full hairline bg-bone px-3 py-2 font-mono text-sm focus:bg-acid/20 focus:outline-none"
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

        
      <Panel code="LOG/03" title="Logistics Configuration">
        <div className="space-y-8">
          {/* WAYPOINTS */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="mono-label opacity-50">WAYPOINTS ({waypoints.length})</span>
              <button onClick={() => setWaypoints([...waypoints, { code: "WP-X", name: "", kind: "PICKUP", time: "00:00", km: 0 }])} className="text-signal hover:underline mono-label">+ ADD STOP</button>
            </div>
            <div className="space-y-2">
              {waypoints.map((w, i) => (
                <div key={i} className="hairline p-2 bg-bone flex items-center gap-2">
                  <input type="text" value={w.code} onChange={e => {const nw = [...waypoints]; nw[i].code = e.target.value; setWaypoints(nw)}} className="w-20 hairline px-2 py-1 font-mono text-xs uppercase" placeholder="WP-00" />
                  <input type="text" value={w.name} onChange={e => {const nw = [...waypoints]; nw[i].name = e.target.value; setWaypoints(nw)}} className="flex-1 hairline px-2 py-1 font-mono text-xs" placeholder="Location Name" />
                  <select value={w.kind} onChange={e => {const nw = [...waypoints]; nw[i].kind = e.target.value; setWaypoints(nw)}} className="w-24 hairline px-2 py-1 font-mono text-xs uppercase">
                    <option>RALLY</option><option>PICKUP</option><option>FUEL</option><option>BREAK</option><option>OBJ</option>
                  </select>
                  <input type="text" value={w.time} onChange={e => {const nw = [...waypoints]; nw[i].time = e.target.value; setWaypoints(nw)}} className="w-20 hairline px-2 py-1 font-mono text-xs" placeholder="00:00" />
                  <input type="number" value={w.km} onChange={e => {const nw = [...waypoints]; nw[i].km = parseInt(e.target.value)||0; setWaypoints(nw)}} className="w-16 hairline px-2 py-1 font-mono text-xs" placeholder="KM" />
                  <button onClick={() => setWaypoints(waypoints.filter((_, idx) => idx !== i))} className="p-1 hover:text-signal"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* FOOD DUTIES */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="mono-label opacity-50">FOOD DUTIES ({foodDuties.length})</span>
              <button onClick={() => setFoodDuties([...foodDuties, { item: "", who: roster[0]?.callsign || "OP", crit: false }])} className="text-signal hover:underline mono-label">+ ADD DUTY</button>
            </div>
            <div className="space-y-2">
              {foodDuties.map((f, i) => (
                <div key={i} className="hairline p-2 bg-bone flex items-center gap-2">
                  <input type="text" value={f.item} onChange={e => {const nf = [...foodDuties]; nf[i].item = e.target.value; setFoodDuties(nf)}} className="flex-1 hairline px-2 py-1 font-mono text-xs" placeholder="Item (e.g. Kahwa, Water)" />
                  <select value={typeof f.who === 'object' ? f.who.callsign || f.who._id : f.who} onChange={e => {const nf = [...foodDuties]; nf[i].who = e.target.value; setFoodDuties(nf)}} className="w-32 hairline px-2 py-1 font-mono text-xs uppercase">
                    {roster.map(r => <option key={r.user._id||r.user} value={r.callsign}>{r.callsign}</option>)}
                  </select>
                  <label className="flex items-center gap-1 mono-label text-xs cursor-pointer px-2">
                    <input type="checkbox" checked={f.crit} onChange={e => {const nf = [...foodDuties]; nf[i].crit = e.target.checked; setFoodDuties(nf)}} /> CRIT
                  </label>
                  <button onClick={() => setFoodDuties(foodDuties.filter((_, idx) => idx !== i))} className="p-1 hover:text-signal"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* PRAYERS */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="mono-label opacity-50">PRAYER STOPS ({prayers.length})</span>
              <button onClick={() => setPrayers([...prayers, { code: "FAJR", time: "00:00", wp: "WP-00", status: "PRE-DEP" }])} className="text-signal hover:underline mono-label">+ ADD SALAH</button>
            </div>
            <div className="space-y-2">
              {prayers.map((p, i) => (
                <div key={i} className="hairline p-2 bg-bone flex items-center gap-2">
                  <select value={p.code} onChange={e => {const np = [...prayers]; np[i].code = e.target.value; setPrayers(np)}} className="w-28 hairline px-2 py-1 font-mono text-xs uppercase">
                    <option>FAJR</option><option>ZUHR</option><option>ASR</option><option>MAGHRIB</option><option>ISHA</option>
                  </select>
                  <input type="text" value={p.time} onChange={e => {const np = [...prayers]; np[i].time = e.target.value; setPrayers(np)}} className="w-20 hairline px-2 py-1 font-mono text-xs" placeholder="00:00" />
                  <input type="text" value={p.wp} onChange={e => {const np = [...prayers]; np[i].wp = e.target.value; setPrayers(np)}} className="w-20 hairline px-2 py-1 font-mono text-xs" placeholder="WP-00" />
                  <input type="text" value={p.status} onChange={e => {const np = [...prayers]; np[i].status = e.target.value; setPrayers(np)}} className="flex-1 hairline px-2 py-1 font-mono text-xs" placeholder="Status (e.g. PRE-DEP, AT OBJ)" />
                  <button onClick={() => setPrayers(prayers.filter((_, idx) => idx !== i))} className="p-1 hover:text-signal"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* GEAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="mono-label opacity-50">PERSONAL GEAR</span>
                <button onClick={() => setGearPersonal([...gearPersonal, ""])} className="text-signal hover:underline mono-label">+ ADD ITEM</button>
              </div>
              <div className="space-y-2">
                {gearPersonal.map((g, i) => (
                  <div key={i} className="hairline p-1 bg-bone flex items-center gap-1">
                    <input type="text" value={g} onChange={e => {const ng = [...gearPersonal]; ng[i] = e.target.value; setGearPersonal(ng)}} className="flex-1 hairline px-2 py-1 font-mono text-xs" placeholder="Gear Item" />
                    <button onClick={() => setGearPersonal(gearPersonal.filter((_, idx) => idx !== i))} className="p-1 hover:text-signal"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="mono-label opacity-50">CONVOY GEAR</span>
                <button onClick={() => setGearConvoy([...gearConvoy, ""])} className="text-signal hover:underline mono-label">+ ADD ITEM</button>
              </div>
              <div className="space-y-2">
                {gearConvoy.map((g, i) => (
                  <div key={i} className="hairline p-1 bg-bone flex items-center gap-1">
                    <input type="text" value={g} onChange={e => {const ng = [...gearConvoy]; ng[i] = e.target.value; setGearConvoy(ng)}} className="flex-1 hairline px-2 py-1 font-mono text-xs" placeholder="Gear Item" />
                    <button onClick={() => setGearConvoy(gearConvoy.filter((_, idx) => idx !== i))} className="p-1 hover:text-signal"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Panel>

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
