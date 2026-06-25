"use client";

import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "motion/react";
import { TopNav } from "@/components/top-nav";
import { Terminal, ShieldAlert, Crosshair, Network, Loader2, Barcode, ShieldCheck, Mail, Link as LinkIcon, Instagram } from "lucide-react";
import { initialsOf } from "@/lib/utils";
import Link from "next/link";

type CrewMember = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "ADMIN" | "TEAM_MEMBER";
  socialHandle?: string;
  bio?: string;
};

export default function CrewPage() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/crew")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCrew(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredAndSortedCrew = useMemo(() => {
    // Filter by search
    let filtered = crew;
    if (search.trim()) {
      const s = search.toLowerCase();
      filtered = crew.filter(
        (c) => c.name.toLowerCase().includes(s) || c.role.toLowerCase().includes(s)
      );
    }

    // Sort: ADMINs first, then Logged In User, then others
    return filtered.sort((a, b) => {
      // 1. Admin priority
      if (a.role === "ADMIN" && b.role !== "ADMIN") return -1;
      if (b.role === "ADMIN" && a.role !== "ADMIN") return 1;

      // 2. Logged in user priority (if both are same role)
      if (a.email === userEmail && b.email !== userEmail) return -1;
      if (b.email === userEmail && a.email !== userEmail) return 1;

      // 3. Alphabetical name
      return a.name.localeCompare(b.name);
    });
  }, [crew, search, userEmail]);

  return (
    <main className="min-h-screen bg-bone text-ink relative flex flex-col overflow-hidden">
      <TopNav />
      
      {/* Command Strip */}
      <div className="hairline-b border-ink bg-bone sticky top-[53px] z-40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-2 gap-3">
          <div className="flex items-center gap-3">
            <span className="brick px-2 py-px text-bone mono-label">CREW / ROSTER</span>
            <span className="opacity-70 mono-label truncate hidden sm:inline">VERIFIED FIELD OPERATORS</span>
          </div>

          <div className="relative w-full md:w-auto min-w-[280px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-signal mono-label font-bold">&gt;</span>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search_personnel.exe_"
              className="w-full bg-ink/5 hairline border-ink pl-7 pr-3 py-1.5 font-mono text-sm placeholder:text-ink/40 focus:outline-none focus:ring-1 focus:ring-signal focus:bg-transparent transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center pt-20 text-signal opacity-60">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="mono-label tracking-widest mt-4">FETCHING NETWORK ROSTER...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-2xl mx-auto">
            <AnimatePresence>
              {filteredAndSortedCrew.map((member, i) => (
                <CrewCard key={member._id} member={member} index={i} isMe={member.email === userEmail} />
              ))}
              {filteredAndSortedCrew.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center mono-label opacity-50"
                >
                  <ShieldAlert className="h-8 w-8 mx-auto mb-4" />
                  NO MATCHING OPERATORS FOUND IN DATABASE.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}

function CrewCard({ member, index, isMe }: { member: CrewMember; index: number; isMe: boolean }) {
  
  // Format social link if it's just a handle
  const socialUrl = useMemo(() => {
    if (!member.socialHandle) return null;
    if (member.socialHandle.startsWith("http")) return member.socialHandle;
    return `https://instagram.com/${member.socialHandle.replace("@", "")}`;
  }, [member.socialHandle]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="hairline border-ink bg-bone relative group overflow-hidden flex flex-col h-full"
    >
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(28,28,26,0.05)] z-0" />
      
      {/* Top Corners Accent */}
      <div className="absolute top-2 left-2 w-3 h-3 hairline-t hairline-l border-ink/40" />
      <div className="absolute top-2 right-2 w-3 h-3 hairline-t hairline-r border-ink/40" />

      {/* Header Info */}
      <div className="p-4 flex flex-col md:flex-row gap-4 relative z-10 hairline-b border-ink/30">
        <div className="w-20 h-24 md:w-24 md:h-28 shrink-0 relative bg-ink/5 hairline border-ink/40 overflow-hidden">
          {member.image ? (
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-display text-4xl brick text-bone">
              {initialsOf(member.name)}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-ink/60 to-transparent pointer-events-none" />
          <Crosshair className="absolute bottom-1 right-1 h-3 w-3 text-bone/60" />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="font-display text-2xl truncate uppercase leading-none mt-1">
            {member.name.split(" ")[0]}
          </div>
          <div className="font-display text-lg opacity-60 truncate uppercase leading-none mt-1">
            {member.name.split(" ").slice(1).join(" ")}
          </div>
          
          <div className="mt-3 inline-flex self-start mono-label text-[10px] items-center gap-1.5 hairline px-2 py-1 bg-ink/5">
            {member.role === "ADMIN" ? (
              <><Terminal className="h-3 w-3 text-signal" /> ADMIN_COMMAND</>
            ) : (
              <><ShieldCheck className="h-3 w-3 opacity-50" /> FIELD_OPERATOR</>
            )}
          </div>

          {isMe && (
            <span className="mono-label text-[9px] text-signal mt-2">
              {"// THIS IS YOU"}
            </span>
          )}
        </div>
      </div>

      {/* Bio Body */}
      <div className="p-4 flex-1 relative z-10 text-sm font-mono opacity-80 leading-relaxed text-balance">
        {member.bio ? (
          <p className="whitespace-pre-wrap">{member.bio}</p>
        ) : (
          <span className="opacity-40 italic">Bio data redacted or unavailable for this operative.</span>
        )}
      </div>

      {/* Footer Links & Barcode */}
      <div className="p-3 hairline-t border-ink/30 bg-ink/5 relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4 text-ink">
          {socialUrl ? (
            <a href={socialUrl} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 hover:text-signal transition-colors flex items-center gap-1.5 mono-label text-[10px]">
              {socialUrl.includes("instagram.com") ? <Instagram className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
              <span className="hidden sm:inline">NETWORK_LINK</span>
            </a>
          ) : (
            <span className="opacity-30 flex items-center gap-1.5 mono-label text-[10px]">
              <LinkIcon className="h-4 w-4" /> NO_LINK
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Barcode className="h-6 w-16 opacity-30 group-hover:opacity-60 transition-opacity text-ink" strokeWidth={1} />
        </div>
      </div>
      
      {/* Scanning laser animation on hover */}
      <div className="absolute inset-x-0 h-px bg-signal opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none z-20" />
    </motion.div>
  );
}
