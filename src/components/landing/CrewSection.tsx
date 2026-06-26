"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, AtSign, ArrowUpRight, ChevronUp, ChevronDown, Users } from "lucide-react";
import { SectionHead } from "./primitives";

type CrewMember = {
  _id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TEAM_MEMBER";
  image?: string;
  bio?: string;
  socialHandle?: string;
};

export function CrewSection() {
  const { data: session } = useSession();
  const myEmail = session?.user?.email?.toLowerCase();

  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const VISIBLE = 6;

  useEffect(() => {
    fetch("/api/crew")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCrew(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Sort: ADMIN first → logged-in user second → rest by insertion order
  const sorted = useMemo(() => {
    return [...crew].sort((a, b) => {
      const aAdmin = a.role === "ADMIN" ? 0 : 1;
      const bAdmin = b.role === "ADMIN" ? 0 : 1;
      if (aAdmin !== bAdmin) return aAdmin - bAdmin;
      const aMe = myEmail && a.email.toLowerCase() === myEmail ? 0 : 1;
      const bMe = myEmail && b.email.toLowerCase() === myEmail ? 0 : 1;
      return aMe - bMe;
    });
  }, [crew, myEmail]);

  const displayed = expanded ? sorted : sorted.slice(0, VISIBLE);
  const hasMore = sorted.length > VISIBLE;

  return (
    <section id="crew" className="px-4 md:px-8 py-16">
      <SectionHead
        code="UNI / 02"
        kicker="MEET THE UNITS"
        title="Six kings, one ridge"
        sub="The core circle — assignments, call signs, and known frequencies."
      />

      {/* Grid */}
      {loading ? (
        /* Skeleton */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 hairline border-ink">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`p-5 bg-bone animate-pulse
                ${(i + 1) % 3 !== 0 ? "lg:hairline-r" : ""}
                ${(i + 1) % 2 !== 0 ? "md:hairline-r" : ""}
                hairline-b border-ink/50`}
            >
              <div className="aspect-4/5 bg-ink/8 mb-4" />
              <div className="h-8 w-32 bg-ink/8 mb-2" />
              <div className="h-4 w-20 bg-ink/8" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 hairline border-ink">
            <AnimatePresence mode="popLayout">
              {displayed.map((c, i) => {
                const isAdmin = c.role === "ADMIN";
                const isMe = myEmail && c.email.toLowerCase() === myEmail;
                const padded = String(i + 1).padStart(2, "0");
                return (
                  <motion.article
                    key={c._id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                    className={`relative p-5 bg-bone group cursor-pointer
                      ${(i + 1) % 3 !== 0 ? "lg:hairline-r" : ""}
                      ${(i + 1) % 2 !== 0 ? "md:hairline-r lg:hairline-r" : "md:border-r-0"}
                      ${i < displayed.length - (displayed.length % 3 || 3) ? "lg:hairline-b" : ""}
                      hairline-b border-ink/50`}
                  >
                    {/* Portrait */}
                    <div className="hairline border-ink/80 relative aspect-4/5 bg-paper overflow-hidden">
                      {c.image ? (
                        <Image
                          src={c.image}
                          alt={c.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 tick opacity-30" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="display-num text-[140px] text-ink/15 group-hover:text-signal/30 transition-colors">
                              {padded}
                            </span>
                          </div>
                        </>
                      )}

                      {/* HUD strips */}
                      <div className="absolute top-2 left-2 mono-label text-bone mix-blend-difference flex items-center gap-1.5">
                        UNIT/{padded}
                        {isAdmin && <ShieldCheck className="h-3 w-3 text-signal" />}
                      </div>
                      <div className="absolute top-2 right-2 mono-label flex items-center gap-1">
                        <span className="h-1.5 w-1.5 bg-signal rounded-full animate-blink" />
                        {isMe ? (
                          <span className="text-bone mix-blend-difference">YOU</span>
                        ) : (
                          <span className="text-bone mix-blend-difference">
                            {isAdmin ? "CMD" : "OPS"}
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between mono-label text-bone mix-blend-difference">
                        <span>{isAdmin ? "34.0837°N" : "33.9716°N"}</span>
                        <span>BEARING 282°</span>
                      </div>

                      {/* hover scan line */}
                      <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute left-0 right-0 h-px bg-signal animate-scan" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="mt-4">
                      <div className="flex items-baseline justify-between">
                        <h3 className="display-num text-4xl">{c.name}<span className="text-signal">.</span></h3>
                        <span className="mono-label">CALL/{padded}</span>
                      </div>
                      <div className="font-display italic text-ink/70 text-lg">
                        {isAdmin ? "Commander" : "Field Operator"}
                      </div>
                      {c.bio && (
                        <p className="text-sm mt-2 text-ink/80 leading-snug line-clamp-2">{c.bio}</p>
                      )}
                      {/* Social link */}
                      {c.socialHandle && (
                        <a
                          href={
                            c.socialHandle.startsWith("http")
                              ? c.socialHandle
                              : `https://instagram.com/${c.socialHandle.replace("@", "")}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-3 flex items-center gap-1.5 mono-label text-signal hover:underline truncate w-fit"
                        >
                          <AtSign className="h-3 w-3 shrink-0" />
                          <span className="truncate">{c.socialHandle}</span>
                          <ArrowUpRight className="h-3 w-3 shrink-0 opacity-60" />
                        </a>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {/* CTA row */}
          <div className="hairline-t border-ink/40 mt-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-0">
            {/* Expand button — only shown when > 6 members */}
            {hasMore && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setExpanded((e) => !e)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 mono-label hairline-r border-ink/40 hover:bg-ink hover:text-bone transition-colors group"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="h-3.5 w-3.5 text-signal" />
                    COLLAPSE · SHOW LESS
                    <span className="opacity-40 ml-auto">↑</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3.5 w-3.5 text-signal group-hover:animate-bounce" />
                    EXPAND · {sorted.length - VISIBLE} MORE UNITS
                    <span className="opacity-40 ml-auto">+{sorted.length - VISIBLE}</span>
                  </>
                )}
              </motion.button>
            )}

            {/* View full roster */}
            <Link
              href="/crew"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 mono-label bg-ink text-bone hover:bg-signal transition-colors group"
            >
              <Users className="h-3.5 w-3.5" />
              VIEW FULL ROSTER
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-auto" />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
