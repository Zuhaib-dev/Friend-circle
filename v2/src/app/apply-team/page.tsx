"use client";

import { useState } from "react";
import { TopNav } from "@/components/top-nav";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, Crosshair, Terminal, CheckCircle2, Loader2, Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { initialsOf } from "@/lib/utils";

export default function ApplyTeamPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const user = session?.user;

  // Render Avatar
  const renderAvatar = () => {
    if (!user) return null;
    if (user.image) {
      return <img src={user.image} alt={user.name || "Operator"} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />;
    }
    return (
      <div className="w-full h-full flex items-center justify-center brick text-bone font-display text-4xl">
        {initialsOf(user.name || "Operator")}
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedPhone = details.replace(/[^0-9+]/g, '');

    if (!sanitizedPhone) {
      setError("PLEASE PROVIDE A VALID PHONE NUMBER");
      return;
    }

    if (sanitizedPhone.replace(/[^0-9]/g, '').length < 10) {
      setError("PHONE NUMBER MUST BE AT LEAST 10 DIGITS");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/apply-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ details: sanitizedPhone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      await update(); // Update NextAuth session to reflect new status if possible
      setSuccess(true);
      
      // Redirect back home after 3 seconds
      setTimeout(() => {
        router.push("/");
      }, 3000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // If unauthenticated or already applied/approved
  if (!user) {
    return (
      <main className="min-h-screen bg-bone text-ink flex flex-col">
        <TopNav />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="hairline border-ink/30 p-8 flex flex-col items-center gap-4 max-w-sm w-full text-center">
            <ShieldAlert className="h-8 w-8 text-signal" />
            <div className="font-display text-2xl">ACCESS DENIED</div>
            <div className="mono-label opacity-60">Authentication required for enlistment.</div>
          </div>
        </div>
      </main>
    );
  }

  if (user.teamMemberStatus === "PENDING") {
    return (
      <main className="min-h-screen bg-bone text-ink flex flex-col">
        <TopNav />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="hairline border-ink/30 p-8 flex flex-col items-center gap-4 max-w-sm w-full text-center">
            <CheckCircle2 className="h-8 w-8 text-signal animate-pulse" />
            <div className="font-display text-2xl">CLEARANCE PENDING</div>
            <div className="mono-label opacity-60">Command is reviewing your dossier. Please hold.</div>
          </div>
        </div>
      </main>
    );
  }

  if (user.role === "TEAM_MEMBER" || user.role === "ADMIN") {
     return (
      <main className="min-h-screen bg-bone text-ink flex flex-col">
        <TopNav />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="hairline border-ink/30 p-8 flex flex-col items-center gap-4 max-w-sm w-full text-center">
            <ShieldAlert className="h-8 w-8 text-signal" />
            <div className="font-display text-2xl">ALREADY CLEARED</div>
            <div className="mono-label opacity-60">You already possess operational clearance.</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bone text-ink relative overflow-hidden flex flex-col">
      <TopNav />

      {/* Mission strip */}
      <div className="hairline-b border-ink bg-bone">
        <div className="flex items-center px-4 py-1.5 mono-label gap-3">
          <span className="brick px-2 py-[1px] text-bone">FORM · 04</span>
          <span className="opacity-70 truncate">OPERATOR ENLISTMENT APPLICATION</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 tick-v opacity-30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 tick opacity-30" />

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hairline border-ink bg-bone p-8 max-w-md w-full flex flex-col items-center justify-center text-center gap-4 relative"
            >
              <div className="absolute top-2 left-2 w-2 h-2 hairline-b hairline-r border-ink" />
              <div className="absolute top-2 right-2 w-2 h-2 hairline-b hairline-l border-ink" />
              <div className="absolute bottom-2 left-2 w-2 h-2 hairline-t hairline-r border-ink" />
              <div className="absolute bottom-2 right-2 w-2 h-2 hairline-t hairline-l border-ink" />
              
              <CheckCircle2 className="h-10 w-10 text-signal" />
              <div className="font-display text-3xl">DOSSIER SUBMITTED</div>
              <div className="mono-label opacity-60">Secure channel opened. Stand by for command verification. Re-routing...</div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 z-10 relative"
            >
              {/* Left col: ID Badge */}
              <div className="flex flex-col gap-3">
                <div className="mono-label opacity-50 flex items-center gap-1.5"><Crosshair className="h-3 w-3 text-signal" /> ID BADGE</div>
                <div className="hairline border-ink bg-bone aspect-[3/4] relative group overflow-hidden">
                  <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_40px_rgba(28,28,26,0.1)]" />
                  {renderAvatar()}
                  <div className="absolute bottom-0 inset-x-0 p-2 bg-ink/80 backdrop-blur-sm text-bone mono-label text-[10px] flex items-center justify-between z-20">
                    <span className="truncate pr-2">{user.name}</span>
                    <span className="text-signal">UNVERIFIED</span>
                  </div>
                </div>
                <div className="hairline border-ink/30 p-2 mono-label text-[10px] text-ink/60 flex items-start gap-1.5">
                  <Info className="h-3 w-3 shrink-0 mt-0.5" />
                  Your current profile photo will be used for your Operator ID.
                </div>
              </div>

              {/* Right col: Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <header className="mb-2">
                  <h1 className="font-display text-4xl uppercase tracking-tight">Enlistment</h1>
                  <p className="mono-label opacity-60 mt-1">Submit your details for field clearance.</p>
                </header>

                <div className="space-y-1">
                  <label className="mono-label text-[11px] opacity-70">OPERATOR NAME</label>
                  <div className="hairline border-ink/30 px-3 py-2 font-mono text-sm bg-ink/5 opacity-60">
                    {user.name}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="mono-label text-[11px] opacity-70 flex items-center justify-between">
                    <span>OPERATOR CONTACT NUMBER</span>
                    <span className="text-signal">*REQUIRED</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value.replace(/[^0-9+\s-]/g, ''))}
                    placeholder="+91 9876543210"
                    className="w-full hairline border-ink bg-transparent px-3 py-3 font-mono text-sm placeholder:text-ink/30 focus:outline-none focus:ring-1 focus:ring-signal focus:border-signal transition-all tracking-wider"
                  />
                </div>

                {error && (
                  <div className="mono-label text-[10px] text-acid bg-acid/10 px-2 py-1 hairline border-acid/30 flex items-center gap-1.5">
                    <Terminal className="h-3 w-3" /> {error}
                  </div>
                )}

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="mt-2 w-full brick py-3 flex items-center justify-center gap-2 text-bone mono-label hover:bg-signal hover:border-signal transition-colors disabled:opacity-50 disabled:hover:bg-ink disabled:hover:border-ink cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-signal" />
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-signal" />
                      SUBMIT DOSSIER
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
