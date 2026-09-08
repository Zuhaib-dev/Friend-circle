"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { motion } from "motion/react";
import { Mail, Lock, User, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { AuthShell, AuthPanel, GoogleIcon, FieldRow, inputClass } from "@/components/auth-shell";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallbackUrl = searchParams.get("callbackUrl") || searchParams.get("redirect") || "/";
  const callbackUrl = rawCallbackUrl.startsWith("/") ? rawCallbackUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState<"google" | "email" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onGoogle = async () => {
    setLoading("google");
    await new Promise((r) => setTimeout(r, 1000));
    await signIn("google", { callbackUrl });
    setLoading(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading("email");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pwd }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(null);
        return;
      }
      
      setLoading(null);
      router.push(`/verify-otp?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}${callbackUrl !== '/' ? `&callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`);
    } catch {
      setError("Network error. Please try again.");
      setLoading(null);
    }
  };

  return (
    <AuthShell topRight={<span className="hidden sm:inline">ENLIST / TIER 01</span>}>
      <AuthPanel code="AUTH / 02" title="OPERATOR ENLISTMENT" signal="LIVE">
        <div className="mb-5">
          <div className="mono-label opacity-60 mb-1">CLEARANCE · PENDING</div>
          <h1 className="display-num text-[44px] md:text-[56px] leading-[0.95] text-ink">
            Enlist<span className="text-signal">.</span>
          </h1>
          <p className="font-display italic text-ink/70 mt-1">
            Apply for clearance. Full access unlocked upon verification.
          </p>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={onGoogle}
          disabled={loading !== null}
          className="w-full hairline bg-bone px-3 py-3 flex items-center justify-center gap-3 mono-label text-ink hover:bg-ink hover:text-bone transition-colors disabled:opacity-60 disabled:cursor-not-allowed group relative overflow-hidden cursor-pointer"
        >
          {loading === "google" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-signal" />
              <span>HANDSHAKE / GOOGLE OAUTH…</span>
            </>
          ) : (
            <>
              <GoogleIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>SIGN UP WITH GOOGLE</span>
              <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 hairline-t border-ink/30" />
          <span className="mono-label opacity-60">OR / MANUAL FORM</span>
          <div className="flex-1 hairline-t border-ink/30" />
        </div>

        {error && (
          <div className="mb-4 p-3 hairline border-signal bg-signal/10 mono-label text-xs text-signal">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <FieldRow label="FULL NAME" code="STR / 01">
            <div className="relative">
              <User className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-signal" />
              <input
                type="text"
                required
                autoComplete="name"
                aria-label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Zuhaib Rashid"
                className={`${inputClass} pl-9`}
              />
            </div>
          </FieldRow>

          <FieldRow label="EMAIL ADDRESS" code="STR / 02">
            <div className="relative">
              <Mail className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-signal" />
              <input
                type="email"
                required
                autoComplete="email"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@circle.kashmir"
                className={`${inputClass} pl-9`}
              />
            </div>
          </FieldRow>

          <FieldRow label="CREATE PASSWORD" code="STR / 03">
            <div className="relative">
              <Lock className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-signal" />
              <input
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                aria-label="Create password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="••••••••••••"
                className={`${inputClass} pl-9`}
              />
            </div>
          </FieldRow>

          <p className="mono-label text-[10px] opacity-60 pt-1">
            By enlisting, you agree to the Kashmir Field Code of Conduct & Telemetry Terms.
          </p>

          <motion.button
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading !== null}
            className="w-full brick px-3 py-3 mono-label text-bone flex items-center justify-center gap-2 hover:bg-signal transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading === "email" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                TRANSMITTING DOSSIER…
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                ENLIST · SUBMIT DOSSIER
              </>
            )}
          </motion.button>
        </form>

        <div className="hairline-t border-ink/30 mt-6 pt-4 flex items-center justify-between mono-label">
          <span className="opacity-60">ALREADY CLEARANCE?</span>
          <Link href={`/login${callbackUrl !== '/' ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`} className="text-signal hover:underline flex items-center gap-1">
            LOGIN HERE <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </AuthPanel>
    </AuthShell>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bone flex items-center justify-center mono-label text-signal gap-2">
          <Loader2 className="h-5 w-5 animate-spin" /> LOADING ENLISTMENT…
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
