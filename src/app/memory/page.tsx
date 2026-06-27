"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Wrench,
  Utensils,
  Wallet,
  CloudLightning,
  Camera,
  Play,
  MapPin,
  Calendar,
  Activity,
  Radio,
  Quote,
  ShieldCheck,
  Gauge,
  Mountain,
  Volume2,
  Navigation,
  Flag,
  Clock,
  TrendingUp,
} from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { Crosshairs } from "@/components/crosshairs";

// ---------------- DATA ----------------
const CREW = [
  { callsign: "ALPHA", name: "Sahil Wani", rig: "Mahindra Thar / KL-01" },
  { callsign: "BRAVO", name: "Umar Bhat", rig: "Maruti Gypsy / KL-07" },
  { callsign: "CHARLIE", name: "Faisal Dar", rig: "Force Gurkha / KL-03" },
  { callsign: "DELTA", name: "Junaid Malik", rig: "Royal Enfield 411" },
  { callsign: "ECHO", name: "Bilal Reshi", rig: "Mahindra Scorpio-N" },
  { callsign: "FOXTROT", name: "Adil Lone", rig: "Isuzu V-Cross" },
];

const QUOTES = [
  { t: "14:02", c: "ALPHA", msg: "I think we lost the exhaust pipe." },
  { t: "14:03", c: "BRAVO", msg: "Negative. That was Charlie's bumper." },
  { t: "16:41", c: "DELTA", msg: "Found maggi stall. Repeat. MAGGI SECURED." },
  { t: "19:08", c: "ECHO", msg: "Snow patch at 2,800m. Sending coordinates." },
  { t: "21:55", c: "CHARLIE", msg: "Wawan was a war crime. 10/10 would repeat." },
];

const MEDIA = [
  { seed: "pahalgam01", h: "h-72", featured: true },
  { seed: "pahalgam02", h: "h-44" },
  { seed: "pahalgam03", h: "h-56" },
  { seed: "pahalgam04", h: "h-40" },
  { seed: "pahalgam05", h: "h-64" },
  { seed: "pahalgam06", h: "h-48" },
  { seed: "pahalgam07", h: "h-52" },
  { seed: "pahalgam08", h: "h-44" },
];

const META = [
  { label: "DATE", value: "14 JUN 2026", code: "T-00" },
  { label: "DISTANCE", value: "412 KM", code: "ODO" },
  { label: "WEATHER", value: "8°C · DRIZZLE", code: "MET" },
  { label: "STATUS", value: "SECURE", code: "SEC" },
];

// ---------------- HELPERS ----------------
const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.35, ease: "easeOut" as const },
};

function UTCClock() {
  const [t, setT] = useState<string>("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT(
        `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}:${String(d.getUTCSeconds()).padStart(2, "0")} UTC`
      );
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return <span className="mono-label text-signal">{t}</span>;
}

// ---------------- SUB-COMPONENTS ----------------
function PanelHeader({ code, title, right }: { code: string; title: string; right?: React.ReactNode }) {
  return (
    <header className="hairline-b border-ink flex items-center justify-between px-3 py-2 bg-bone">
      <span className="mono-label">{code}</span>
      <span className="mono-label truncate px-2">{title}</span>
      <span className="flex items-center gap-1.5">
        {right ?? (
          <>
            <span className="h-2 w-2 rounded-full bg-signal animate-blink" />
            <span className="mono-label text-signal">LIVE</span>
          </>
        )}
      </span>
    </header>
  );
}

function HeroBanner() {
  return (
    <motion.div {...fadeUp} className="crosshair hairline border-ink relative overflow-hidden group">
      <Crosshairs />
      <div className="relative aspect-[21/9] md:aspect-[24/8] overflow-hidden bg-ink">
        <img
          src="https://picsum.photos/seed/pahalgam-banner-fc/2000/800"
          alt="Pahalgam Rally"
          className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-ink/40 group-hover:bg-signal/20 transition-colors duration-700 mix-blend-multiply" />
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between text-bone">
          <span className="mono-label flex items-center gap-1.5">
            <MapPin className="h-3 w-3" /> 34.0151°N · 75.3318°E
          </span>
          <span className="mono-label flex items-center gap-1.5">
            <Activity className="h-3 w-3 text-signal animate-blink" /> RECORDED
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-bone">
          <span className="mono-label">AAR-014 / PAHALGAM-RALLY</span>
          <span className="mono-label flex items-center gap-1.5">
            <Mountain className="h-3 w-3" /> ELEV · 2,740M
          </span>
        </div>
        <div className="absolute inset-x-0 top-0 h-1 tick opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-1 tick opacity-40" />
      </div>
    </motion.div>
  );
}

