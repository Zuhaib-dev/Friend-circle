"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  FileText,
  Search,
  ArrowUpRight,
  Radio,
  Volume2,
  Star
} from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { FooterSection } from "@/components/landing/FooterSection";
import { NewsletterSignup } from "@/components/NewsletterSignup";

type DispatchItem = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
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
  featured?: boolean;
};

export function DispatchesClient({
  initialDispatches,
}: {
  initialDispatches: DispatchItem[];
}) {
  const [dispatches] = useState<DispatchItem[]>(initialDispatches);
  const loading = false;
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  const categories = ["ALL", "EXPEDITION", "FIELD_NOTES", "TECH", "REFLECTIONS", "GUIDES"];

  const filtered = dispatches.filter((d) => {
    if (selectedCategory !== "ALL" && d.category !== selectedCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const showFeatured = !search && selectedCategory === "ALL";
  const featuredPost = showFeatured ? dispatches.find((d) => d.featured) || dispatches[0] : null;
  const regularPosts = showFeatured && featuredPost
    ? filtered.filter((d) => d._id !== featuredPost._id)
    : filtered;

  return (
    <div className="min-h-screen bg-bone text-ink flex flex-col font-sans">
      <TopNav />

      {/* Header Banner */}
      <section className="hairline-b border-ink px-4 md:px-8 py-12 md:py-16 bg-bone relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mono-label text-signal mb-4">
            <Radio className="h-4 w-4 animate-blink" />
            <span>FIELD MANUAL // EDITORIAL LOGS & DISPATCHES</span>
          </div>

          <h1 className="display-num text-[clamp(44px,8vw,110px)] text-ink leading-none font-black uppercase">
            FIELD <span className="text-signal italic font-serif lowercase">dispatches</span>.
          </h1>

          <p className="font-display italic text-xl md:text-2xl text-ink/75 max-w-2xl mt-4 leading-relaxed">
            Stories logged in tire tracks, trout streams, and mountain passes. Tactical notes from Kashmir expeditions.
          </p>

          {/* Quick HUD Strip */}
          <div className="mt-8 pt-4 hairline-t border-ink/40 grid grid-cols-2 sm:grid-cols-4 gap-4 mono-label text-xs">
            <div>
              <span className="opacity-50 block">CHANNELS</span>
              <span className="font-mono">PUBLIC / BROADCAST</span>
            </div>
            <div>
              <span className="opacity-50 block">COORDINATES</span>
              <span className="font-mono">34.0837°N · 74.7973°E</span>
            </div>
            <div>
              <span className="opacity-50 block">TOTAL LOGS</span>
              <span className="font-mono text-signal">{dispatches.length} DISPATCHES</span>
            </div>
            <div>
              <span className="opacity-50 block">CLEARANCE</span>
              <span className="font-mono">OPEN COMMS</span>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-10 space-y-12">
        {/* Featured Dispatch Banner */}
        {!loading && featuredPost && (
          <section className="hairline border-ink bg-bone crosshair p-6 md:p-10 overflow-hidden group shadow-[6px_6px_0_0_oklch(0.13_0.01_60)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Cover Image */}
              <div className="lg:col-span-6 relative aspect-16/10 bg-paper hairline border-ink overflow-hidden">
                {featuredPost.coverImage ? (
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 tick opacity-30 flex items-center justify-center">
                    <FileText className="h-16 w-16 text-ink/20" />
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-signal text-bone mono-label px-2.5 py-1 text-xs flex items-center gap-1.5">
                  <Star className="h-3 w-3 fill-bone" /> FEATURED DISPATCH
                </div>
              </div>

              {/* Details */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3 mono-label text-xs">
                  <span className="brick text-bone px-2 py-0.5">{featuredPost.category}</span>
                  <span className="opacity-60">{featuredPost.readTimeMinutes} MIN READ</span>
                  {featuredPost.audioMemoUrl && (
                    <span className="text-signal flex items-center gap-1">
                      <Volume2 className="h-3.5 w-3.5" /> AUDIO INCLUDED
                    </span>
                  )}
                </div>

                <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl leading-tight uppercase group-hover:text-signal transition-colors">
                  <Link href={`/dispatches/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="font-serif text-lg text-ink/80 leading-relaxed line-clamp-3">
                  {featuredPost.summary}
                </p>

                {/* Telemetry info */}
                <div className="pt-4 hairline-t border-ink/30 flex items-center justify-between mono-label text-xs opacity-75">
                  <span>{featuredPost.telemetry?.coordinates || "34.0837°N"}</span>
                  <span>{new Date(featuredPost.publishedAt || featuredPost.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/dispatches/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 brick px-6 py-3 mono-label text-bone hover:bg-signal transition-colors group/btn"
                  >
                    READ FULL DISPATCH <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filter Controls & Search */}
        <section className="hairline border-ink bg-bone p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`mono-label px-3 py-1.5 text-xs hairline border-ink transition-colors cursor-pointer ${
                  selectedCategory === cat ? "brick text-bone" : "bg-bone hover:bg-ink/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH DISPATCHES..."
              aria-label="Search dispatches"
              className="bg-paper hairline border-ink pl-9 pr-3 py-2 mono-label text-xs outline-none w-full focus:border-signal"
            />
          </div>
        </section>

        {/* Dispatches Cards Grid */}
        {loading ? (
          <div className="py-20 text-center mono-label text-signal flex items-center justify-center gap-2">
            <Radio className="h-5 w-5 animate-blink" /> FETCHING FIELD DISPATCHES...
          </div>
        ) : regularPosts.length === 0 ? (
          <div className="hairline border-ink bg-bone p-16 text-center mono-label opacity-60">
            NO DISPATCHES FOUND MATCHING YOUR CRITERIA.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, idx) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="hairline border-ink bg-bone crosshair flex flex-col justify-between group hover:bg-paper transition-all duration-300 shadow-[4px_4px_0_0_oklch(0.13_0.01_60)]"
              >
                <div>
                  {/* Thumbnail / Cover */}
                  <div className="relative aspect-video bg-paper hairline-b border-ink overflow-hidden">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 tick opacity-20 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-ink/30" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 mono-label text-[10px] brick text-bone px-2 py-0.5">
                      {post.category}
                    </div>
                    {post.audioMemoUrl && (
                      <div className="absolute top-2 right-2 bg-signal text-bone p-1 rounded-full" title="Audio voice note included">
                        <Volume2 className="h-3 w-3" />
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between mono-label text-[10px] opacity-60">
                      <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span>{post.readTimeMinutes} MIN READ</span>
                    </div>

                    <h3 className="font-display font-black text-2xl uppercase leading-tight group-hover:text-signal transition-colors line-clamp-2">
                      <Link href={`/dispatches/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="font-serif text-sm text-ink/80 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-5 pt-0">
                  <div className="pt-3 hairline-t border-ink/20 flex items-center justify-between mono-label text-xs">
                    <span className="opacity-60">{post.telemetry?.coordinates || "34.0837°N"}</span>
                    <Link
                      href={`/dispatches/${post.slug}`}
                      className="text-signal hover:underline flex items-center gap-1 font-bold"
                    >
                      READ <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <NewsletterSignup />
      </main>

      <FooterSection />
    </div>
  );
}

export default DispatchesClient;
