
"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Activity, Radar, ShieldCheck, Image as ImageIcon, Lock, Crosshair as CrosshairIcon } from "lucide-react";
import { TopNav } from "@/components/top-nav";

import { NavBtn, Row, type View, type Operator, type Intel, type LogEntry } from "./components/shared";
import { OverviewView } from "./components/overview-view";
import { OperatorsView } from "./components/operators-view";
import { IntelView } from "./components/intel-view";

// ---------- Seed data ----------
const SEED_OPS: Operator[] = [
  { id: "OP-7714", callsign: "GHOST", name: "Yasir Bhat", email: "yasir@circle.fc", ts: Date.now() - 1000 * 60 * 12 },
  { id: "OP-7715", callsign: "RAVEN", name: "Mehran Wani", email: "mehran@circle.fc", ts: Date.now() - 1000 * 60 * 47 },
  { id: "OP-7716", callsign: "ECHO-9", name: "Suhail Lone", email: "suhail@circle.fc", ts: Date.now() - 1000 * 60 * 92 },
  { id: "OP-7717", callsign: "VIPER", name: "Adil Mir", email: "adil@circle.fc", ts: Date.now() - 1000 * 60 * 188 },
  { id: "OP-7718", callsign: "NOMAD", name: "Faizan Dar", email: "faizan@circle.fc", ts: Date.now() - 1000 * 60 * 410 },
];

const PLACEHOLDER_IMG = (seed: string, w = 400, h = 500) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const SEED_INTEL: Intel[] = [
  { id: "INT-491", uploader: "GHOST", url: PLACEHOLDER_IMG("fc-int-491", 600, 800), ts: Date.now() - 1000 * 60 * 8, size: "2.4 MB", caption: "RIDGE-LINE · DAWN PATROL" },
  { id: "INT-492", uploader: "RAVEN", url: PLACEHOLDER_IMG("fc-int-492", 600, 400), ts: Date.now() - 1000 * 60 * 22, size: "1.8 MB", caption: "OFFROAD CONVOY" },
  { id: "INT-493", uploader: "ECHO-9", url: PLACEHOLDER_IMG("fc-int-493", 600, 700), ts: Date.now() - 1000 * 60 * 55, size: "3.1 MB", caption: "TROUT STRIKE · LIDDER" },
  { id: "INT-494", uploader: "VIPER", url: PLACEHOLDER_IMG("fc-int-494", 600, 500), ts: Date.now() - 1000 * 60 * 71, size: "2.0 MB", caption: "WAZWAN PREP" },
  { id: "INT-495", uploader: "NOMAD", url: PLACEHOLDER_IMG("fc-int-495", 600, 900), ts: Date.now() - 1000 * 60 * 130, size: "4.2 MB", caption: "STORM ROLL" },
  { id: "INT-496", uploader: "GHOST", url: PLACEHOLDER_IMG("fc-int-496", 600, 450), ts: Date.now() - 1000 * 60 * 188, size: "1.6 MB", caption: "QIBLA MARK · HIGH PASS" },
  { id: "INT-497", uploader: "RAVEN", url: PLACEHOLDER_IMG("fc-int-497", 600, 650), ts: Date.now() - 1000 * 60 * 240, size: "2.9 MB", caption: "CAMPFIRE NIGHT 03" },
  { id: "INT-498", uploader: "ECHO-9", url: PLACEHOLDER_IMG("fc-int-498", 600, 550), ts: Date.now() - 1000 * 60 * 320, size: "2.2 MB", caption: "JEEP TRACK · MUD MILE" },
];

