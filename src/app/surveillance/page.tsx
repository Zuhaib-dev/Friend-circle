"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Crosshair, Play, Pause, Download, SlidersHorizontal, X, Video as VideoIcon,
  Radar, Activity, Volume2, VolumeX, Maximize2,
} from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { Crosshairs } from "@/components/crosshairs";
import { VIDEO_ARCHIVE } from "@/data/video-archive";

type Feed = {
  id: string;
  src: string;
  poster?: string;
  title: string;
  uploader: string;
  date: number;
  sizeMB: number;
  durationSec: number;
  coord: string;
  sector: string;
};

function fmtDur(s: number) {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function timeAgo(ts: number, now: number) {
  const s = Math.max(1, Math.floor((now - ts) / 1000));
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

type SortKey = "LATEST" | "SIZE" | "DURATION";

export default function SurveillancePage() {
  const feeds = VIDEO_ARCHIVE;
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("LATEST");
  const [active, setActive] = useState<Feed | null>(null);
  const [now, setNow] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    let out = feeds.filter(
      (f) => !n || f.title.toLowerCase().includes(n) || f.uploader.toLowerCase().includes(n) || f.coord.toLowerCase().includes(n),
    );
    out = [...out].sort((a, b) => {
      if (sort === "LATEST") return b.date - a.date;
      if (sort === "SIZE") return b.sizeMB - a.sizeMB;
      return b.durationSec - a.durationSec;
    });
    return out;
  }, [feeds, q, sort]);

  const totalMB = filtered.reduce((s, f) => s + f.sizeMB, 0).toFixed(1);

  return (
    <main className="min-h-screen bg-bone text-ink relative">
      <TopNav />

      {/* Command bar */}
      <section className="hairline-b border-ink bg-bone sticky top-[44px] md:top-[48px] z-40">
        <div className="px-4 py-3 md:py-4">
          <div className="flex items-center gap-2 mb-3 mono-label">
            <span className="brick text-bone px-2 py-[2px]">FEEDS / 06</span>
            <span className="opacity-60">·</span>
            <span>SURVEILLANCE ARCHIVE</span>
            <span className="ml-auto hidden md:flex items-center gap-1.5 text-signal">
              <Activity className="h-3 w-3 animate-blink" /> LIVE UPLINK
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 md:gap-3">
            {/* Search */}
            <div className="hairline border-ink bg-bone flex items-center px-3 group focus-within:border-signal transition-colors">
              <Crosshair className="h-4 w-4 text-signal shrink-0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="QUERY · TITLE / OPERATOR / COORD…"
                className="w-full bg-transparent px-3 py-2.5 font-mono text-sm tracking-wider placeholder:text-ink/40 focus:outline-none"
              />
              {q && (
                <button onClick={() => setQ("")} className="mono-label opacity-60 hover:opacity-100 hover:text-signal">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="hairline border-ink flex items-stretch overflow-hidden">
              <span className="flex items-center gap-1.5 px-3 mono-label bg-ink text-bone shrink-0">
                <SlidersHorizontal className="h-3.5 w-3.5" /> SORT
              </span>
              {(["LATEST", "SIZE", "DURATION"] as SortKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setSort(k)}
                  className={`px-3 mono-label hairline-l border-ink transition-colors ${
                    sort === k ? "bg-signal text-bone" : "hover:bg-ink hover:text-bone"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Counter */}
            <div className="hairline border-ink px-3 py-2 flex items-center gap-3 mono-label shrink-0">
              <VideoIcon className="h-3.5 w-3.5 text-signal" />
              <span className="opacity-60 hidden md:inline">FEEDS</span>
              <span className="font-display text-lg leading-none">
                <motion.span
                  key={filtered.length}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  {String(filtered.length).padStart(3, "0")}
                </motion.span>
              </span>
              <span className="opacity-40">/</span>
              <span className="opacity-60">{totalMB}MB</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 py-6 md:py-8">
        {filtered.length === 0 ? (
          <EmptyState query={q} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((f, i) => (
                <FeedCard key={f.id} feed={f} index={i} now={now} mounted={mounted} onOpen={() => setActive(f)} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      <AnimatePresence>
        {active && <PlayerModal feed={active} onClose={() => setActive(null)} />}
      </AnimatePresence>

      <footer className="hairline-t border-ink px-4 py-3 mono-label text-[10px] flex items-center justify-between mt-auto">
        <span>FEEDS / SURVEILLANCE · v1.0</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" /> END OF UPLINK
        </span>
      </footer>
    </main>
  );
}

function FeedCard({
  feed, index, now, mounted, onOpen,
}: { feed: Feed; index: number; now: number; mounted: boolean; onOpen: () => void }) {
  // Use a hidden video to fetch duration metadata since we don't know it upfront for the legacy videos
  const [actualDuration, setActualDuration] = useState(feed.durationSec);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.4), ease: [0.2, 0.7, 0.2, 1] }}
      className="hairline border-ink bg-ink text-bone relative group cursor-pointer"
      onClick={onOpen}
    >
      {/* Hidden preloader strictly to fetch duration quickly without playing */}
      <video 
        src={feed.src} 
        preload="metadata" 
        className="hidden" 
        onLoadedMetadata={(e) => setActualDuration(e.currentTarget.duration)} 
      />

      <Crosshairs />

      {/* meta strip */}
      <header className="hairline-b border-bone/20 flex items-center justify-between px-2.5 py-1.5 mono-label">
        <span className="text-signal flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
          {feed.id}
        </span>
        <span className="opacity-60">{feed.sector}</span>
      </header>

      {/* feed window */}
      <div className="relative aspect-video overflow-hidden bg-black">
        {/* poster ghost */}
        {feed.poster && (
          <img
            src={feed.poster}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:opacity-50 transition-opacity duration-500"
          />
        )}
        {/* Animated Static / Scan effect if no poster */}
        {!feed.poster && (
          <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=')] animate-pulse" />
             <Activity className="h-8 w-8 text-signal opacity-20" />
          </div>
        )}

        {/* corner ticks */}
        <span className="absolute top-1 left-1 h-2 w-2 border-t border-l border-bone/70" />
        <span className="absolute top-1 right-1 h-2 w-2 border-t border-r border-bone/70" />
        <span className="absolute bottom-1 left-1 h-2 w-2 border-b border-l border-bone/70" />
        <span className="absolute bottom-1 right-1 h-2 w-2 border-b border-r border-bone/70" />

        {/* tactical overlay */}
        <div className="absolute top-2 left-2 right-2 flex items-start justify-between mono-label text-[9px] text-bone/80">
          <div className="bg-black/60 px-1.5 py-0.5 backdrop-blur-sm">
            COORD: {feed.coord}
          </div>
          <div className="bg-black/60 px-1.5 py-0.5 backdrop-blur-sm flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-signal animate-blink" /> REC
          </div>
        </div>

        {/* play button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          className="absolute inset-0 m-auto h-16 w-16 flex items-center justify-center hairline border-emerald-400 bg-emerald-400/10 text-emerald-300 backdrop-blur-sm shadow-[0_0_30px_rgba(52,211,153,0.35)] group-hover:shadow-[0_0_60px_rgba(52,211,153,0.7)] transition-shadow z-10"
          aria-label="play"
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
        >
          <Play className="h-7 w-7 fill-current" />
          <span className="absolute inset-0 hairline border-emerald-400/40 animate-ping" />
        </motion.button>

        {/* duration chip */}
        <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 mono-label text-[9px] text-bone/90 backdrop-blur-sm">
          {fmtDur(actualDuration)}
        </div>
        {/* size chip */}
        <div className="absolute bottom-2 left-2 bg-black/70 px-1.5 py-0.5 mono-label text-[9px] text-bone/90 backdrop-blur-sm">
          SIZE: {feed.sizeMB}MB
        </div>
      </div>

      {/* footer */}
      <footer className="hairline-t border-bone/20 px-2.5 py-1.5 flex items-center justify-between mono-label text-[10px]">
        <span className="truncate pr-2">{feed.title}</span>
        <span className="opacity-60 shrink-0">
          {feed.uploader} · {mounted ? timeAgo(feed.date, now) : "—"}
        </span>
      </footer>
    </motion.article>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="hairline border-ink bg-bone crosshair max-w-xl mx-auto p-8 md:p-12 text-center"
    >
      <Crosshairs />
      <div className="relative mx-auto h-24 w-24 mb-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Radar className="h-20 w-20 text-signal/70" strokeWidth={1} />
        </motion.div>
      </div>
      <p className="font-display text-2xl tracking-tight mb-2">NO FEEDS MATCH QUERY</p>
      <p className="mono-label opacity-60">QUERY · "{query || "—"}" · 0 FEEDS · ADJUST PARAMETERS</p>
    </motion.div>
  );
}

function PlayerModal({ feed, onClose }: { feed: Feed; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const toggle = () => {
    const v = videoRef.current; if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current; if (!v || !dur) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * dur;
  };

  const fullscreen = () => {
    const v = videoRef.current; if (!v) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else v.requestFullscreen?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="hairline border-bone/40 bg-black w-full max-w-6xl relative"
      >
        <header className="hairline-b border-bone/20 flex items-center justify-between px-3 py-2 mono-label text-bone">
          <span className="text-signal flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
            {feed.id} · LIVE PLAYBACK
          </span>
          <span className="opacity-70 hidden md:block truncate px-3">{feed.title}</span>
          <button onClick={onClose} className="hover:text-signal flex items-center gap-1.5 shrink-0">
            <X className="h-3.5 w-3.5" /> CLOSE
          </button>
        </header>

        <div className="relative bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={feed.src}
            poster={feed.poster}
            autoPlay
            muted={muted}
            onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="block w-full max-h-[75vh] object-contain bg-black"
          />
          {/* corner HUD */}
          <div className="absolute top-2 left-2 mono-label text-[10px] text-bone/80 bg-black/60 px-1.5 py-0.5">
            COORD {feed.coord}
          </div>
          <div className="absolute top-2 right-2 mono-label text-[10px] text-bone/80 bg-black/60 px-1.5 py-0.5">
            {feed.sector} · {feed.sizeMB}MB
          </div>
        </div>

        {/* controls */}
        <div className="bg-black text-bone hairline-t border-bone/20">
          <div
            className="h-1.5 bg-bone/10 cursor-pointer relative"
            onClick={seek}
          >
            <div
              className="h-full bg-signal"
              style={{ width: dur ? `${(progress / dur) * 100}%` : "0%" }}
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2 mono-label text-[10px]">
            <div className="flex items-center gap-2">
              <button onClick={toggle} className="hairline border-bone/40 px-2 py-1 hover:bg-signal hover:border-signal flex items-center gap-1.5 transition-colors">
                {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                {playing ? "PAUSE" : "PLAY"}
              </button>
              <button onClick={() => setMuted((m) => !m)} className="hairline border-bone/40 px-2 py-1 hover:bg-signal hover:border-signal flex items-center gap-1.5 transition-colors">
                {muted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                {muted ? "MUTED" : "AUDIO"}
              </button>
              <button onClick={fullscreen} className="hairline border-bone/40 px-2 py-1 hover:bg-signal hover:border-signal hidden md:flex items-center gap-1.5 transition-colors">
                <Maximize2 className="h-3 w-3" /> FULL
              </button>
              <span className="opacity-60 ml-2 hidden sm:block">
                {fmtDur(progress)} / {fmtDur(dur || feed.durationSec)}
              </span>
            </div>
            <a
              href={feed.src}
              target="_blank"
              rel="noopener"
              className="brick text-bone px-2.5 py-1 hover:bg-signal flex items-center gap-1.5 transition-colors"
            >
              <Download className="h-3 w-3" /> <span className="hidden sm:inline">DOWNLOAD INTEL</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
