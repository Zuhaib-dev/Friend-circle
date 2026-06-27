"use client";
import { motion } from "motion/react";
import { MapPin, Activity, Mountain } from "lucide-react";
import { Crosshairs } from "@/components/crosshairs";
import { fadeUp, UTCClock } from "./shared";

export function HeroBanner({ bannerImage, coordinates, code, elevation }: { bannerImage: string, coordinates: string, code: string, elevation: string }) {
  return (
    <motion.div {...fadeUp} className="crosshair hairline border-ink overflow-hidden group">
      <Crosshairs />
      <div className="relative aspect-7/3 md:aspect-3/1 overflow-hidden bg-ink">
        <img
          src={bannerImage || "https://picsum.photos/seed/pahalgam-banner-fc/2000/800"}
          alt="Banner"
          className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-ink/40 group-hover:bg-signal/20 transition-colors duration-700 mix-blend-multiply" />
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between text-bone">
          <span className="mono-label flex items-center gap-1.5">
            <MapPin className="h-3 w-3" /> {coordinates}
          </span>
          <span className="mono-label flex items-center gap-1.5">
            <Activity className="h-3 w-3 text-signal animate-blink" /> RECORDED
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-bone">
          <span className="mono-label">{code}</span>
          <span className="mono-label flex items-center gap-1.5">
            <Mountain className="h-3 w-3" /> ELEV · {elevation}
          </span>
        </div>
        <div className="absolute inset-x-0 top-0 h-1 tick opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-1 tick opacity-40" />
      </div>
    </motion.div>
  );
}

export function EditorialHeader({ title, code, date, distance, weather, status, description }: any) {
  return (
    <section className="relative px-4 md:px-8 pt-6 md:pt-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex items-center justify-between mono-label mb-4"
      >
        <span className="flex items-center gap-2">
          <span className="brick px-2 py-px text-bone">{code?.split("/")[0] || "AAR"}</span>
          <span className="opacity-60">AFTER-ACTION REPORT</span>
        </span>
        <UTCClock />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
        className="font-display text-ink leading-[0.85] tracking-tight"
        style={{ fontSize: "clamp(56px, 13vw, 200px)", fontWeight: 900 }}
      >
        {title}.
      </motion.h1>

      <motion.p
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.1 }}
        className="mt-4 max-w-2xl text-ink/70 text-sm md:text-base"
      >
        {description}
      </motion.p>

      <motion.div {...fadeUp} className="mt-6 hairline border-ink grid grid-cols-2 md:grid-cols-4">
        {[
          { label: "DATE", value: new Date(date).toLocaleDateString(), code: "T-00" },
          { label: "DISTANCE", value: distance, code: "ODO" },
          { label: "WEATHER", value: weather, code: "MET" },
          { label: "STATUS", value: status, code: "SEC" }
        ].map((m, i) => (
          <div
            key={m.label}
            className={`p-3 md:p-4 ${i < 3 ? "md:hairline-r border-ink" : ""} ${i < 2 ? "hairline-b md:hairline-b-0 border-ink" : ""} ${i === 0 ? "hairline-r border-ink" : ""} ${i === 2 ? "hairline-r border-ink md:hairline-r" : ""}`}
          >
            <div className="flex items-center justify-between mono-label opacity-60">
              <span>{m.label}</span>
              <span>{m.code}</span>
            </div>
            <div className="font-display text-2xl md:text-3xl mt-1 leading-none">{m.value}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
