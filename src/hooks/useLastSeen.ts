import { useState, useEffect } from "react";

type LastSeen = {
  surah: number;
  ayah: number;
  arabicSnippet?: string;
};

export function useLastSeen() {
  const [lastSeen, setLastSeen] = useState<LastSeen | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("tazkiyah_last_seen");
    if (stored) {
      try {
        setLastSeen(JSON.parse(stored));
      } catch (err) {}
    }
  }, []);

  const saveLastSeen = (surah: number, ayah: number, arabicSnippet?: string) => {
    const data: LastSeen = { surah, ayah, arabicSnippet };
    setLastSeen(data);
    localStorage.setItem("tazkiyah_last_seen", JSON.stringify(data));
  };

  return { lastSeen, saveLastSeen, mounted };
}
