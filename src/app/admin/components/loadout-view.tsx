"use client";
import { useState, useEffect } from "react";
import { Package, Compass } from "lucide-react";
import { Panel, EmptyState } from "./shared";

type Trip = {
  tripId: string;
  name: string;
  code: string;
  terrain: string;
  duration: string;
  hazard: string;
};

export function LoadoutView() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/loadout/trips")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTrips(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Panel
      code="CMD / 07"
      title="LOADOUT & GEAR MANIFEST"
      right={<span className="mono-label text-signal">{trips.length} DEPLOYMENTS</span>}
    >
      <div className="p-4 space-y-4">
        <div className="mono-label opacity-60 mb-2">ACTIVE DEPLOYMENT TRIPS</div>
        {loading ? (
           <div className="py-8 text-center mono-label text-signal animate-pulse">FETCHING INTEL...</div>
        ) : trips.length === 0 ? (
           <EmptyState icon={Package} label="NO DEPLOYMENTS" hint="No active trips in database." />
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
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 hairline-t border-ink/20">
          <p className="mono-label opacity-60">MASTER GEAR LIST MANAGED VIA API.</p>
        </div>
      </div>
    </Panel>
  );
}
