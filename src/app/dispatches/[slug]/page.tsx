"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  FileText,
  ArrowLeft,
  Clock,
  Eye,
  Volume2,
  VolumeX,
  Share2,
  Check,
  Radio,
  MapPin,
  Sparkles,
  User as UserIcon,
  Flame,
  ThumbsUp,
  MessageSquare
} from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { FooterSection } from "@/components/landing/FooterSection";

type Dispatch = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  audioMemoUrl?: string;
  tags: string[];
  category: "EXPEDITION" | "FIELD_NOTES" | "TECH" | "REFLECTIONS" | "GUIDES";
  author?: {
    name?: string;
    image?: string;
    role?: string;
    bio?: string;
  };
  publishedAt?: string;
  createdAt: string;
  readTimeMinutes: number;
  telemetry?: {
    location?: string;
    coordinates?: string;
    weather?: string;
    elevation?: string;
  };
  viewsCount: number;
  likesCount: number;
  reactions?: {
    roger: number;
    acknowledged: number;
    copied: number;
  };
};

export default function DispatchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [dispatch, setDispatch] = useState<Dispatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);

  // Local state for interactive reactions
  const [reactions, setReactions] = useState({
    roger: 0,
    acknowledged: 0,
    copied: 0,
  });
  const [userReacted, setUserReacted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`/api/dispatches/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Dispatch not found");
        return r.json();
      })
      .then((data) => {
        setDispatch(data);
        if (data.reactions) {
          setReactions(data.reactions);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const toggleAudio = () => {
    if (!dispatch?.audioMemoUrl) return;

    if (!audioObj) {
      const audio = new Audio(dispatch.audioMemoUrl);
      audio.onended = () => setIsPlayingAudio(false);
      audio.play();
      setAudioObj(audio);
      setIsPlayingAudio(true);
    } else {
      if (isPlayingAudio) {
        audioObj.pause();
        setIsPlayingAudio(false);
      } else {
        audioObj.play();
        setIsPlayingAudio(true);
      }
    }
  };

  const handleReaction = async (type: "roger" | "acknowledged" | "copied") => {
    if (userReacted[type]) return;

    setUserReacted((prev) => ({ ...prev, [type]: true }));
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));

    try {
      await fetch(`/api/dispatches/${slug}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
    } catch (err) {
      console.error("Reaction failed:", err);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bone text-ink flex flex-col font-sans">
        <TopNav />
        <div className="flex-1 flex items-center justify-center mono-label text-signal gap-2">
          <Radio className="h-5 w-5 animate-blink" /> LOADING DISPATCH DATA...
        </div>
        <FooterSection />
      </div>
    );
  }

  if (error || !dispatch) {
    return (
      <div className="min-h-screen bg-bone text-ink flex flex-col font-sans">
        <TopNav />
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4 text-center">
          <div className="mono-label text-signal text-xl">404 // DISPATCH NOT FOUND</div>
          <p className="font-display italic text-ink/70">The tactical dispatch log you requested does not exist or has been archived.</p>
          <Link href="/dispatches" className="brick text-bone px-5 py-2.5 mono-label hover:bg-signal transition-colors">
            RETURN TO ALL DISPATCHES
          </Link>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone text-ink flex flex-col font-sans">
      <TopNav />

      {/* Top Breadcrumb & HUD Strip */}
      <section className="hairline-b border-ink bg-bone px-4 md:px-8 py-3 mono-label text-xs">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link href="/dispatches" className="flex items-center gap-2 hover:text-signal transition-colors">
            <ArrowLeft className="h-4 w-4" /> ALL DISPATCHES
          </Link>

          <div className="flex items-center gap-4 text-[11px] opacity-75">
            <span>LOC: {dispatch.telemetry?.location || "SRINAGAR / KMR"}</span>
            <span>COORD: {dispatch.telemetry?.coordinates || "34.0837°N"}</span>
            <span className="hidden sm:inline">ELEV: {dispatch.telemetry?.elevation || "1580M"}</span>
          </div>
        </div>
      </section>

      {/* Article Content Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 py-10 md:py-16 space-y-8">
        {/* Category & Tags Header */}
        <div className="flex items-center justify-between mono-label text-xs">
          <span className="brick text-bone px-3 py-1 text-xs">{dispatch.category}</span>
          <div className="flex items-center gap-3 opacity-60">
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {dispatch.readTimeMinutes} MIN READ</span>
            <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {dispatch.viewsCount} VIEWS</span>
          </div>
        </div>

        {/* Article Main Title */}
        <div className="space-y-4">
          <h1 className="display-num text-4xl sm:text-5xl md:text-6xl font-black text-ink uppercase leading-tight">
            {dispatch.title}
          </h1>

          <p className="font-display italic text-xl md:text-2xl text-ink/80 leading-relaxed border-l-2 border-signal pl-4">
            {dispatch.summary}
          </p>
        </div>

        {/* Author Badge & Audio Voice Memo Bar */}
        <div className="hairline border-ink bg-bone p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {dispatch.author?.image ? (
              <Image
                src={dispatch.author.image}
                alt={dispatch.author.name || "Author"}
                width={40}
                height={40}
                className="rounded-none hairline border-ink object-cover"
              />
            ) : (
              <div className="h-10 w-10 brick text-bone grid place-items-center mono-label text-xs">
                CMD
              </div>
            )}
            <div>
              <div className="font-display font-bold text-base leading-tight">
                {dispatch.author?.name || "Zuhaib Rashid"}
              </div>
              <div className="mono-label text-[10px] opacity-60">
                {dispatch.author?.role || "COMMANDER"} · {new Date(dispatch.publishedAt || dispatch.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
            </div>
          </div>

          {/* Audio Memo Action */}
          {dispatch.audioMemoUrl && (
            <button
              onClick={toggleAudio}
              className={`mono-label px-4 py-2 text-xs hairline border-ink transition-colors flex items-center gap-2 cursor-pointer ${
                isPlayingAudio ? "brick text-bone animate-pulse" : "bg-paper text-ink hover:bg-ink hover:text-bone"
              }`}
            >
              {isPlayingAudio ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-signal" />}
              {isPlayingAudio ? "PAUSE VOICE DISPATCH" : "LISTEN AUDIO DISPATCH"}
            </button>
          )}
        </div>

        {/* Cover Image */}
        {dispatch.coverImage && (
          <div className="relative aspect-16/9 bg-paper hairline border-ink crosshair overflow-hidden">
            <Image
              src={dispatch.coverImage}
              alt={dispatch.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover contrast-125"
            />
            <div className="absolute bottom-2 left-2 right-2 flex justify-between mono-label text-[10px] text-bone mix-blend-difference">
              <span>{dispatch.telemetry?.location || "KASHMIR FIELD MANUAL"}</span>
              <span>{dispatch.telemetry?.weather || "4°C"}</span>
            </div>
          </div>
        )}

        {/* Article Body Content */}
        <article className="prose max-w-none font-sans text-ink text-lg leading-relaxed space-y-6 pt-4 border-t border-ink/20">
          <div className="whitespace-pre-line">
            {dispatch.content}
          </div>
        </article>

        {/* Tags Row */}
        {dispatch.tags && dispatch.tags.length > 0 && (
          <div className="pt-6 hairline-t border-ink/30 flex items-center gap-2 flex-wrap mono-label text-xs">
            <span className="opacity-50">FILED UNDER:</span>
            {dispatch.tags.map((t) => (
              <span key={t} className="bg-paper hairline border-ink px-2.5 py-1 text-[11px]">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Tactical Reactions & Share Bar */}
        <section className="hairline border-ink bg-bone p-6 crosshair space-y-4">
          <div className="mono-label text-xs flex items-center justify-between">
            <span className="text-signal flex items-center gap-1.5 font-bold">
              <Radio className="h-3.5 w-3.5" /> REACTION PROTOCOL
            </span>
            <button
              onClick={handleShare}
              className="hover:text-signal transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-signal" /> : <Share2 className="h-3.5 w-3.5" />}
              {copied ? "LINK COPIED" : "SHARE DISPATCH"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleReaction("roger")}
              disabled={userReacted.roger}
              className={`p-3 hairline border-ink mono-label text-xs flex items-center justify-between transition-colors cursor-pointer ${
                userReacted.roger ? "brick text-bone" : "bg-paper hover:bg-ink hover:text-bone"
              }`}
            >
              <span>[ ROGER ]</span>
              <span className="font-mono">{reactions.roger}</span>
            </button>

            <button
              onClick={() => handleReaction("acknowledged")}
              disabled={userReacted.acknowledged}
              className={`p-3 hairline border-ink mono-label text-xs flex items-center justify-between transition-colors cursor-pointer ${
                userReacted.acknowledged ? "brick text-bone" : "bg-paper hover:bg-ink hover:text-bone"
              }`}
            >
              <span>[ ACKNOWLEDGED ]</span>
              <span className="font-mono">{reactions.acknowledged}</span>
            </button>

            <button
              onClick={() => handleReaction("copied")}
              disabled={userReacted.copied}
              className={`p-3 hairline border-ink mono-label text-xs flex items-center justify-between transition-colors cursor-pointer ${
                userReacted.copied ? "brick text-bone" : "bg-paper hover:bg-ink hover:text-bone"
              }`}
            >
              <span>[ DISPATCH COPIED ]</span>
              <span className="font-mono">{reactions.copied}</span>
            </button>
          </div>
        </section>

        {/* Back Link */}
        <div className="pt-4 text-center">
          <Link
            href="/dispatches"
            className="inline-flex items-center gap-2 brick px-6 py-3 mono-label text-bone hover:bg-signal transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> RETURN TO FIELD DISPATCHES
          </Link>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
