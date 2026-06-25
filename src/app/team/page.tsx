
"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Activity, Radar, LayoutGrid, Upload as UploadIcon, Lock } from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { useSession } from "next-auth/react";
import { NavBtn, Row, type View, type Upload, loadUploads, saveUploads } from "./components/shared";
import { OverviewView } from "./components/overview-view";
import { UplinkView } from "./components/uplink-view";
import { DossierView } from "./components/dossier-view";

export default function TeamPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const [view, setView] = useState<View>("overview");
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [clock, setClock] = useState(() => new Date());

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/team/posts");
        if (res.ok) {
          const data = await res.json();
          const mapped = data.map((p: any) => ({
            id: p._id,
            name: p.imageUrl.split('/').pop() || 'INTEL_FILE',
            url: p.imageUrl,
            size: 1024 * 500, // mock size since it's not strictly tracked
            ts: new Date(p.createdAt).getTime(),
            status: p.status
          }));
          setUploads(mapped);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const stats = useMemo(() => {
    const total = uploads.length;
    const pending = uploads.filter((u) => u.status === "PENDING").length;
    const verified = total - pending;
    const clearance = total >= 20 ? "OMEGA" : total >= 10 ? "DELTA" : total >= 3 ? "BRAVO" : "ALPHA";
    return { total, pending, verified, clearance };
  }, [uploads]);

  const utc = clock.toISOString().slice(11, 19);
  const displayName = user?.name ?? "GUEST OPERATOR";

  return (
    <main className="min-h-screen bg-bone text-ink relative overflow-hidden">
      <TopNav />

      {/* Mission strip */}
      <div className="hairline-b border-ink bg-bone">
        <div className="flex items-center justify-between px-4 py-1.5 mono-label gap-3">
          <div className="flex items-center gap-3 truncate">
            <span className="brick px-2 py-px text-bone">PORTAL · 04</span>
            <span className="opacity-70 truncate">OPERATOR · {displayName.toUpperCase()}</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="opacity-60">UTC</span>
            <span className="font-mono tabular-nums">{utc}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
            <span className="text-signal">SECURE LINK</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] min-h-[calc(100vh-90px)]">
        {/* Sidebar */}
        <aside className="hairline-r border-ink/60 bg-bone relative">
          {/* tick rail */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-2 tick-v opacity-40" />
          <div className="p-3 space-y-1">
            <div className="mono-label opacity-50 px-2 py-1">// NAVIGATION</div>
            <NavBtn id="overview" current={view} setView={setView} icon={Radar} label="OVERVIEW" code="01" />
            <NavBtn id="dossier" current={view} setView={setView} icon={LayoutGrid} label="DOSSIER" code="02" />
            <NavBtn id="uplink" current={view} setView={setView} icon={UploadIcon} label="UPLINK" code="03" />

            <div className="mono-label opacity-50 px-2 pt-4 pb-1">// STATUS</div>
            <div className="hairline border-ink/40 p-2 space-y-1.5">
              <Row k="CLEARANCE" v={stats.clearance} accent />
              <Row k="UPLOADS" v={String(stats.total).padStart(3, "0")} />
              <Row k="PENDING" v={String(stats.pending).padStart(3, "0")} />
              <Row k="CHANNEL" v="433.92" />
            </div>

            <div className="mt-4 hairline border-ink/40 p-2 mono-label flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-signal" />
                ENCRYPTED
              </span>
              <span className="text-signal">AES·256</span>
            </div>
          </div>
        </aside>

        {/* Main column */}
        <section className="relative p-4 md:p-6">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 tick-v opacity-30" />

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-6"
            >
              {view === "overview" && <OverviewView stats={stats} name={displayName} uploads={uploads} />}
              {view === "dossier" && <DossierView uploads={uploads} setUploads={setUploads} />}
              {view === "uplink" && (
                <UplinkView
                  onAdd={(items: any[]) => {
                    const next = [...items, ...uploads];
                    setUploads(next);
                  }}
                  onGo={() => setView("dossier")}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      <footer className="hairline-t border-ink px-4 py-2 flex items-center justify-between mono-label">
        <span>OPS / TERMINAL · v2.0</span>
        <span className="flex items-center gap-1.5">
          <Activity className="h-3 w-3 text-signal" /> ALL SYSTEMS NOMINAL
        </span>
      </footer>
    </main>
  );
}

