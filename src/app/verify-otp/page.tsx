"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Loader2, RefreshCw, ShieldCheck, ArrowRight } from "lucide-react";
import { AuthShell, AuthPanel } from "@/components/auth-shell";

type Search = { email?: string; name?: string };

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const name = searchParams.get("name") || "";
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(30);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const setAt = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "");
    if (!clean) {
      const next = [...digits];
      next[i] = "";
      setDigits(next);
      return;
    }
    const next = [...digits];
    // Handle paste of full code
    if (clean.length > 1) {
      const chars = clean.slice(0, 6 - i).split("");
      chars.forEach((c, k) => (next[i + k] = c));
      setDigits(next);
      const last = Math.min(i + chars.length, 5);
      refs.current[last]?.focus();
      return;
    }
    next[i] = clean;
    setDigits(next);
    if (i < 5) refs.current[i + 1]?.focus();
  };

  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) refs.current[i + 1]?.focus();
  };

  const code = digits.join("");
  const complete = code.length === 6;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complete) return;
    setError(null);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    if (code === "000000") {
      setError("INVALID PACKET · TRY AGAIN");
      return;
    }
    router.push("/login");
  };

  const onResend = () => {
    if (cooldown > 0) return;
    setCooldown(30);
    setDigits(Array(6).fill(""));
    refs.current[0]?.focus();
  };

  return (
    <AuthShell topRight={<span className="hidden sm:inline">CHANNEL / ENCRYPTED</span>}>
      <AuthPanel code="AUTH / 03" title="6-DIGIT CLEARANCE" signal="LIVE">
        <div className="mb-5">
          <div className="mono-label opacity-60 mb-1">PACKET · INBOUND</div>
          <h1 className="display-num text-[44px] md:text-[56px] leading-[0.95] text-ink">
            Verify<span className="text-signal">.</span>
          </h1>
          <p className="font-display italic text-ink/70 mt-1">
            We dispatched a 6-digit code{" "}
            {email ? (
              <>
                to <span className="bg-signal text-bone px-1.5 not-italic font-mono text-sm">{email}</span>
              </>
            ) : (
              <>to your inbox</>
            )}.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <div className="flex items-end justify-between mb-2">
              <span className="mono-label">CODE</span>
              <span className="mono-label opacity-50">STR / OTP-06</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {digits.map((d, i) => (
                <motion.input
                  key={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={d}
                  onChange={(e) => setAt(i, e.target.value)}
                  onKeyDown={(e) => onKey(i, e)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className="hairline bg-bone aspect-square text-center font-display text-3xl font-black text-ink focus:outline-none focus:bg-acid/30 focus:border-signal transition-colors caret-signal"
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="mono-label opacity-50">
                {complete ? "PACKET COMPLETE · READY" : `${code.length}/6 DIGITS`}
              </span>
              <button
                type="button"
                onClick={onResend}
                disabled={cooldown > 0}
                className="mono-label text-signal hover:underline disabled:opacity-50 disabled:no-underline flex items-center gap-1"
              >
                <RefreshCw className={`h-3 w-3 ${cooldown > 0 ? "" : "hover:rotate-90 transition-transform"}`} />
                {cooldown > 0 ? `RESEND IN ${cooldown}s` : "RESEND CODE"}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="hairline border-signal bg-signal/10 px-3 py-2 mono-label text-signal"
            >
              ⚠ {error}
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={!complete || loading}
            className="w-full brick px-3 py-3 mono-label text-bone flex items-center justify-center gap-2 hover:bg-signal transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                VERIFYING PACKET…
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                CONFIRM · UNLOCK CIRCLE
              </>
            )}
          </motion.button>
        </form>

        <div className="hairline-t border-ink/30 mt-6 pt-4 flex items-center justify-between mono-label">
          <span className="opacity-60">WRONG EMAIL?</span>
          <Link href="/register" className="text-signal hover:underline flex items-center gap-1">
            EDIT DOSSIER <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </AuthPanel>
    </AuthShell>
  );
}


export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
