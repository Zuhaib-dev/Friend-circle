"use client";

import { useEffect, useState } from "react";
import { TopNav } from "@/components/top-nav";
import { Activity, MapPin, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Crosshairs } from "@/components/crosshairs";

export default function MemoriesIndexPage() {
  const [memories, setMemories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/memories")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setMemories(d); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-bone text-ink relative">
      <TopNav />
      
      <div className="pointer-events-none fixed inset-y-0 left-0 w-6 tick-v opacity-20 z-0" />
      <div className="pointer-events-none fixed inset-y-0 right-0 w-6 tick-v opacity-20 z-0" />

      <section className="relative px-4 md:px-8 pt-10 md:pt-16 pb-8">
        <div className="flex items-center gap-2 mono-label mb-6">
          <span className="brick px-2 py-px text-bone">AAR / ARCHIVES</span>
          <span className="opacity-60">AFTER-ACTION REPORTS</span>
        </div>
        
        <h1 className="font-display text-6xl md:text-8xl leading-none tracking-tight mb-4">
          FIELD <span className="text-signal">RECORDS</span>.
        </h1>
        <p className="max-w-xl text-ink/70 text-sm md:text-base">
          Declassified logs from the convoys. 
          Every route, every casualty, every intercepted comm. 
        </p>
      </section>

      <section className="px-4 md:px-8 pb-20">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="h-8 w-8 text-signal animate-spin" />
          </div>
        ) : memories.length === 0 ? (
          <div className="hairline border-ink p-10 text-center mono-label opacity-50 flex flex-col items-center justify-center gap-4">
            <Activity className="h-6 w-6 text-signal" />
            NO DECLASSIFIED RECORDS AVAILABLE
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {memories.map(mem => (
              <Link key={mem._id} href={`/memory/${mem._id}`} className="group block crosshair hairline border-ink bg-ink/5 overflow-hidden">
                <Crosshairs />
                <div className="aspect-7/3 bg-ink relative overflow-hidden">
                  {mem.bannerImage && (
                    <img src={mem.bannerImage} alt={mem.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  )}
                  <div className="absolute inset-0 bg-ink/40 group-hover:bg-signal/20 transition-colors duration-700 mix-blend-multiply" />
                  <div className="absolute top-3 left-3 flex items-start gap-1.5 mono-label text-bone">
                    <MapPin className="h-3 w-3 text-signal" /> {mem.coordinates}
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 font-mono text-xs text-bone brick px-2 py-1 bg-ink/80 group-hover:bg-signal transition-colors">
                    ACCESS RECORD <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
                <div className="p-4 bg-bone hairline-t border-ink flex justify-between items-end">
                  <div>
                    <div className="mono-label text-signal mb-1">{mem.code}</div>
                    <div className="font-display text-3xl leading-none">{mem.title}</div>
                  </div>
                  <div className="text-right">
                    <div className="mono-label opacity-50 mb-1">{mem.distance}</div>
                    <div className="mono-label opacity-70">{new Date(mem.date).toLocaleDateString()}</div>
                  </div>
                </div>
              </Link> 
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
