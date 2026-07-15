"use client";

import React, { useRef } from "react";
import { TopNav } from "@/components/top-nav";
import { Asterisk, Quote, Radio, MapPin } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

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
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  // Stagger for the title words
  const titleWords = ["The", "Voices", "Of", "The", "Field."];
  const titleVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 45 },
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
      {/* Global Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX: scrollYProgress }} 
        className="fixed top-0 left-0 right-0 h-1 bg-signal origin-left z-100" 
      />

      <TopNav />

      {/* Header Section */}
      <section ref={heroRef} className="relative px-5 sm:px-8 pt-12 sm:pt-20 pb-16 hairline-b border-ink overflow-hidden">
        {/* Background Grid Pattern with Parallax */}
        <motion.div 
          style={{ y: heroY }} 
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply" 
          >
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(oklch(0.13 0.01 60 / 0.4) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        </motion.div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div style={{ opacity: heroOpacity }} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mono-label tracking-[0.25em] uppercase text-signal mb-6 flex items-center gap-3"
              >
                <span className="h-2 w-2 rounded-full bg-signal animate-blink" />
                Live Audio Intercepts
              </motion.div>
              
              <h1 className="font-display font-black leading-[0.85] tracking-[-0.04em] text-[64px] sm:text-[96px] lg:text-[132px] uppercase flex flex-wrap gap-x-4 sm:gap-x-8">
                {titleWords.map((word, i) => (
                  <motion.span 
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={titleVariants}
                    className={word === "Voices" ? "italic text-signal font-serif normal-case" : ""}
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
              className="md:w-72 shrink-0"
            >
              <div className="hairline border-ink bg-acid/10 p-5 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-signal/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <div className="flex items-center justify-between mono-label text-[10px] tracking-widest opacity-60 mb-4 relative z-10">
                  <span>FREQUENCY</span>
                  <span>144.00 MHz</span>
                </div>
                <div className="font-serif text-lg leading-snug relative z-10">
                  Unfiltered field transmissions. Recorded over VHF and campfire embers.
                </div>
              </div>
            </motion.div>
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
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-8 text-center mono-label text-[10px] tracking-widest opacity-40"
      >
        END OF TRANSMISSION — LOG CLOSED
      </motion.div>
    </div>
  );
}

function TestimonialCard({ data, index }: { data: any, index: number }) {
  const cardRef = useRef(null);
  
  // Enter animation
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  // Parallax for the image inside the card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  // Moves the image slightly opposite to scroll direction
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // Moves the large quote icon
  const quoteY = useTransform(scrollYProgress, [0, 1], ["-20px", "20px"]);
  // Fades out content slightly as it leaves viewport
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.5]);

  const num = String(index + 1).padStart(2, "0");
  const isEven = index % 2 !== 0;

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: (index % 2) * 0.15 }}
      className={`relative group ${isEven ? 'md:mt-24' : 'md:-mt-12 first:mt-0'}`}
    >
      <motion.div style={{ opacity: contentOpacity }} className="hairline border-ink bg-bone flex flex-col h-full overflow-hidden transition-all duration-500 hover:shadow-[12px_12px_0_0_oklch(0.13_0.01_60)] hover:-translate-y-2 hover:-translate-x-2">
        
        {/* Top Image Header */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden hairline-b border-ink bg-ink">
          
          <motion.div 
            style={{ y, scale: 1.15 }} 
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={data.img} 
              alt={data.name} 
              className="object-cover w-full h-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out" 
            />
          </motion.div>

          {/* Top Bar Overlay */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start text-bone mix-blend-difference z-10">
            <div className="mono-label text-[10px] tracking-[0.2em]">LOG N° {num}</div>
            <div className="flex items-center gap-2 mono-label text-[10px] tracking-[0.2em]">
              <MapPin className="h-3 w-3" />
              {data.coord}
            </div>
          </div>
          
          {/* Quote Icon Overlay - Massive */}
          <motion.div style={{ y: quoteY }} className="absolute -bottom-6 -right-2 text-bone/20 group-hover:text-signal/80 transition-colors duration-500 mix-blend-overlay z-10">
            <Quote className="w-48 h-48" />
          </motion.div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col relative bg-bone z-20">
          
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

      </motion.div>
    </motion.div>
  );
}
