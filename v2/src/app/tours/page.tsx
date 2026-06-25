"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Search, MapPin, Calendar, X, Send, Lock, Radio,
  ChevronRight, Filter, Mountain, Compass, Tent, Fish,
  ImageIcon
} from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { Crosshairs } from "@/app/admin/components/shared";
import { useSession } from "next-auth/react";

type Status = "UPCOMING" | "COMPLETED" | "CANCELLED";
type Tour = {
  _id: string; 
  name: string; 
  place: string; 
  coordinates?: string;
  date: string; 
  time?: string; 
  status: Status; 
  description: string; 
  coverImage?: string;
  distance?: string; 
  elevation?: string; 
  partySize?: number;
};
type Msg = { 
  _id: string; 
  author: { name: string; image?: string; _id: string }; 
  text: string; 
  createdAt: string; 
};

const STATUS_META: Record<Status, { label: string; dot: string; ring: string; text: string }> = {
  UPCOMING: { label: "UPCOMING", dot: "bg-[oklch(0.78_0.18_140)]", ring: "shadow-[0_0_8px_oklch(0.78_0.18_140)]", text: "text-[oklch(0.78_0.18_140)]" },
  COMPLETED: { label: "COMPLETED", dot: "bg-ink/40", ring: "", text: "text-ink/50" },
  CANCELLED: { label: "CANCELLED", dot: "bg-signal", ring: "shadow-[0_0_8px_var(--signal)]", text: "text-signal" },
};

const FILTERS: { key: "ALL" | Status; label: string }[] = [
  { key: "UPCOMING", label: "UPCOMING" },
  { key: "COMPLETED", label: "COMPLETED" },
  { key: "ALL", label: "ALL" },
];

export default function ToursPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"ALL" | Status>("UPCOMING");
  const [active, setActive] = useState<Tour | null>(null);
  const [utc, setUtc] = useState("");
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    fetch("/api/tours")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setTours(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setUtc(`${String(d.getUTCHours()).padStart(2,"0")}:${String(d.getUTCMinutes()).padStart(2,"0")}:${String(d.getUTCSeconds()).padStart(2,"0")} UTC`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tours.filter((t) => {
      if (filter !== "ALL" && t.status !== filter) return false;
      if (!q) return true;
      return t.name.toLowerCase().includes(q) || t.place.toLowerCase().includes(q);
    });
  }, [query, filter, tours]);

  return (
    <div className="min-h-screen bg-bone text-ink paper-grain">
      <TopNav />

      <section className="hairline-b border-ink relative overflow-hidden">
        <div className="px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mono-label opacity-60 mb-3">
            <Radio className="h-3 w-3 text-signal animate-blink" />
            <span>DISPATCH // TOUR ITINERARY</span>
            <span className="opacity-40">·</span>
            <span suppressHydrationWarning>{utc}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight uppercase">
            [ ROUTES ] <span className="text-signal italic">·</span> <br className="md:hidden" />
            field dispatch log
          </h1>
          <p className="mono-label opacity-60 mt-4 max-w-xl">
            // tactical itinerary of past, active, and queued expeditions. select a route to open comms.
          </p>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/20 hairline border-ink/40">
            {[
              { k: "QUEUED", v: tours.filter((t) => t.status === "UPCOMING").length },
              { k: "COMPLETED", v: tours.filter((t) => t.status === "COMPLETED").length },
              { k: "ABORTED", v: tours.filter((t) => t.status === "CANCELLED").length },
              { k: "TOTAL OPS", v: tours.length },
            ].map((s) => (
              <div key={s.k} className="bg-bone px-3 py-2.5">
                <div className="mono-label opacity-50">{s.k}</div>
                <div className="font-display text-2xl leading-none mt-1">{String(s.v).padStart(2, "0")}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sticky top-[41px] z-30 bg-bone hairline-b border-ink">
        <div className="px-4 md:px-8 py-3 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2 hairline border-ink px-2.5 py-1.5 flex-1 min-w-0 group focus-within:bg-ink focus-within:text-bone transition-colors">
            <Search className="h-3.5 w-3.5 text-signal group-focus-within:text-bone" />
            <span className="mono-label opacity-50 group-focus-within:opacity-100">{">"}</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="search_routes.exe — name / location" className="bg-transparent outline-none mono-label flex-1 placeholder:opacity-40" />
            {query && <button onClick={() => setQuery("")} aria-label="Clear" className="opacity-60 hover:opacity-100"><X className="h-3.5 w-3.5" /></button>}
          </div>

          <div className="flex items-center gap-1 hairline border-ink p-1">
            <Filter className="h-3 w-3 text-signal mx-1.5" />
            {FILTERS.map((f) => (
              <button key={f.key} onClick={() => setFilter(f.key)} className={`mono-label px-2.5 py-1 transition-colors ${filter === f.key ? "bg-ink text-bone" : "hover:bg-ink/10"}`}>{f.label}</button>
            ))}
          </div>

          <div className="mono-label opacity-60 whitespace-nowrap">
            <span className="text-signal">●</span> {String(filtered.length).padStart(2, "0")} / {String(tours.length).padStart(2, "0")} FRAMES
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
        {filtered.length === 0 ? <EmptyState /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((t, i) => <TourCard key={t._id} tour={t} index={i} onOpen={() => setActive(t)} />)}
            </AnimatePresence>
          </div>
        )}
      </section>

      <AnimatePresence>{active && <TourModal tour={active} onClose={() => setActive(null)} />}</AnimatePresence>

      <footer className="hairline-t border-ink mt-12">
        <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto mono-label opacity-60 flex flex-wrap items-center justify-between gap-3">
          <span>FRIEND CIRCLE / KMR · DISPATCH v2.6</span>
          <span className="flex items-center gap-2"><Lock className="h-3 w-3 text-signal" /> CHANNEL ENCRYPTED · OTR</span>
        </div>
      </footer>
    </div>
  );
}

