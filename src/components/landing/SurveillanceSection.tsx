"use client";

import { Activity, Video as VideoIcon, Play } from "lucide-react";
import { Crosshairs } from "./primitives";

export function SurveillanceSection() {
  return (
    <section id="feeds" className="px-4 md:px-8 py-16 hairline-t border-ink bg-ink text-bone">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="mono-label text-signal mb-2 flex items-center gap-2">
            <span className="brick bg-signal text-ink px-1.5 py-0.5">OPS / 04</span>
            <Activity className="h-3.5 w-3.5 animate-blink" />
          </div>
          <h2 className="display-num text-5xl md:text-6xl uppercase leading-none">
            Surveillance<span className="text-signal">.</span>
          </h2>
          <p className="font-display italic text-bone/60 text-xl md:text-2xl mt-1">
            Raw, unfiltered video intel from the field.
          </p>
        </div>
        <a href="/surveillance" className="brick hover:bg-signal transition-colors group shrink-0">
          ACCESS FEEDS <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>

      <div className="hairline border-bone/20 aspect-21/9 bg-black group overflow-hidden crosshair flex flex-col items-center justify-center">
         <Crosshairs />
         {/* Static background */}
         <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=')] animate-pulse pointer-events-none" />
         
         <div className="absolute top-4 left-4 mono-label text-signal text-[10px] flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-signal rounded-full animate-blink"></span>
            LIVE UPLINK ACTIVE
         </div>

         <div className="text-center relative z-10">
           <VideoIcon className="h-12 w-12 text-bone/40 mx-auto mb-4" />
           <p className="mono-label text-bone/60 mb-6">13 ARCHIVED FEEDS · 295 MB TOTAL</p>
           <a href="/surveillance" className="hairline border-emerald-400 bg-emerald-400/10 text-emerald-300 backdrop-blur-sm shadow-[0_0_30px_rgba(52,211,153,0.35)] hover:shadow-[0_0_60px_rgba(52,211,153,0.7)] transition-shadow px-6 py-3 mono-label inline-flex items-center gap-2">
             <Play className="h-4 w-4 fill-current" /> INITIATE PLAYBACK
           </a>
         </div>
         
         <div className="absolute bottom-4 right-4 mono-label text-bone/60 text-[10px]">
           ENCRYPTED · SECTOR 04
         </div>
      </div>
    </section>
  );
}
