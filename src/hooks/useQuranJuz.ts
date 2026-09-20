import { useState, useEffect } from "react";
import { Ayah } from "./useQuranSurah";

const juzCache = new Map<number, Ayah[]>();

export function useQuranJuz(juzNumber: number | null) {
  const [ayat, setAyat] = useState<Ayah[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (juzNumber === null) {
      setAyat(null);
      return;
    }

    let mounted = true;

    async function fetchJuz() {
      if (juzCache.has(juzNumber!)) {
        setAyat(juzCache.get(juzNumber!)!);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setAyat(null);

      try {
        const res = await fetch(
          `https://api.alquran.cloud/v1/juz/${juzNumber}/editions/quran-uthmani,en.sahih,ur.jalandhry,ar.alafasy`
        );
        if (!res.ok) throw new Error("Failed to fetch juz data");
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
        
        const combinedAyat: Ayah[] = arAyahs.map((ar: any, i: number) => {
          let text = ar.text;
          let enText = enAyahs[i]?.text || "";
          let urText = urAyahs[i]?.text || "";
          
          if (ar.surah.number !== 1 && ar.surah.number !== 9 && ar.numberInSurah === 1) {
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
            n: ar.numberInSurah,
            arabic: text,
            english: enText,
            urdu: urText,
            audio: auAyahs[i]?.audio || "",
            // Additional fields useful for Juz view
            surahNumber: ar.surah.number,
            surahName: ar.surah.englishName,
          };
        });

        juzCache.set(juzNumber!, combinedAyat);

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

    fetchJuz();

    return () => {
      mounted = false;
    };
  }, [juzNumber]);

  return { ayat, loading, error };
}
