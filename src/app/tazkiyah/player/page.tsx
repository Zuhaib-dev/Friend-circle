"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  ArrowRight, ChevronDown, Heart, MoreHorizontal, Pause, Play,
  Repeat2, SkipBack, SkipForward, Volume2, VolumeX, Settings2, Check
} from "lucide-react";
import { SURAHS, Surah, RECITERS } from "@/data/quran-data";
import { useReaderPrefs } from "@/hooks/useReaderPrefs";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PlayerPage() {
  const [currentSurah, setCurrentSurah] = useState<Surah>(SURAHS[0]);
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { prefs, setPrefs } = useReaderPrefs();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const initialTimeRef = useRef<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("tazkiyah_player_state");
    if (saved) {
      try {
        const { surahNumber, time } = JSON.parse(saved);
        const s = SURAHS.find(x => x.number === surahNumber);
        if (s) {
          setCurrentSurah(s);
          if (time > 0) initialTimeRef.current = time;
        }
      } catch {}
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    // Debounce the save to prevent excessive writes and ensure state has fully updated
    const timeout = setTimeout(() => {
      localStorage.setItem("tazkiyah_player_state", JSON.stringify({
        surahNumber: currentSurah.number,
        time: currentTime
      }));
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, [currentSurah.number, currentTime, isLoaded]);

  const audioSrc = `https://cdn.islamic.network/quran/audio-surah/128/${prefs.reciter}/${currentSurah.number}.mp3`;

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(() => setPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing, currentSurah, prefs.reciter]);

  const togglePlay = () => setPlaying(!playing);

  const nextSurah = () => {
    const idx = SURAHS.findIndex(s => s.number === currentSurah.number);
    if (idx < SURAHS.length - 1) {
      setCurrentSurah(SURAHS[idx + 1]);
      setPlaying(true);
    }
  };

  const prevSurah = () => {
    const idx = SURAHS.findIndex(s => s.number === currentSurah.number);
    if (idx > 0) {
      setCurrentSurah(SURAHS[idx - 1]);
      setPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "00:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          setPlaying(p => !p);
          break;
        case "ArrowRight":
          e.preventDefault();
          if (audioRef.current) audioRef.current.currentTime = Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + 10);
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
          break;
        case "m":
        case "M":
          setIsMuted(m => !m);
          break;
        case "n":
        case "N":
          nextSurah();
          break;
        case "p":
        case "P":
        case "b":
        case "B":
          prevSurah();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSurah.number]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col overflow-x-hidden relative">
      {/* Dynamic Overlay when playing */}
      <motion.div
        animate={{ opacity: playing ? 0.7 : 0, backdropFilter: playing ? "blur(8px)" : "blur(0px)" }}
        className="pointer-events-none fixed inset-0 z-0 bg-[#0a0a0a]/40"
        transition={{ duration: 1.5 }}
      />
      {/* Ambient backgrounds */}
      <motion.div className="pointer-events-none fixed inset-0 z-0 opacity-40"
        animate={{ 
          background: playing 
            ? 'radial-gradient(circle at 50% 50%, rgba(16,185,129,.15), transparent 60%), radial-gradient(circle at 8% 78%, rgba(252,211,77,.05), transparent 28%)' 
            : 'radial-gradient(circle at 80% 12%, rgba(110,231,183,.15), transparent 32%), radial-gradient(circle at 8% 78%, rgba(252,211,77,.08), transparent 28%)' 
        }}
        transition={{ duration: 2 }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[18px_18px] opacity-20 z-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-370 flex-col px-5 py-5 sm:px-8 lg:px-12 flex-1">
        <motion.header initial={{ opacity: 0, y: -18 }} animate={{ opacity: playing ? 0.3 : 1, y: 0 }} transition={{ duration: .7, ease }} className="flex items-center justify-between border-b border-white/10 pb-5 hover:opacity-100 transition-opacity">
           <Link href="/tazkiyah" className="flex items-center gap-3 group text-zinc-300 hover:text-emerald-200 transition">
             <div>
               <p className="text-lg font-semibold tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>Friend Circle</p>
               <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-emerald-300/70">Tazkiyah Player</p>
             </div>
           </Link>
           <div className="relative">
             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSettingsOpen(!settingsOpen)} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:bg-white/10">
               <Settings2 size={16} /> Preferences
             </motion.button>
             <AnimatePresence>
               {settingsOpen && (
                 <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} className="absolute right-0 top-full mt-2 w-64 origin-top-right rounded-2xl border border-white/10 bg-[#0c0c0c]/95 p-4 shadow-2xl backdrop-blur-xl z-50">
                   <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
                     <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">Reciter</span>
                   </div>
                   <div className="space-y-1">
                     {RECITERS.map((r) => (
                       <button key={r.id} onClick={() => { setPrefs({ ...prefs, reciter: r.id }); setSettingsOpen(false); }} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[11px] transition ${prefs.reciter === r.id ? "bg-emerald-300/15 text-emerald-200" : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"}`}>
                         <span className="truncate">{r.name}</span>
                         {prefs.reciter === r.id && <Check className="size-3.5 shrink-0" />}
                       </button>
                     ))}
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
        </motion.header>

        <section id="listen" className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:py-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -28 }} 
            animate={{ opacity: playing ? 0.25 : 1, x: 0, filter: playing ? "blur(4px)" : "blur(0px)" }} 
            transition={{ duration: 1, delay: .15, ease }} 
            className="order-2 lg:order-1 transition-all hover:opacity-100! hover:filter-none!"
          >
            <div className="mb-10 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-emerald-300/60">
              <span className="h-px w-8 bg-emerald-300/40" />Today's reflection
            </div>
            <h1 className="max-w-2xl text-5xl leading-[1.03] tracking-tight text-zinc-50 sm:text-7xl" style={{ fontFamily: "'Fraunces', serif" }}>
              A quiet moment<br /><em className="font-light italic text-emerald-200/80">for the heart.</em>
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-zinc-400">
              Take a pause, breathe deeply, and let the words of the Qur'an bring you back to what matters.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <motion.button whileHover={{ y: -3, boxShadow: '0 12px 24px -12px rgba(110,231,183,.4)' }} whileTap={{ scale: .97 }} onClick={togglePlay} className="inline-flex items-center gap-2 rounded-full bg-emerald-400/90 hover:bg-emerald-400 px-5 py-3 text-sm font-medium text-[#0a0a0a] transition">
                {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />} {playing ? 'Pause recitation' : 'Begin listening'}
              </motion.button>
              <motion.button whileHover={{ y: -3 }} whileTap={{ scale: .97 }} onClick={() => setLiked(!liked)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white">
                <motion.span animate={liked ? { scale: [1, 1.35, 1] } : {}}><Heart size={16} fill={liked ? 'currentColor' : 'none'} className={liked ? 'text-emerald-400' : ''} /></motion.span>{liked ? 'Saved to library' : 'Save for later'}
              </motion.button>
            </div>
            <div className="mt-16 flex items-center gap-4 text-xs text-zinc-500">
              <div className="flex -space-x-2">
                <span className="grid size-7 place-items-center rounded-full border-2 border-[#0a0a0a] bg-amber-600/80 text-[10px] text-white">A</span>
                <span className="grid size-7 place-items-center rounded-full border-2 border-[#0a0a0a] bg-emerald-700/80 text-[10px] text-white">M</span>
                <span className="grid size-7 place-items-center rounded-full border-2 border-[#0a0a0a] bg-blue-700/80 text-[10px] text-white">S</span>
              </div>
              <span>1,248 people are listening today</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: .92, y: 20 }} 
            animate={{ opacity: 1, scale: playing ? 1.03 : 1, y: 0 }} 
            transition={{ duration: 1.2, delay: .25, ease }} 
            className="order-1 lg:order-2 z-20"
          >
            <motion.div 
              animate={{ 
                boxShadow: playing 
                  ? "0 30px 90px -15px rgba(16,185,129,0.3)" 
                  : "0 25px 70px -30px rgba(0,0,0,0.5)" 
              }}
              transition={{ duration: 2, repeat: playing ? Infinity : 0, repeatType: "reverse" }}
              className="relative mx-auto max-w-127.5 overflow-hidden rounded-[28px] bg-white/5 border border-white/10 p-3"
            >
              <motion.div 
                animate={{ y: playing ? [0, -5, 0] : 0, backgroundColor: playing ? "rgba(6,78,59,0.5)" : "rgba(6,78,59,0.3)" }} 
                transition={{ duration: 4, repeat: playing ? Infinity : 0, ease: 'easeInOut' }} 
                className="relative aspect-[1.1] overflow-hidden rounded-[20px] p-8 text-emerald-50 sm:p-12 border border-white/5"
              >
                <motion.div 
                  animate={{ rotate: playing ? 360 : 0, scale: playing ? [1, 1.1, 1] : 1, opacity: playing ? 0.35 : 0.2 }} 
                  transition={{ rotate: { duration: 35, repeat: playing ? Infinity : 0, ease: 'linear' }, scale: { duration: 8, repeat: playing ? Infinity : 0, ease: 'easeInOut' } }} 
                  className="absolute -right-20 -top-24 size-72 rounded-full border border-emerald-300" 
                />
                <motion.div 
                  animate={{ rotate: playing ? -360 : 0, scale: playing ? [1, 1.2, 1] : 1, opacity: playing ? 0.3 : 0.2 }} 
                  transition={{ rotate: { duration: 45, repeat: playing ? Infinity : 0, ease: 'linear' }, scale: { duration: 10, repeat: playing ? Infinity : 0, ease: 'easeInOut' } }} 
                  className="absolute -bottom-32 -left-20 size-80 rounded-full border border-emerald-300" 
                />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xs uppercase tracking-[0.25em] text-emerald-200/70">Qur'an recitation</span>
                    <span className="rounded-full border border-emerald-300/30 px-3 py-1 text-[10px] uppercase tracking-wider">{currentSurah.number.toString().padStart(2, '0')} / 114</span>
                  </div>
                  <div>
                    <AnimatePresence mode="wait">
                      <motion.p key={currentSurah.number} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-3 text-right text-4xl sm:text-5xl leading-relaxed tracking-tight text-white/95" style={{ fontFamily: "'Scheherazade New', serif" }}>
                        {currentSurah.arabic}
                      </motion.p>
                    </AnimatePresence>
                    <div className="h-px w-16 bg-emerald-300/50" />
                    <p className="mt-4 text-xs uppercase tracking-[0.28em] text-emerald-200/75">{currentSurah.meaning}</p>
                  </div>
                </div>
              </motion.div>

              <div className="px-3 pb-2 pt-5 sm:px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-semibold text-zinc-100" style={{ fontFamily: "'Fraunces', serif" }}>{currentSurah.name}</p>
                    <p className="mt-1 text-sm text-zinc-400">{RECITERS.find(r => r.id === prefs.reciter)?.name}</p>
                  </div>
                  <button aria-label="More options" className="text-zinc-500 transition hover:text-emerald-300"><MoreHorizontal size={20} /></button>
                </div>
                <div className="mt-6">
                  <div 
                    className="relative h-1 rounded-full bg-white/10 cursor-pointer group"
                    onClick={(e) => {
                      if (!audioRef.current || !duration) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      audioRef.current.currentTime = pos * duration;
                    }}
                  >
                    <motion.div style={{ width: `${progressPercent}%` }} className="absolute left-0 top-0 h-1 rounded-full bg-emerald-400" />
                    <motion.span style={{ left: `${progressPercent}%` }} className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-[#0a0a0a] bg-emerald-400 shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] text-zinc-500 tabular-nums">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between pb-2">
                  <button onClick={() => setIsRepeat(!isRepeat)} aria-label="Repeat" className={`transition ${isRepeat ? 'text-emerald-400' : 'text-zinc-500 hover:text-emerald-300'}`}><Repeat2 size={17} /></button>
                  <button onClick={prevSurah} aria-label="Previous" className="text-zinc-400 hover:text-zinc-200 transition"><SkipBack size={20} fill="currentColor" /></button>
                  <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: .92 }} aria-label={playing ? 'Pause' : 'Play'} onClick={togglePlay} className="grid size-12 place-items-center rounded-full bg-emerald-400 text-[#0a0a0a] shadow-md transition">
                    {playing ? <Pause size={19} fill="currentColor" /> : <Play className="ml-0.5" size={19} fill="currentColor" />}
                  </motion.button>
                  <button onClick={nextSurah} aria-label="Next" className="text-zinc-400 hover:text-zinc-200 transition"><SkipForward size={20} fill="currentColor" /></button>
                  <button onClick={() => setIsMuted(!isMuted)} aria-label="Volume" className={`transition ${isMuted ? 'text-emerald-400' : 'text-zinc-500 hover:text-emerald-300'}`}>
                    {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <motion.section 
          id="library" 
          initial={{ opacity: 0, y: 24 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          animate={{ opacity: playing ? 0.3 : 1, filter: playing ? "blur(3px)" : "blur(0px)" }}
          viewport={{ once: true, margin: '-80px' }} 
          transition={{ duration: 1, ease }} 
          className="border-t border-white/10 py-8 mt-12 transition-all hover:opacity-100! hover:filter-none! z-10 relative"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-300/60">Your listening list</p>
              <h2 className="mt-2 text-2xl text-zinc-100" style={{ fontFamily: "'Fraunces', serif" }}>Continue your journey</h2>
            </div>
            <button className="hidden items-center gap-1 text-sm text-emerald-400 sm:flex transition hover:text-emerald-300">View all <ArrowRight size={15} /></button>
          </div>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 max-h-90 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10">
            {SURAHS.map((chapter) => (
              <motion.button whileHover={{ y: -3 }} whileTap={{ scale: .98 }} key={chapter.number} onClick={() => { setCurrentSurah(chapter); setPlaying(true); }} className={`group flex items-center gap-3 rounded-xl p-3 text-left transition ${currentSurah.number === chapter.number ? 'bg-white/10 shadow-sm border border-white/5' : 'hover:bg-white/5 border border-transparent'}`}>
                <span className={`font-mono text-xs ${currentSurah.number === chapter.number ? 'text-emerald-400' : 'text-zinc-500'}`}>{chapter.number.toString().padStart(2, '0')}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-zinc-200">{chapter.name}</span>
                  <span className="mt-0.5 block truncate text-xs text-zinc-500">{chapter.meaning}</span>
                </span>
                <span className="text-xs text-zinc-600">{chapter.ayats}</span>
                {currentSurah.number === chapter.number && <ChevronDown className="-rotate-90 text-emerald-400" size={15} />}
              </motion.button>
            ))}
          </div>
        </motion.section>
      </div>

      <audio
        ref={audioRef}
        src={audioSrc}
        muted={isMuted}
        loop={isRepeat}
        onEnded={nextSurah}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => {
          setDuration(audioRef.current?.duration || 0);
          if (initialTimeRef.current > 0 && audioRef.current) {
            audioRef.current.currentTime = initialTimeRef.current;
            initialTimeRef.current = 0;
          }
        }}
      />
    </div>
  );
}
