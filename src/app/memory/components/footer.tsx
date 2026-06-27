"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Quote, Wallet, Utensils, Wrench, CloudLightning, Camera, Gauge, Volume2, Calendar } from "lucide-react";
import { fadeUp, PanelHeader } from "./shared";

export function LogisticsSummary() {
  const items = [
    { icon: Wallet, label: "TOTAL EXPENSE", value: "₹ 18,420", code: "FIN-01", tint: "text-signal" },
    { icon: Utensils, label: "FOOD / WAWAN", value: "₹ 4,200", code: "FIN-02" },
    { icon: Wrench, label: "MECH CASUALTIES", value: "02 UNITS", code: "MEC-01", tint: "text-signal" },
    { icon: CloudLightning, label: "WEATHER EVENTS", value: "DRIZZLE · MIST", code: "MET-06" },
    { icon: Camera, label: "FRAMES CAPTURED", value: "247", code: "MED-01" },
    { icon: Gauge, label: "AVG SPEED", value: "42 KM/H", code: "ODO-02" },
    { icon: Volume2, label: "PLAYLIST RUNS", value: "07", code: "AUD-01" },
    { icon: Calendar, label: "DURATION", value: "18H 22M", code: "T-FIN" },
  ];
  return (
    <section className="px-4 md:px-8 mt-12">
      <motion.div {...fadeUp} className="hairline border-ink bg-bone">
        <PanelHeader code="LOG / 07" title="LOGISTICS & EXPENSE READOUT" />
        <div className="grid grid-cols-2 md:grid-cols-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            const isRightEdge = (i + 1) % 4 === 0;
            const isMobileRightEdge = (i + 1) % 2 === 0;
            return (
              <motion.div
                key={it.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`relative p-4 hairline-b border-ink/30 ${!isRightEdge ? "md:hairline-r" : ""} ${!isMobileRightEdge ? "hairline-r md:hairline-r" : ""} group hover:bg-acid/30 transition-colors`}
              >
                <div className="flex items-center justify-between mono-label opacity-60">
                  <span className="flex items-center gap-1.5">
                    <Icon className={`h-3.5 w-3.5 ${it.tint ?? "text-ink"}`} />
                    {it.label}
                  </span>
                  <span>{it.code}</span>
                </div>
                <div className={`font-display text-2xl md:text-3xl mt-2 leading-none ${it.tint ?? "text-ink"}`}>
                  {it.value}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

export function QuoteStrip() {
  return (
    <motion.div {...fadeUp} className="px-4 md:px-8 mt-12">
      <div className="hairline border-ink bg-acid relative overflow-hidden">
        <div className="absolute inset-0 tick opacity-20 pointer-events-none" />
        <div className="relative p-6 md:p-8 flex items-start gap-4">
          <Quote className="h-8 w-8 text-ink shrink-0" />
          <div>
            <div className="font-display text-ink text-2xl md:text-4xl leading-tight">
              "We didn't go to Pahalgam. Pahalgam happened to us."
            </div>
            <div className="mono-label mt-3 opacity-70">— BRAVO · DEBRIEF 22:11 UTC</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TerminalFooter() {
  const [cursor, setCursor] = useState(true);
  useEffect(() => {
    const i = setInterval(() => setCursor((c) => !c), 600);
    return () => clearInterval(i);
  }, []);
  return (
    <footer className="px-4 md:px-8 mt-12 mb-8">
      <div className="hairline border-ink bg-ink text-bone font-mono text-xs md:text-sm p-4 md:p-5 overflow-x-auto">
        <div className="flex items-center justify-between mono-label text-bone/60 mb-3">
          <span>SYS / TERM-01</span>
          <span className="text-signal">SESSION CLOSED</span>
        </div>
        {[
          "> initiating archive sequence...",
          "> packaging 247 frames · 03 feeds · 06 callsigns",
          "> writing manifest to /aar/014/pahalgam.rally",
          "> checksum OK · 0xA14F-PAH-26",
          "> END OF RECORD / ARCHIVED SECURELY",
        ].map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: i * 0.12 }}
            className={i === 4 ? "text-signal" : "text-acid"}
          >
            {line}
          </motion.div>
        ))}
        <div className="text-bone/60 mt-2">
          &gt; {cursor ? "▌" : " "}
        </div>
      </div>
    </footer>
  );
}
