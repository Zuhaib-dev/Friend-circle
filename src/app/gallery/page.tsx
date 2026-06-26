"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import {
  Search, Download, SlidersHorizontal, Image as ImageIcon,
  Radar, X, Activity, ChevronLeft, ChevronRight, Trash2,
} from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { Crosshairs } from "@/components/crosshairs";
import { useSession } from "next-auth/react";
import { ARCHIVE_FRAMES } from "@/data/archive";

/* ─── types ─────────────────────────────────────────────── */
type Frame = {
  id: string;
  rawId: string;
  src: string;
  uploader: string;
  caption: string;
  date: number;
  sizeMB: number;
  w: number;
  h: number;
};
type SortKey = "LATEST" | "OLDEST" | "SIZE";

/* ─── helpers ────────────────────────────────────────────── */
function timeAgo(ts: number, now: number) {
  const s = Math.max(1, Math.floor((now - ts) / 1000));
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

/** Returns true once a min-width media query matches. SSR-safe. */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

/* ─── skeleton card ──────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="mb-4 break-inside-avoid hairline border-ink bg-bone animate-pulse">
      <div className="hairline-b border-ink/30 px-2.5 py-1.5 flex justify-between">
        <div className="h-2.5 w-20 bg-ink/10 rounded" />
        <div className="h-2.5 w-12 bg-ink/10 rounded" />
      </div>
      <div className="bg-ink/5 w-full" style={{ paddingBottom: "75%" }} />
      <div className="hairline-t border-ink/30 grid grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`px-2.5 py-2 flex flex-col gap-1 ${i < 2 ? "hairline-r border-ink/20" : ""}`}>
            <div className="h-2 w-10 bg-ink/10 rounded" />
            <div className="h-2 w-14 bg-ink/10 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────── */
export default function GalleryPage() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "ADMIN";
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Responsive page size: 10 mobile / 20 desktop
  const PAGE_SIZE = isDesktop ? 20 : 10;

  const [frames, setFrames] = useState<Frame[]>([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("LATEST");
  const [active, setActive] = useState<Frame | null>(null);
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const triggerRef = useRef<HTMLDivElement>(null);

  const archiveFrames: Frame[] = useMemo(
    () =>
      ARCHIVE_FRAMES.map((f) => ({
        id: f.id,
        rawId: f.id,
        src: f.src,
        uploader: f.uploader,
        caption: f.caption,
        date: new Date("2024-01-01").getTime(),
        sizeMB: 0.8,
        w: 800,
        h: 600,
      })),
    []
  );

  // Timestamps
  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  // Fetch posts
  useEffect(() => {
    const fetchIntel = async () => {
      try {
        const res = await fetch("/api/posts");
        if (res.ok) {
          const data = await res.json();
          const imagePosts = data.filter((post: any) => post.imageUrl);
          setFrames(
            imagePosts.map((post: any) => ({
              id: `INTEL-${post._id.slice(-5).toUpperCase()}`,
              rawId: post._id,
              src: post.imageUrl,
              uploader: post.author?.name?.split(" ")[0].toUpperCase() || "UNKNOWN",
              caption: post.caption || "NO CAPTION PROVIDED",
              date: new Date(post.createdAt).getTime(),
              sizeMB: 1.2,
              w: 800,
              h: 600,
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIntel();
  }, []);

  // Reset page when query, sort, or page-size changes
  useEffect(() => {
    setPage(1);
  }, [q, sort, PAGE_SIZE]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setPage((p) => p + 1);
      },
      { rootMargin: "500px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading]);

  const allFrames = useMemo(() => [...frames, ...archiveFrames], [frames, archiveFrames]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = allFrames.filter(
      (f) =>
        !needle ||
        f.uploader.toLowerCase().includes(needle) ||
        f.caption.toLowerCase().includes(needle)
    );
    out = [...out].sort((a, b) => {
      if (sort === "LATEST") return b.date - a.date;
      if (sort === "OLDEST") return a.date - b.date;
      return b.sizeMB - a.sizeMB;
    });
    return out;
  }, [allFrames, q, sort]);

  const visibleFrames = useMemo(
    () => filtered.slice(0, page * PAGE_SIZE),
    [filtered, page, PAGE_SIZE]
  );

  const hasMore = visibleFrames.length < filtered.length;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = Math.min(page, totalPages);
  const totalMB = filtered.reduce((s, f) => s + f.sizeMB, 0).toFixed(2);

  const handleDelete = useCallback(
    async (rawId: string) => {
      if (!window.confirm("Permanently delete this intel?")) return;
      try {
        const res = await fetch("/api/admin/posts", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId: rawId }),
        });
        if (res.ok) {
          setFrames((f) => f.filter((x) => x.rawId !== rawId));
          if (active?.rawId === rawId) setActive(null);
        } else {
          alert("Failed to delete. Make sure you are an Admin.");
        }
      } catch (e) {
        console.error(e);
        alert("Error deleting frame.");
      }
    },
    [active]
  );

  return (
    <main className="min-h-screen bg-bone text-ink relative">
      <TopNav />

      {/* ── Command bar ─────────────────────────────────────── */}
      <section className="hairline-b border-ink bg-bone sticky top-[44px] md:top-[48px] z-40">
        <div className="px-4 py-3 md:py-4">
          <div className="flex items-center gap-2 mb-3 mono-label">
            <span className="brick text-bone px-2 py-[2px]">INTEL / 04</span>
            <span className="opacity-60">·</span>
            <span>MEDIA GALLERY</span>
            {!loading && (
              <span className="ml-auto mono-label opacity-50 hidden md:block">
                PG {currentPage}/{totalPages || "—"} · {visibleFrames.length}/{filtered.length} FRAMES
              </span>
            )}
            <span className={`${!loading ? "ml-2 md:ml-0" : "ml-auto"} hidden md:flex items-center gap-1.5 text-signal`}>
              <Activity className="h-3 w-3 animate-blink" /> ARCHIVE LIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 md:gap-3">
            {/* Search */}
            <div className="hairline border-ink bg-bone flex items-center px-3 group focus-within:border-signal transition-colors">
              <Search className="h-4 w-4 text-signal shrink-0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="QUERY · UPLOADER OR CAPTION…"
                className="w-full bg-transparent px-3 py-2.5 font-mono text-sm tracking-wider placeholder:text-ink/40 focus:outline-none"
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  className="mono-label opacity-60 hover:opacity-100 hover:text-signal"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="hairline border-ink flex items-stretch overflow-hidden">
              <span className="flex items-center gap-1.5 px-3 mono-label bg-ink text-bone shrink-0">
                <SlidersHorizontal className="h-3.5 w-3.5" /> SORT
              </span>
              {(["LATEST", "OLDEST", "SIZE"] as SortKey[]).map((k) => (
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
              <ImageIcon className="h-3.5 w-3.5 text-signal" />
              <span className="opacity-60 hidden md:inline">FRAMES</span>
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

      {/* ── Grid ────────────────────────────────────────────── */}
      <section className="px-4 py-6 md:py-8">
        {loading ? (
          /* Skeleton grid — fixed count so server & client HTML match */
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:balance]">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState query={q} />
        ) : (
          <>
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:balance]">
              <AnimatePresence mode="popLayout">
                {visibleFrames.map((f, i) => (
                  <FrameCard
                    key={f.id}
                    frame={f}
                    index={i % PAGE_SIZE}
                    now={now}
                    mounted={mounted}
                    priority={i < 4} // first 4 are above-the-fold → eager
                    onOpen={() => setActive(f)}
                    isAdmin={isAdmin && f.uploader !== "ARCHIVE"}
                    onDelete={() => handleDelete(f.rawId)}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Infinite scroll sentinel + loading spinner */}
            {hasMore && (
              <div
                ref={triggerRef}
                className="py-12 flex flex-col items-center justify-center gap-3 mono-label opacity-50"
              >
                <Activity className="h-5 w-5 text-signal animate-pulse" />
                <span>LOADING MORE · {visibleFrames.length}/{filtered.length}</span>
              </div>
            )}

            {/* End of archive */}
            {!hasMore && filtered.length > 0 && (
              <div className="py-10 flex items-center justify-center mono-label opacity-40 gap-3">
                <span className="h-px flex-1 max-w-[120px] bg-ink/30" />
                END OF ARCHIVE · {filtered.length} FRAMES
                <span className="h-px flex-1 max-w-[120px] bg-ink/30" />
              </div>
            )}
          </>
        )}
      </section>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      <AnimatePresence>
        {active && (
          <Lightbox
            frame={active}
            frames={filtered}
            onClose={() => setActive(null)}
            onNavigate={setActive}
            now={now}
            mounted={mounted}
            isAdmin={isAdmin}
            onDelete={() => handleDelete(active.rawId)}
          />
        )}
      </AnimatePresence>

      <footer className="hairline-t border-ink px-4 py-3 mono-label text-[10px] flex items-center justify-between mt-auto">
        <span>INTEL / GALLERY · v2.0</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" /> END OF ARCHIVE
        </span>
      </footer>
    </main>
  );
}

/* ─── FrameCard ─────────────────────────────────────────── */
function FrameCard({
  frame,
  index,
  now,
  mounted,
  priority,
  onOpen,
  isAdmin,
  onDelete,
}: {
  frame: Frame;
  index: number;
  now: number;
  mounted: boolean;
  priority: boolean;
  onOpen: () => void;
  isAdmin: boolean;
  onDelete: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3), ease: [0.2, 0.7, 0.2, 1] }}
      className="mb-4 break-inside-avoid hairline border-ink bg-bone relative group"
    >
      <Crosshairs />

      {/* meta strip top */}
      <header className="hairline-b border-ink flex items-center justify-between px-2.5 py-1.5 mono-label">
        <span className="text-signal truncate pr-2">{frame.id}</span>
        <span className="opacity-60 truncate">{frame.uploader}</span>
      </header>

      {/* image */}
      <div className="relative overflow-hidden">
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src={frame.src}
            alt={frame.caption}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="block w-full h-auto transition-[filter,opacity] duration-500 ease-out"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
        </motion.div>

        {/* scan line */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-signal/80 translate-y-0 group-hover:translate-y-full transition-transform duration-1400 ease-linear" />

        {/* corner ticks */}
        <span className="absolute top-1 left-1 h-2 w-2 border-t border-l border-bone/80" />
        <span className="absolute top-1 right-1 h-2 w-2 border-t border-r border-bone/80" />
        <span className="absolute bottom-1 left-1 h-2 w-2 border-b border-l border-bone/80" />
        <span className="absolute bottom-1 right-1 h-2 w-2 border-b border-r border-bone/80" />

        {/* caption */}
        <div className="absolute left-2 right-2 bottom-2 bg-ink/85 text-bone px-2.5 py-1.5 mono-label backdrop-blur-sm flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink shrink-0" />
          <span className="truncate">{frame.caption}</span>
        </div>

        {/* download reveal */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(frame.src, "_blank", "noopener");
          }}
          className="absolute top-2 right-2 brick text-bone mono-label px-2.5 py-1.5 flex items-center gap-1.5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10"
        >
          <Download className="h-3 w-3 shrink-0" /> DL
        </motion.button>

        {/* open overlay */}
        <button
          onClick={onOpen}
          aria-label="open frame"
          className="absolute inset-0 cursor-zoom-in focus:outline-none"
        />

        {/* admin delete */}
        {isAdmin && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-2 left-2 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white mono-label p-1.5 flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10"
          >
            <Trash2 className="h-3.5 w-3.5 shrink-0" />
          </motion.button>
        )}
      </div>

      {/* bottom data strip */}
      <footer className="hairline-t border-ink grid grid-cols-3 mono-label text-[10px]">
        <DataCell label="UPLOADER" value={frame.uploader} />
        <DataCell label="DATE" value={mounted ? timeAgo(frame.date, now) + " AGO" : "—"} />
        <DataCell label="SIZE" value={`${frame.sizeMB}MB`} last />
      </footer>
    </motion.article>
  );
}

/* ─── DataCell ──────────────────────────────────────────── */
function DataCell({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`px-2.5 py-1.5 flex flex-col gap-0.5 ${last ? "" : "hairline-r border-ink"} overflow-hidden`}>
      <span className="opacity-50 truncate">{label}</span>
      <span className="text-ink truncate">{value}</span>
    </div>
  );
}

/* ─── EmptyState ────────────────────────────────────────── */
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
        <span className="absolute inset-0 hairline border-ink/30 rounded-full" />
      </div>
      <p className="font-display text-2xl tracking-tight mb-2">NO INTEL MATCHES QUERY</p>
      <p className="mono-label opacity-60">
        QUERY · &quot;{query || "—"}&quot; · RETURNED 0 FRAMES · ADJUST PARAMETERS
      </p>
      <div className="mt-5 inline-flex items-center gap-2 mono-label brick text-bone px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" /> AWAITING NEW INPUT
      </div>
    </motion.div>
  );
}

/* ─── Lightbox ──────────────────────────────────────────── */
function Lightbox({
  frame,
  frames,
  onClose,
  onNavigate,
  now,
  mounted,
  isAdmin,
  onDelete,
}: {
  frame: Frame;
  frames: Frame[];
  onClose: () => void;
  onNavigate: (f: Frame) => void;
  now: number;
  mounted: boolean;
  isAdmin: boolean;
  onDelete: () => void;
}) {
  const idx = frames.findIndex((f) => f.id === frame.id);
  const hasPrev = idx > 0;
  const hasNext = idx < frames.length - 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(frames[idx - 1]);
      if (e.key === "ArrowRight" && hasNext) onNavigate(frames[idx + 1]);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onNavigate, frames, idx, hasPrev, hasNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 bg-ink/90 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
      onClick={onClose}
    >
      <motion.div
        key={frame.id}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="hairline border-bone bg-bone max-w-5xl w-full max-h-[92vh] overflow-hidden relative flex flex-col"
      >
        {/* header */}
        <header className="hairline-b border-ink flex shrink-0 items-center justify-between px-3 py-2 mono-label">
          <span className="text-signal">{frame.id}</span>
          <span className="opacity-70 truncate px-3 hidden md:block">{frame.caption}</span>
          <div className="flex items-center gap-3 shrink-0">
            <span className="opacity-50">{idx + 1}/{frames.length}</span>
            <button onClick={onClose} className="hover:text-signal flex items-center gap-1.5">
              <X className="h-3.5 w-3.5" /> CLOSE
            </button>
          </div>
        </header>

        {/* image */}
        <div className="bg-ink flex-1 flex items-center justify-center min-h-0 overflow-hidden relative">
          <Image
            src={frame.src}
            alt={frame.caption}
            width={1200}
            height={900}
            priority
            className="max-w-full max-h-[70vh] object-contain"
          />

          {/* prev/next arrows */}
          {hasPrev && (
            <button
              onClick={() => onNavigate(frames[idx - 1])}
              className="absolute left-2 top-1/2 -translate-y-1/2 brick text-bone p-2 hover:bg-signal transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {hasNext && (
            <button
              onClick={() => onNavigate(frames[idx + 1])}
              className="absolute right-2 top-1/2 -translate-y-1/2 brick text-bone p-2 hover:bg-signal transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* footer */}
        <footer className="hairline-t border-ink grid grid-cols-2 md:grid-cols-4 mono-label text-[10px] shrink-0">
          <DataCell label="UPLOADER" value={frame.uploader} />
          <DataCell label="DATE" value={mounted ? timeAgo(frame.date, now) + " AGO" : "—"} />
          <DataCell label="SIZE" value={`${frame.sizeMB}MB`} />
          <div className="flex items-stretch justify-end">
            {isAdmin && (
              <button
                onClick={onDelete}
                className="px-3 py-1.5 flex items-center justify-center gap-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                <Trash2 className="h-3 w-3" /> PURGE
              </button>
            )}
            <a
              href={frame.src}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 flex-1 flex items-center justify-center gap-1.5 brick text-bone hover:bg-signal transition-colors"
            >
              <Download className="h-3 w-3" /> DOWNLOAD INTEL
            </a>
          </div>
        </footer>
      </motion.div>
    </motion.div>
  );
}
