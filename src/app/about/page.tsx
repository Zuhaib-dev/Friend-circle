import React from "react";
import { TopNav } from "@/components/top-nav";
import { Asterisk, ArrowRight, Shield, Zap, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bone text-ink">
      <TopNav />

      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 pt-10 sm:pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 mono-label text-[10px] tracking-[0.18em] uppercase opacity-60 hairline-b border-ink/40 pb-4 mb-10">
          <Meta k="Filed" v="14.07.26 / SXR" />
          <Meta k="Entity" v="Friend Circle" />
          <Meta k="Class" v="Public Transport" />
          <Meta k="Status" v="Operational" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-9">
            <div className="mono-label tracking-[0.25em] uppercase text-signal mb-5 flex items-center gap-2">
              <Asterisk className="h-3 w-3" /> Chapter One — The Core
            </div>
            <h1 className="font-display font-black leading-[0.86] tracking-[-0.045em] text-[58px] sm:text-[88px] lg:text-[124px] uppercase">
              Moving <span className="italic text-signal font-serif normal-case">Kashmir</span><br />Forward<span className="text-signal">.</span>
            </h1>
          </div>
          <div className="lg:col-span-3">
            <p className="font-serif text-xl leading-snug">
              Born in the valley. Built for the people. A mobility network that actually respects your time.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          <div className="hairline border-ink bg-bone">
            <div className="brick mono-label tracking-[0.22em] uppercase py-2 px-4 flex items-center justify-between text-bone">
              <span>Directive 01</span>
            </div>
            <div className="p-8">
              <h2 className="font-display text-4xl uppercase font-bold mb-4">The Mission</h2>
              <p className="font-serif text-lg leading-relaxed text-ink/80">
                To build a transit layer for Srinagar that is precise, reliable, and entirely transparent. 
                We are stripping away the friction of urban mobility. No haggling. No ghost fleets. 
                Just clean interfaces, trained operators, and vehicles that arrive exactly when the app says they will.
              </p>
            </div>
          </div>

          <div className="hairline border-ink bg-acid/10">
            <div className="border-b border-ink mono-label tracking-[0.22em] uppercase py-2 px-4 flex items-center justify-between text-ink bg-acid/20">
              <span>Our Principles</span>
            </div>
            <div className="p-8 space-y-6">
              <Principle icon={Zap} title="Absolute Precision" desc="Every route optimized. ETAs calculated down to the second." />
              <Principle icon={Shield} title="Uncompromising Safety" desc="Vetted operators, live tracking, and instant SOS dispatch." />
              <Principle icon={Users} title="Built for Srinagar" desc="Hyper-local routing that understands our city's unique geography." />
            </div>
          </div>
        </div>

        {/* The Team / Operations */}
        <div className="mb-24">
          <div className="mono-label tracking-[0.25em] uppercase text-signal mb-8 flex items-center gap-2">
            <Asterisk className="h-3 w-3" /> The Infrastructure
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard value="2.4k+" label="Active Operators" />
            <StatCard value="15k+" label="Daily Dispatches" />
            <StatCard value="0.9s" label="System Latency" />
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="hairline border-ink bg-bone">
          <div className="p-8 sm:p-12 text-center">
            <h2 className="font-display text-4xl sm:text-6xl uppercase font-black mb-6">Join the Network</h2>
            <p className="font-serif text-xl max-w-2xl mx-auto mb-8 text-ink/80">
              Whether you are riding or operating, Friend Circle is building the future of local transit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="group inline-flex items-center gap-3 pl-5 pr-2 py-2 mono-label tracking-[0.2em] uppercase bg-ink text-bone transition-colors hover:bg-signal">
                <span>Rider Access</span>
                <span className="grid h-9 w-9 place-items-center bg-bone text-ink">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link href="/apply-team" className="group inline-flex items-center gap-3 pl-5 pr-2 py-2 mono-label tracking-[0.2em] uppercase bg-bone text-ink border border-ink transition-colors hover:bg-ink hover:text-bone">
                <span>Join Fleet</span>
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

function StatCard({ value, label }: { value: string, label: string }) {
  return (
    <div className="hairline border-ink bg-bone p-8 flex flex-col justify-between aspect-square max-h-64">
      <div className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight">{value}</div>
      <div className="mono-label tracking-[0.2em] uppercase text-signal">{label}</div>
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
