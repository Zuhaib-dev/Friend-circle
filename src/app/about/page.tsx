"use client";

import React, { useRef } from "react";
import { TopNav } from "@/components/top-nav";
import { Asterisk, ArrowRight, Compass, Camera, Flame } from "lucide-react";
import Link from "next/link";
import { TIMELINE } from "@/data/home-data";
import { motion, useInView, useScroll, useTransform } from "motion/react";

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  // Title Stagger
  const titleWords = ["The", "Digital", "Campfire", "Burn", "Book."];
  const titleVariants: any = {
    hidden: { opacity: 0, y: 40, rotateX: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-bone text-ink selection:bg-signal selection:text-bone">
      {/* Global Scroll Progress */}
      <motion.div 
        style={{ scaleX: scrollYProgress }} 
        className="fixed top-0 left-0 right-0 h-1 bg-signal origin-left z-50" 
      />

      <TopNav />

      <section ref={heroRef} className="relative mx-auto max-w-350 px-5 sm:px-8 pt-10 sm:pt-16 pb-10">
        
        {/* Animated Meta Data */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 mono-label text-[10px] tracking-[0.18em] uppercase opacity-60 hairline-b border-ink/40 pb-4 mb-10"
        >
          <Meta k="Established" v="2018 / KMR" />
          <Meta k="Entity" v="Friend Circle" />
          <Meta k="Class" v="Brotherhood / Offroad" />
          <Meta k="Status" v="Active Units: 19" />
        </motion.div>

        {/* Hero with Parallax */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="grid lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-9">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mono-label tracking-[0.25em] uppercase text-signal mb-5 flex items-center gap-2"
            >
              <Asterisk className="h-3 w-3 animate-spin-slow" /> Chapter One — The Core
            </motion.div>
            
            <h1 className="font-display font-black leading-[0.86] tracking-[-0.045em] text-[58px] sm:text-[88px] lg:text-[124px] uppercase flex flex-wrap gap-x-3 sm:gap-x-6">
              {titleWords.map((word, i) => (
                <motion.span 
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={titleVariants}
                  className={word === "Campfire" ? "italic text-signal font-serif normal-case" : ""}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="p-4 border-l-2 border-signal bg-acid/5">
              <p className="font-serif text-xl leading-snug">
                Where the wild meets the heart — a brotherhood logged in tire-tracks, trout, and tasbih.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Mission Statement */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          <ScrollReveal delay={0.1}>
            <div className="hairline border-ink bg-bone flex flex-col h-full group hover:shadow-[8px_8px_0_0_oklch(0.13_0.01_60)] transition-all duration-500 hover:-translate-y-1 hover:-translate-x-1">
              <div className="brick mono-label tracking-[0.22em] uppercase py-2 px-4 flex items-center justify-between text-bone group-hover:bg-signal transition-colors">
                <span>Directive 01</span>
                <Asterisk className="h-3 w-3 opacity-50 group-hover:animate-spin" />
              </div>
              <div className="p-8 flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-signal/5 rounded-full blur-3xl group-hover:bg-signal/20 transition-colors duration-700" />
                <h2 className="font-display text-4xl uppercase font-bold mb-4 relative z-10">The Origin</h2>
                <p className="font-serif text-lg leading-relaxed text-ink/80 mb-6 relative z-10">
                  It started in 2018 with six kids, one cricket bat, and one bike. The bench in Chadoora became HQ. We don't sell trips, and we aren't a tour company. We are a friend circle that documents itself. 
                </p>
                <p className="font-serif text-lg leading-relaxed text-ink/80 relative z-10">
                  This is a field manual for our memories. We built this space because brochure websites lie, but field manuals don't. From the Pir Panjal ridges to Doodhpathri loops, every coordinate holds a story.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="hairline border-ink bg-acid/10 flex flex-col h-full group hover:shadow-[8px_8px_0_0_oklch(0.13_0.01_60)] transition-all duration-500 hover:-translate-y-1 hover:-translate-x-1">
              <div className="border-b border-ink mono-label tracking-[0.22em] uppercase py-2 px-4 flex items-center justify-between text-ink bg-acid/20 group-hover:bg-ink group-hover:text-bone transition-colors">
                <span>Our Principles</span>
              </div>
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-center relative z-10">
                <Principle icon={Compass} title="The Route" desc="No trip without a purpose. The bike is just an excuse; the real route is the people." delay={0.1} />
                <Principle icon={Flame} title="Wazwan Doctrine" desc="Forged in 2022. It is law: no major expedition happens without cooking rista." delay={0.2} />
                <Principle icon={Camera} title="Optics Protocol" desc="Camera locked to face. Every memory exists because it was captured right." delay={0.3} />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* The Timeline */}
        <div className="mb-24 relative">
          <ScrollReveal>
            <div className="mono-label tracking-[0.25em] uppercase text-signal mb-8 flex items-center gap-2">
              <Asterisk className="h-3 w-3 animate-spin-slow" /> The Ledger
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {TIMELINE.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="hairline border-ink bg-bone p-6 h-full flex flex-col group hover:bg-ink hover:text-bone transition-colors duration-300">
                  <div className="mono-label text-signal mb-2 transition-transform duration-300 group-hover:translate-x-2">{t.y}</div>
                  <h3 className="font-display text-2xl uppercase font-bold mb-3">{t.t}</h3>
                  <p className="font-serif text-ink/80 group-hover:text-bone/80">{t.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        {/* Founder Section */}
        <ScrollReveal>
          <div className="mb-24">
            <div className="mono-label tracking-[0.25em] uppercase text-signal mb-8 flex items-center gap-2">
              <Asterisk className="h-3 w-3 animate-spin-slow" /> The Architect
            </div>
            
            <div className="hairline border-ink bg-bone flex flex-col md:flex-row group hover:shadow-[8px_8px_0_0_oklch(0.13_0.01_60)] transition-all duration-500 hover:-translate-y-1 hover:-translate-x-1 overflow-hidden">
              <div className="md:w-1/3 relative h-64 md:h-auto border-b md:border-b-0 md:border-r border-ink bg-ink overflow-hidden">
                <img 
                  src="https://github.com/Zuhaib-dev.png" 
                  alt="Zuhaib Rashid" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start text-bone mix-blend-difference z-10">
                  <div className="mono-label text-[10px] tracking-[0.2em]">ID: 001</div>
                </div>
              </div>
              
              <div className="md:w-2/3 p-8 sm:p-12 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-signal/5 rounded-full blur-3xl group-hover:bg-signal/10 transition-colors duration-700" />
                
                <h3 className="font-display text-4xl sm:text-5xl uppercase font-black tracking-tight leading-none mb-2">Zuhaib Rashid</h3>
                <div className="mono-label text-xs tracking-widest px-2 py-1 bg-acid/20 border border-ink/10 inline-block w-fit mb-6 text-signal">
                  FOUNDER / ENGINEER / ADVENTURER
                </div>
                
                <p className="font-serif text-xl leading-relaxed text-ink/80 mb-8 max-w-xl relative z-10">
                  The original architect of the Friend Circle. Blending the precision of software engineering with the chaotic beauty of offroad expeditions. Building digital systems by day, chasing the next mountain pass by night.
                </p>
                
                <div className="flex flex-wrap gap-4 mt-auto relative z-10">
                  <a href="https://zuhaibrashid.com" target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-3 pl-4 pr-2 py-1.5 mono-label tracking-[0.2em] uppercase text-ink border border-ink/30 hover:border-ink transition-colors bg-bone">
                    <span className="text-[10px]">Portfolio / Commits</span>
                    <span className="grid h-6 w-6 place-items-center bg-acid/20 text-ink group-hover/link:bg-signal group-hover/link:text-bone transition-colors">
                      <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
        
        {/* Call to Action */}
        <ScrollReveal>
          <div className="hairline border-ink bg-bone relative overflow-hidden group">
            {/* Background interactive gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-signal/0 to-signal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="p-8 sm:p-12 text-center relative z-10">
              <motion.h2 
                whileHover={{ scale: 1.02 }}
                className="font-display text-4xl sm:text-6xl uppercase font-black mb-6 transition-transform"
              >
                Join the Campfire
              </motion.h2>
              <p className="font-serif text-xl max-w-2xl mx-auto mb-8 text-ink/80">
                You don't apply. You show up. Bring chai, don't complain about the cold, and survive one Wazwan night.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/gallery" className="group/btn inline-flex items-center gap-3 pl-5 pr-2 py-2 mono-label tracking-[0.2em] uppercase bg-ink text-bone transition-colors hover:bg-signal">
                  <span>View Archive</span>
                  <span className="grid h-9 w-9 place-items-center bg-bone text-ink">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </span>
                </Link>
                <Link href="/crew" className="group/btn inline-flex items-center gap-3 pl-5 pr-2 py-2 mono-label tracking-[0.2em] uppercase bg-bone text-ink border border-ink transition-colors hover:bg-ink hover:text-bone">
                  <span>Meet the Units</span>
                  <span className="grid h-9 w-9 place-items-center bg-ink text-bone group-hover/btn:bg-bone group-hover/btn:text-ink">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="h-2 tick border-t border-ink/20" />
          </div>
        </ScrollReveal>

      </section>
    </div>
  );
}

// Reusable ScrollReveal wrapper
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

function Principle({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: delay + 0.3 }}
      className="flex gap-4 group/principle"
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center bg-ink text-bone rounded-sm group-hover/principle:bg-signal transition-colors duration-300">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-display text-xl uppercase font-bold tracking-tight mb-1 group-hover/principle:text-signal transition-colors duration-300">{title}</h3>
        <p className="font-serif text-ink/80 leading-snug">{desc}</p>
      </div>
    </motion.div>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="opacity-40">{k}</span><span>—</span><span className="text-ink truncate">{v}</span>
    </div>
  );
}
