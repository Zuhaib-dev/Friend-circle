"use client";
import { motion } from "motion/react";
import { Camera, Play } from "lucide-react";
import { fadeUp, PanelHeader } from "./shared";

export function MediaGrid({ media }: any) {
  return (
    <section className="px-4 md:px-8 mt-12">
      <motion.div {...fadeUp} className="hairline border-ink bg-bone">
        <PanelHeader
          code="MEDIA / 06"
          title={`EVIDENCE · ${String(media?.length || 0).padStart(2, "0")} FRAMES · 03 FEEDS`}
          right={
            <span className="flex items-center gap-1.5 mono-label">
              <Camera className="h-3 w-3 text-signal" />
              <span>CAPTURED</span>
            </span>
          }
        />
        <div className="p-3 md:p-4 grid grid-cols-2 md:grid-cols-4 auto-rows-auto gap-2 md:gap-3">
          {(media || []).map((m: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              className={`hairline border-ink overflow-hidden relative group ${m.featured ? "col-span-2 row-span-2 md:row-span-2 md:h-auto" : "h-48"}`}
            >
              <motion.img
                src={m.url}
                alt={`Evidence ${i}`}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute top-1.5 left-1.5 mono-label text-bone bg-ink/80 px-1.5 py-px">
                IMG-{String(i + 1).padStart(3, "0")}
              </div>
              {m.featured && (
                <button className="absolute inset-0 flex items-center justify-center group/play">
                  <span className="absolute inset-0 bg-ink/30 group-hover/play:bg-ink/50 transition-colors" />
                  <span className="relative flex items-center gap-2 brick px-4 py-2.5 mono-label text-bone">
                    <Play className="h-4 w-4 text-signal fill-signal animate-pulse" />
                    PLAY FEED
                  </span>
                </button>
              )}
              <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-bone hairline-t border-ink px-2 py-1 mono-label flex items-center justify-between">
                <span>34.01°N</span>
                <span className="text-signal">VIEW</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
