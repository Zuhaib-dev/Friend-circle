"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  Clock,
  Eye,
  Volume2,
  VolumeX,
  Share2,
  Check,
  Radio,
  ExternalLink,
  MessageSquare,
  Send,
  Trash2,
  User as UserIcon,
  Lock,
  Loader2,
  AlertTriangle,
  Mic,
} from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { FooterSection } from "@/components/landing/FooterSection";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

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
    socialHandle?: string;
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

type CommentItem = {
  _id: string;
  text: string;
  createdAt: string;
  author: {
    _id: string;
    name?: string;
    image?: string;
    role?: string;
    teamMemberStatus?: string;
    bio?: string;
  };
};

export function DispatchDetailClient({
  initialDispatch,
}: {
  initialDispatch: Dispatch | null;
}) {
  const { data: session } = useSession();
  const [dispatch] = useState<Dispatch | null>(initialDispatch);
  const loading = false;
  const error = initialDispatch ? "" : "Dispatch not found";
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);

  // Reaction State
  const [reactions, setReactions] = useState({
    roger: initialDispatch?.reactions?.roger || 0,
    acknowledged: initialDispatch?.reactions?.acknowledged || 0,
    copied: initialDispatch?.reactions?.copied || 0,
  });
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [reactionError, setReactionError] = useState("");
  const [isReacting, setIsReacting] = useState(false);

  // Comment State
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [newCommentText, setNewCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  // TTS Voice Narrator State
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isPausedTTS, setIsPausedTTS] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>("");

  // Load available system voices on mount
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const enVoices = voices.filter((v) => v.lang.startsWith("en"));
      setAvailableVoices(enVoices.length > 0 ? enVoices : voices);

      // Pick best natural voice by default
      const best =
        enVoices.find(
          (v) =>
            v.name.includes("Online (Natural)") ||
            v.name.includes("Natural") ||
            v.name.includes("Google") ||
            v.name.includes("Enhanced") ||
            v.name.includes("Premium") ||
            v.name.includes("Samantha") ||
            v.name.includes("Alex") ||
            v.name.includes("Daniel")
        ) || enVoices[0];

      if (best && !selectedVoiceURI) {
        setSelectedVoiceURI(best.voiceURI);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }, [selectedVoiceURI]);

  // Fetch reactions and user reaction choice on mount
  useEffect(() => {
    if (!dispatch?.slug) return;

    fetch(`/api/dispatches/${dispatch.slug}/react`)
      .then((res) => res.json())
      .then((data) => {
        if (data.reactions) setReactions(data.reactions);
        if (data.userReaction) setUserReaction(data.userReaction);
      })
      .catch(() => {});
  }, [dispatch?.slug]);

  // Fetch comments on mount
  useEffect(() => {
    if (!dispatch?.slug) return;

    setLoadingComments(true);
    fetch(`/api/dispatches/${dispatch.slug}/comments`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setComments(data);
      })
      .catch(() => {})
      .finally(() => setLoadingComments(false));
  }, [dispatch?.slug]);

  // Clean and humanize Markdown for natural speech reading
  const getHumanizedText = (markdown: string, title: string, summary: string) => {
    const cleanBody = (markdown || "")
      .replace(/#{1,6}\s+/g, ". ") // headings to pauses
      .replace(/\*{1,3}/g, "") // remove formatting symbols
      .replace(/`{1,3}[^`]*`{1,3}/g, "") // remove code
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // remove links
      .replace(/>\s+/g, "Quote: ") // pronounce blockquotes nicely
      .replace(/- \[[ x]\]\s+/g, "") // remove checkboxes
      .replace(/[-*]\s+/g, "") // remove bullets
      .replace(/KM\/H/gi, "kilometers per hour")
      .replace(/\bKG\b/gi, "kilograms")
      .replace(/\bREV\b/gi, "Revision")
      .replace(/\bCMD\b/gi, "Commander")
      .replace(/\bLOC:\b/gi, "Location:")
      .replace(/\bCOORD:\b/gi, "Coordinates:")
      .replace(/\bELEV:\b/gi, "Elevation:")
      .replace(/\bUTC\b/gi, "Universal Coordinated Time")
      .replace(/°N/gi, " degrees North")
      .replace(/°E/gi, " degrees East")
      .replace(/°C/gi, " degrees Celsius")
      .replace(/\n{2,}/g, ". "); // double newlines to pauses

    return `${title}. ${summary}. ${cleanBody}`;
  };

  const handleToggleNarrator = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    const synth = window.speechSynthesis;

    if (isReadingAloud) {
      if (synth.speaking) {
        if (synth.paused) {
          synth.resume();
          setIsPausedTTS(false);
        } else {
          synth.pause();
          setIsPausedTTS(true);
        }
      } else {
        setIsReadingAloud(false);
        setIsPausedTTS(false);
      }
      return;
    }

    // Stop any previous audio
    synth.cancel();

    if (!dispatch) return;

    const plainText = getHumanizedText(dispatch.content, dispatch.title, dispatch.summary);
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.rate = 0.96; // Human conversational storytelling pacing
    utterance.pitch = 1.0;

    const voices = synth.getVoices();
    const chosenVoice = voices.find((v) => v.voiceURI === selectedVoiceURI) || voices.find((v) => v.lang.startsWith("en"));

    if (chosenVoice) utterance.voice = chosenVoice;

    utterance.onend = () => {
      setIsReadingAloud(false);
      setIsPausedTTS(false);
    };

    utterance.onerror = () => {
      setIsReadingAloud(false);
      setIsPausedTTS(false);
    };

    synth.speak(utterance);
    setIsReadingAloud(true);
    setIsPausedTTS(false);
  };

  const handleStopNarrator = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsReadingAloud(false);
    setIsPausedTTS(false);
  };

  useEffect(() => {
    return () => {
      audioObj?.pause();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [audioObj]);

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
    if (!session?.user) {
      setReactionError("AUTHENTICATION REQUIRED: Please log in to react.");
      return;
    }

    setReactionError("");
    setIsReacting(true);

    try {
      const res = await fetch(`/api/dispatches/${dispatch?.slug}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit reaction");
      }

      if (data.reactions) setReactions(data.reactions);
      setUserReaction(data.userReaction);
    } catch (err: any) {
      setReactionError(err.message || "Failed to submit reaction");
    } finally {
      setIsReacting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user) {
      setCommentError("AUTHENTICATION REQUIRED: Log in to post a comment.");
      return;
    }

    const text = newCommentText.trim();
    if (!text) {
      setCommentError("Comment cannot be empty.");
      return;
    }

    setCommentError("");
    setIsSubmittingComment(true);

    try {
      const res = await fetch(`/api/dispatches/${dispatch?.slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to post comment");
      }

      setComments((prev) => [data, ...prev]);
      setNewCommentText("");
    } catch (err: any) {
      setCommentError(err.message || "Failed to post comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    setDeletingCommentId(commentId);

    try {
      const res = await fetch(`/api/dispatches/${dispatch?.slug}/comments?commentId=${commentId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete comment");
      }

      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err: any) {
      alert(err.message || "Failed to delete comment");
    } finally {
      setDeletingCommentId(null);
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

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 py-10 space-y-8">
        {/* Category & Meta Header */}
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

        {/* Author Badge & AI Voice Player Controls */}
        <div className="hairline border-ink bg-bone p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <a
            href={dispatch.author?.socialHandle || "https://www.zuhaibrashid.com/"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group/author"
            title="Visit Author Profile (zuhaibrashid.com)"
          >
            {dispatch.author?.image ? (
              <Image
                src={dispatch.author.image}
                alt={dispatch.author.name || "Author"}
                width={42}
                height={42}
                className="rounded-none hairline border-ink object-cover group-hover/author:border-signal transition-colors"
              />
            ) : (
              <div className="h-10 w-10 brick text-bone grid place-items-center mono-label text-xs">
                CMD
              </div>
            )}
            <div>
              <div className="font-display font-bold text-base leading-tight group-hover/author:text-signal transition-colors flex items-center gap-1.5">
                {dispatch.author?.name || "Zuhaib Rashid"}
                <ExternalLink className="h-3 w-3 opacity-60 group-hover/author:opacity-100" />
              </div>
              <div className="mono-label text-[10px] opacity-60">
                {dispatch.author?.role || "COMMANDER"} · {new Date(dispatch.publishedAt || dispatch.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
            </div>
          </a>

          {/* Audio & Narrator Actions */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {/* Audio Voice Memo MP3 Player */}
            {dispatch.audioMemoUrl && (
              <button
                onClick={toggleAudio}
                className="flex items-center gap-2 brick px-3.5 py-2 text-bone mono-label text-xs hover:bg-signal transition-colors cursor-pointer"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="h-4 w-4 animate-pulse text-signal font-bold" /> PAUSE VOICE MEMO
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" /> PLAY AUDIO MEMO
                  </>
                )}
              </button>
            )}

            {/* AI Voice Selector Dropdown (if multiple voices exist) */}
            {availableVoices.length > 0 && (
              <div className="flex items-center bg-paper hairline border-ink px-2 py-1.5 mono-label text-[11px]">
                <Mic className="h-3.5 w-3.5 text-signal mr-1.5 shrink-0" />
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => setSelectedVoiceURI(e.target.value)}
                  disabled={isReadingAloud}
                  className="bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-signal cursor-pointer max-w-37.5 truncate"
                  title="Select AI Narrator Voice"
                  aria-label="Select AI Narrator Voice"
                >
                  {availableVoices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name.replace(/Microsoft |Google |Apple /g, "")}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* AI Text-To-Speech Narrator Button */}
            <button
              onClick={handleToggleNarrator}
              className={`flex items-center gap-2 px-4 py-2 mono-label text-xs transition-colors cursor-pointer ${
                isReadingAloud
                  ? "bg-signal text-bone font-bold"
                  : "brick text-bone hover:bg-signal"
              }`}
            >
              {isReadingAloud ? (
                isPausedTTS ? (
                  <>
                    <Volume2 className="h-4 w-4 opacity-75" /> RESUME NARRATOR
                  </>
                ) : (
                  <>
                    <VolumeX className="h-4 w-4 animate-pulse" /> PAUSE NARRATOR
                  </>
                )
              ) : (
                <>
                  <Volume2 className="h-4 w-4" /> READ DISPATCH ALOUD
                </>
              )}
            </button>

            {isReadingAloud && (
              <button
                onClick={handleStopNarrator}
                className="bg-paper hairline border-ink text-ink hover:bg-ink hover:text-bone px-3 py-2 mono-label text-xs transition-colors cursor-pointer"
                title="Stop Narrator"
              >
                STOP
              </button>
            )}
          </div>
        </div>

        {/* Cover Image */}
        {dispatch.coverImage && (
          <div className="aspect-video bg-paper hairline border-ink crosshair overflow-hidden">
            <Image
              src={dispatch.coverImage}
              alt={dispatch.title}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Body */}
        <article className="prose prose-stone max-w-none dark:prose-invert">
          <MarkdownRenderer content={dispatch.content} />
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

        {/* Tactical Reactions Bar */}
        <section className="hairline border-ink bg-bone p-6 crosshair space-y-4">
          <div className="mono-label text-xs flex items-center justify-between">
            <span className="text-signal flex items-center gap-1.5 font-bold">
              <Radio className="h-3.5 w-3.5" /> REACTION PROTOCOL (AUTH REQUIRED)
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
              disabled={isReacting}
              className={`p-3 hairline border-ink mono-label text-xs flex items-center justify-between transition-colors cursor-pointer ${
                userReaction === "roger"
                  ? "brick text-bone border-signal font-bold"
                  : "bg-paper hover:bg-ink hover:text-bone"
              }`}
            >
              <span>[ ROGER {userReaction === "roger" ? "✓" : ""} ]</span>
              <span className="font-mono">{reactions.roger}</span>
            </button>

            <button
              onClick={() => handleReaction("acknowledged")}
              disabled={isReacting}
              className={`p-3 hairline border-ink mono-label text-xs flex items-center justify-between transition-colors cursor-pointer ${
                userReaction === "acknowledged"
                  ? "brick text-bone border-signal font-bold"
                  : "bg-paper hover:bg-ink hover:text-bone"
              }`}
            >
              <span>[ ACKNOWLEDGED {userReaction === "acknowledged" ? "✓" : ""} ]</span>
              <span className="font-mono">{reactions.acknowledged}</span>
            </button>

            <button
              onClick={() => handleReaction("copied")}
              disabled={isReacting}
              className={`p-3 hairline border-ink mono-label text-xs flex items-center justify-between transition-colors cursor-pointer ${
                userReaction === "copied"
                  ? "brick text-bone border-signal font-bold"
                  : "bg-paper hover:bg-ink hover:text-bone"
              }`}
            >
              <span>[ DISPATCH COPIED {userReaction === "copied" ? "✓" : ""} ]</span>
              <span className="font-mono">{reactions.copied}</span>
            </button>
          </div>

          {reactionError && (
            <div className="mono-label text-xs text-signal flex items-center gap-1.5 pt-1">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              {reactionError}
              {!session?.user && (
                <Link
                  href={`/login?callbackUrl=${encodeURIComponent(`/dispatches/${dispatch.slug}`)}`}
                  className="underline font-bold ml-1 hover:text-ink"
                >
                  LOGIN HERE →
                </Link>
              )}
            </div>
          )}
        </section>

        {/* Author Bio Box */}
        <section className="hairline border-ink bg-paper p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[4px_4px_0_0_oklch(0.13_0.01_60)]">
          <div className="flex items-center gap-4">
            <a
              href={dispatch.author?.socialHandle || "https://www.zuhaibrashid.com/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={dispatch.author?.image || "https://lh3.googleusercontent.com/a/ACg8ocKLXWy8hu2kdBVZZKmeyKx-sFkSVY9Htu8DzMLD_5bWgAplykU=s96-c"}
                alt="Zuhaib Rashid"
                width={56}
                height={56}
                className="hairline border-ink object-cover hover:border-signal transition-colors"
              />
            </a>
            <div>
              <div className="mono-label text-[10px] text-signal font-bold">AUTHOR // COMMANDER</div>
              <h2 className="font-display font-bold text-xl uppercase leading-tight mt-0.5">
                <a
                  href={dispatch.author?.socialHandle || "https://www.zuhaibrashid.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-signal transition-colors flex items-center gap-1.5"
                >
                  {dispatch.author?.name || "Zuhaib Rashid"}
                  <ExternalLink className="h-4 w-4 text-signal" />
                </a>
              </h2>
              <p className="font-serif text-sm text-ink/75 mt-1 max-w-lg">
                {dispatch.author?.bio || "Lead Commander at Friend Circle. Documenting Kashmir expeditions, offroad routes, and mountain reflections."}
              </p>
            </div>
          </div>

          <a
            href={dispatch.author?.socialHandle || "https://www.zuhaibrashid.com/"}
            target="_blank"
            rel="noopener noreferrer"
            className="brick text-bone px-4 py-2.5 mono-label text-xs hover:bg-signal transition-colors shrink-0 flex items-center gap-2"
          >
            VISIT ZUHAIBRASHID.COM <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </section>

        {/* FIELD COMMENTS SECTION */}
        <section className="space-y-6 pt-4">
          <div className="hairline-b border-ink pb-3 flex items-center justify-between">
            <h3 className="font-display text-2xl font-black uppercase flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-signal" /> FIELD COMMENTS
              <span className="mono-label text-xs text-signal font-bold bg-bone hairline border-ink px-2 py-0.5 ml-2">
                {comments.length.toString().padStart(2, "0")} LOGS
              </span>
            </h3>
            <span className="mono-label text-xs opacity-60 hidden sm:inline">// CHANNEL OPEN</span>
          </div>

          {/* Comment Form / Login Prompt */}
          {session?.user ? (
            <form onSubmit={handlePostComment} className="hairline border-ink bg-paper p-5 space-y-3 shadow-[4px_4px_0_0_oklch(0.13_0.01_60)]">
              <div className="flex items-center justify-between mono-label text-xs">
                <span className="flex items-center gap-2 font-bold">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={22}
                      height={22}
                      className="hairline border-ink object-cover"
                    />
                  ) : (
                    <UserIcon className="h-4 w-4 text-signal" />
                  )}
                  {session.user.name || session.user.email}
                </span>
                <span className="opacity-50">{newCommentText.length} / 1000 CHARS</span>
              </div>

              <textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Log your comment or tactical field feedback..."
                aria-label="Add dispatch comment or tactical feedback"
                rows={3}
                maxLength={1000}
                className="w-full bg-bone hairline border-ink p-3 text-sm font-sans outline-none focus:border-signal transition-colors resize-y"
              />

              {commentError && (
                <div className="mono-label text-xs text-signal flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {commentError}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingComment || !newCommentText.trim()}
                  className="brick text-bone px-5 py-2.5 mono-label text-xs flex items-center gap-2 hover:bg-signal transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmittingComment ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> SUBMITTING...
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" /> TRANSMIT COMMENT
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="hairline border-ink bg-bone crosshair p-6 text-center space-y-3">
              <div className="mono-label text-xs text-signal flex items-center justify-center gap-2 font-bold">
                <Lock className="h-4 w-4" /> AUTHENTICATION REQUIRED FOR DISPATCH LOGS
              </div>
              <p className="font-display italic text-sm text-ink/75">
                Log in with your account to participate in field conversations and post comments.
              </p>
              <Link
                href={`/login?callbackUrl=${encodeURIComponent(`/dispatches/${dispatch.slug}`)}`}
                className="inline-flex items-center gap-2 brick text-bone px-6 py-2.5 mono-label text-xs hover:bg-signal transition-colors"
              >
                LOGIN TO TRANSMIT COMMENTS
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {loadingComments ? (
              <div className="p-8 text-center mono-label text-xs text-signal flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> LOADING FIELD COMMENTS...
              </div>
            ) : comments.length === 0 ? (
              <div className="p-8 hairline border-ink bg-paper text-center mono-label text-xs opacity-60">
                NO COMMENTS LOGGED YET. BE THE FIRST TO TRANSMIT FEEDBACK.
              </div>
            ) : (
              comments.map((comment) => {
                const isAuthorOrAdmin =
                  session?.user?.email &&
                  (comment.author?.name === session.user.name ||
                    session.user.role === "ADMIN");

                return (
                  <div
                    key={comment._id}
                    className="hairline border-ink bg-bone p-5 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {comment.author?.image ? (
                          <Image
                            src={comment.author.image}
                            alt={comment.author.name || "User"}
                            width={32}
                            height={32}
                            className="hairline border-ink object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 brick text-bone grid place-items-center mono-label text-[10px]">
                            {(comment.author?.name || "U")[0].toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-display font-bold text-sm leading-tight flex items-center gap-2">
                            {comment.author?.name || "Anonymous Member"}
                            {comment.author?.role === "ADMIN" && (
                              <span className="brick text-bone text-[9px] px-1.5 py-0.5 mono-label">
                                CMD
                              </span>
                            )}
                            {comment.author?.teamMemberStatus === "APPROVED" && comment.author?.role !== "ADMIN" && (
                              <span className="bg-signal text-bone text-[9px] px-1.5 py-0.5 mono-label">
                                CREW
                              </span>
                            )}
                          </div>
                          <div className="mono-label text-[10px] opacity-60">
                            {new Date(comment.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>

                      {isAuthorOrAdmin && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          disabled={deletingCommentId === comment._id}
                          className="mono-label text-[10px] text-ink/40 hover:text-signal transition-colors p-1 cursor-pointer flex items-center gap-1 max-w-37.5"
                          title="Delete comment"
                        >
                          {deletingCommentId === comment._id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      )}
                    </div>

                    <p className="font-serif text-sm md:text-base text-ink/85 leading-relaxed whitespace-pre-line pl-11">
                      {comment.text}
                    </p>
                  </div>
                );
              })
            )}
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

export default DispatchDetailClient;