const SEED_LOG: LogEntry[] = [
  { id: "L1", ts: Date.now() - 1000 * 60 * 2, text: "OPERATOR · GHOST · clearance granted", kind: "ok" },
  { id: "L2", ts: Date.now() - 1000 * 60 * 6, text: "INTEL · #487 · verified by CMD", kind: "ok" },
  { id: "L3", ts: Date.now() - 1000 * 60 * 14, text: "INTEL · #486 · classified · purged", kind: "warn" },
  { id: "L4", ts: Date.now() - 1000 * 60 * 31, text: "OPERATOR · WRAITH · enlistment denied", kind: "warn" },
  { id: "L5", ts: Date.now() - 1000 * 60 * 58, text: "SYS · encrypted uplink rotated · AES-256", kind: "info" },
  { id: "L6", ts: Date.now() - 1000 * 60 * 92, text: "INTEL · batch upload · 12 frames received", kind: "info" },
];


// ---------- Page ----------
export default function AdminPage() {
  const [view, setView] = useState<View>("overview");
  const [operators, setOperators] = useState<Operator[]>(SEED_OPS);
  const [intel, setIntel] = useState<Intel[]>(SEED_INTEL);
  const [logs, setLogs] = useState<LogEntry[]>(SEED_LOG);
  const [mounted, setMounted] = useState(false);
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    setMounted(true);
    const tick = () => setClock(new Date().toISOString().slice(11, 19));
    tick();
    const id = setInterval(tick, 1000);

    // Fetch live pending operators
    const fetchOps = async () => {
      try {
        const res = await fetch("/api/admin/users");
        if (res.ok) {
          const users = await res.json();
          setOperators(users.map((u: any) => ({
            id: u._id,
            callsign: u.name?.split(" ")[0] || "UNKNOWN",
            name: u.teamMemberDetails || "No details provided",
            email: u.email,
            ts: new Date(u.updatedAt || u.createdAt || Date.now()).getTime(),
          })));
        }
      } catch (err) {
        console.error("Failed to fetch operators:", err);
      }
    };
    
    // Fetch live pending intel (posts)
    const fetchIntel = async () => {
      try {
        const res = await fetch("/api/admin/posts");
        if (res.ok) {
          const posts = await res.json();
          setIntel(posts.map((p: any) => ({
            id: p._id,
            uploader: p.author?.name?.split(" ")[0].toUpperCase() || "UNKNOWN",
            url: p.imageUrl,
            ts: new Date(p.createdAt).getTime(),
            size: "1.2 MB", // Using approximate compressed size since it's not stored in DB
            caption: p.caption || "NO CAPTION PROVIDED",
          })));
        }
      } catch (err) {
        console.error("Failed to fetch intel:", err);
      }
    };

    fetchOps();
    fetchIntel();

    return () => clearInterval(id);
  }, []);

  const stats = useMemo(
    () => ({
      operators: 42,
      pendingOps: operators.length,
      intel: 1287,
      pendingIntel: intel.length,
    }),
    [operators.length, intel.length]
  );

  const pushLog = (text: string, kind: LogEntry["kind"] = "info") => {
    setLogs((l) =>
      [{ id: `L${Date.now()}`, ts: Date.now(), text, kind }, ...l].slice(0, 30)
    );
  };

  return (
    <main className="min-h-screen bg-bone text-ink relative overflow-hidden">
      <TopNav />

      {/* Mission strip */}
      <div className="hairline-b border-ink bg-bone">
        <div className="flex items-center justify-between px-4 py-1.5 mono-label gap-3">
          <div className="flex items-center gap-3 truncate">
            <span className="brick px-2 py-[1px] text-bone">ADMIN · 00</span>
            <span className="opacity-70 truncate">COMMAND CONSOLE · CLEARANCE OMEGA</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="opacity-60">UTC</span>
            <span className="font-mono tabular-nums" suppressHydrationWarning>
              {clock}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
            <span className="text-signal">SECURE LINK</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] min-h-[calc(100vh-90px)]">
        {/* Sidebar */}
        <aside className="hairline-r border-ink/60 bg-bone relative">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-2 tick-v opacity-40" />
          <div className="p-3 space-y-1">
            <div className="mono-label opacity-50 px-2 py-1">// NAVIGATION</div>
            <NavBtn id="overview" current={view} setView={setView} icon={Radar} label="OVERVIEW" code="01" />
            <NavBtn id="operators" current={view} setView={setView} icon={ShieldCheck} label="OPERATORS" code="02" />
            <NavBtn id="intel" current={view} setView={setView} icon={ImageIcon} label="MEDIA INTEL" code="03" />

            <div className="mono-label opacity-50 px-2 pt-4 pb-1">// QUEUE</div>
            <div className="hairline border-ink/40 p-2 space-y-1.5">
              <Row k="OPS PENDING" v={String(stats.pendingOps).padStart(3, "0")} accent={stats.pendingOps > 0} />
              <Row k="INTEL PENDING" v={String(stats.pendingIntel).padStart(3, "0")} accent={stats.pendingIntel > 0} />
              <Row k="TOTAL OPS" v={String(stats.operators).padStart(3, "0")} />
              <Row k="TOTAL INTEL" v={String(stats.intel)} />
            </div>

            <div className="mt-4 hairline border-ink/40 p-2 mono-label flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-signal" />
                CIPHER
              </span>
              <span className="text-signal">AES·256</span>
            </div>
            <div className="hairline border-ink/40 p-2 mono-label flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CrosshairIcon className="h-3 w-3 text-signal" />
                NODE
              </span>
              <span>KMR-01</span>
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
              {view === "overview" && (
                <OverviewView stats={stats} logs={logs} mounted={mounted} />
              )}
              {view === "operators" && (
                <OperatorsView
                  operators={operators}
                  onGrant={async (op) => {
                    try {
                      const res = await fetch("/api/admin/users", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: op.id, action: "APPROVE" })
                      });
                      if (!res.ok) throw new Error("Failed to grant clearance");
                      setOperators((l) => l.filter((x) => x.id !== op.id));
                      pushLog(`OPERATOR · ${op.callsign} · clearance granted`, "ok");
                    } catch (err) {
                      pushLog(`SYS · error granting clearance to ${op.callsign}`, "warn");
                    }
                  }}
                  onPurge={async (op) => {
                    try {
                      const res = await fetch("/api/admin/users", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: op.id, action: "REJECT" })
                      });
                      if (!res.ok) throw new Error("Failed to purge");
                      setOperators((l) => l.filter((x) => x.id !== op.id));
                      pushLog(`OPERATOR · ${op.callsign} · enlistment denied`, "warn");
                    } catch (err) {
                      pushLog(`SYS · error purging ${op.callsign}`, "warn");
                    }
                  }}
                />
              )}
              {view === "intel" && (
                <IntelView
                  items={intel}
                  onVerify={async (it) => {
                    try {
                      const res = await fetch("/api/admin/posts", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ postId: it.id, action: "APPROVE" })
                      });
                      if (!res.ok) throw new Error("Failed to verify intel");
                      setIntel((l) => l.filter((x) => x.id !== it.id));
                      pushLog(`INTEL · #${it.id.slice(-5).toUpperCase()} · verified`, "ok");
                    } catch (err) {
                      pushLog(`SYS · error verifying intel`, "warn");
                    }
                  }}
                  onClassify={async (it) => {
                    try {
                      const res = await fetch("/api/admin/posts", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ postId: it.id, action: "REJECT" })
                      });
                      if (!res.ok) throw new Error("Failed to classify intel");
                      setIntel((l) => l.filter((x) => x.id !== it.id));
                      pushLog(`INTEL · #${it.id.slice(-5).toUpperCase()} · classified · purged`, "warn");
                    } catch (err) {
                      pushLog(`SYS · error purging intel`, "warn");
                    }
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      <footer className="hairline-t border-ink px-4 py-2 flex items-center justify-between mono-label">
        <span>CMD / ADMIN TERMINAL · v1.0</span>
        <span className="flex items-center gap-1.5">
          <Activity className="h-3 w-3 text-signal" /> ALL SYSTEMS NOMINAL
        </span>
      </footer>
    </main>
  );
}