function TourCard({ tour, index, onOpen }: { tour: Tour; index: number; onOpen: () => void }) {
  const meta = STATUS_META[tour.status];
  
  return (
    <motion.button
      layout onClick={onOpen}
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="group relative hairline border-ink bg-bone text-left overflow-hidden focus:outline-none flex flex-col h-full"
    >
      <Crosshairs />
      <div className="relative aspect-16/10 overflow-hidden hairline-b border-ink bg-ink/5">
        {tour.coverImage ? (
          <motion.img src={tour.coverImage} alt={tour.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-500" whileHover={{ scale: 1.04 }} transition={{ duration: 0.6, ease: "easeOut" }} draggable={false} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Mountain className="h-20 w-20" />
          </div>
        )}
        <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0 1px, transparent 1px 3px)" }} />
        <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
        <div className="absolute top-2 left-2 brick text-bone mono-label px-1.5 py-0.5 flex items-center gap-1.5 uppercase">OP-{tour._id.slice(-5)}</div>
        <div className="absolute top-2 right-2 flex items-center gap-1.5 hairline border-bone/70 bg-ink/70 backdrop-blur px-1.5 py-0.5 mono-label text-bone">
          <span className={`relative h-2 w-2 ${meta.dot} ${meta.ring}`}>
            {tour.status === "UPCOMING" && <motion.span className={`absolute inset-0 ${meta.dot} rounded-full`} animate={{ scale: [1, 2.2], opacity: [0.7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }} />}
          </span>
          {meta.label}
        </div>
        <div className="absolute bottom-0 inset-x-0 px-2.5 py-1.5 mono-label text-bone flex items-center justify-between">
          <span className="flex items-center gap-1.5 truncate"><MapPin className="h-3 w-3 text-signal shrink-0" /> <span className="truncate">{tour.place}</span></span>
          <span className="opacity-70 whitespace-nowrap ml-2">{tour.coordinates || "—"}</span>
        </div>
      </div>
      <div className="p-3.5 space-y-2 flex-1 flex flex-col">
        <h3 className="font-display text-lg leading-tight uppercase">{tour.name}</h3>
        <p className="mono-label opacity-70 line-clamp-2 flex-1">{tour.description || "NO MISSION BRIEFING."}</p>
        <div className="grid grid-cols-3 gap-px bg-ink/15 hairline border-ink/30 mt-2">
          {[
            { k: "DATE", v: new Date(tour.date).toLocaleDateString() },
            { k: "DIST", v: tour.distance ? `${tour.distance} KM` : "—" },
            { k: "ELEV", v: tour.elevation ? `${tour.elevation} M` : "—" },
          ].map((s) => (
            <div key={s.k} className="bg-bone px-2 py-1.5">
              <div className="mono-label opacity-50 text-[9px]">{s.k}</div>
              <div className="mono-label truncate">{s.v}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="mono-label opacity-60 flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {tour.time || "TBD"} · {tour.partySize ? `PARTY ${tour.partySize}` : "TBD"}</span>
          <span className="mono-label flex items-center gap-1 text-signal group-hover:gap-2 transition-all">OPEN COMMS <ChevronRight className="h-3 w-3" /></span>
        </div>
      </div>
    </motion.button>
  );
}

function EmptyState() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative hairline border-ink p-12 text-center">
      <Crosshairs />
      <Radio className="h-8 w-8 mx-auto text-signal mb-3 animate-blink" />
      <div className="font-display text-2xl">NO ROUTES MATCH QUERY</div>
      <div className="mono-label opacity-60 mt-2">// adjust filters or clear search to re-acquire signal</div>
    </motion.div>
  );
}

function TourModal({ tour, onClose }: { tour: Tour; onClose: () => void }) {
  const meta = STATUS_META[tour.status];
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  
  const canCommunicate = session?.user?.role === "ADMIN" || session?.user?.teamMemberStatus === "APPROVED";

  useEffect(() => {
    if (!canCommunicate) return;
    fetch(`/api/tours/${tour._id}/comments`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setMessages(data);
      })
      .catch(console.error);
  }, [tour._id, canCommunicate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const send = async () => {
    const body = draft.trim();
    if (!body || !canCommunicate) return;
    
    setDraft("");
    
    try {
      const res = await fetch(`/api/tours/${tour._id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: body }),
      });
      if (res.ok) {
        const newMsg = await res.json();
        setMessages((m) => [...m, newMsg]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-60 bg-ink/80 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6" onClick={onClose}>
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} onClick={(e) => e.stopPropagation()} className="relative w-full md:max-w-5xl md:max-h-[92vh] h-[95vh] md:h-auto bg-bone hairline border-ink shadow-[6px_6px_0_0_var(--signal)] flex flex-col">
        <Crosshairs />
        <div className="hairline-b border-ink px-4 py-2.5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 mono-label min-w-0">
            <span className="text-signal animate-blink">●</span>
            <span className="opacity-60 hidden md:inline">DISPATCH /</span>
            <span className="truncate uppercase">OP-{tour._id.slice(-5)} · {tour.name}</span>
          </div>
          <button onClick={onClose} className="hairline border-ink p-1.5 hover:bg-signal hover:border-signal hover:text-bone transition-colors" aria-label="Close"><X className="h-3.5 w-3.5" /></button>
        </div>

        <div className="grid md:grid-cols-[1.1fr_1fr] flex-1 min-h-0">
          <div className="hairline-b md:hairline-r md:hairline-b-0 border-ink/30 p-4 overflow-y-auto custom-scroll">
            <div className="relative aspect-video overflow-hidden hairline border-ink mb-3 bg-ink/5">
              {tour.coverImage ? (
                 <img src={tour.coverImage} alt={tour.name} className="w-full h-full object-cover" />
              ) : (
                 <div className="absolute inset-0 flex items-center justify-center opacity-10">
                   <Mountain className="h-16 w-16" />
                 </div>
              )}
              <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0 1px, transparent 1px 3px)" }} />
              <div className="absolute top-2 right-2 hairline border-bone/70 bg-ink/70 px-1.5 py-0.5 mono-label text-bone flex items-center gap-1.5 uppercase">
                <span className={`h-2 w-2 ${meta.dot} ${meta.ring}`} /> {meta.label}
              </div>
            </div>
            <h2 className="font-display text-2xl leading-tight uppercase">{tour.name}</h2>
            <p className="mono-label opacity-70 mt-2">{tour.description || "NO MISSION BRIEFING PROVIDED."}</p>
            <div className="mt-4 grid grid-cols-2 gap-px bg-ink/15 hairline border-ink/30 uppercase">
              {[
                ["LOCATION", tour.place], ["COORDS", tour.coordinates || "—"],
                ["DATE", new Date(tour.date).toLocaleDateString()], ["TIME", tour.time || "—"],
                ["DISTANCE", tour.distance ? `${tour.distance} KM` : "—"], ["ELEVATION", tour.elevation ? `${tour.elevation} M` : "—"],
                ["PARTY", tour.partySize ? `${tour.partySize} CREW` : "—"], ["STATUS", meta.label],
              ].map(([k, v]) => (
                <div key={k} className="bg-bone px-2.5 py-2">
                  <div className="mono-label opacity-50 text-[9px]">{k}</div>
                  <div className="mono-label truncate">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col min-h-0 bg-[oklch(0.97_0.005_60)]">
            <div className="hairline-b border-ink/30 px-3 py-2 mono-label flex items-center justify-between bg-ink text-bone shrink-0">
              <span className="flex items-center gap-2"><Lock className="h-3 w-3 text-signal" /> TACTICAL COMMS</span>
              <span className="opacity-60">CH-{tour._id.slice(-4).toUpperCase()} · E2E · OTR</span>
            </div>
            
            {canCommunicate ? (
              <>
                <div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scroll">
                  {messages.map((m, i) => <MessageRow key={m._id} m={m} sessionUserId={session?.user?.id} />)}
                  {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center opacity-30 mono-label gap-2">
                      <Radio className="h-6 w-6" />
                      <span>NO TRANSMISSIONS LOGGED</span>
                    </div>
                  )}
                </div>
                <div className="hairline-t border-ink p-2 flex items-center gap-2 bg-bone shrink-0">
                  <span className="mono-label text-signal pl-1">{">"}</span>
                  <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), send())} placeholder="transmit_message.exe — encrypted" className="flex-1 bg-transparent outline-none mono-label py-1.5 placeholder:opacity-40" />
                  <button onClick={send} disabled={!draft.trim()} className="brick text-bone px-3 py-1.5 mono-label flex items-center gap-1.5 hover:bg-signal hover:border-signal transition-colors disabled:opacity-40 disabled:hover:bg-ink">
                    <Send className="h-3 w-3" /> SEND
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[url('/noise.png')] opacity-80">
                <Lock className="h-10 w-10 text-signal mb-3" />
                <div className="font-display text-xl uppercase">CLEARANCE DENIED</div>
                <div className="mono-label opacity-60 mt-2">
                  // COMMS LOG RESTRICTED TO FIELD OPERATORS ONLY. AUTHENTICATE TO ACCESS SECURE CHANNEL.
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MessageRow({ m, sessionUserId }: { m: Msg; sessionUserId?: string }) {
  const self = m.author._id === sessionUserId;
  const time = new Date(m.createdAt).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit' }) + 'Z';
  
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2 ${self ? "flex-row-reverse" : ""}`}>
      {m.author.image ? (
        <img src={m.author.image} alt="" className="h-7 w-7 shrink-0 object-cover grayscale brick border border-ink/40" />
      ) : (
        <div className="brick text-bone mono-label h-7 w-7 flex items-center justify-center shrink-0 text-[10px]">{m.author.name.slice(0, 2).toUpperCase()}</div>
      )}
      <div className={`max-w-[85%] ${self ? "items-end text-right" : ""} flex flex-col`}>
        <div className="mono-label opacity-60 flex items-center gap-2"><span>{m.author.name.toUpperCase().split(' ')[0]}</span><span className="opacity-50">· {time}</span></div>
        <div className={`mt-0.5 px-2.5 py-1.5 hairline mono-label leading-snug wrap-break-word whitespace-pre-wrap ${self ? "bg-ink text-bone border-ink" : "bg-bone border-ink/40"}`}>[ {m.text} ]</div>
      </div>
    </motion.div>
  );
}
