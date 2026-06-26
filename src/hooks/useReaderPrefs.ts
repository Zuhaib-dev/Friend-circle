import { useState, useEffect } from "react";
import { ReaderPrefs, DEFAULT_PREFS } from "@/data/quran-data";

export function useReaderPrefs() {
  const [prefs, setPrefsState] = useState<ReaderPrefs>(DEFAULT_PREFS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const stored = localStorage.getItem("tazkiyah_reader_prefs");
    if (stored) {
      try {
        setPrefsState({ ...DEFAULT_PREFS, ...JSON.parse(stored) });
      } catch {
        // ignore error
      }
    }
  }, []);

  const setPrefs = (newPrefs: ReaderPrefs) => {
    setPrefsState(newPrefs);
    localStorage.setItem("tazkiyah_reader_prefs", JSON.stringify(newPrefs));
  };

  return { prefs, setPrefs, mounted };
}
