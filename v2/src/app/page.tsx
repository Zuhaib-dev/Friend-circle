"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Circle,
  CircleDot,
  Crosshair,
  AlertTriangle,
  Activity,
  Radio,
  Gauge,
  Flame,
  Target,
  Bike,
  Tent,
  Fish,
  Camera,
  Mountain,
  Compass,
  BookOpen,
  Clock,
  Wind,
  
  
  Mail,
  ArrowUpRight,
  Plus,
  Minus,
  MapPin,
  Hash,
} from "lucide-react";

import { TopNav } from "@/components/top-nav";












/* ---------------------------------- DATA ---------------------------------- */

const CREW = [
  { code: "01", name: "Aqib", role: "The Motorhead", tag: "RECON / LEAD", bio: "Bike grease for blood. Picks the line nobody else sees.", coord: "34.0837°N", color: "signal" },
  { code: "02", name: "Sahil", role: "The Chef", tag: "WAZWAN / SUPPLY", bio: "Builds fires with intent. Cooks like a Mughal court is watching.", coord: "33.9716°N" },
  { code: "03", name: "Furqan", role: "The Comedian", tag: "MORALE / OPS", bio: "Roast engine. Will derail any silence within 4 seconds.", coord: "34.1700°N" },
  { code: "04", name: "Sameem", role: "The Archivist", tag: "OPTICS / DOC", bio: "Camera locked to face. Every memory exists because of him.", coord: "33.8716°N" },
  { code: "05", name: "Naveed", role: "The Navigator", tag: "ROUTE / MAP", bio: "Reads weather, river, road. Knows shortcuts that aren't on Google.", coord: "34.0151°N" },
  { code: "06", name: "Farhan", role: "The Angler", tag: "RIVERCRAFT", bio: "Patient like a stone. Catches trout where others catch a cold.", coord: "33.7212°N" },
];

const TOURS = [
  { code: "T-01", name: "Haijen Ridge", region: "Budgam", km: 47, hours: 9, diff: "HARD", img: "/adv-offroad.jpg", note: "Featured. Offroad spine of the season." },
  { code: "T-02", name: "Diskhal Meadows", region: "Pir Panjal", km: 28, hours: 6, diff: "MED", img: "/adv-forest.jpg", note: "Pine corridor → alpine bowl." },
  { code: "T-03", name: "Tatakoti Base", region: "Tangmarg", km: 62, hours: 14, diff: "HARD", img: "/adv-camp.jpg", note: "Camp under the granite tooth." },
  { code: "T-04", name: "Doodhpathri Loop", region: "Budgam", km: 19, hours: 4, diff: "EASY", img: "/adv-budgam.jpg", note: "Meadow run, golden hour locked." },
  { code: "T-05", name: "Lidder Trout", region: "Pahalgam", km: 12, hours: 5, diff: "EASY", img: "/adv-fishing.jpg", note: "River day. Fly rods only." },
  { code: "T-06", name: "Dal Perimeter", region: "Srinagar", km: 14, hours: 3, diff: "EASY", img: "/adv-srinagar.jpg", note: "Civilization run. Kahwa stops mandatory." },
];

const STATS = [
  { label: "YEARS IN FIELD", value: "08", sub: "2018 → 2026" },
  { label: "ACTIVE UNITS", value: "19", sub: "CORE / 06" },
  { label: "TOURS LOGGED", value: "142", sub: "ROUTES / 37" },
  { label: "WAZWAN NIGHTS", value: "63", sub: "FIRES / LIT" },
];

const TICKER = [
  "OFFROAD", "FISHING", "WAZWAN", "PIR PANJAL", "FAJR @ 4:38", "TROUT RUN",
  "CHADOORA RECON", "QIBLA 282°", "TASBIH x33", "BUDGAM LOOP", "ROAST PROTOCOL",
];

const TIMELINE = [
  { y: "2018", t: "ZERO HOUR", d: "Six kids, one cricket bat, one bike. The bench in Chadoora becomes HQ." },
  { y: "2020", t: "QUARANTINE LEDGER", d: "Group chat goes feral. Memes archived. Plans drawn on notebook margins." },
  { y: "2021", t: "FIRST OFFROAD", d: "Haijen recon. Two punctures, zero regrets." },
  { y: "2022", t: "WAZWAN DOCTRINE", d: "Sahil cooks for 14. Becomes law: no trip without rista." },
  { y: "2024", t: "OPTICS UNIT", d: "Sameem buys the camera. Every memory becomes a frame." },
  { y: "2026", t: "v2.0 LAUNCH", d: "This manual. The digital campfire goes online." },
];

const FAQ = [
  { q: "Is this a tour company?", a: "No. It's a friend circle that documents itself. We don't sell trips — we publish field notes." },
  { q: "How do I join the crew?", a: "You don't apply. You show up. Bring chai, don't complain about the cold, survive one Wazwan night." },
  { q: "Why the terminal look?", a: "Because brochure websites lie. Field manuals don't." },
  { q: "What does Tazkiyah mean?", a: "Inner cleansing. The corner that reminds us no ridge is bigger than the next prayer." },
];

const VOICES = [
  { who: "FURQAN", q: "We don't have a Wi-Fi password. If you're here, you're already in." },
  { who: "SAMEEM", q: "Every photo I took, somebody was laughing. That's the whole archive." },
  { who: "AQIB", q: "The bike is just an excuse. The real route is the people." },
];

/* -------------------------------- PRIMITIVES ------------------------------ */

function Crosshairs() {
  return (
    <>
      <span className="ch-bl" />
      <span className="ch-br" />
    </>
  );
}

function Panel({
  code,
  title,
  signal,
  children,
  className = "",
}: {
  code: string;
  title: string;
  signal?: "LIVE" | "ALERT" | "ON" | "OFF";
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`crosshair hairline bg-bone ${className}`}
    >
      <Crosshairs />
      <header className="hairline-b flex items-center justify-between px-3 py-2 bg-bone">
        <span className="mono-label">{code}</span>
        <span className="mono-label truncate px-2 text-center">{title}</span>
        <span className="flex items-center gap-1.5">
          {signal === "LIVE" && (
            <>
              <span className="h-2 w-2 rounded-full bg-signal animate-blink" />
              <span className="mono-label text-signal">LIVE</span>
            </>
          )}
          {signal === "ALERT" && <span className="signal-chip"><AlertTriangle className="h-3 w-3" />ALERT</span>}
          {signal === "ON" && <span className="brick px-2 py-px mono-label text-bone">ON</span>}
          {!signal && <span className="mono-label opacity-60">REC</span>}
        </span>
      </header>
      <div className="p-5">{children}</div>
    </motion.section>
  );
}

function SectionHead({ code, kicker, title, sub }: { code: string; kicker: string; title: string; sub?: string }) {
  return (
    <div className="hairline-b border-ink pb-4 mb-6 flex items-end justify-between gap-4 flex-wrap">
      <div>
        <div className="flex items-center gap-3 mono-label">
          <span className="signal-chip">{code}</span>
          <span>{kicker}</span>
        </div>
        <h2 className="display-num text-[clamp(40px,7vw,96px)] mt-2 text-ink">{title}<span className="text-signal">.</span></h2>
        {sub && <p className="font-display italic text-xl md:text-2xl text-ink/70 max-w-2xl mt-1">{sub}</p>}
      </div>
      <div className="flex items-center gap-2 mono-label">
        <Activity className="h-3.5 w-3.5 text-signal" />
        <span>SYS / NOMINAL</span>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="hairline p-4 crosshair bg-bone">
      <Crosshairs />
      <div className="mono-label">{label}</div>
      <div className="display-num text-[56px] md:text-[72px] mt-1">{value}</div>
      <div className="mono-label opacity-60">{sub}</div>
    </div>
  );
}

function Marker({ children }: { children: ReactNode }) {
  return <span className="bg-signal text-bone px-1.5">{children}</span>;
}

/* ----------------------------------- NAV ---------------------------------- */

