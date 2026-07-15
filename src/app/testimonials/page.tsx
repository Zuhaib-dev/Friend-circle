import React from "react";
import { TopNav } from "@/components/top-nav";
import { Asterisk, Quote } from "lucide-react";
import Image from "next/image";

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Aqib",
      role: "The Motorhead · RECON / LEAD",
      quote: "The bike is just an excuse. The real route is the people.",
      img: "/adv-bike.jpg"
    },
    {
      name: "Sahil",
      role: "The Chef · WAZWAN / SUPPLY",
      quote: "Rogan josh holding temperature. If the food is cold, the trip never happened.",
      img: "/adv-camp.jpg"
    },
    {
      name: "Furqan",
      role: "The Comedian · MORALE / OPS",
      quote: "We don't have a Wi-Fi password. If you're here, you're already in.",
      img: "/adv-offroad.jpg"
    },
    {
      name: "Sameem",
      role: "The Archivist · OPTICS / DOC",
      quote: "Every photo I took, somebody was laughing. That's the whole archive.",
      img: "/adv-srinagar.jpg"
    },
    {
      name: "Naveed",
      role: "The Navigator · ROUTE / MAP",
      quote: "I know shortcuts that aren't on Google. Trust the process, trust the ridge.",
      img: "/adv-forest.jpg"
    },
    {
      name: "Farhan",
      role: "The Angler · RIVERCRAFT",
      quote: "Three trout. The river is generous today. Patience is the only gear you need.",
      img: "/adv-fishing.jpg"
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-bone text-ink">
      <TopNav />

      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 pt-10 sm:pt-16 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 mono-label text-[10px] tracking-[0.18em] uppercase opacity-60 hairline-b border-ink/40 pb-4 mb-10">
          <Meta k="Entity" v="Friend Circle" />
          <Meta k="Class" v="Field Notes" />
          <Meta k="Format" v="Transmissions" />
          <Meta k="Status" v="Verified" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-9">
            <div className="mono-label tracking-[0.25em] uppercase text-signal mb-5 flex items-center gap-2">
              <Asterisk className="h-3 w-3" /> Chapter Four — The Voices
            </div>
            <h1 className="font-display font-black leading-[0.86] tracking-[-0.045em] text-[58px] sm:text-[88px] lg:text-[124px] uppercase">
              Field <span className="italic text-signal font-serif normal-case">Transmissions</span><span className="text-signal">.</span>
            </h1>
          </div>
          <div className="lg:col-span-3">
            <p className="font-serif text-xl leading-snug">
              Unfiltered quotes straight from the ridges, rivers, and Wazwan fires of the Friend Circle.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} data={t} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

function TestimonialCard({ data, index }: { data: any, index: number }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="hairline border-ink bg-bone flex flex-col group">
      <div className="brick mono-label tracking-[0.22em] uppercase py-2 px-4 flex items-center justify-between text-bone transition-colors group-hover:bg-signal group-hover:border-signal">
        <span>LOG / {num}</span>
        <Quote className="h-3 w-3 opacity-60" />
      </div>
      <div className="p-6 sm:p-8 flex-1 flex flex-col">
        <p className="font-serif text-xl sm:text-2xl leading-snug text-ink mb-8 flex-1">
          "{data.quote}"
        </p>
        
        <div className="flex items-center gap-4 hairline-t border-ink/20 pt-6 mt-auto">
          <div className="h-12 w-12 shrink-0 rounded-full hairline border-ink overflow-hidden bg-acid/20 flex items-center justify-center">
            {data.img ? (
              <Image src={data.img} alt={data.name} width={48} height={48} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all" />
            ) : (
              <span className="font-display text-xl">{data.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <div className="font-display text-lg uppercase font-bold tracking-tight leading-none mb-1">{data.name}</div>
            <div className="mono-label tracking-[0.1em] text-[9px] uppercase opacity-60">{data.role}</div>
          </div>
        </div>
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
