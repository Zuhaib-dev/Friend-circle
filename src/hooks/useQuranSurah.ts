import { useState, useEffect } from "react";

export type Ayah = {
  n: number;
  arabic: string;
  english: string;
  urdu: string;
};

export function useQuranSurah(surahNumber: number) {
  const [ayat, setAyat] = useState<Ayah[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchSurah() {
      setLoading(true);
      setError(null);
      setAyat(null);

      try {
        // Fetch Arabic Uthmani script, English Sahih International (or Asad), Urdu Jalandhry
        // We use en.sahih because it's widely accepted, but we can change it to en.asad if preferred.
        const res = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,ur.jalandhry`
        );
        if (!res.ok) throw new Error("Failed to fetch surah data");
        const json = await res.json();
        const data = json.data;

        if (!data || data.length !== 3) {
          throw new Error("Invalid format received from API");
        }

        const arAyahs = data[0].ayahs;
        const enAyahs = data[1].ayahs;
        const urAyahs = data[2].ayahs;

        const combinedAyat: Ayah[] = arAyahs.map((ar: any, i: number) => ({
          n: ar.numberInSurah,
          arabic: ar.text,
          english: enAyahs[i]?.text || "",
          urdu: urAyahs[i]?.text || "",
        }));

        if (mounted) {
          setAyat(combinedAyat);
          setLoading(false);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      }
    }

    fetchSurah();

    return () => {
      mounted = false;
    };
  }, [surahNumber]);

  return { ayat, loading, error };
}
