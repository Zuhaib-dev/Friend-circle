"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, CloudSun, Flag, Radio, Route as RouteIcon, Wind } from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { Header, MetaCell } from "./components/Header";
import { Section } from "./components/Shared";
import { OperatorCard } from "./components/Roster";
import { FoodPanel, FuelPanel, GearPanel, PrayerPanel, WaypointPanel } from "./components/LogisticsGrid";
import { GEAR_CONVOY, GEAR_PERSONAL, ROLE_RANK, ROSTER, WAYPOINTS } from "./data";

export default function ConvoyPage() {
  const [now, setNow] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const utc = mounted && now
    ? `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}:${String(now.getUTCSeconds()).padStart(2, "0")}`
    : "--:--:--";

  const sortedRoster = useMemo(
    () => [...ROSTER].sort((a, b) => ROLE_RANK[a.role] - ROLE_RANK[b.role]),
    [],
  );

  const totalKm = WAYPOINTS[WAYPOINTS.length - 1].km;
  const fuelPerKm = 8.4; // INR / km approx
  const totalFuel = Math.round(totalKm * fuelPerKm * 2); // round trip
  const perHead = Math.round(totalFuel / ROSTER.length);

  return (
    <main className="min-h-screen bg-bone text-ink">
      <TopNav />

      <Header utc={utc} />

      {/* META STRIP */}
      <section className="hairline-b border-ink grid grid-cols-2 md:grid-cols-5">
        <MetaCell label="DATE" value="27·JUN·26" icon={Flag} />
        <MetaCell label="ETA / OBJ" value="09:15 IST" icon={Activity} />
        <MetaCell label="DIST" value={`${totalKm} KM`} icon={RouteIcon} />
        <MetaCell label="WX / PHLG" value="14°C · CLR" icon={CloudSun} />
        <MetaCell label="WIND" value="W · 12km/h" icon={Wind} />
      </section>

      {/* ROSTER */}
      <Section code="RSTR / 01" title="Roster & Rigs" tag={`${ROSTER.length} OPERATORS`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sortedRoster.map((op, i) => (
            <OperatorCard key={op.id} op={op} index={i} />
          ))}
        </div>
      </Section>

      {/* BENTO LOGISTICS */}
      <Section code="LOG / 02" title="Logistics Grid" tag="BENTO">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-7"><WaypointPanel /></div>
          <div className="lg:col-span-5"><FuelPanel total={totalFuel} perHead={perHead} km={totalKm} /></div>
          <div className="lg:col-span-5"><FoodPanel /></div>
          <div className="lg:col-span-7"><PrayerPanel /></div>
          <div className="lg:col-span-6"><GearPanel title="Personal Gear" code="GR-P" items={GEAR_PERSONAL} /></div>
          <div className="lg:col-span-6"><GearPanel title="Convoy Gear" code="GR-C" items={GEAR_CONVOY} /></div>
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
