import { useState, useEffect } from "react";

export type Ayah = {
  n: number;
  arabic: string;
  english: string;
  urdu: string;
  audio: string;
};

const surahCache = new Map<number, Ayah[]>();

export function useQuranSurah(surahNumber: number) {
  const [ayat, setAyat] = useState<Ayah[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchSurah() {
      if (surahCache.has(surahNumber)) {
        setAyat(surahCache.get(surahNumber)!);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setAyat(null);

      try {
        // Fetch Arabic Uthmani, English Sahih, Urdu Jalandhry, and Audio Alafasy
        const res = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,ur.jalandhry,ar.alafasy`
        );
        if (!res.ok) throw new Error("Failed to fetch surah data");
        const json = await res.json();
        const data = json.data;

        if (!data || data.length !== 4) {
          throw new Error("Invalid format received from API");
        }

        const arAyahs = data[0].ayahs;
        const enAyahs = data[1].ayahs;
        const urAyahs = data[2].ayahs;
        const auAyahs = data[3].ayahs;

        const combinedAyat: Ayah[] = arAyahs.map((ar: unknown, i: number) => {
          const arObj = ar as { numberInSurah: number; text: string };
          return {
            n: arObj.numberInSurah,
            arabic: arObj.text,
            english: enAyahs[i]?.text || "",
            urdu: urAyahs[i]?.text || "",
            audio: auAyahs[i]?.audio || "",
          };
        });

        surahCache.set(surahNumber, combinedAyat);

        if (mounted) {
          setAyat(combinedAyat);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      }
    }

    if (surahNumber) {
      fetchSurah();
    }

    return () => {
      mounted = false;
    };
  }, [surahNumber]);

  return { ayat, loading, error };
}
