"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, CloudSun, Flag, Radio, Route as RouteIcon, Wind } from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { Header, MetaCell } from "./components/Header";
import { Section } from "./components/Shared";
import { OperatorCard } from "./components/Roster";
import { FoodPanel, FuelPanel, GearPanel, PrayerPanel, WaypointPanel } from "./components/LogisticsGrid";
import { GEAR_CONVOY, GEAR_PERSONAL, ROLE_RANK, ROSTER, WAYPOINTS, FOOD_DUTIES, PRAYERS } from "./data";

export default function ConvoyPage() {
  const [now, setNow] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mission, setMission] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);

    fetch("/api/convoys/active")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error && !data.message) {
          setMission(data);
        }
        setLoading(false);
      });

    return () => clearInterval(t);
  }, []);

  const utc = mounted && now
    ? `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}:${String(now.getUTCSeconds()).padStart(2, "0")}`
    : "--:--:--";

  const activeRoster = useMemo(() => {
    if (!mission || !mission.roster) return ROSTER; // Fallback to static if none
    return mission.roster.map((r: any) => ({
      id: r.user?._id || Math.random().toString(),
      name: r.user?.name || "Unknown",
      callsign: r.callsign,
      role: r.role,
      rig: r.rig,
      vehicle: r.vehicle,
      plate: r.plate || "TBA",
      pickup: r.pickup,
      phone: r.user?.phone || r.user?.teamMemberDetails || "N/A",
      ice: "TBA",
      image: r.user?.image || "https://picsum.photos/seed/default/400/400",
    }));
  }, [mission]);

  const sortedRoster = useMemo(
    () => [...activeRoster].sort((a, b) => ROLE_RANK[a.role as keyof typeof ROLE_RANK] - ROLE_RANK[b.role as keyof typeof ROLE_RANK]),
    [activeRoster],
  );

  const activeWaypoints = useMemo(() => mission?.waypoints?.length ? mission.waypoints : WAYPOINTS, [mission]);
  const activeFood = useMemo(() => mission?.foodDuties?.length ? mission.foodDuties : FOOD_DUTIES, [mission]);
  const activeGearPersonal = useMemo(() => mission?.gearPersonal?.length ? mission.gearPersonal : GEAR_PERSONAL, [mission]);
  const activeGearConvoy = useMemo(() => mission?.gearConvoy?.length ? mission.gearConvoy : GEAR_CONVOY, [mission]);
  const activePrayers = useMemo(() => mission?.prayers?.length ? mission.prayers : PRAYERS, [mission]);

  const totalKm = activeWaypoints[activeWaypoints.length - 1]?.km || 0;
  const fuelPerKm = 8.4; // INR / km approx
  const totalFuel = Math.round(totalKm * fuelPerKm * 2); // round trip
  const perHead = activeRoster.length > 0 ? Math.round(totalFuel / activeRoster.length) : 0;

  if (loading) {
    return (
      <main className="min-h-screen bg-bone text-ink flex items-center justify-center mono-label">
        <Radio className="h-4 w-4 animate-pulse mr-2 text-signal" /> ESTABLISHING SECURE UPLINK...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bone text-ink">
      <TopNav />

      <Header utc={utc} />

      {/* META STRIP */}
      <section className="hairline-b border-ink grid grid-cols-2 md:grid-cols-5">
        <MetaCell label="DATE" value={mission?.date ? new Date(mission.date).toLocaleDateString() : "27·JUN·26"} icon={Flag} />
        <MetaCell label="ETA / OBJ" value="09:15 IST" icon={Activity} />
        <MetaCell label="DIST" value={`${totalKm} KM`} icon={RouteIcon} />
        <MetaCell label="WX / PHLG" value="14°C · CLR" icon={CloudSun} />
        <MetaCell label="WIND" value="W · 12km/h" icon={Wind} />
      </section>

      {/* ROSTER */}
      <Section code="RSTR / 01" title="Roster & Rigs" tag={`${activeRoster.length} OPERATORS`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sortedRoster.map((op, i) => (
            <OperatorCard key={op.id} op={op} index={i} />
          ))}
        </div>
      </Section>

      {/* BENTO LOGISTICS */}
      <Section code="LOG / 02" title="Logistics Grid" tag="BENTO">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-7"><WaypointPanel waypoints={activeWaypoints} /></div>
          <div className="lg:col-span-5"><FuelPanel total={totalFuel} perHead={perHead} km={totalKm} roster={activeRoster} /></div>
          <div className="lg:col-span-5"><FoodPanel foodDuties={activeFood} /></div>
          <div className="lg:col-span-7"><PrayerPanel prayers={activePrayers} /></div>
          <div className="lg:col-span-6"><GearPanel title="Personal Gear" code="GR-P" items={activeGearPersonal} /></div>
          <div className="lg:col-span-6"><GearPanel title="Convoy Gear" code="GR-C" items={activeGearConvoy} /></div>
        </div>
      </Section>

      <footer className="hairline-t border-ink px-4 md:px-8 py-4 flex items-center justify-between flex-wrap gap-3">
        <span className="flex items-center gap-2 opacity-70 mono-label">
          <Radio className="h-3 w-3 text-signal animate-pulse" />
          CONVOY PLANNER · v1.0 · ENCRYPTED CHANNEL
        </span>
        <span className="opacity-60 mono-label">UTC {utc} · CLEARANCE LVL 2</span>
      </footer>
    </main>
  );
}
