"use client";

import React, { useRef } from "react";
import { TopNav } from "@/components/top-nav";
import { Asterisk, Quote, Radio, MapPin } from "lucide-react";
import { motion, useInView } from "motion/react";

const testimonials = [
  {
    name: "Aqib",
    role: "The Motorhead",
    tag: "RECON / LEAD",
    quote: "The bike is just an excuse. The real route is the people.",
    img: "https://friendcirclee.netlify.app/archive/archive-073.jpg",
    coord: "34.0837°N",
  },
  {
    name: "Sahil",
    role: "The Chef",
    tag: "WAZWAN / SUPPLY",
    quote: "Rogan josh holding temperature. If the food is cold, the trip never happened.",
    img: "https://friendcirclee.netlify.app/archive/archive-081.jpg",
    coord: "33.9716°N",
  },
  {
    name: "Furqan",
    role: "The Comedian",
    tag: "MORALE / OPS",
    quote: "We don't have a Wi-Fi password. If you're here, you're already in.",
    img: "https://ik.imagekit.io/xuhaib/file_00000000182c720787473fb70bcc1874_YllZmbcTY.png",
    coord: "34.1700°N",
  },
  {
    name: "Sameem",
    role: "The Archivist",
    tag: "OPTICS / DOC",
    quote: "Every photo I took, somebody was laughing. That's the whole archive.",
    img: "https://friendcirclee.netlify.app/archive/archive-183.webp",
    coord: "33.8716°N",
  },
  {
    name: "Naveed",
    role: "The Navigator",
    tag: "ROUTE / MAP",
    quote: "I know shortcuts that aren't on Google. Trust the process, trust the ridge.",
    img: "https://friendcirclee.netlify.app/archive/archive-165.webp",
    coord: "34.0151°N",
  },
  {
    name: "Farhan",
    role: "The Angler",
    tag: "RIVERCRAFT",
    quote: "Three trout. The river is generous today. Patience is the only gear you need.",
    img: "https://friendcirclee.netlify.app/archive/archive-186.jpg",
    coord: "33.7212°N",
  }
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bone text-ink selection:bg-signal selection:text-bone">
      <TopNav />

      {/* Header Section */}
      <section className="relative px-5 sm:px-8 pt-12 sm:pt-20 pb-16 hairline-b border-ink">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply" style={{ backgroundImage: "radial-gradient(oklch(0.13 0.01 60 / 0.4) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="mono-label tracking-[0.25em] uppercase text-signal mb-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-signal animate-blink" />
                Live Audio Intercepts
              </div>
              <h1 className="font-display font-black leading-[0.85] tracking-[-0.04em] text-[64px] sm:text-[96px] lg:text-[132px] uppercase">
                The <span className="italic text-signal font-serif normal-case">Voices</span><br />Of The Field<span className="text-signal">.</span>
              </h1>
            </div>
            
            <div className="md:w-72 shrink-0">
              <div className="hairline border-ink bg-acid/10 p-5">
                <div className="flex items-center justify-between mono-label text-[10px] tracking-widest opacity-60 mb-4">
                  <span>FREQUENCY</span>
                  <span>144.00 MHz</span>
                </div>
                <div className="font-serif text-lg leading-snug">
                  Unfiltered field transmissions. Recorded over VHF and campfire embers.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ticker */}
      <div className="brick hairline-b border-ink overflow-hidden bg-ink text-bone">
        <div className="flex animate-marquee whitespace-nowrap py-3">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="mono-label tracking-[0.2em] px-8 flex items-center gap-4 text-[11px]">
              <Radio className="h-3 w-3 text-signal animate-blink" />
              INTERCEPTED TRANSMISSIONS — DECRYPTED LOGS
            </span>
          ))}
        </div>
      </div>

      {/* Grid Section */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 py-16 sm:py-24">
        {/* We use a CSS masonry-like stagger by alternating col spans or margins */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} data={t} index={i} />
          ))}
        </div>
      </section>
      
      {/* Footer minimal signature */}
      <div className="py-8 text-center mono-label text-[10px] tracking-widest opacity-40">
        END OF TRANSMISSION — LOG CLOSED
      </div>
    </div>
  );
}

function TestimonialCard({ data, index }: { data: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const num = String(index + 1).padStart(2, "0");
  
  // Stagger layout: even items pushed down on desktop
  const isEven = index % 2 !== 0;

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.15 }}
      className={`relative group ${isEven ? 'md:mt-24' : 'md:-mt-12 first:mt-0'}`}
    >
      <div className="hairline border-ink bg-bone flex flex-col h-full overflow-hidden transition-all duration-500 hover:shadow-[8px_8px_0_0_oklch(0.13_0.01_60)] hover:-translate-y-1 hover:-translate-x-1">
        
        {/* Top Image Header */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden hairline-b border-ink bg-ink">
          {/* Default Grayscale, color on hover. Slight scale animation */}
          <img 
            src={data.img} 
            alt={data.name} 
            className="absolute inset-0 object-cover w-full h-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
          />
          {/* Top Bar Overlay */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start text-bone mix-blend-difference">
            <div className="mono-label text-[10px] tracking-[0.2em]">LOG N° {num}</div>
            <div className="flex items-center gap-2 mono-label text-[10px] tracking-[0.2em]">
              <MapPin className="h-3 w-3" />
              {data.coord}
            </div>
          </div>
          
          {/* Quote Icon Overlay - Massive */}
          <div className="absolute -bottom-6 -right-2 text-bone/20 group-hover:text-signal/80 transition-colors duration-500 mix-blend-overlay">
            <Quote className="w-48 h-48" />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col relative bg-bone z-10">
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-3xl sm:text-4xl uppercase font-black tracking-tight leading-none group-hover:text-signal transition-colors">{data.name}</h3>
              <div className="mono-label text-xs tracking-widest px-2 py-1 bg-acid/20 border border-ink/10">
                {data.tag}
              </div>
            </div>
            <div className="font-serif italic text-ink/60 text-lg">
              — {data.role}
            </div>
          </div>

          <p className="font-serif text-2xl sm:text-3xl leading-[1.2] tracking-tight text-ink mb-6 flex-1">
            "{data.quote}"
          </p>
          
          {/* Reticle element that appears on hover */}
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-signal">
            <div className="relative w-8 h-8">
              <div className="absolute top-0 left-0 w-2 h-px bg-signal" />
              <div className="absolute top-0 left-0 w-px h-2 bg-signal" />
              <div className="absolute bottom-0 right-0 w-2 h-px bg-signal" />
              <div className="absolute bottom-0 right-0 w-px h-2 bg-signal" />
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
