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

        const BISMILLAH_PREFIX = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ";
        const EN_BISMILLAH_PREFIX = "In the name of Allah, the Entirely Merciful, the Especially Merciful. ";
        const UR_BISMILLAH_PREFIX = "شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے";
        
        const combinedAyat: Ayah[] = arAyahs.map((ar: unknown, i: number) => {
          const arObj = ar as { numberInSurah: number; text: string };
          let text = arObj.text;
          let enText = enAyahs[i]?.text || "";
          let urText = urAyahs[i]?.text || "";
          
          if (surahNumber !== 1 && surahNumber !== 9 && i === 0) {
            if (text.startsWith(BISMILLAH_PREFIX)) {
              text = text.replace(BISMILLAH_PREFIX, "").trim();
            }
            if (enText.startsWith(EN_BISMILLAH_PREFIX)) {
              enText = enText.replace(EN_BISMILLAH_PREFIX, "").trim();
            }
            if (urText.startsWith(UR_BISMILLAH_PREFIX)) {
              urText = urText.replace(UR_BISMILLAH_PREFIX, "").trim();
            }
          }
          
          return {
            n: arObj.numberInSurah,
            arabic: text,
            english: enText,
            urdu: urText,
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
