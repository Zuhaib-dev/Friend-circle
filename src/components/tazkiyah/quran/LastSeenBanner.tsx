import { motion } from "motion/react";
import { Play } from "lucide-react";
import { useLastSeen } from "@/hooks/useLastSeen";
import { SURAHS } from "@/data/quran-data";
import Link from "next/link";

export function LastSeenBanner({ onResume }: { onResume?: (surahId: number) => void }) {
  const { lastSeen, mounted } = useLastSeen();

  if (!mounted || !lastSeen) return null;

  const surah = SURAHS.find((s) => s.number === lastSeen.surah) || SURAHS[0];
  const progress = Math.round((lastSeen.ayah / surah.ayats) * 100);

  const handleResume = () => {
    if (onResume) onResume(lastSeen.surah);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-emerald-500/6 via-white/2 to-amber-300/4 p-6 backdrop-blur-xl sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-emerald-400/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-amber-300/6 blur-3xl"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-emerald-300/80">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
            </span>
            Last Seen · Live Sync
          </div>

          <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2
              className="text-2xl font-light tracking-tight text-zinc-50 sm:text-3xl"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Surah {surah.name}
            </h2>
            <span className="text-sm text-zinc-400">Ayat {lastSeen.ayah} / {surah.ayats}</span>
          </div>

          {lastSeen.arabicSnippet && (
            <p
              dir="rtl"
              className="mt-4 line-clamp-2 text-right text-lg leading-loose text-zinc-200 sm:text-xl lg:text-2xl"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              {lastSeen.arabicSnippet}
            </p>
          )}

          <div className="mt-5">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              <span>Progress</span>
              <span className="text-emerald-300/80">{progress}%</span>
            </div>
            <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="h-full rounded-full bg-linear-to-r from-emerald-300 to-amber-200 shadow-[0_0_18px_rgba(110,231,183,0.5)]"
              />
            </div>
          </div>
        </div>

        {onResume ? (
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleResume}
            className="group/btn relative inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-emerald-300/30 bg-emerald-300/8 px-6 py-3 text-sm font-medium text-emerald-100 backdrop-blur-md transition hover:border-emerald-300/60 hover:bg-emerald-300/14 hover:text-emerald-50 lg:w-auto"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-emerald-300/20 transition group-hover/btn:bg-emerald-300/30">
              <Play className="size-3.5 translate-x-px fill-current" />
            </span>
            Resume Reading
            <motion.span
              aria-hidden
              initial={{ x: 0 }}
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-emerald-200/70"
            >
              →
            </motion.span>
          </motion.button>
        ) : (
          <Link href={`/tazkiyah/quran?surah=${lastSeen.surah}#ayah-${lastSeen.ayah}`} passHref legacyBehavior>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group/btn relative inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-emerald-300/30 bg-emerald-300/8 px-6 py-3 text-sm font-medium text-emerald-100 backdrop-blur-md transition hover:border-emerald-300/60 hover:bg-emerald-300/14 hover:text-emerald-50 lg:w-auto"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-emerald-300/20 transition group-hover/btn:bg-emerald-300/30">
                <Play className="size-3.5 translate-x-px fill-current" />
              </span>
              Resume Reading
              <motion.span
                aria-hidden
                initial={{ x: 0 }}
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="text-emerald-200/70"
              >
                →
              </motion.span>
            </motion.a>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

