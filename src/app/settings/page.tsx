"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TopNav } from "@/components/top-nav";
import { Shield, ShieldAlert, Monitor, Smartphone, Trash2 } from "lucide-react";
import { UAParser } from "ua-parser-js";
import { formatDistanceToNow } from "date-fns";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sessions, setSessions] = useState<any[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchSessions();
    }
  }, [status, router]);

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/user/sessions");
      const data = await res.json();
      if (res.ok) {
        setSessions(data.sessions);
        setCurrentSessionId(data.currentSessionId);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const revokeSession = async (sessionId: string) => {
    if (!confirm("Are you sure you want to revoke this session?")) return;
    
    try {
      setSessions(prev => prev.filter(s => s.sessionId !== sessionId));
      await fetch(`/api/user/sessions?sessionId=${sessionId}`, { method: "DELETE" });
    } catch (err) {
      console.error(err);
      fetchSessions(); // revert on fail
    }
  };

  const formatUserAgent = (uaString: string) => {
    const parser = new UAParser(uaString);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();
    
    let icon = <Monitor className="w-5 h-5 opacity-70" />;
    if (device.type === "mobile" || device.type === "tablet" || os.name === "iOS" || os.name === "Android") {
      icon = <Smartphone className="w-5 h-5 opacity-70" />;
    }

    const name = `${browser.name || "Unknown Browser"} on ${os.name || "Unknown OS"}`;
    return { name, icon };
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-ink text-bone flex items-center justify-center mono-label text-xs">
        <span className="animate-pulse">DECRYPTING PROTOCOLS...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-bone selection:bg-signal selection:text-ink flex flex-col">
      <TopNav />
      
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 space-y-12 animate-fade-in pb-24">
        
        {/* Header Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-signal mono-label text-xs">SEC / 01</span>
            <div className="h-[1px] flex-1 bg-bone/20"></div>
          </div>
          <div>
            <h1 className="text-3xl sm:text-5xl font-serif tracking-tight text-bone">Security Protocol.</h1>
            <p className="text-bone/60 mono-label text-xs mt-4 max-w-xl leading-relaxed uppercase">
              Manage your active sessions and secure your account access across all physical and digital domains.
            </p>
          </div>
        </section>

        {/* Active Devices Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-signal mono-label text-xs">SYS / 02</span>
            <div className="h-[1px] flex-1 bg-bone/20"></div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-bone/20 pb-4">
            <div>
              <h2 className="text-2xl font-serif text-bone flex items-center gap-3">
                <Shield className="w-6 h-6 text-signal" />
                Active Devices
              </h2>
              <div className="flex items-center gap-2 mt-2 mono-label text-[10px] text-bone/50">
                <span className="h-1.5 w-1.5 bg-signal rounded-full animate-blink"></span>
                Authorized Sessions: {sessions.length}
              </div>
            </div>
            {/* Placeholder for future passkey logic */}
            <button className="brick px-4 py-2 mono-label text-[10px] text-bone hover:bg-bone hover:text-ink transition-colors hidden sm:block">
              ADD NEW PASSKEY
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-bone/20 mono-label text-[9px] text-bone/50 uppercase tracking-wider">
                  <th className="pb-3 pr-4 font-normal">Type</th>
                  <th className="pb-3 pr-4 font-normal">Device / Browser</th>
                  <th className="pb-3 pr-4 font-normal">IP Address</th>
                  <th className="pb-3 pr-4 font-normal">Last Active</th>
                  <th className="pb-3 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="mono-label text-xs">
                {sessions.map((s) => {
                  const isCurrent = s.sessionId === currentSessionId;
                  const { name, icon } = formatUserAgent(s.userAgent);
                  return (
                    <tr key={s.sessionId} className="border-b border-bone/10 hover:bg-bone/5 transition-colors group">
                      <td className="py-4 pr-4 align-top">
                        <div className="flex items-center justify-center w-8 h-8 rounded bg-bone/10 border border-bone/20">
                          {icon}
                        </div>
                      </td>
                      <td className="py-4 pr-4 align-top">
                        <div className="flex flex-col gap-1">
                          <span className="text-bone">{name}</span>
                          {isCurrent && (
                            <span className="text-[9px] text-signal uppercase tracking-wider border border-signal/30 bg-signal/10 px-1.5 py-0.5 rounded-sm w-max inline-block">
                              Current
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 pr-4 align-top text-bone/60 break-all max-w-[200px]">
                        {s.ip}
                      </td>
                      <td className="py-4 pr-4 align-top text-bone/60">
                        {formatDistanceToNow(new Date(s.lastActive), { addSuffix: true })}
                      </td>
                      <td className="py-4 align-top text-right">
                        {!isCurrent ? (
                          <button
                            onClick={() => revokeSession(s.sessionId)}
                            className="inline-flex items-center justify-center px-3 py-1.5 text-[9px] uppercase tracking-wider text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-ink transition-colors rounded-sm"
                          >
                            Revoke
                          </button>
                        ) : (
                          <span className="inline-flex items-center justify-center px-3 py-1.5 text-[9px] uppercase tracking-wider text-bone/30 cursor-not-allowed">
                            Active
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {sessions.length === 0 && (
              <div className="text-center py-8 mono-label text-xs text-bone/40 border-b border-bone/10">
                NO ACTIVE SESSIONS FOUND
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
