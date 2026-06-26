"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Minus, Plus, BookOpen, Clock, Compass, Flame } from "lucide-react";
import { SectionHead, Panel, Marker } from "./primitives";

type PrayerTimes = {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

const PRAYER_ORDER = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
type PrayerName = typeof PRAYER_ORDER[number];

// Srinagar Qibla bearing from true north
const QIBLA_BEARING = 267.5;

// Get Hijri date using native Intl — zero dependencies
function getHijriDate(): string {
  try {
    const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).formatToParts(new Date());
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
    return `${get("day")} ${get("month")} ${get("year")} AH`;
  } catch {
    return "";
  }
}

// Parse "HH:MM (DST)" → minutes since midnight
function toMinutes(t: string): number {
  const m = t.match(/(\d{1,2}):(\d{2})/);
  if (!m) return 0;
  return parseInt(m[1]) * 60 + parseInt(m[2]);
}

function fmt12(t: string): string {
  const m = t.match(/(\d{1,2}):(\d{2})/);
  if (!m) return t;
  let h = parseInt(m[1]);
  const min = m[2];
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${min} ${ampm}`;
}

export function TazkiyahSection() {
  const [count, setCount] = useState(0);
  const phrases = ["SUBḤĀN ALLĀH", "ALḤAMDU LILLĀH", "ALLĀHU AKBAR"];
  const phrase = phrases[Math.floor((count / 33) % phrases.length)];

  const [prayers, setPrayers] = useState<PrayerTimes | null>(null);
  const [prayerLoading, setPrayerLoading] = useState(true);
  const [nowMs, setNowMs] = useState(Date.now());
  const [hijriDate, setHijriDate] = useState("");
  const [compassHeading, setCompassHeading] = useState<number | null>(null);
  const [compassSupported, setCompassSupported] = useState<boolean | null>(null);

  // Tick every second for next-prayer countdown
  useEffect(() => {
    setHijriDate(getHijriDate());
    const t = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // Fetch prayer times from AlAdhan — method=1 (Karachi/ISC), school=1 (Hanafi Asr)
  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const url = `https://api.aladhan.com/v1/timingsByCity/${dd}-${mm}-${yyyy}?city=Srinagar&country=India&method=1&school=1`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (d?.data?.timings) {
          const t = d.data.timings;
          setPrayers({
            Fajr: t.Fajr,
            Dhuhr: t.Dhuhr,
            Asr: t.Asr,
            Maghrib: t.Maghrib,
            Isha: t.Isha,
          });
        }
      })
      .catch(console.error)
      .finally(() => setPrayerLoading(false));
  }, []);

  // Device compass for Qibla
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: DeviceOrientationEvent) => {
      const heading = (e as any).webkitCompassHeading ?? (e.alpha != null ? (360 - e.alpha) : null);
      if (heading != null) {
        setCompassHeading(heading);
        setCompassSupported(true);
      }
    };
    const req = (DeviceOrientationEvent as any).requestPermission;
    if (typeof req === "function") {
      // iOS 13+ — user must tap to grant
      setCompassSupported(false); // will prompt on tap
    } else {
      window.addEventListener("deviceorientation", handler, true);
      setCompassSupported(true);
    }
    return () => window.removeEventListener("deviceorientation", handler, true);
  }, []);

  const requestCompass = () => {
    const req = (DeviceOrientationEvent as any).requestPermission;
    if (typeof req === "function") {
      req().then((s: string) => {
        if (s === "granted") {
          const handler = (e: DeviceOrientationEvent) => {
            const h = (e as any).webkitCompassHeading ?? (e.alpha != null ? 360 - e.alpha : null);
            if (h != null) setCompassHeading(h);
          };
          window.addEventListener("deviceorientation", handler, true);
          setCompassSupported(true);
        }
      });
    }
  };

  // Needle rotation: Qibla bearing minus device heading = direction to face
  const qiblaNeedleAngle = compassHeading != null
    ? (QIBLA_BEARING - compassHeading + 360) % 360
    : QIBLA_BEARING;

  // Find active + next prayer
  const nowMin = Math.floor((nowMs - new Date().setHours(0, 0, 0, 0)) / 60000);
  let activePrayer: PrayerName | null = null;
  let nextPrayer: PrayerName | null = null;
  let nextInMs = 0;

  if (prayers) {
    for (let i = PRAYER_ORDER.length - 1; i >= 0; i--) {
      if (toMinutes(prayers[PRAYER_ORDER[i]]) <= nowMin) {
        activePrayer = PRAYER_ORDER[i];
        nextPrayer = PRAYER_ORDER[(i + 1) % PRAYER_ORDER.length];
        break;
      }
    }
    if (!activePrayer) {
      activePrayer = null;
      nextPrayer = PRAYER_ORDER[0];
    }
    if (nextPrayer) {
      const nextMin = toMinutes(prayers[nextPrayer]);
      const diffMin = nextMin > nowMin ? nextMin - nowMin : nextMin + 1440 - nowMin;
      nextInMs = diffMin * 60 * 1000 - (nowMs % 60000);
    }
  }

  const countdownH = Math.floor(nextInMs / 3600000);
  const countdownM = Math.floor((nextInMs % 3600000) / 60000);
  const countdownS = Math.floor((nextInMs % 60000) / 1000);
  const countdown = `${String(countdownH).padStart(2, "0")}:${String(countdownM).padStart(2, "0")}:${String(countdownS).padStart(2, "0")}`;

  return (
    <section id="tazkiyah" className="px-4 md:px-8 py-16 hairline-t border-ink bg-paper">
      <SectionHead code="TZK / 04" kicker="SPIRITUAL CORNER" title="No ridge is bigger than fajr" sub="Quiet protocols. Five times a day the engine cuts and the heart speaks." />

      {/* Islamic date strip */}
      {hijriDate && (
        <div className="hairline border-ink bg-bone px-4 py-2 mb-6 mono-label flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
          <span className="opacity-60">HIJRI DATE</span>
          <span className="ml-2 text-signal">{hijriDate}</span>
          <span className="ml-auto opacity-40 hidden md:block">UMMAL QURA CALENDAR</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Prayer Times Panel ─────────────────────────── */}
        <Panel code="SLT / 01" title="PRAYER TIMES" signal="LIVE">
          {prayerLoading ? (
            <div className="space-y-3">
              {PRAYER_ORDER.map((n) => (
                <div key={n} className="flex justify-between py-3 animate-pulse">
                  <div className="h-3 w-16 bg-ink/10 rounded" />
                  <div className="h-6 w-20 bg-ink/10 rounded" />
                </div>
              ))}
            </div>
          ) : prayers ? (
            <>
              <ul className="divide-y divide-ink/40">
                {PRAYER_ORDER.map((n) => {
                  const isActive = n === activePrayer;
                  const isNext = n === nextPrayer;
                  return (
                    <li
                      key={n}
                      className={`flex items-baseline justify-between py-3 transition-colors ${
                        isActive ? "brick px-2 -mx-2 text-bone" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="mono-label">{n.toUpperCase()}</span>
                        {isActive && <span className="mono-label text-[10px] opacity-70">NOW</span>}
                        {isNext && !isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
                        )}
                      </div>
                      <span className="display-num text-3xl tabular-nums">
                        {fmt12(prayers[n])}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Countdown to next */}
              {nextPrayer && (
                <div className="hairline-t border-ink/40 pt-3 mt-2">
                  <div className="mono-label opacity-60 mb-1">NEXT · {nextPrayer?.toUpperCase()}</div>
                  <div className="display-num text-4xl tabular-nums text-signal">{countdown}</div>
                </div>
              )}

              <div className="mono-label opacity-60 mt-3 flex items-center justify-between">
                <span>SRINAGAR · ASR=ḤANAFĪ</span>
                <span className="text-[10px]">ISC KARACHI</span>
              </div>
            </>
          ) : (
            <div className="mono-label opacity-60 py-4 text-center">FAILED TO LOAD — CHECK CONNECTION</div>
          )}
        </Panel>

        {/* ── Qibla Panel ───────────────────────────────── */}
        <Panel code="QBL / 02" title="QIBLA DIRECTION" signal="ON">
          <div className="flex flex-col items-center">
            {/* Compass rose */}
            <div className="relative h-48 w-48 hairline border-ink rounded-full bg-bone mb-4">
              <div className="absolute inset-2 hairline border-ink/40 rounded-full" />
              <div className="absolute inset-6 hairline border-ink/30 rounded-full" />

              {/* Cardinal labels */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 mono-label text-[11px]">N</div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 mono-label text-[11px]">S</div>
              <div className="absolute left-1 top-1/2 -translate-y-1/2 mono-label text-[11px]">W</div>
              <div className="absolute right-1 top-1/2 -translate-y-1/2 mono-label text-[11px]">E</div>
              {/* Intercardinal */}
              <div className="absolute top-[14%] right-[14%] mono-label text-[9px] opacity-50">NE</div>
              <div className="absolute bottom-[14%] right-[14%] mono-label text-[9px] opacity-50">SE</div>
              <div className="absolute bottom-[14%] left-[14%] mono-label text-[9px] opacity-50">SW</div>
              <div className="absolute top-[14%] left-[14%] mono-label text-[9px] opacity-50">NW</div>

              {/* Qibla needle — rotates to face Mecca */}
              <motion.div
                className="absolute top-1/2 left-1/2 origin-bottom"
                style={{ translateX: "-50%", translateY: "-100%" }}
                animate={{ rotate: qiblaNeedleAngle }}
                transition={{ type: "spring", stiffness: 60, damping: 12 }}
              >
                {/* Arrow head */}
                <div className="w-0 h-0 mx-auto mb-0.5"
                  style={{
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderBottom: "8px solid #16a34a",
                  }}
                />
                <div className="w-0.5 h-20 bg-signal mx-auto" />
              </motion.div>

              {/* Centre dot */}
              <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal border-2 border-bone" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 mono-label text-signal text-[10px]">
                QIBLA {QIBLA_BEARING}°
              </div>
            </div>

            {/* Compass status */}
            <div className="mono-label text-[11px] opacity-60 text-center mb-3">
              {compassHeading != null
                ? `DEVICE HEADING · ${Math.round(compassHeading)}° · LIVE`
                : "SRINAGAR FIXED BEARING · 267.5° W"}
            </div>

            {/* iOS permission prompt */}
            {compassSupported === false && (
              <button
                onClick={requestCompass}
                className="mono-label text-[11px] brick text-bone px-3 py-1.5 hover:bg-signal transition-colors"
              >
                ENABLE LIVE COMPASS
              </button>
            )}

            <div className="hairline-t border-ink/40 pt-3 w-full">
              <div className="mono-label mb-1">HADITH / DAY</div>
              <p className="font-display italic text-lg leading-snug mt-1">
                &ldquo;The strong is not the one who overpowers others, but <Marker>the one who controls himself</Marker> when angry.&rdquo;
              </p>
              <div className="mono-label opacity-60 mt-2">— BUKHĀRĪ 6114</div>
            </div>
          </div>
        </Panel>

        {/* ── Digital Tasbih ────────────────────────────── */}
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
