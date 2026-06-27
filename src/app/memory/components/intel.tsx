"use client";
import { motion } from "motion/react";
import { Radio, ShieldCheck } from "lucide-react";
import { Crosshairs } from "@/components/crosshairs";
import { fadeUp, PanelHeader } from "./shared";

export function IntelSection({ story, bestMoment, quotes }: any) {
  return (
    <section className="px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <motion.div {...fadeUp} className="lg:col-span-2 hairline border-ink bg-bone">
        <PanelHeader code="INTEL / 03" title="STORY OF THE DAY" />
        <div className="p-5 md:p-6">
          <p className="text-ink/85 leading-relaxed text-base md:text-lg first-letter:font-display first-letter:text-7xl first-letter:float-left first-letter:leading-none first-letter:mr-2 first-letter:mt-1 first-letter:text-signal">
            Convoy rolled out at 04:30 from Lal Chowk under a sky still arguing with itself. By the time we hit
            Anantnag the drizzle had committed. Charlie's Gurkha caught a rock just past Bijbehara — the bumper went
            sideways but the morale stayed level. We made Pahalgam by 09:12, brewed nun-chai on the Lidder, and
            argued about whether the trout was worth the permit. It wasn't. It was better. The sun never showed up,
            and somehow that made it sharper.
          </p>

          <div className="mt-6 brick p-4 md:p-5 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1 bg-signal" />
            <div className="mono-label text-bone/70 mb-1">BEST MOMENT · 17:46 UTC</div>
            <div className="font-display text-bone text-xl md:text-2xl leading-tight">
              Snow patch at Aru. Six rigs, one fire, zero signal. Echo's speaker dropped Nusrat. Nobody spoke for
              eleven minutes.
            </div>
          </div>

          <div className="mt-6 hairline border-ink bg-ink text-acid p-3 md:p-4 font-mono text-xs md:text-sm space-y-1.5 overflow-x-auto">
            <div className="flex items-center justify-between mono-label text-bone/60 mb-2">
              <span className="flex items-center gap-1.5">
                <Radio className="h-3 w-3 text-signal" /> INTERCEPTED COMMS
              </span>
              <span className="text-signal animate-blink">● REC</span>
            </div>
            {(quotes || []).map((q: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.06 }}
                className="whitespace-nowrap"
              >
                <span className="text-bone/50">&gt; [{q.t} UTC]</span>{" "}
                <span className="text-signal">{q.c}:</span>{" "}
                <span className="text-acid">"{q.msg}"</span>
              </motion.div>
            ))}
            <div className="text-bone/40 mt-2">&gt; _</div>
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeUp} className="space-y-4">
        <div className="crosshair hairline border-ink bg-bone relative">
          <Crosshairs />
          <PanelHeader code="MET / 04" title="WEATHER LOG" />
          <div className="p-4 space-y-2">
            {[
              { l: "TEMP MIN", v: "4°C", c: "MET-01" },
              { l: "TEMP MAX", v: "11°C", c: "MET-02" },
              { l: "PRECIP", v: "12 MM", c: "MET-03" },
              { l: "WIND", v: "18 KM/H NW", c: "MET-04" },
              { l: "VISIBILITY", v: "2.1 KM", c: "MET-05" },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between hairline-b border-ink/20 pb-1.5">
                <span className="mono-label opacity-60">{r.l}</span>
                <span className="font-mono text-sm">{r.v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hairline border-ink bg-bone">
          <PanelHeader
            code="SEC / 05"
            title="SECURE CHANNEL"
            right={
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-signal" />
                <span className="mono-label text-signal">OK</span>
              </span>
            }
          />
          <div className="p-4">
            <div className="font-display text-4xl leading-none">100%</div>
            <div className="mono-label opacity-60 mt-1">CONVOY INTEGRITY</div>
            <div className="mt-3 h-2 hairline border-ink relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-signal"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
