"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Volume2, VolumeX, Star, Users } from "lucide-react";
import Link from "next/link";

export function BentoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section className="px-4 md:px-8 py-10 max-w-[1920px] mx-auto bg-ink text-bone hairline-b border-ink">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 max-w-[1600px] mx-auto">
        
        {/* Left Side: Stats and CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
          
          {/* Top Left Stat */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-2xl border border-bone/10 bg-ink flex flex-col justify-between min-h-50 hover:border-signal/30 transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-7 w-7 text-signal" />
                <span className="display-num text-3xl md:text-4xl text-signal">19 UNITS</span>
              </div>
              <p className="mono-label opacity-80 text-sm">Active Field Operators</p>
            </div>
            <p className="font-display italic text-bone/60 mt-6 text-sm md:text-base">
              Forged in the valleys, united by purpose.
            </p>
          </motion.div>

          {/* Top Right Stat */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 md:p-8 rounded-2xl border border-bone/10 bg-ink flex flex-col justify-between min-h-50 hover:border-signal/30 transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Star className="h-7 w-7 text-signal fill-signal" />
                <span className="display-num text-3xl md:text-4xl text-signal">EST. 2018</span>
              </div>
              <p className="mono-label opacity-80 text-sm">Base: KMR</p>
            </div>
            <p className="font-display italic text-bone/60 mt-6 text-sm md:text-base">
              Logging tracks across Srinagar and beyond.
            </p>
          </motion.div>

          {/* Bottom Wide CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 md:col-span-2 p-6 md:p-10 rounded-2xl border border-bone/10 bg-ink flex flex-col justify-between min-h-70 hover:border-signal/30 transition-colors"
          >
            <div>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h3 className="display-num text-4xl md:text-5xl lg:text-[64px] text-bone leading-none uppercase">
                  UNLOCK 
                </h3>
                <span className="inline-flex items-center gap-[-8px] align-middle px-2">
                   {/* Decorative user avatars simulating the bento design */}
                   <span className="w-12 h-12 rounded-full border-2 border-ink bg-bone -mr-4 relative z-30" style={{ backgroundImage: "url('/archive/archive-051.jpg')", backgroundSize: 'cover' }}></span>
                   <span className="w-12 h-12 rounded-full border-2 border-ink bg-signal -mr-4 relative z-20" style={{ backgroundImage: "url('/archive/archive-052.jpg')", backgroundSize: 'cover' }}></span>
                   <span className="w-12 h-12 rounded-full border-2 border-ink bg-bone relative z-10" style={{ backgroundImage: "url('/archive/archive-079.jpg')", backgroundSize: 'cover' }}></span>
                </span>
                <h3 className="display-num text-4xl md:text-5xl lg:text-[64px] text-bone leading-none uppercase">
                  YOUR
                </h3>
              </div>
              <Link 
                href="#tours" 
                className="inline-flex items-center justify-center w-16 h-8 rounded-full border border-signal text-signal hover:bg-signal hover:text-ink transition-colors mt-2 mb-2"
              >
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <h3 className="display-num text-4xl md:text-5xl lg:text-[64px] text-bone leading-none uppercase mt-6">
              NEXT EXPEDITION WITH US!
            </h3>
          </motion.div>

        </div>

        {/* Right Side: Large Video */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden border border-bone/10 bg-black min-h-125 lg:min-h-full group"
        >
          {/* Header overlay */}
          <div className="absolute top-8 left-8 z-10">
            <h2 className="text-4xl md:text-[56px] font-display text-white drop-shadow-xl leading-[1.1]">
              Start<br/>Exploring
            </h2>
          </div>

          {/* Video Player */}
          <video
            ref={videoRef}
            src="/friend-circle-launch.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Custom controls gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

          {/* Unmute & Action Area */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-10">
            <Link 
              href="#tours"
              className="mono-label text-sm text-signal hover:text-bone border border-signal/40 bg-black/40 backdrop-blur-md hover:bg-signal/20 px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
            
            <button 
              onClick={toggleMute}
              className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-colors shadow-lg cursor-pointer"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
