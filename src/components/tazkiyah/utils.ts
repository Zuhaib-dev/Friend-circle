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
