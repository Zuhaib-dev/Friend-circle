"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import {
  Search,
  Link as LinkIcon,
  ShieldCheck,
  Radio,
  Mail,
  Users,
  Activity,
  X,
  Crosshair,
  AtSign,
} from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { useSession } from "next-auth/react";

// Crosshairs component for the corners
function Crosshairs() {
  return (
    <>
      <span className="ch-tl" />
      <span className="ch-tr" />
      <span className="ch-bl" />
      <span className="ch-br" />
    </>
  );
}

type CrewMember = {
  _id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TEAM_MEMBER";
  image?: string;
  bio?: string;
  socialHandle?: string;
};

export default function CrewPage() {
  const { data: session } = useSession();
  const user = session?.user;
  
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [query, setQuery] = useState("");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    fetch("/api/crew")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCrew(data);
        }
      });
  }, []);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const sorted = useMemo(() => {
    const meEmail = user?.email?.toLowerCase();
    return [...crew].sort((a, b) => {
      const aMe = meEmail && a.email.toLowerCase() === meEmail ? 1 : 0;
      const bMe = meEmail && b.email.toLowerCase() === meEmail ? 1 : 0;
      const aRank = a.role === "ADMIN" ? 0 : aMe ? 1 : 2;
      const bRank = b.role === "ADMIN" ? 0 : bMe ? 1 : 2;
      if (aRank !== bRank) return aRank - bRank;
      return a.name.localeCompare(b.name);
    });
  }, [user, crew]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        (m.socialHandle && m.socialHandle.toLowerCase().includes(q))
    );
  }, [sorted, query]);

  const utc = now
    ? `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}:${String(now.getUTCSeconds()).padStart(2, "0")} UTC`
    : "--:--:-- UTC";

  return (
    <main className="min-h-screen bg-bone text-ink">
      <TopNav />

      {/* Page header */}
      <section className="hairline-b border-ink relative overflow-hidden">
        <div className="px-4 md:px-8 py-8 md:py-12 grid md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 mono-label opacity-60 mb-3">
              <span className="brick text-bone px-2 py-px">CREW / 04</span>
              <span>·</span>
              <span>PERSONNEL ROSTER</span>
              <span>·</span>
              <span className="text-signal flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" /> LIVE
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
              The <span className="italic text-signal">operators</span>
              <br />
              behind the convoy.
            </h1>
            <p className="mt-4 max-w-xl text-ink/70 text-sm md:text-base">
              Classified dossier of every soul in the Friend Circle field unit. Each card pulled live from
              the registry. Cross-reference at your own risk.
            </p>
          </div>
          <div className="md:col-span-4 grid grid-cols-3 gap-2">
            <Stat label="UNITS" value={crew.length.toString().padStart(2, "0")} />
            <Stat label="ACTIVE" value={crew.length.toString().padStart(2, "0")} />
            <Stat label="UTC" value={utc.slice(0, 5)} mono />
          </div>
        </div>
        {/* tick rulers */}
        <div className="absolute inset-x-0 bottom-0 h-1.5 tick opacity-50" />
      </section>

      {/* Command strip — terminal search */}
      <section className="sticky top-[44px] z-40 bg-bone hairline-b border-ink">
        <div className="px-4 md:px-8 py-3 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2 mono-label text-signal">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            <span>QUERY/</span>
          </div>
          <div className="flex-1 hairline border-ink flex items-center px-3 py-2 group focus-within:border-signal focus-within:bg-acid/10 transition-colors">
            <span className="mono-label text-signal mr-2">&gt;</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search_personnel.exe_"
              className="flex-1 bg-transparent font-mono text-sm tracking-wider text-ink placeholder:text-ink/30 focus:outline-none"
              spellCheck={false}
              autoComplete="off"
            />
            <span className="ml-2 mono-label text-ink/40 hidden sm:inline">
              [ESC]
            </span>
            {query && (
              <button
                onClick={() => setQuery("")}
                className="ml-2 hairline border-ink/40 px-1.5 py-0.5 mono-label hover:bg-ink hover:text-bone transition-colors"
                aria-label="Clear"
              >
                <X className="h-3 w-3" />
              </button>
            )}
            <Search className="h-3.5 w-3.5 ml-3 text-ink/50" />
          </div>
          <div className="mono-label flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-signal" />
            <span>
              MATCH <span className="text-signal">{filtered.length.toString().padStart(2, "0")}</span> /{" "}
              {crew.length.toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </section>

      {/* Roster grid */}
      <section className="px-4 md:px-8 py-8 min-h-[400px]">
        {filtered.length === 0 && crew.length > 0 ? (
          <EmptyState query={query} />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((m, i) => (
                <DossierCard key={m._id} member={m} index={i} isMe={user?.email?.toLowerCase() === m.email.toLowerCase()} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Footer */}
      <footer className="hairline-t border-ink px-4 md:px-8 py-4 mono-label flex items-center justify-between flex-wrap gap-3">
        <span className="flex items-center gap-2 opacity-70">
          <Activity className="h-3 w-3 text-signal" />
          REGISTRY / v4.2 · ENCRYPTED CHANNEL
        </span>
        <span className="opacity-60">CLEARANCE LVL 3 · {utc}</span>
      </footer>
    </main>
  );
}

function Stat({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="hairline border-ink p-2 relative">
      <span className="mono-label opacity-50">{label}</span>
      <div className={`mt-1 ${mono ? "font-mono text-sm" : "font-display text-2xl"} text-ink`}>{value}</div>
      <span className="absolute top-1 right-1 h-1 w-1 bg-signal animate-blink" />
    </div>
  );
}

function DossierCard({ member, index, isMe }: { member: CrewMember; index: number; isMe: boolean }) {
  const isAdmin = member.role === "ADMIN";
  const displayRole = isAdmin ? "ADMIN_COMMAND" : "FIELD_OPERATOR";
  
  const socialUrl = useMemo(() => {
    if (!member.socialHandle) return null;
    if (member.socialHandle.startsWith("http")) return member.socialHandle;
    return `https://instagram.com/${member.socialHandle.replace("@", "")}`;
  }, [member.socialHandle]);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.18 } }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      className="group hairline border-ink bg-bone overflow-hidden crosshair flex flex-col h-full"
    >
      <Crosshairs />

      {/* Card header strip */}
      <header className="hairline-b border-ink flex items-center justify-between px-2.5 py-1.5 bg-bone relative z-10 shrink-0">
        <span className="mono-label opacity-60">ID/{member._id.slice(-6).toUpperCase()}</span>
        <span className="flex items-center gap-1.5">
          {isMe && <span className="brick text-bone px-1.5 py-px mono-label">YOU</span>}
          {isAdmin && (
            <span className="mono-label text-signal flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> CMD
            </span>
          )}
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
        </span>
      </header>

      {/* Portrait */}
      <div className="relative aspect-3/4 overflow-hidden bg-ink shrink-0">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-all duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-display text-5xl brick text-bone">
            {member.name.charAt(0)}
          </div>
        )}

        {/* tactical overlay HUD */}
        <div className="absolute top-2 left-2 mono-label text-bone/80 flex items-center gap-1">
          <Crosshair className="h-3 w-3 text-signal" /> TRACK
        </div>
        <div className="absolute bottom-2 right-2 mono-label text-bone/80">
          {displayRole.split("_")[0]}
        </div>
        {/* corner ticks on portrait */}
        <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-bone/60" />
        <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-bone/60" />
        <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-bone/60" />
        <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-bone/60" />
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col flex-1 z-10">
        <h2 className="font-display text-2xl leading-tight uppercase truncate" title={member.name}>
          {member.name}
        </h2>
        <div className="flex items-center justify-between gap-2 mt-1 mb-2">
          <span className={`mono-label hairline border-ink px-1.5 py-[2px] ${isAdmin ? "bg-signal text-bone border-signal" : ""}`}>
            [ {displayRole} ]
          </span>
          <a
            href={`mailto:${member.email}`}
            className="mono-label opacity-60 hover:opacity-100 hover:text-signal flex items-center gap-1 transition-colors"
            title={member.email}
          >
            <Mail className="h-3 w-3" /> MAIL
          </a>
        </div>
        <div className="font-mono text-[11px] leading-relaxed text-ink/75 flex-1 line-clamp-3">
          {member.bio ? (
             <>&gt; {member.bio}</>
          ) : (
             <span className="opacity-40 italic">Bio data redacted or unavailable for this operative.</span>
          )}
        </div>

        {/* footer row */}
        <div className="hairline-t border-ink/40 pt-2 mt-3 flex items-center justify-between gap-2 shrink-0">
          {socialUrl ? (
            <a
              href={socialUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 mono-label hover:text-signal transition-colors truncate"
            >
              {socialUrl.includes("instagram.com") ? <AtSign className="h-3 w-3 text-signal" /> : <LinkIcon className="h-3 w-3 text-signal" />}
              <span className="truncate">{member.socialHandle}</span>
            </a>
          ) : (
            <span className="flex items-center gap-1.5 mono-label opacity-30 truncate">
              <LinkIcon className="h-3 w-3" /> NO_LINK
            </span>
          )}
          
          {/* barcode */}
          <svg width="60" height="18" viewBox="0 0 60 18" aria-hidden className="opacity-70 shrink-0">
            {Array.from({ length: 22 }).map((_, i) => {
              const w = (i * 7919) % 3 === 0 ? 2 : 1;
              const h = (i * 104729) % 5 === 0 ? 12 : 18;
              return (
                <rect
                  key={i}
                  x={i * 2.6}
                  y={18 - h}
                  width={w}
                  height={h}
                  fill="currentColor"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* hover sweep panel underline */}
      <motion.div
        variants={{ hover: { scaleX: 1 } }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-signal origin-left z-20"
      />
    </motion.article>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="hairline border-ink p-10 text-center crosshair"
    >
      <Crosshairs />
      <div className="mono-label text-signal mb-3 flex items-center justify-center gap-2">
        <Radio className="h-4 w-4 animate-pulse" /> NO SIGNAL
      </div>
      <h3 className="font-display text-3xl">No operator matches "{query}"</h3>
      <p className="mono-label opacity-60 mt-2">RECHECK QUERY · OR CLEAR FILTER</p>
    </motion.div>
  );
}