function EditorialHeader() {
  return (
    <section className="relative px-4 md:px-8 pt-6 md:pt-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex items-center justify-between mono-label mb-4"
      >
        <span className="flex items-center gap-2">
          <span className="brick px-2 py-[1px] text-bone">AAR / 014</span>
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
        PAHALGAM
        <br />
        <span className="text-signal">RALLY</span>
        <span className="text-ink">.</span>
      </motion.h1>

      <motion.p
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.1 }}
        className="mt-4 max-w-2xl text-ink/70 text-sm md:text-base"
      >
        Three rigs. One convoy. 412 kilometres of pine, mist, and machine. This is the field record — every callsign,
        every casualty, every cup of nun-chai.
      </motion.p>

      <motion.div {...fadeUp} className="mt-6 hairline border-ink grid grid-cols-2 md:grid-cols-4">
        {META.map((m, i) => (
          <div
            key={m.label}
            className={`p-3 md:p-4 ${i < META.length - 1 ? "md:hairline-r border-ink" : ""} ${i < 2 ? "hairline-b md:hairline-b-0 border-ink" : ""} ${i === 0 ? "hairline-r border-ink" : ""} ${i === 2 ? "hairline-r border-ink md:hairline-r" : ""}`}
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

function CrewCard({ m, i }: { m: (typeof CREW)[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: i * 0.04, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="hairline border-ink bg-bone group relative overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-ink/5">
        <img
          src={`https://api.dicebear.com/9.x/glass/svg?seed=${m.callsign}`}
          alt={m.callsign}
          className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute top-1.5 left-1.5 mono-label text-bone bg-ink/80 px-1.5 py-[1px]">
          {String(i + 1).padStart(2, "0")}
        </div>
        <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-signal text-bone px-2 py-1 mono-label flex items-center justify-between">
          <span>ON ROSTER</span>
          <span className="h-1.5 w-1.5 rounded-full bg-bone animate-blink" />
        </div>
      </div>
      <div className="p-2.5 hairline-t border-ink">
        <div className="font-display text-lg leading-none">{m.callsign}</div>
        <div className="mono-label opacity-60 mt-1 truncate">{m.name}</div>
        <div className="mono-label text-signal mt-1.5 truncate">{m.rig}</div>
      </div>
    </motion.div>
  );
}

function CrewManifest() {
  return (
    <section className="px-4 md:px-8 mt-12">
      <motion.div {...fadeUp} className="hairline border-ink bg-bone">
        <PanelHeader code="MANIFEST / 02" title="CREW · 06 OPERATORS DEPLOYED" />
        <div className="p-3 md:p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {CREW.map((m, i) => (
            <CrewCard key={m.callsign} m={m} i={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function IntelSection() {
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
            {QUOTES.map((q, i) => (
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

function MediaGrid() {
  return (
    <section className="px-4 md:px-8 mt-12">
      <motion.div {...fadeUp} className="hairline border-ink bg-bone">
        <PanelHeader
          code="MEDIA / 06"
          title="EVIDENCE · 24 FRAMES · 03 FEEDS"
          right={
            <span className="flex items-center gap-1.5 mono-label">
              <Camera className="h-3 w-3 text-signal" />
              <span>CAPTURED</span>
            </span>
          }
        />
        <div className="p-3 md:p-4 grid grid-cols-2 md:grid-cols-4 auto-rows-auto gap-2 md:gap-3">
          {MEDIA.map((m, i) => (
            <motion.div
              key={m.seed + i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              className={`hairline border-ink overflow-hidden relative group ${m.h} ${
                m.featured ? "col-span-2 row-span-2 md:row-span-2 md:h-auto" : ""
              }`}
            >
              <motion.img
                src={`https://picsum.photos/seed/${m.seed}/800/800`}
                alt={m.seed}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute top-1.5 left-1.5 mono-label text-bone bg-ink/80 px-1.5 py-[1px]">
                IMG-{String(i + 1).padStart(3, "0")}
              </div>
              {m.featured && (
                <button className="absolute inset-0 flex items-center justify-center group/play">
                  <span className="absolute inset-0 bg-ink/30 group-hover/play:bg-ink/50 transition-colors" />
                  <span className="relative flex items-center gap-2 brick px-4 py-2.5 mono-label text-bone">
                    <Play className="h-4 w-4 text-signal fill-signal animate-pulse" />
                    PLAY FEED · 02:14
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

function LogisticsSummary() {
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

function QuoteStrip() {
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

function TerminalFooter() {
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

// ---------------- ROUTE TRACE ----------------
const WAYPOINTS = [
  { id: "WP-01", name: "LAL CHOWK", t: "04:30", km: 0, elev: 1585, x: 60, y: 240 },
  { id: "WP-02", name: "PAMPORE", t: "05:12", km: 18, elev: 1610, x: 140, y: 220 },
  { id: "WP-03", name: "AVANTIPORA", t: "06:05", km: 42, elev: 1640, x: 230, y: 235 },
  { id: "WP-04", name: "BIJBEHARA", t: "07:18", km: 78, elev: 1675, x: 340, y: 210 },
  { id: "WP-05", name: "ANANTNAG", t: "08:02", km: 95, elev: 1720, x: 430, y: 180 },
  { id: "WP-06", name: "PAHALGAM", t: "09:12", km: 142, elev: 2130, x: 560, y: 130 },
  { id: "WP-07", name: "ARU VALLEY", t: "11:40", km: 168, elev: 2414, x: 660, y: 90 },
  { id: "WP-08", name: "SNOW PATCH", t: "13:55", km: 188, elev: 2740, x: 740, y: 55 },
];

const ROUTE_PATH =
  "M 60 240 Q 110 215 140 220 T 230 235 Q 285 245 340 210 T 430 180 Q 495 155 560 130 T 660 90 Q 710 70 740 55";

function RouteTraceSection() {
  return (
    <section className="px-4 md:px-8 mt-12">
      <motion.div {...fadeUp} className="crosshair hairline border-ink bg-bone relative">
        <Crosshairs />
        <PanelHeader
          code="TRACE / 08"
          title="CONVOY ROUTE · 08 WAYPOINTS · 188 KM"
          right={
            <span className="flex items-center gap-1.5 mono-label">
              <Navigation className="h-3 w-3 text-signal" />
              <span className="text-signal">PLOTTED</span>
            </span>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          <div className="lg:col-span-3 hairline-b lg:hairline-b-0 lg:hairline-r border-ink relative bg-ink overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(to right, oklch(0.955 0.012 85 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.955 0.012 85 / 0.12) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 4.5, ease: "linear", repeat: Infinity }}
              className="absolute inset-y-0 w-1/3 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.62 0.24 28 / 0.18), transparent)",
              }}
            />

            <div className="relative p-3 md:p-4">
              <div className="flex items-center justify-between mono-label text-bone/70 mb-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-signal" /> SECTOR / KMR-S
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
                  <span className="text-signal">TRACKING</span>
                </span>
              </div>

              <svg viewBox="0 0 800 300" className="w-full h-auto">
                <defs>
                  <linearGradient id="routeGrad" x1="0" x2="1">
                    <stop offset="0%" stopColor="oklch(0.88 0.2 110)" />
                    <stop offset="100%" stopColor="oklch(0.62 0.24 28)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {[0, 1, 2, 3].map((i) => (
                  <path
                    key={i}
                    d={`M 0 ${80 + i * 50} Q 200 ${60 + i * 50} 400 ${90 + i * 50} T 800 ${70 + i * 50}`}
                    stroke="oklch(0.955 0.012 85 / 0.08)"
                    strokeWidth="1"
                    fill="none"
                  />
                ))}

                <path
                  d={ROUTE_PATH}
                  stroke="oklch(0.955 0.012 85 / 0.18)"
                  strokeWidth="2"
                  strokeDasharray="3 5"
                  fill="none"
                />

                <motion.path
                  d={ROUTE_PATH}
                  stroke="url(#routeGrad)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 2.4, ease: "easeInOut" }}
                />

                {WAYPOINTS.map((w, i) => (
                  <motion.g
                    key={w.id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.18, ease: "backOut" }}
                  >
                    <motion.circle
                      cx={w.x}
                      cy={w.y}
                      r="6"
                      fill="none"
                      stroke="oklch(0.62 0.24 28)"
                      strokeWidth="1.5"
                      animate={{ r: [6, 16], opacity: [0.8, 0] }}
                      transition={{
                        duration: 2,
                        delay: 0.4 + i * 0.18,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    <line
                      x1={w.x - 8}
                      y1={w.y}
                      x2={w.x + 8}
                      y2={w.y}
                      stroke="oklch(0.955 0.012 85)"
                      strokeWidth="1"
                    />
                    <line
                      x1={w.x}
                      y1={w.y - 8}
                      x2={w.x}
                      y2={w.y + 8}
                      stroke="oklch(0.955 0.012 85)"
                      strokeWidth="1"
                    />
                    <circle
                      cx={w.x}
                      cy={w.y}
                      r="3.5"
                      fill={
                        i === 0 || i === WAYPOINTS.length - 1
                          ? "oklch(0.62 0.24 28)"
                          : "oklch(0.88 0.2 110)"
                      }
                      stroke="oklch(0.13 0.01 60)"
                      strokeWidth="1"
                    />
                    <text
                      x={w.x + 10}
                      y={w.y - 10}
                      fill="oklch(0.955 0.012 85)"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                      letterSpacing="0.15em"
                    >
                      {w.id}
                    </text>
                    <text
                      x={w.x + 10}
                      y={w.y + 2}
                      fill="oklch(0.88 0.2 110)"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                      letterSpacing="0.1em"
                    >
                      {w.name}
                    </text>
                  </motion.g>
                ))}

                <motion.circle
                  r="5"
                  fill="oklch(0.62 0.24 28)"
                  stroke="oklch(0.955 0.012 85)"
                  strokeWidth="1.5"
                  filter="url(#glow)"
                  initial={{ offsetDistance: "0%" }}
                  whileInView={{ offsetDistance: "100%" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 4, ease: "easeInOut", delay: 0.3 }}
                  style={{
                    offsetPath: `path("${ROUTE_PATH}")`,
                  }}
                />

                <g>
                  <rect x={42} y={252} width={36} height={12} fill="oklch(0.62 0.24 28)" />
                  <text
                    x={60}
                    y={261}
                    textAnchor="middle"
                    fill="oklch(0.955 0.012 85)"
                    fontSize="8"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="0.18em"
                  >
                    START
                  </text>
                  <rect x={722} y={30} width={36} height={12} fill="oklch(0.88 0.2 110)" />
                  <text
                    x={740}
                    y={39}
                    textAnchor="middle"
                    fill="oklch(0.13 0.01 60)"
                    fontSize="8"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="0.18em"
                  >
                    SUMMIT
                  </text>
                </g>
              </svg>

              <div className="mt-2 grid grid-cols-3 gap-2 text-bone">
                {[
                  { l: "DEPLOYED", v: "04:30 UTC", I: Clock },
                  { l: "RECOVERED", v: "22:52 UTC", I: Flag },
                  { l: "PEAK ELEV", v: "2,740 M", I: TrendingUp },
                ].map((c) => (
                  <div key={c.l} className="hairline border-bone/30 px-2 py-1.5">
                    <div className="mono-label text-bone/60 flex items-center gap-1.5">
                      <c.I className="h-3 w-3 text-signal" />
                      {c.l}
                    </div>
                    <div className="font-mono text-xs md:text-sm text-acid mt-0.5">{c.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <div className="hairline-b border-ink p-3 md:p-4">
              <div className="flex items-center justify-between mono-label opacity-60 mb-2">
                <span>ELEVATION PROFILE</span>
                <span>1585 → 2740 M</span>
              </div>
              <div className="flex items-end gap-1 h-20">
                {WAYPOINTS.map((w, i) => {
                  const pct = ((w.elev - 1500) / (2800 - 1500)) * 100;
                  return (
                    <motion.div
                      key={w.id}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                      className="flex-1 bg-ink relative group cursor-pointer"
                      title={`${w.name} · ${w.elev}m`}
                    >
                      <span className="absolute inset-x-0 -top-4 mono-label text-[8px] text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {w.elev}
                      </span>
                      <span className="absolute inset-x-0 top-0 h-[2px] bg-signal" />
                    </motion.div>
                  );
                })}
              </div>
              <div className="hairline-t border-ink/30 mt-1 pt-1 flex justify-between mono-label opacity-50 text-[9px]">
                <span>WP-01</span>
                <span>WP-08</span>
              </div>
            </div>

            <div className="flex-1 p-3 md:p-4 overflow-hidden">
              <div className="mono-label opacity-60 mb-2">WAYPOINT LOG</div>
              <ol className="relative">
                <span className="absolute left-[7px] top-1 bottom-1 w-px bg-ink/30" />
                {WAYPOINTS.map((w, i) => (
                  <motion.li
                    key={w.id}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    className="relative pl-6 py-1.5 flex items-center justify-between group hover:bg-acid/30 transition-colors px-1"
                  >
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 h-[15px] w-[15px] hairline border-ink ${
                        i === 0 || i === WAYPOINTS.length - 1 ? "bg-signal" : "bg-acid"
                      } flex items-center justify-center mono-label text-[8px] text-ink`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-xs md:text-sm truncate">{w.name}</div>
                      <div className="mono-label opacity-50">
                        {w.id} · {w.km} KM
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <div className="font-mono text-xs text-signal">{w.t}</div>
                      <div className="mono-label opacity-50">{w.elev}M</div>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ---------------- PAGE ----------------
export default function MemoryPage() {
  return (
    <main className="min-h-screen bg-bone text-ink relative">
      <TopNav />

      <div className="pointer-events-none fixed inset-y-0 left-0 w-6 tick-v opacity-20 z-0" />
      <div className="pointer-events-none fixed inset-y-0 right-0 w-6 tick-v opacity-20 z-0" />

      <EditorialHeader />

      <div className="px-4 md:px-8 mt-8">
        <HeroBanner />
      </div>

      <CrewManifest />
      <IntelSection />
      <MediaGrid />
      <RouteTraceSection />
      <LogisticsSummary />
      <QuoteStrip />
      <TerminalFooter />
    </main>
  );
}
