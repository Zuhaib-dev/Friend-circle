"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { Sparkles, Quote, Copy, Check, Heart, Bookmark, Share2, RotateCcw } from "lucide-react";
import { SPOTLIGHT_AYAHS } from "@/data/tazkiyah-data";

export function DailyAyahSpotlight() {
  const [idx, setIdx] = useState(0);
  const [lang, setLang] = useState<"en" | "ur">("en");
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime() + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    setIdx(dayOfYear % SPOTLIGHT_AYAHS.length);
    setMounted(true);
  }, []);

  // parallax based on pointer position over the card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const calliX = useTransform(sx, (v) => v * -28);
  const calliY = useTransform(sy, (v) => v * -18);
  const glowX = useTransform(sx, (v) => `${50 + v * 30}%`);
  const glowY = useTransform(sy, (v) => `${50 + v * 30}%`);

  const ayah = SPOTLIGHT_AYAHS[idx];
  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
  }, []);

  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  const copy = () => {
    const text = `${ayah.ar}\n\n"${ayah.en}"\n— Qur'an ${ayah.ref}, Surah ${ayah.surah}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const next = () => setIdx((i) => (i + 1) % SPOTLIGHT_AYAHS.length);

  if (!mounted) return null; // Prevent hydration mismatch entirely

  return (
    <section className="mt-16 sm:mt-24">
      {/* eyebrow */}
      <div className="flex items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-amber-200/70">
            <Sparkles className="h-3 w-3" />
            TZK / 05 · AYAH OF THE DAY
          </div>
          <h3 className="mt-2 font-display text-3xl sm:text-4xl text-white">A verse to carry today.</h3>
        </div>
        <div className="hidden sm:block text-right">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">{today}</div>
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/70 mt-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300 mr-1.5 animate-pulse" />
            REFRESHED · LIVE
          </div>
        </div>
      </div>

      <motion.div
        onPointerMove={handlePointer}
        onPointerLeave={reset}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-sm border border-white/10 bg-linear-to-br from-[#0e0e0e] via-[#101010] to-[#0a0a0a] isolate"
      >
        {/* corner crosshairs */}
        {[
          "top-0 left-0",
          "top-0 right-0 rotate-90",
          "bottom-0 left-0 -rotate-90",
          "bottom-0 right-0 rotate-180",
        ].map((p, i) => (
          <div key={i} className={`pointer-events-none absolute ${p} h-4 w-4`}>
            <div className="absolute top-0 left-0 h-px w-4 bg-amber-200/40" />
            <div className="absolute top-0 left-0 h-4 w-px bg-amber-200/40" />
          </div>
        ))}

        {/* ambient glow following cursor */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background: useTransform([glowX, glowY], ([x, y]) =>
              `radial-gradient(600px circle at ${x} ${y}, rgba(212,175,90,0.10), transparent 55%)`
            ) as any,
          }}
        />

        {/* watermark Arabic, parallax */}
        <motion.div
          aria-hidden
          style={{ x: calliX, y: calliY, fontFamily: "'Amiri', serif" }}
          className="pointer-events-none absolute -top-10 -right-6 sm:-right-10 text-[120px] sm:text-[260px] leading-none text-white/4.5 select-none whitespace-nowrap"
        >
          ﷽
        </motion.div>

        {/* sweeping shimmer line */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-amber-200/[0.07] to-transparent skew-x-12"
          animate={{ x: ["0%", "500%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
        />

        {/* hairline grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[60px_60px]" />

        <div className="relative p-6 sm:p-10 lg:p-14">
          {/* meta strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/45 mb-8">
            <span className="flex items-center gap-2 text-amber-200/80">
              <Quote className="h-3 w-3" />
              SURAH {ayah.surah.toUpperCase()}
            </span>
            <span className="text-white/30">·</span>
            <span>{ayah.ref}</span>
            <span className="text-white/30">·</span>
            <span>{ayah.revealed.toUpperCase()}</span>
            <span className="text-white/30">·</span>
            <span className="text-emerald-300/70">{ayah.theme.toUpperCase()}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Arabic — word-by-word reveal */}
              <div dir="rtl" className="text-right">
                <p
                  className="text-white leading-[2.1] text-3xl sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: "'Amiri', serif" }}
                >
                  {ayah.ar.split(" ").map((w, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block mx-1"
                    >
                      {w}
                    </motion.span>
                  ))}
                </p>
              </div>

              {/* divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1, ease: [0.65, 0, 0.35, 1] }}
                className="my-8 h-px w-full bg-linear-to-r from-transparent via-amber-200/30 to-transparent origin-left"
              />

              {/* translation */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={lang}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                  dir={lang === "ur" ? "rtl" : "ltr"}
                  className={`max-w-3xl ${lang === "ur" ? "text-right text-xl sm:text-2xl leading-loose" : "text-lg sm:text-2xl leading-relaxed italic"} text-white/80`}
                  style={lang === "ur" ? { fontFamily: "'Scheherazade New', serif" } : undefined}
                >
                  {lang === "ur" ? ayah.ur : `"${ayah.en}"`}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* actions row */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            {/* language toggle */}
            <div className="relative inline-flex items-center p-0.5 border border-white/10 bg-white/2">
              {(["en", "ur"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`relative z-10 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.25em] transition-colors ${
                    lang === l ? "text-[#0a0a0a]" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {l === "en" ? "EN" : "اُردُو"}
                  {lang === l && (
                    <motion.span
                      layoutId="ayah-lang-pill"
                      className="absolute inset-0 -z-10 bg-amber-200"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <IconAction
                label={copied ? "Copied" : "Copy"}
                onClick={copy}
                active={copied}
                activeColor="emerald"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span key="ok" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Check className="h-3.5 w-3.5" />
                    </motion.span>
                  ) : (
                    <motion.span key="cp" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Copy className="h-3.5 w-3.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </IconAction>
              <IconAction
                label={liked ? "Loved" : "Love"}
                onClick={() => setLiked((v) => !v)}
                active={liked}
                activeColor="rose"
              >
                <motion.span
                  animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Heart className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`} />
                </motion.span>
              </IconAction>
              <IconAction
                label={bookmarked ? "Saved" : "Save"}
                onClick={() => setBookmarked((v) => !v)}
                active={bookmarked}
                activeColor="amber"
              >
                <motion.span
                  animate={bookmarked ? { rotate: [0, -12, 0], y: [0, -2, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${bookmarked ? "fill-current" : ""}`} />
                </motion.span>
              </IconAction>
              <IconAction label="Share">
                <Share2 className="h-3.5 w-3.5" />
              </IconAction>

              <div className="mx-1 h-6 w-px bg-white/10" />

              <motion.button
                onClick={next}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-2 px-4 py-2 border border-amber-200/40 text-amber-200/90 hover:bg-amber-200 hover:text-[#0a0a0a] transition-colors text-[10px] font-mono uppercase tracking-[0.25em]"
              >
                <RotateCcw className="h-3 w-3 transition-transform group-hover:-rotate-180 duration-500" />
                NEW VERSE
              </motion.button>
            </div>
          </div>

          {/* index dots */}
          <div className="mt-6 flex items-center gap-2">
            {SPOTLIGHT_AYAHS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Verse ${i + 1}`}
                className="group relative h-1 overflow-hidden"
                style={{ width: 28 }}
              >
                <span className="absolute inset-0 bg-white/10" />
                <motion.span
                  className="absolute inset-0 bg-amber-200 origin-left"
                  initial={false}
                  animate={{ scaleX: i === idx ? 1 : 0.0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </button>
            ))}
            <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
              {String(idx + 1).padStart(2, "0")} / {String(SPOTLIGHT_AYAHS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function IconAction({
  children,
  label,
  onClick,
  active = false,
  activeColor = "amber",
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  activeColor?: "amber" | "emerald" | "rose";
}) {
  const colorMap = {
    amber: "border-amber-200/60 text-amber-200 bg-amber-200/10",
    emerald: "border-emerald-300/60 text-emerald-300 bg-emerald-300/10",
    rose: "border-rose-300/60 text-rose-300 bg-rose-300/10",
  } as const;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.92 }}
      className={`group relative inline-flex items-center gap-1.5 px-3 py-2 border transition-colors text-[10px] font-mono uppercase tracking-[0.25em] ${
        active ? colorMap[activeColor] : "border-white/15 text-white/60 hover:text-white hover:border-white/40"
      }`}
      aria-label={label}
    >
      {children}
      <span className="hidden sm:inline">{label}</span>
    </motion.button>
  );
}