function TopBar() {
  const [t, setT] = useState("");
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

  return (
    <>
      {/* Tiny clock strip */}
      <div className="hairline-b border-ink/40 bg-bone">
        <div className="flex items-center justify-between px-4 py-1 gap-4 text-[10px] mono-label">
          <span className="flex items-center gap-2">
            <span className="brick px-2 py-px">FC/2026</span>
            <span className="hidden sm:inline opacity-60">FIELD MANUAL — REV 02.6</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
            <span className="tabular-nums">{t}</span>
          </span>
        </div>
      </div>
      <TopNav />
    </>
  );
}

/* ----------------------------------- HERO --------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <header ref={ref} className="relative hairline-b border-ink">
      {/* Coord strip */}
      <div className="hairline-b border-ink/30 px-4 py-2 flex items-center justify-between mono-label gap-4 flex-wrap">
        <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-signal" /> 34.0837°N · 74.7973°E — SRINAGAR / KMR</span>
        <span className="flex items-center gap-2"><Wind className="h-3.5 w-3.5" /> 14KT NW · 4°C · QIBLA 282°</span>
        <span className="hidden md:flex items-center gap-2"><Radio className="h-3.5 w-3.5 text-signal animate-blink" /> CHANNEL 7 OPEN</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]">
        {/* Left: monumental headline */}
        <div className="p-6 md:p-10 lg:p-14 hairline-r border-ink/80">
          <div className="flex items-center gap-3 mono-label mb-6">
            <span className="signal-chip"><CircleDot className="h-3 w-3" />HQ / 01</span>
            <span>VOL. 01 — ISSUE 06 — KASHMIR FIELD MANUAL</span>
          </div>

          <h1 className="display-num text-ink text-[clamp(64px,13vw,180px)]">
            THE<br />
            DIGITAL<br />
            <span className="bg-signal text-bone px-3">CAMPFIRE</span>
            <span className="text-signal">.</span>
          </h1>

          <p className="font-display italic text-2xl md:text-3xl mt-6 text-ink/80 max-w-xl leading-tight">
            Where the wild meets the heart — a brotherhood logged in tire-tracks, trout, and tasbih.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#crew" className="hairline brick px-5 py-3 mono-label text-bone hover:bg-signal hover:border-signal transition-colors flex items-center gap-2">
              MEET THE UNITS <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a href="#tours" className="hairline px-5 py-3 mono-label hover:brick hover:text-bone transition-colors flex items-center gap-2">
              FIELD ROUTES <Target className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-0 hairline-t border-ink/60 pt-3">
            {[
              ["EST.", "2018"],
              ["UNITS", "19"],
              ["BASE", "KMR"],
            ].map(([k, v]) => (
              <div key={k} className="hairline-r last:border-r-0 border-ink/30 px-2">
                <div className="mono-label opacity-60">{k}</div>
                <div className="display-num text-3xl">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Center spine */}
        <div className="hidden lg:flex w-8 tick-v border-ink" />

        {/* Right: cinematic image panel */}
        <div className="relative overflow-hidden hairline-l border-ink/80 min-h-[420px] lg:min-h-0">
          <motion.div style={{ y }} className="absolute inset-0">
            <img src={"/hero-mountains.jpg"} alt="Kashmir ridgeline" className="h-full w-full object-cover grayscale contrast-125" />
            <div className="absolute inset-0 bg-bone/10 mix-blend-multiply" />
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(oklch(0.13 0.01 60 / 0.18) 1px, transparent 1px)", backgroundSize: "6px 6px" }} />
          </motion.div>

          {/* HUD overlays */}
          <div className="absolute top-3 left-3 right-3 flex justify-between mono-label text-bone mix-blend-difference">
            <span className="flex items-center gap-1.5"><Crosshair className="h-3.5 w-3.5" /> TGT / RIDGE-07</span>
            <span className="flex items-center gap-1.5">F/2.8 · 1/250 · ISO 200</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end mono-label text-bone mix-blend-difference">
            <div>
              <div>FRAME 0432</div>
              <div className="display-num not-italic text-5xl text-bone">04:38<span className="text-signal">.</span></div>
              <div>FAJR — TANGMARG</div>
            </div>
            <div className="text-right">
              <div>ELEV 2,840 M</div>
              <div>BEARING 282°</div>
            </div>
          </div>

          {/* corner reticle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none">
            <div className="absolute inset-0 border border-signal/80" />
            <div className="absolute top-1/2 -left-3 w-6 h-px bg-signal" />
            <div className="absolute top-1/2 -right-3 w-6 h-px bg-signal" />
            <div className="absolute left-1/2 -top-3 h-6 w-px bg-signal" />
            <div className="absolute left-1/2 -bottom-3 h-6 w-px bg-signal" />
          </div>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------- TICKER --------------------------------- */

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="brick hairline-b border-ink overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {items.map((t, i) => (
          <span key={i} className="mono-label text-bone px-6 flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-signal rounded-full" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- STATS --------------------------------- */

function StatsRow() {
  return (
    <section className="px-4 md:px-8 py-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 hairline border-ink">
        {STATS.map((s, i) => (
          <div key={s.label} className={`p-5 ${i < STATS.length - 1 ? "lg:hairline-r" : ""} ${i < 2 ? "hairline-b lg:hairline-b-0" : ""} ${i === 0 ? "hairline-r" : ""} ${i === 2 ? "hairline-r" : ""} border-ink/40 bg-bone`}>
            <div className="mono-label">{s.label}</div>
            <div className="display-num text-[44px] md:text-[64px] mt-1">{s.value}</div>
            <div className="mono-label opacity-60">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------- CREW --------------------------------- */

function CrewSection() {
  return (
    <section id="crew" className="px-4 md:px-8 py-16">
      <SectionHead code="UNI / 02" kicker="MEET THE UNITS" title="Six kings, one ridge" sub="The core circle — assignments, call signs, and known frequencies." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 hairline border-ink">
        {CREW.map((c, i) => (
          <motion.article
            key={c.code}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
            className={`relative p-5 bg-bone group cursor-pointer
              ${(i + 1) % 3 !== 0 ? "lg:hairline-r" : ""}
              ${(i + 1) % 2 !== 0 ? "md:hairline-r lg:hairline-r" : "md:border-r-0"}
              ${i < CREW.length - (CREW.length % 3 || 3) ? "lg:hairline-b" : ""}
              hairline-b border-ink/50`}
          >
            {/* portrait placeholder — typographic */}
            <div className="hairline border-ink/80 relative aspect-4/5 bg-paper overflow-hidden">
              <div className="absolute inset-0 tick opacity-30" />
              <div className="absolute top-2 left-2 mono-label">UNIT/{c.code}</div>
              <div className="absolute top-2 right-2 mono-label flex items-center gap-1">
                <span className="h-1.5 w-1.5 bg-signal rounded-full animate-blink" /> {c.tag}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="display-num text-[140px] text-ink/15 group-hover:text-signal/30 transition-colors">{c.code}</span>
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex justify-between mono-label">
                <span>{c.coord}</span>
                <span>BEARING 282°</span>
              </div>
              {/* hover scan line */}
              <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute left-0 right-0 h-px bg-signal animate-scan" />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-baseline justify-between">
                <h3 className="display-num text-4xl">{c.name}<span className="text-signal">.</span></h3>
                <span className="mono-label">CALL/{c.code}</span>
              </div>
              <div className="font-display italic text-ink/70 text-lg">{c.role}</div>
              <p className="text-sm mt-2 text-ink/80 leading-snug">{c.bio}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- TOURS ---------------------------------- */

function ToursSection() {
  return (
    <section id="tours" className="px-4 md:px-8 py-16 hairline-t border-ink">
      <SectionHead code="OPS / 03" kicker="FIELD ROUTES" title="The ridge ledger" sub="Logged tours, with weight, weather, and warnings — pick your line." />

      <div className="grid grid-cols-12 gap-0 hairline border-ink">
        {TOURS.map((t, i) => {
          const featured = i === 0;
          return (
            <motion.article
              key={t.code}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              className={`${featured ? "col-span-12 lg:col-span-8 lg:row-span-2" : "col-span-12 sm:col-span-6 lg:col-span-4"} hairline-b lg:hairline-r border-ink/50 relative bg-bone group overflow-hidden`}
            >
              <div className={`relative overflow-hidden ${featured ? "aspect-video" : "aspect-4/3"}`}>
                <img src={t.img} alt={t.name} className="h-full w-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-bone/10 mix-blend-multiply" />
                <div className="absolute top-2 left-2 right-2 flex justify-between mono-label text-bone mix-blend-difference">
                  <span>{t.code}</span>
                  <span className="signal-chip">{t.diff}</span>
                </div>
                {featured && (
                  <div className="absolute bottom-3 left-3 right-3 mono-label text-bone mix-blend-difference flex justify-between">
                    <span>FEATURED / TOP TIER</span>
                    <span>{t.region.toUpperCase()}</span>
                  </div>
                )}
              </div>
              <div className="p-4 hairline-t border-ink/50">
                <div className="flex items-baseline justify-between">
                  <h3 className={`display-num ${featured ? "text-5xl md:text-6xl" : "text-3xl"}`}>{t.name}<span className="text-signal">.</span></h3>
                  <span className="mono-label">{t.region.toUpperCase()}</span>
                </div>
                <p className="font-display italic text-ink/70 mt-1">{t.note}</p>
                <div className="grid grid-cols-3 mt-3 hairline-t border-ink/40 pt-2">
                  <div><div className="mono-label opacity-60">DIST</div><div className="display-num text-2xl">{t.km}<span className="text-xs ml-1 font-mono">KM</span></div></div>
                  <div><div className="mono-label opacity-60">TIME</div><div className="display-num text-2xl">{t.hours}<span className="text-xs ml-1 font-mono">H</span></div></div>
                  <div><div className="mono-label opacity-60">GRADE</div><div className="display-num text-2xl">{t.diff}</div></div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

/* --------------------------------- TAZKIYAH ------------------------------- */

function TazkiyahSection() {
  const [count, setCount] = useState(0);
  const phrases = ["SUBḤĀN ALLĀH", "ALḤAMDU LILLĀH", "ALLĀHU AKBAR"];
  const phrase = phrases[Math.floor((count / 33) % phrases.length)];

  return (
    <section id="tazkiyah" className="px-4 md:px-8 py-16 hairline-t border-ink bg-paper">
      <SectionHead code="TZK / 04" kicker="SPIRITUAL CORNER" title="No ridge is bigger than fajr" sub="Quiet protocols. Five times a day the engine cuts and the heart speaks." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prayer times panel */}
        <Panel code="SLT / 01" title="PRAYER TIMES" signal="LIVE">
          <ul className="divide-y divide-ink/40">
            {[
              ["FAJR", "04:38"],
              ["DHUHR", "12:24"],
              ["ASR", "15:47"],
              ["MAGHRIB", "18:09"],
              ["ISHA", "19:32"],
            ].map(([n, t], i) => (
              <li key={n} className={`flex items-baseline justify-between py-3 ${i === 0 ? "brick px-2 -mx-2" : ""}`}>
                <span className="mono-label">{n}</span>
                <span className="display-num text-3xl tabular-nums">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mono-label opacity-60 mt-3">SRINAGAR · ASR=HANAFI</div>
        </Panel>

        {/* Qibla + Hadith */}
        <Panel code="QBL / 02" title="QIBLA / HADITH" signal="ON">
          <div className="flex items-center justify-center my-2">
            <div className="relative h-44 w-44 hairline border-ink rounded-full bg-bone">
              <div className="absolute inset-2 hairline border-ink/40 rounded-full" />
              <div className="absolute inset-6 hairline border-ink/30 rounded-full" />
              <div className="absolute top-1 left-1/2 -translate-x-1/2 mono-label">N</div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 mono-label">S</div>
              <div className="absolute left-1 top-1/2 -translate-y-1/2 mono-label">W</div>
              <div className="absolute right-1 top-1/2 -translate-y-1/2 mono-label">E</div>
              {/* needle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full origin-bottom" style={{ transform: "translate(-50%, -100%) rotate(282deg)", transformOrigin: "50% 100%" }}>
                <div className="w-px h-20 bg-signal" />
              </div>
              <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 mono-label text-signal">QIBLA 282°</div>
            </div>
          </div>
          <div className="hairline-t border-ink/40 pt-3">
            <div className="mono-label">HADITH / DAY</div>
            <p className="font-display italic text-lg leading-snug mt-1">
              "The strong is not the one who overpowers others, but <Marker>the one who controls himself</Marker> when angry."
            </p>
            <div className="mono-label opacity-60 mt-2">— BUKHĀRĪ 6114</div>
          </div>
        </Panel>

        {/* Digital Tasbih */}
        <Panel code="TSB / 03" title="DIGITAL TASBIH" signal="LIVE">
          <div className="text-center">
            <div className="mono-label opacity-60">CURRENT</div>
            <div className="font-display italic text-2xl">{phrase}</div>
            <div className="display-num text-[120px] leading-none my-2 tabular-nums">{count}</div>
            <div className="mono-label">SET / 33 · CYCLES {Math.floor(count / 33)}</div>
            <div className="grid grid-cols-3 gap-0 hairline border-ink mt-5">
              <button onClick={() => setCount((c) => Math.max(0, c - 1))} className="hairline-r border-ink p-3 hover:brick hover:text-bone transition-colors mono-label flex items-center justify-center gap-1">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setCount(0)} className="hairline-r border-ink p-3 hover:bg-signal hover:text-bone transition-colors mono-label">RESET</button>
              <button onClick={() => setCount((c) => c + 1)} className="p-3 brick text-bone hover:bg-signal transition-colors mono-label flex items-center justify-center gap-1">
                <Plus className="h-3.5 w-3.5" /> TAP
              </button>
            </div>
          </div>
        </Panel>
      </div>

      {/* Sunnah ledger strip */}
      <div className="mt-6 hairline border-ink bg-bone grid grid-cols-2 md:grid-cols-4">
        {[
          { i: BookOpen, l: "QUR'AN", v: "01 JUZ" },
          { i: Clock, l: "DHIKR", v: "100×" },
          { i: Compass, l: "DUḤA", v: "DONE" },
          { i: Flame, l: "TAHAJJUD", v: "PENDING" },
        ].map(({ i: Icon, l, v }, idx) => (
          <div key={l} className={`p-4 ${idx < 3 ? "md:hairline-r" : ""} ${idx === 0 || idx === 2 ? "hairline-r" : ""} ${idx < 2 ? "hairline-b md:hairline-b-0" : ""} border-ink/40 flex items-center gap-3`}>
            <Icon className="h-3.5 w-3.5 text-signal" />
            <div>
              <div className="mono-label">{l}</div>
              <div className="display-num text-2xl">{v}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- GALLERY --------------------------------- */

const FRAMES: {
  src: string;
  cap: string;
  code: string;
  meta: string;
  size: "hero" | "wide" | "tall" | "std";
}[] = [
  { src: "/adv-offroad.jpg", cap: "HAIJEN RECON — SECOND PUNCTURE", code: "FR-0412", meta: "47 KM · F/5.6 · 1/800 · ISO 400", size: "hero" },
  { src: "/adv-ridge.jpg", cap: "PIR PANJAL RIDGE — FIRST LIGHT", code: "FR-0501", meta: "ELEV 2,840 M · F/8 · 1/125 · ISO 100", size: "wide" },
  { src: "/adv-camp.jpg", cap: "WAZWAN NIGHT — TATAKOTI BASE", code: "FR-1101", meta: "TEMP -2°C · F/2.8 · 1/60 · ISO 3200", size: "tall" },
  { src: "/adv-budgam.jpg", cap: "DOODHPATHRI MEADOW — GOLDEN HOUR", code: "FR-0987", meta: "F/4 · 1/500 · ISO 200", size: "std" },
  { src: "/adv-fishing.jpg", cap: "LIDDER TROUT — 18 INCHES", code: "FR-0633", meta: "F/2.8 · 1/1000 · ISO 800", size: "std" },
  { src: "/adv-bike.jpg", cap: "ENFIELD — MUD LINE, CHADOORA", code: "FR-0815", meta: "F/5.6 · 1/250 · ISO 400", size: "wide" },
  { src: "/adv-kahwa.jpg", cap: "KAHWA POUR — 02:14 HRS", code: "FR-1207", meta: "F/1.8 · 1/125 · ISO 1600", size: "tall" },
  { src: "/adv-forest.jpg", cap: "PINE CORRIDOR — DISKHAL", code: "FR-0729", meta: "F/4 · 1/320 · ISO 200", size: "std" },
  { src: "/adv-srinagar.jpg", cap: "DAL PERIMETER — KAHWA BREAK", code: "FR-0220", meta: "F/8 · 1/500 · ISO 100", size: "std" },
  { src: "/adv-hut.jpg", cap: "SHEPHERD HUT — MIST ROLLING IN", code: "FR-0344", meta: "F/5.6 · 1/60 · ISO 800", size: "std" },
];

function FilmSprocket({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="8" r="1" fill="currentColor" />
      <circle cx="6" cy="16" r="1" fill="currentColor" />
      <circle cx="18" cy="8" r="1" fill="currentColor" />
      <circle cx="18" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

function FrameOverlay({ code, cap, meta, isHero }: { code: string; cap: string; meta: string; isHero?: boolean }) {
  return (
    <>
      {/* film grain / scan texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, var(--ink) 2px, var(--ink) 3px)", backgroundSize: "100% 4px" }} />
      {/* corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-signal" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-signal" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-signal" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-signal" />
      {/* top code strip */}
      <div className="absolute top-0 inset-x-0 hairline-b border-ink/50 px-3 py-1.5 flex justify-between mono-label text-bone mix-blend-difference">
        <span className="flex items-center gap-1.5"><FilmSprocket className="h-3 w-3" />{code}</span>
        <span>{meta}</span>
      </div>
      {/* bottom caption strip */}
      <div className={`absolute bottom-0 inset-x-0 hairline-t border-ink/50 bg-ink/80 backdrop-blur-[1px] px-3 py-2 transition-transform duration-500 ${isHero ? "" : "translate-y-full group-hover:translate-y-0"}`}>
        <div className="mono-label text-bone truncate">{cap}</div>
      </div>
      {/* center reticle (hero only) */}
      {isHero && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 pointer-events-none">
          <div className="absolute inset-0 border border-signal/60" />
          <div className="absolute top-1/2 -left-3 w-6 h-px bg-signal/60" />
          <div className="absolute top-1/2 -right-3 w-6 h-px bg-signal/60" />
          <div className="absolute left-1/2 -top-3 h-6 w-px bg-signal/60" />
          <div className="absolute left-1/2 -bottom-3 h-6 w-px bg-signal/60" />
        </div>
      )}
      {/* live dot */}
      <div className="absolute top-1.5 right-1.5">
        <span className="h-2 w-2 rounded-full bg-signal animate-blink inline-block" />
      </div>
    </>
  );
}

function FrameTile({ f, index }: { f: (typeof FRAMES)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const isHero = f.size === "hero";

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  const gridClass =
    f.size === "hero"
      ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
      : f.size === "wide"
        ? "col-span-2 row-span-1 md:col-span-2 md:row-span-1"
        : f.size === "tall"
          ? "col-span-1 row-span-2 md:col-span-1 md:row-span-2"
          : "col-span-1 row-span-1";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className={`${gridClass} hairline border-ink relative group overflow-hidden bg-ink cursor-crosshair`}
      onMouseMove={handleMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ x: mouse.x, y: mouse.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <img
          src={f.src}
          alt={f.cap}
          loading="lazy"
          className="h-full w-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 scale-[1.15]"
        />
      </motion.div>
      <FrameOverlay code={f.code} cap={f.cap} meta={f.meta} isHero={isHero} />
      {/* hover sweep line */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-y-0 w-px bg-signal/40 animate-scan" style={{ left: "50%" }} />
      </div>
    </motion.div>
  );
}

function GalleryMetaTile({ label, value, sub, delay }: { label: string; value: string; sub: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="hairline border-ink bg-bone p-4 flex flex-col justify-between crosshair"
    >
      <Crosshairs />
      <div className="mono-label opacity-60">{label}</div>
      <div className="display-num text-5xl md:text-6xl mt-2">{value}</div>
      <div className="mono-label mt-2">{sub}</div>
    </motion.div>
  );
}

function GalleryDiagramTile({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="hairline border-ink bg-bone p-4 crosshair overflow-hidden"
    >
      <Crosshairs />
      <div className="mono-label mb-3 flex items-center gap-2">
        <Camera className="h-3.5 w-3.5 text-signal" />
        OPTICS / DIAGRAM
      </div>
      <svg viewBox="0 0 200 120" className="w-full h-auto">
        {/* aperture blades */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x1 = 100 + Math.cos(angle) * 40;
          const y1 = 60 + Math.sin(angle) * 40;
          const x2 = 100 + Math.cos(angle + Math.PI / 8) * 35;
          const y2 = 60 + Math.sin(angle + Math.PI / 8) * 35;
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="var(--ink)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: delay + i * 0.08 }}
            />
          );
        })}
        <motion.circle
          cx="100" cy="60" r="18"
          fill="none" stroke="var(--signal)" strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        />
        <motion.circle
          cx="100" cy="60" r="8"
          fill="var(--signal)"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + 0.8 }}
        />
        {/* grid */}
        <line x1="0" y1="60" x2="200" y2="60" stroke="var(--ink)" strokeWidth="0.5" opacity="0.3" />
        <line x1="100" y1="0" x2="100" y2="120" stroke="var(--ink)" strokeWidth="0.5" opacity="0.3" />
        {/* labels */}
        <text x="4" y="14" fill="var(--ink)" fontSize="7" fontFamily="var(--font-mono)">f/2.8</text>
        <text x="4" y="116" fill="var(--ink)" fontSize="7" fontFamily="var(--font-mono)">ISO 400</text>
        <text x="160" y="14" fill="var(--ink)" fontSize="7" fontFamily="var(--font-mono)">1/250</text>
        <text x="160" y="116" fill="var(--ink)" fontSize="7" fontFamily="var(--font-mono)">50mm</text>
      </svg>
    </motion.div>
  );
}

function Gallery() {
  return (
    <section className="px-4 md:px-8 py-16 hairline-t border-ink">
      <SectionHead code="ARC / 05" kicker="THE ARCHIVE" title="Frames from the field" sub="Sameem's ledger — every laugh, every ridge, every cup of kahwa." />

      {/* bento grid: 4 cols on desktop, auto rows */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-px hairline border-ink bg-ink">
        {FRAMES.slice(0, 3).map((f, i) => (
          <FrameTile key={f.code} f={f} index={i} />
        ))}

        {/* meta tile 1 */}
        <GalleryMetaTile label="FRAMES LOGGED" value="10,472" sub="SHUTTER / SINCE 2018" delay={0.18} />

        {FRAMES.slice(3, 6).map((f, i) => (
          <FrameTile key={f.code} f={f} index={i + 3} />
        ))}

        {/* aperture diagram tile */}
        <GalleryDiagramTile delay={0.36} />

        {FRAMES.slice(6).map((f, i) => (
          <FrameTile key={f.code} f={f} index={i + 6} />
        ))}

        {/* meta tile 2 */}
        <GalleryMetaTile label="FILM EQUIV" value="+∞" sub="ALL DIGITAL · NO FILM" delay={0.42} />
      </div>

      {/* bottom strip */}
      <div className="mt-6 hairline border-ink bg-bone px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 mono-label">
          <span className="signal-chip"><Camera className="h-3 w-3" />OPTICS / SAMEEM</span>
          <span className="hidden sm:inline opacity-60">PRIMARY BODY: SONY A7 IV · LENS: 24-70 GM II</span>
        </div>
        <div className="flex items-center gap-2 mono-label opacity-60">
          <span className="h-1.5 w-1.5 bg-signal rounded-full animate-blink" />
          ARCHIVE LIVE
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- TIMELINE -------------------------------- */

function Timeline() {
  return (
    <section className="px-4 md:px-8 py-16 hairline-t border-ink">
      <SectionHead code="LEDG / 06" kicker="THE LEDGER" title="Eight years, on record" sub="Receipts. Re-runs. Rituals. The crew's mission log." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 hairline border-ink">
        {TIMELINE.map((e, i) => (
          <motion.div
            key={e.y}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`p-5 bg-bone ${i % 2 === 0 ? "md:hairline-r" : ""} ${i < TIMELINE.length - 2 ? "hairline-b" : "hairline-b md:hairline-b-0"} border-ink/50 relative`}
          >
            <div className="flex items-baseline justify-between">
              <span className="display-num text-5xl">{e.y}<span className="text-signal">.</span></span>
              <span className="mono-label">ENTRY/{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="mt-2 mono-label">{e.t}</div>
            <p className="mt-1 text-ink/80 leading-snug">{e.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- VOICES --------------------------------- */

function Voices() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % VOICES.length), 5000);
    return () => clearInterval(t);
  }, []);
  const v = VOICES[i];
  return (
    <section className="px-4 md:px-8 py-16 brick hairline-t border-ink">
      <div className="hairline-b border-bone/30 pb-4 mb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mono-label text-bone">
            <span className="signal-chip">TRX / 07</span>
            <span>INTERCEPTED COMMS</span>
          </div>
          <h2 className="display-num text-bone text-[clamp(40px,7vw,96px)] mt-2">Unfiltered<span className="text-signal">.</span></h2>
        </div>
        <div className="flex gap-2">
          {VOICES.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-2 w-8 ${idx === i ? "bg-signal" : "bg-bone/30"}`} aria-label={`Voice ${idx + 1}`} />
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="font-display italic text-bone text-3xl md:text-5xl max-w-4xl leading-tight"
        >
          "{v.q}"
          <footer className="mono-label text-bone/70 mt-6 not-italic font-sans">— {v.who} / CORE UNIT</footer>
        </motion.blockquote>
      </AnimatePresence>
    </section>
  );
}

/* ----------------------------------- FAQ ---------------------------------- */

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-4 md:px-8 py-16 hairline-t border-ink">
      <SectionHead code="FAQ / 08" kicker="DECRYPTED QUESTIONS" title="What you'll ask" sub="No PR voice. Straight answers from the bench." />
      <div className="hairline border-ink">
        {FAQ.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`${i < FAQ.length - 1 ? "hairline-b" : ""} border-ink/60`}>
              <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 px-4 py-4 hover:bg-paper transition-colors text-left">
                <div className="flex items-center gap-4">
                  <span className="mono-label">Q/{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-xl md:text-2xl">{f.q}</span>
                </div>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="h-7 w-7 hairline border-ink flex items-center justify-center">
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-4 pb-5 pl-16 text-ink/80 max-w-3xl leading-snug">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ----------------------------------- JOIN --------------------------------- */

function Join() {
  return (
    <section id="join" className="px-4 md:px-8 py-16 hairline-t border-ink">
      <div className="hairline border-ink crosshair p-6 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end bg-bone">
        <Crosshairs />
        <div>
          <div className="mono-label flex items-center gap-2"><Radio className="h-3.5 w-3.5 text-signal animate-blink" /> OPEN CHANNEL · TRX 7</div>
          <h3 className="display-num text-[clamp(40px,7vw,84px)] mt-2">Send a signal<span className="text-signal">.</span></h3>
          <p className="font-display italic text-xl text-ink/70 max-w-xl mt-2">Drop a coordinate. We don't promise a reply — we promise we'll read it by the fire.</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-0 hairline border-ink w-full md:w-auto">
          <input
            placeholder="YOU@RIDGE.IN"
            className="bg-bone px-4 py-3 mono-label outline-none sm:w-72 hairline-b sm:hairline-b-0 sm:hairline-r border-ink"
          />
          <button className="brick px-5 py-3 mono-label text-bone hover:bg-signal transition-colors flex items-center gap-2 justify-center">
            TRANSMIT <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---------------------------------- FOOTER -------------------------------- */

function Footer() {
  return (
    <footer className="brick hairline-t border-ink mt-0">
      <div className="px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="mono-label text-bone/60">SIGN-OFF</div>
          <div className="display-num text-bone text-5xl md:text-6xl mt-2">FRIEND<br />CIRCLE<span className="text-signal">.</span></div>
          <p className="font-display italic text-bone/70 mt-3 max-w-md">Six kings, one ridge, infinite chai. Built in Kashmir, broadcast from the bench.</p>
        </div>
        <div>
          <div className="mono-label text-bone/60 mb-3">CHANNELS</div>
          <ul className="space-y-2">
            {[
              { i: Circle, l: "INSTAGRAM" },
              { i: Circle, l: "GITHUB" },
              { i: Mail, l: "MAIL" },
            ].map(({ i: Icon, l }) => (
              <li key={l}>
                <a href="#" className="mono-label text-bone hover:text-signal flex items-center gap-2 group">
                  <Icon className="h-3.5 w-3.5" /> {l}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mono-label text-bone/60 mb-3">REGISTRY</div>
          <ul className="space-y-1 mono-label text-bone">
            <li>EST. 2018 · CHADOORA</li>
            <li>UNITS / 19</li>
            <li>CORE / 06</li>
            <li>REV 02.6</li>
          </ul>
        </div>
      </div>
      <div className="hairline-t border-bone/30 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-2 mono-label text-bone/70">
        <span>© 2026 FRIEND CIRCLE — NO RIGHTS RESERVED, ALL WRONGS REMEMBERED.</span>
        <span className="flex items-center gap-2"><Gauge className="h-3.5 w-3.5 text-signal" /> CHAI BILL: PENDING ON FURQAN SINCE 2019</span>
      </div>
    </footer>
  );
}

/* --------------------------- TELEMETRY / FIELD INSTRUMENTS ---------------- */

const TRANSMISSIONS = [
  { t: "04:12", from: "AQIB", msg: "Ridge clear. Fuel at 3/4. Sending Sahil ahead." },
  { t: "04:38", from: "SAHIL", msg: "Wazwan packed. Rogan josh holding temperature." },
  { t: "05:01", from: "FURQAN", msg: "Cracked a joke. Naveed laughed. Historic." },
  { t: "05:44", from: "SAMEEM", msg: "Light is unreal. Shooting 4K, 120fps." },
  { t: "06:10", from: "NAVEED", msg: "Shortcut found. Saves 18 min. Trust me." },
  { t: "06:33", from: "FARHAN", msg: "Three trout. River is generous today." },
];

function Waveform() {
  const bars = 36;
  return (
    <div className="flex items-end gap-[3px] h-16 w-full">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="flex-1 bg-ink"
          initial={{ scaleY: 0.2 }}
          animate={{ scaleY: [0.2, 0.95, 0.45, 0.8, 0.3] }}
          transition={{
            duration: 1.6 + (i % 5) * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i * 0.04) % 1.2,
          }}
          style={{ transformOrigin: "bottom", height: "100%" }}
        />
      ))}
    </div>
  );
}

function CompassDial() {
  return (
    <div className="relative aspect-square w-full max-w-[260px] mx-auto">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink" />
        <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink/40" strokeDasharray="2 4" />
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i * 6 * Math.PI) / 180;
          const r1 = i % 5 === 0 ? 82 : 87;
          const x1 = 100 + Math.cos(a) * r1;
          const y1 = 100 + Math.sin(a) * r1;
          const x2 = 100 + Math.cos(a) * 92;
          const y2 = 100 + Math.sin(a) * 92;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" className="text-ink" />;
        })}
        {["N", "E", "S", "W"].map((d, i) => {
          const a = (i * 90 - 90) * (Math.PI / 180);
          const x = 100 + Math.cos(a) * 60;
          const y = 100 + Math.sin(a) * 60 + 4;
          return (
            <text key={d} x={x} y={y} textAnchor="middle" className="fill-ink" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.22em" }}>{d}</text>
          );
        })}
      </svg>
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [0, 18, -8, 24, 14] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 50%" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon points="100,18 106,100 100,108 94,100" className="fill-signal" />
          <polygon points="100,182 106,100 100,92 94,100" className="fill-ink" />
          <circle cx="100" cy="100" r="5" className="fill-bone stroke-ink" strokeWidth="1.5" />
        </svg>
      </motion.div>
      <div className="absolute inset-x-0 -bottom-6 text-center mono-label">HEADING / 014°NE</div>
    </div>
  );
}

function ElevationProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.2"] });
  const pathLen = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // 24 sample points; deterministic, ridge-shaped
  const pts = useMemo(() => {
    const xs = Array.from({ length: 24 }, (_, i) => i);
    const ys = xs.map((i) => {
      const a = Math.sin(i * 0.55) * 18;
      const b = Math.cos(i * 0.31) * 10;
      const ridge = -Math.abs(i - 12) * 2.2 + 28;
      return 70 - (a + b + ridge);
    });
    return xs.map((x, i) => `${(x / 23) * 380 + 10},${ys[i] + 10}`).join(" ");
  }, []);
  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 400 100" className="w-full h-32">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="100" stroke="currentColor" strokeWidth="0.5" className="text-ink/15" />
        ))}
        <polyline points={`10,90 ${pts} 390,90`} className="fill-signal/10 stroke-signal/30" strokeWidth="1" />
        <motion.polyline
          points={pts}
          fill="none"
          className="stroke-ink"
          strokeWidth="1.6"
          style={{ pathLength: pathLen }}
        />
        <motion.circle r="3" className="fill-signal" style={{ offsetPath: `path("M ${pts}")` as unknown as string }}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <div className="flex justify-between mono-label opacity-60 mt-1">
        <span>0 KM · 1580m</span>
        <span>HAIJEN · 3340m</span>
        <span>47 KM · 2110m</span>
      </div>
    </div>
  );
}

function TransmissionLog() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const msg = TRANSMISSIONS[idx].msg;
  useEffect(() => {
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(msg.slice(0, i));
      if (i >= msg.length) {
        clearInterval(id);
        const hold = setTimeout(() => setIdx((p) => (p + 1) % TRANSMISSIONS.length), 1800);
        return () => clearTimeout(hold);
      }
    }, 22);
    return () => clearInterval(id);
  }, [idx, msg]);
  const cur = TRANSMISSIONS[idx];
  return (
    <div className="hairline border-ink/60 bg-bone p-3 min-h-[160px] relative overflow-hidden">
      <div className="flex items-center justify-between mono-label">
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-signal animate-blink" /> CH 7 · OPEN</span>
        <span className="opacity-60">PKT {String(idx + 1).padStart(2, "0")}/{String(TRANSMISSIONS.length).padStart(2, "0")}</span>
      </div>
      <div className="hairline-t border-ink/30 mt-2 pt-2 space-y-1.5">
        <div className="mono-label flex items-center gap-2">
          <span className="bg-ink text-bone px-1.5">{cur.t}</span>
          <span className="text-signal">{cur.from}</span>
          <span className="opacity-50">→ ALL UNITS</span>
        </div>
        <p className="font-display text-lg leading-snug min-h-[3.5em]">
          {typed}
          <motion.span className="inline-block w-[10px] h-[1em] bg-ink align-[-2px] ml-0.5"
            animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-signal/40">
        <motion.div key={idx} className="h-full bg-signal" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: msg.length * 0.022 + 1.8, ease: "linear" }} />
      </div>
    </div>
  );
}

function WeatherCard() {
  const [wx, setWx] = useState<{ temp: number, wind: number, location: string, time: string } | null>(null);

  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setWx(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="hairline border-ink/60 bg-bone p-4 relative overflow-hidden">
      <div className="mono-label flex items-center justify-between">
        <span className="truncate pr-2">WX / {wx ? `${wx.location} · ${wx.time}` : "SRINAGAR · --:--"}</span>
        <span className="text-signal flex items-center gap-1 shrink-0"><Activity className="h-3 w-3" /> LIVE</span>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-3 items-center">
        <div>
          <div className="mono-label opacity-60">TEMP</div>
          <div className="display-num text-4xl">{wx ? wx.temp : "--"}°<span className="text-signal">.</span></div>
        </div>
        <div className="relative h-20">
          <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full">
            <path d="M 8 50 A 42 42 0 0 1 92 50" fill="none" className="stroke-ink/30" strokeWidth="1" strokeDasharray="2 3" />
            <motion.circle r="4" className="fill-signal"
              animate={{ offsetDistance: ["10%", "90%", "10%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              style={{ offsetPath: `path("M 8 50 A 42 42 0 0 1 92 50")` as unknown as string }}
            />
            <line x1="0" y1="50" x2="100" y2="50" className="stroke-ink" strokeWidth="1" />
          </svg>
          <div className="absolute inset-x-0 bottom-0 text-center mono-label opacity-60">SUN ARC</div>
        </div>
        <div>
          <div className="mono-label opacity-60">WIND</div>
          <div className="display-num text-4xl">{wx ? wx.wind : "--"}<span className="text-base mono-label">KM/H</span></div>
          <div className="mt-1 flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.span key={i} className="block h-px bg-ink"
                initial={{ width: 6 }}
                animate={{ width: [6, 22, 10, 18, 6] }}
                transition={{ duration: 2.2, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Telemetry() {
  return (
    <section id="telemetry" className="px-4 md:px-8 py-20 hairline-t border-ink relative">
      <SectionHead
        code="TLM / 07"
        kicker="FIELD INSTRUMENTS · LIVE TELEMETRY"
        title="Instrument cluster"
        sub="The pocket dashboard we read by torchlight — heading, weather, last words on the radio."
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Compass */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, ease: "easeOut" }}
          className="lg:col-span-4 hairline border-ink crosshair bg-bone p-5"
        >
          <Crosshairs />
          <div className="mono-label flex items-center justify-between">
            <span>NAV / COMPASS</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 bg-signal animate-blink" />TRACKING</span>
          </div>
          <div className="mt-6 mb-8"><CompassDial /></div>
          <div className="grid grid-cols-3 hairline border-ink/60">
            <div className="p-2 hairline-r border-ink/60"><div className="mono-label opacity-60">LAT</div><div className="font-mono text-[13px]">34.0151°N</div></div>
            <div className="p-2 hairline-r border-ink/60"><div className="mono-label opacity-60">LON</div><div className="font-mono text-[13px]">74.7973°E</div></div>
            <div className="p-2"><div className="mono-label opacity-60">ALT</div><div className="font-mono text-[13px]">2114 m</div></div>
          </div>
        </motion.div>

        {/* Right column */}
        <div className="lg:col-span-8 grid grid-cols-1 gap-4">
          {/* Elevation */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, ease: "easeOut" }}
            className="hairline border-ink crosshair bg-bone p-5"
          >
            <Crosshairs />
            <div className="mono-label flex items-center justify-between">
              <span>ELV / ROUTE T-01 HAIJEN</span>
              <span className="flex items-center gap-2"><Mountain className="h-3.5 w-3.5 text-signal" /> DRAWN ON SCROLL</span>
            </div>
            <div className="mt-4"><ElevationProfile /></div>
          </motion.div>

          {/* Waveform + Weather + Log */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
              className="hairline border-ink crosshair bg-bone p-5"
            >
              <Crosshairs />
              <div className="mono-label flex items-center justify-between mb-3">
                <span>SIG / 433 MHz</span>
                <span className="text-signal flex items-center gap-1.5"><span className="h-1.5 w-1.5 bg-signal animate-blink" />CARRIER</span>
              </div>
              <Waveform />
              <div className="mt-3 flex items-center justify-between mono-label opacity-60">
                <span>RX -62 dBm</span><span>SNR 21</span><span>BW 25k</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="crosshair"
            >
              <Crosshairs />
              <WeatherCard />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="hairline border-ink crosshair bg-bone p-5"
          >
            <Crosshairs />
            <div className="mono-label flex items-center justify-between mb-3">
              <span>LOG / TRX 7 · LAST 6 PACKETS</span>
              <span className="flex items-center gap-1.5"><Radio className="h-3.5 w-3.5 text-signal" />DECRYPTED</span>
            </div>
            <TransmissionLog />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ LOADOUT MANIFEST -------------------------- */

const LOADOUT = [
  { code: "GR-01", name: "JERRY CAN", spec: "20L · DIESEL", weight: 18.4, status: "PACKED", owner: "AQIB" },
  { code: "GR-02", name: "STORM LANTERN", spec: "KEROSENE · 14h", weight: 1.2, status: "PACKED", owner: "FURQAN" },
  { code: "GR-03", name: "SAMOVAR", spec: "COPPER · 2.5L", weight: 2.8, status: "PACKED", owner: "SAHIL" },
  { code: "GR-04", name: "BOWIE KNIFE", spec: "CARBON · 9in", weight: 0.4, status: "PACKED", owner: "NAVEED" },
  { code: "GR-05", name: "BRASS COMPASS", spec: "LIQUID · ±2°", weight: 0.2, status: "PACKED", owner: "SAMEEM" },
  { code: "GR-06", name: "FIELD CASSETTE", spec: "C90 · QAWWALI", weight: 0.1, status: "PLAYING", owner: "FARHAN" },
] as const;

function GearIcon({ kind }: { kind: string }) {
  const stroke = "oklch(0.13 0.01 60)";
  switch (kind) {
    case "GR-01": // Jerry can
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.g animate={{ rotate: [0, -2, 0, 2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "50px 80px" }}>
            <rect x="22" y="20" width="50" height="65" fill="none" stroke={stroke} strokeWidth="2" />
            <rect x="72" y="32" width="10" height="14" fill="none" stroke={stroke} strokeWidth="2" />
            <rect x="32" y="14" width="20" height="10" fill="none" stroke={stroke} strokeWidth="2" />
            <line x1="28" y1="32" x2="66" y2="32" stroke={stroke} strokeWidth="1" />
            <line x1="28" y1="42" x2="66" y2="42" stroke={stroke} strokeWidth="1" />
            <line x1="28" y1="52" x2="66" y2="52" stroke={stroke} strokeWidth="1" />
            <text x="47" y="72" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill={stroke}>20L</text>
          </motion.g>
        </svg>
      );
    case "GR-02": // Lantern with glow
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M40 14 L60 14 L60 22 L40 22 Z" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M30 22 L70 22 L66 32 L34 32 Z" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="34" y="32" width="32" height="40" fill="none" stroke={stroke} strokeWidth="2" />
          <motion.circle cx="50" cy="52" r="9" fill="oklch(0.88 0.2 110)"
            animate={{ opacity: [0.4, 1, 0.6, 1, 0.5], scale: [1, 1.08, 0.96, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
          <motion.path d="M46 52 Q50 44 54 52 Q52 56 50 56 Q48 56 46 52 Z" fill="oklch(0.62 0.24 28)"
            animate={{ scaleY: [1, 0.85, 1.1, 0.95, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }} style={{ transformOrigin: "50px 52px" }} />
          <path d="M30 72 L70 72 L66 82 L34 82 Z" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="14" stroke={stroke} strokeWidth="2" />
        </svg>
      );
    case "GR-03": // Samovar with steam
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {[0, 1, 2].map((i) => (
            <motion.path key={i} d={`M${44 + i * 6} 28 Q${42 + i * 6} 20 ${46 + i * 6} 14 Q${50 + i * 6} 8 ${44 + i * 6} 2`}
              fill="none" stroke={stroke} strokeWidth="1.2" strokeLinecap="round"
              animate={{ opacity: [0, 0.7, 0], y: [-2, -10, -16] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }} />
          ))}
          <ellipse cx="50" cy="34" rx="20" ry="6" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M30 34 Q28 60 50 70 Q72 60 70 34 Z" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M70 46 Q82 50 76 60" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="42" y="70" width="16" height="6" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="36" y="76" width="28" height="6" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="40" y1="50" x2="60" y2="50" stroke={stroke} strokeWidth="1" />
        </svg>
      );
    case "GR-04": // Knife
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.g animate={{ rotate: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "50px 50px" }}>
            <path d="M14 58 L70 42 L82 50 L70 58 Z" fill="none" stroke={stroke} strokeWidth="2" />
            <line x1="22" y1="56" x2="66" y2="46" stroke={stroke} strokeWidth="0.8" />
            <rect x="70" y="50" width="18" height="10" fill="none" stroke={stroke} strokeWidth="2" />
            <line x1="74" y1="52" x2="74" y2="58" stroke={stroke} strokeWidth="1" />
            <line x1="78" y1="52" x2="78" y2="58" stroke={stroke} strokeWidth="1" />
            <line x1="82" y1="52" x2="82" y2="58" stroke={stroke} strokeWidth="1" />
          </motion.g>
        </svg>
      );
    case "GR-05": // Compass spinning needle
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="52" r="32" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="50" cy="52" r="26" fill="none" stroke={stroke} strokeWidth="1" />
          {["N", "E", "S", "W"].map((c, i) => (
            <text key={c} x={50 + Math.sin((i * Math.PI) / 2) * 22} y={52 - Math.cos((i * Math.PI) / 2) * 22 + 3}
              textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill={stroke}>{c}</text>
          ))}
          <motion.g animate={{ rotate: [0, 360] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "50px 52px" }}>
            <path d="M50 28 L54 52 L50 76 L46 52 Z" fill="oklch(0.62 0.24 28)" stroke={stroke} strokeWidth="1" />
          </motion.g>
          <circle cx="50" cy="52" r="2" fill={stroke} />
          <rect x="38" y="14" width="24" height="6" fill="none" stroke={stroke} strokeWidth="2" />
        </svg>
      );
    case "GR-06": // Cassette spinning reels
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="14" y="28" width="72" height="44" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="20" y="34" width="60" height="14" fill="none" stroke={stroke} strokeWidth="1" />
          <line x1="22" y1="40" x2="78" y2="40" stroke={stroke} strokeWidth="0.6" />
          {[32, 68].map((cx) => (
            <motion.g key={cx} animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: `${cx}px 60px` }}>
              <circle cx={cx} cy="60" r="7" fill="none" stroke={stroke} strokeWidth="2" />
              <line x1={cx - 7} y1="60" x2={cx + 7} y2="60" stroke={stroke} strokeWidth="1.5" />
              <line x1={cx} y1="53" x2={cx} y2="67" stroke={stroke} strokeWidth="1.5" />
            </motion.g>
          ))}
          <line x1="14" y1="72" x2="86" y2="72" stroke={stroke} strokeWidth="1" />
          <text x="50" y="82" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill={stroke}>C90 · SIDE A</text>
        </svg>
      );
    default:
      return null;
  }
}

function WeightCounter({ target }: { target: number }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const dur = 1200;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setV(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{v.toFixed(1)}</span>;
}

function LoadoutManifest() {
  const total = LOADOUT.reduce((a, b) => a + b.weight, 0);
  const [armed, setArmed] = useState(false);
  return (
    <section id="loadout" className="px-4 md:px-8 py-20 hairline-t border-ink bg-bone relative overflow-hidden">
      <SectionHead code="GEAR / 08" kicker="LOADOUT MANIFEST" title="What rides in the boot" sub="Six items. No more, no less. Pre-flight check before every dispatch." />

      {/* Top status bar */}
      <div className="hairline border-ink crosshair p-3 mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Crosshairs />
        <div className="mono-label flex items-center gap-2"><Gauge className="h-3.5 w-3.5 text-signal" />MANIFEST / V2.6</div>
        <div className="mono-label flex items-center gap-2"><CircleDot className="h-3.5 w-3.5 text-signal animate-blink" />6 / 6 UNITS</div>
        <div className="mono-label flex items-center gap-2"><Target className="h-3.5 w-3.5" />PAYLOAD <Marker>{total.toFixed(1)} KG</Marker></div>
        <button
          onClick={() => setArmed((s) => !s)}
          className={`mono-label hairline border-ink px-2 py-1 transition-colors ${armed ? "brick text-bone" : "bg-bone text-ink hover:bg-ink hover:text-bone"}`}
        >
          {armed ? "● ARMED · DISPATCH" : "○ ARM CONVOY"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Gear grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0 hairline border-ink">
          {LOADOUT.map((item, i) => (
            <motion.article
              key={item.code}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              whileHover="hover"
              className="group relative bg-bone p-4 hairline-b hairline-r border-ink last:hairline-r-0"
            >
              {/* sweeping scan line on hover */}
              <motion.span
                variants={{ hover: { y: ["-100%", "200%"] } }}
                transition={{ duration: 1.2, ease: "linear" }}
                className="pointer-events-none absolute inset-x-0 h-px bg-signal/70"
                style={{ top: 0 }}
              />
              <header className="flex items-center justify-between mb-2">
                <span className="signal-chip">{item.code}</span>
                <span className="mono-label flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${item.status === "PLAYING" ? "bg-signal animate-blink" : "bg-ink"}`} />
                  {item.status}
                </span>
              </header>

              <motion.div
                variants={{ hover: { scale: 1.06, rotate: -1 } }}
                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                className="aspect-square w-full bg-bone hairline border-ink crosshair p-3 overflow-hidden"
              >
                <Crosshairs />
                {/* grid backdrop */}
                <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden>
                  <defs>
                    <pattern id={`g-${item.code}`} width="8" height="8" patternUnits="userSpaceOnUse">
                      <path d="M8 0H0V8" fill="none" stroke="oklch(0.13 0.01 60)" strokeWidth="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#g-${item.code})`} />
                </svg>
                <div className="relative w-full h-full">
                  <GearIcon kind={item.code} />
                </div>
                {/* dimension ticks */}
                <span className="absolute top-1 left-1 mono-label opacity-50">0</span>
                <span className="absolute bottom-1 right-1 mono-label opacity-50">100</span>
              </motion.div>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <div className="font-display font-black text-xl leading-none tracking-tighter">{item.name}<span className="text-signal">.</span></div>
                  <div className="mono-label opacity-70 mt-1">{item.spec}</div>
                </div>
                <div className="text-right">
                  <div className="display-num text-3xl leading-none"><WeightCounter target={item.weight} /></div>
                  <div className="mono-label opacity-60">KG</div>
                </div>
              </div>

              <footer className="mt-3 hairline-t border-ink pt-2 flex items-center justify-between mono-label">
                <span className="opacity-70">OWNER</span>
                <span className="brick text-bone px-1.5 py-px">{item.owner}</span>
              </footer>
            </motion.article>
          ))}
        </div>

        {/* Side: checklist + radar */}
        <aside className="space-y-6">
          <div className="hairline border-ink crosshair bg-bone">
            <Crosshairs />
            <header className="hairline-b border-ink flex items-center justify-between px-3 py-2">
              <span className="mono-label">CHK / PRE-FLIGHT</span>
              <span className="mono-label flex items-center gap-1.5 text-signal"><Activity className="h-3.5 w-3.5" />RUNNING</span>
            </header>
            <ul className="p-3 space-y-2">
              {[
                "Tyre pressure 32psi",
                "Fuel reserve > 1/2",
                "First-aid kit sealed",
                "Wazwan invitation declined",
                "Power bank @ 100%",
                "Asr prayer scheduled",
              ].map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
                  className="flex items-center gap-3 mono-label text-[11px]"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 300, damping: 18 }}
                    className="h-3 w-3 hairline border-ink bg-signal grid place-items-center"
                  >
                    <span className="block h-1 w-1.5 border-b-2 border-r-2 border-bone -rotate-45 -translate-y-px" />
                  </motion.span>
                  <span className="flex-1 hairline-b border-ink/30 pb-1">{line}</span>
                  <span className="opacity-60">OK</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Radar */}
          <div className="hairline border-ink crosshair bg-bone p-4">
            <Crosshairs />
            <div className="mono-label flex items-center justify-between mb-3">
              <span>RDR / PROXIMITY</span>
              <span className="flex items-center gap-1.5 text-signal"><Radio className="h-3.5 w-3.5" />SWEEP</span>
            </div>
            <div className="relative aspect-square">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {[40, 70, 100].map((r) => (
                  <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="oklch(0.13 0.01 60)" strokeWidth="1" strokeDasharray="2 4" />
                ))}
                <line x1="0" y1="100" x2="200" y2="100" stroke="oklch(0.13 0.01 60)" strokeWidth="0.6" />
                <line x1="100" y1="0" x2="100" y2="200" stroke="oklch(0.13 0.01 60)" strokeWidth="0.6" />
                {/* sweep */}
                <motion.g animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "100px 100px", transformBox: "view-box" }}>
                  <circle cx="100" cy="100" r="100" fill="none" stroke="none" />
                  <defs>
                    <linearGradient id="sweep" x1="0" x2="1">
                      <stop offset="0" stopColor="oklch(0.62 0.24 28)" stopOpacity="0.6" />
                      <stop offset="1" stopColor="oklch(0.62 0.24 28)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M100 100 L100 0 A100 100 0 0 1 200 100 Z" fill="url(#sweep)" />
                </motion.g>
                {/* contacts */}
                {[{ x: 70, y: 60, l: "AQIB" }, { x: 140, y: 80, l: "SAHIL" }, { x: 110, y: 150, l: "FRQN" }, { x: 60, y: 130, l: "SMEM" }].map((c, i) => (
                  <g key={c.l}>
                    <motion.circle cx={c.x} cy={c.y} r="3" fill="oklch(0.62 0.24 28)"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }} />
                    <text x={c.x + 6} y={c.y + 3} fontFamily="JetBrains Mono" fontSize="7" fill="oklch(0.13 0.01 60)">{c.l}</text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="mono-label flex justify-between mt-2 opacity-70">
              <span>RANGE 12 KM</span>
              <span>4 CONTACTS</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom totals bar */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 hairline border-ink">
        {[
          { l: "TOTAL UNITS", v: "06", s: "PACKED" },
          { l: "TOTAL MASS", v: `${total.toFixed(1)}`, s: "KG" },
          { l: "CONVOY", v: "02", s: "VEHICLES" },
          { l: "ETA HAIJEN", v: "04:12", s: "HH:MM" },
        ].map((t, i) => (
          <motion.div
            key={t.l}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            className={`p-4 ${i < 3 ? "hairline-r border-ink" : ""}`}
          >
            <div className="mono-label">{t.l}</div>
            <div className="display-num text-4xl md:text-5xl mt-1">{t.v}</div>
            <div className="mono-label opacity-60">{t.s}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------- PAGE --------------------------------- */

export default function LandingPage() {
  return (
    <main className="text-ink">
      <TopBar />
      <Hero />
      <Ticker />
      <StatsRow />
      <CrewSection />
      <ToursSection />
      <Telemetry />
      <LoadoutManifest />
      <TazkiyahSection />
      <Gallery />
      <Timeline />
      <Voices />
      <FAQSection />
      <Join />
      <Footer />
    </main>
  );
}
