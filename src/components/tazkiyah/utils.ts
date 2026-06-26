import { useState, useEffect } from "react";

export const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: EASE },
};

export function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function format12Hour(time: string) {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
}

export function useNowMinutes() {
  const [m, setM] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => { const d = new Date(); setM(d.getHours() * 60 + d.getMinutes()); };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return m;
}

export type AladhanResponse = {
  timings: {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
  hijri: {
    day: string;
    month: { en: string };
    year: string;
    designation: { abbreviated: string };
  };
  qibla?: number;
};

let aladhanCache: AladhanResponse | null = null;
let aladhanPromise: Promise<AladhanResponse> | null = null;

export function useAladhanData() {
  const [data, setData] = useState<AladhanResponse | null>(aladhanCache);

  useEffect(() => {
    if (aladhanCache) {
      setData(aladhanCache);
      return;
    }
    if (!aladhanPromise) {
      aladhanPromise = fetch("https://api.aladhan.com/v1/timingsByCity?city=Srinagar&country=India&method=1&school=1")
        .then(res => res.json())
        .then(json => {
          const res = {
            timings: json.data.timings,
            hijri: json.data.date.hijri,
            qibla: json.data.meta?.qibla,
          };
          aladhanCache = res;
          return res;
        });
    }
    aladhanPromise.then(setData);
  }, []);

  return data;
}
