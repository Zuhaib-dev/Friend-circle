"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, User, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { AuthShell, AuthPanel, GoogleIcon, FieldRow, inputClass } from "@/components/auth-shell";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState<"google" | "email" | null>(null);

  const onGoogle = async () => {
    setLoading("google");
    await new Promise((r) => setTimeout(r, 1400));
    await signIn("google", { callbackUrl: "/" });
    setLoading(null);
    router.push("/");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("email");
    await new Promise((r) => setTimeout(r, 1100));
    setLoading(null);
    router.push(`/verify-otp?email=${email}&name=${name}`);
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
            Request your call-sign. The crew will brief you at sundown.
          </p>
        </div>

        <button
          type="button"
          onClick={onGoogle}
          disabled={loading !== null}
          className="w-full hairline bg-bone px-3 py-3 flex items-center justify-center gap-3 mono-label text-ink hover:bg-ink hover:text-bone transition-colors disabled:opacity-60 disabled:cursor-not-allowed group"
        >
          {loading === "google" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-signal" />
              <span>HANDSHAKE / GOOGLE OAUTH…</span>
            </>
          ) : (
            <>
              <GoogleIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>ENLIST WITH GOOGLE</span>
              <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 hairline-t border-ink/30" />
          <span className="mono-label opacity-60">OR / MANUAL DOSSIER</span>
          <div className="flex-1 hairline-t border-ink/30" />
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <FieldRow label="FULL NAME" code="STR / 00">
            <div className="relative">
              <User className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-signal" />
              <input
                type="text"
                required
                minLength={2}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aqib Hussain"
                className={`${inputClass} pl-9`}
              />
            </div>
          </FieldRow>

          <FieldRow label="EMAIL" code="STR / 01">
            <div className="relative">
              <Mail className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-signal" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@circle.kashmir"
                className={`${inputClass} pl-9`}
              />
            </div>
          </FieldRow>

          <FieldRow label="PASSWORD" code="STR / 02">
            <div className="relative">
              <Lock className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-signal" />
              <input
                type="password"
                required
                minLength={8}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="MIN · 8 CHARS"
                className={`${inputClass} pl-9`}
              />
            </div>
            <div className="mono-label opacity-50 mt-1">USE 8+ CHARS · MIX SIGNAL & NOISE</div>
          </FieldRow>

          <motion.button
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading !== null}
            className="w-full brick px-3 py-3 mono-label text-bone flex items-center justify-center gap-2 hover:bg-signal transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading === "email" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                FILING DOSSIER…
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                SUBMIT · REQUEST OTP
              </>
            )}
          </motion.button>
        </form>

        <div className="hairline-t border-ink/30 mt-6 pt-4 flex items-center justify-between mono-label">
          <span className="opacity-60">ALREADY ENLISTED?</span>
          <Link href="/login" className="text-signal hover:underline flex items-center gap-1">
            RETURN TO LOGIN <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </AuthPanel>
    </AuthShell>
  );
}
