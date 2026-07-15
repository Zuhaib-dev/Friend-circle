import React from "react";
import { TopNav } from "@/components/top-nav";
import { Asterisk, ArrowRight, Compass, Camera, Flame } from "lucide-react";
import Link from "next/link";
import { TIMELINE } from "@/data/home-data";

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bone text-ink">
      <TopNav />

      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 pt-10 sm:pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 mono-label text-[10px] tracking-[0.18em] uppercase opacity-60 hairline-b border-ink/40 pb-4 mb-10">
          <Meta k="Established" v="2018 / KMR" />
          <Meta k="Entity" v="Friend Circle" />
          <Meta k="Class" v="Brotherhood / Offroad" />
          <Meta k="Status" v="Active Units: 19" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-9">
            <div className="mono-label tracking-[0.25em] uppercase text-signal mb-5 flex items-center gap-2">
              <Asterisk className="h-3 w-3" /> Chapter One — The Core
            </div>
            <h1 className="font-display font-black leading-[0.86] tracking-[-0.045em] text-[58px] sm:text-[88px] lg:text-[124px] uppercase">
              The Digital <span className="italic text-signal font-serif normal-case">Campfire</span><br />Burn Book<span className="text-signal">.</span>
            </h1>
          </div>
          <div className="lg:col-span-3">
            <p className="font-serif text-xl leading-snug">
              Where the wild meets the heart — a brotherhood logged in tire-tracks, trout, and tasbih.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          <div className="hairline border-ink bg-bone flex flex-col">
            <div className="brick mono-label tracking-[0.22em] uppercase py-2 px-4 flex items-center justify-between text-bone">
              <span>Directive 01</span>
            </div>
            <div className="p-8 flex-1">
              <h2 className="font-display text-4xl uppercase font-bold mb-4">The Origin</h2>
              <p className="font-serif text-lg leading-relaxed text-ink/80 mb-6">
                It started in 2018 with six kids, one cricket bat, and one bike. The bench in Chadoora became HQ. We don't sell trips, and we aren't a tour company. We are a friend circle that documents itself. 
              </p>
              <p className="font-serif text-lg leading-relaxed text-ink/80">
                This is a field manual for our memories. We built this space because brochure websites lie, but field manuals don't. From the Pir Panjal ridges to Doodhpathri loops, every coordinate holds a story.
              </p>
            </div>
          </div>

          <div className="hairline border-ink bg-acid/10 flex flex-col">
            <div className="border-b border-ink mono-label tracking-[0.22em] uppercase py-2 px-4 flex items-center justify-between text-ink bg-acid/20">
              <span>Our Principles</span>
            </div>
            <div className="p-8 space-y-6 flex-1 flex flex-col justify-center">
              <Principle icon={Compass} title="The Route" desc="No trip without a purpose. The bike is just an excuse; the real route is the people." />
              <Principle icon={Flame} title="Wazwan Doctrine" desc="Forged in 2022. It is law: no major expedition happens without cooking rista." />
              <Principle icon={Camera} title="Optics Protocol" desc="Camera locked to face. Every memory exists because it was captured right." />
            </div>
          </div>
        </div>

        {/* The Timeline */}
        <div className="mb-24">
          <div className="mono-label tracking-[0.25em] uppercase text-signal mb-8 flex items-center gap-2">
            <Asterisk className="h-3 w-3" /> The Ledger
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIMELINE.map((t, i) => (
              <div key={i} className="hairline border-ink bg-bone p-6">
                <div className="mono-label text-signal mb-2">{t.y}</div>
                <h3 className="font-display text-2xl uppercase font-bold mb-3">{t.t}</h3>
                <p className="font-serif text-ink/80">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="hairline border-ink bg-bone">
          <div className="p-8 sm:p-12 text-center">
            <h2 className="font-display text-4xl sm:text-6xl uppercase font-black mb-6">Join the Campfire</h2>
            <p className="font-serif text-xl max-w-2xl mx-auto mb-8 text-ink/80">
              You don't apply. You show up. Bring chai, don't complain about the cold, and survive one Wazwan night.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/gallery" className="group inline-flex items-center gap-3 pl-5 pr-2 py-2 mono-label tracking-[0.2em] uppercase bg-ink text-bone transition-colors hover:bg-signal">
                <span>View Archive</span>
                <span className="grid h-9 w-9 place-items-center bg-bone text-ink">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link href="/crew" className="group inline-flex items-center gap-3 pl-5 pr-2 py-2 mono-label tracking-[0.2em] uppercase bg-bone text-ink border border-ink transition-colors hover:bg-ink hover:text-bone">
                <span>Meet the Units</span>
                <span className="grid h-9 w-9 place-items-center bg-ink text-bone group-hover:bg-bone group-hover:text-ink">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </div>
          <div className="h-2 tick border-t border-ink/20" />
        </div>

      </section>
    </div>
  );
}

function Principle({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center bg-ink text-bone rounded-sm">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-display text-xl uppercase font-bold tracking-tight mb-1">{title}</h3>
        <p className="font-serif text-ink/80 leading-snug">{desc}</p>
      </div>
    </div>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="opacity-40">{k}</span><span>—</span><span className="text-ink truncate">{v}</span>
    </div>
  );
}
