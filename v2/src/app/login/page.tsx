"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, ArrowRight, Loader2, KeyRound } from "lucide-react";
import { AuthShell, AuthPanel, GoogleIcon, FieldRow, inputClass } from "@/components/auth-shell";

export default function LoginPage() {
  const router = useRouter();
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
    const res = await signIn("credentials", { redirect: false, email, password: pwd });
    if (res?.error) {
      setLoading(null);
      return alert(res.error);
    }
    setLoading(null);
    router.push("/");
  };

  return (
    <AuthShell topRight={<span className="hidden sm:inline">SESSION / NEW</span>}>
      <AuthPanel code="AUTH / 01" title="OPERATOR LOGIN" signal="LIVE">
        <div className="mb-5">
          <div className="mono-label opacity-60 mb-1">ACCESS · TIER 02</div>
          <h1 className="display-num text-[44px] md:text-[56px] leading-[0.95] text-ink">
            Welcome<span className="text-signal">.</span>
          </h1>
          <p className="font-display italic text-ink/70 mt-1">
            Authenticate to rejoin the campfire.
          </p>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={onGoogle}
          disabled={loading !== null}
          className="w-full hairline bg-bone px-3 py-3 flex items-center justify-center gap-3 mono-label text-ink hover:bg-ink hover:text-bone transition-colors disabled:opacity-60 disabled:cursor-not-allowed group relative overflow-hidden"
        >
          {loading === "google" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-signal" />
              <span>HANDSHAKE / GOOGLE OAUTH…</span>
            </>
          ) : (
            <>
              <GoogleIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>CONTINUE WITH GOOGLE</span>
              <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </button>

        {/* divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 hairline-t border-ink/30" />
          <span className="mono-label opacity-60">OR / MANUAL</span>
          <div className="flex-1 hairline-t border-ink/30" />
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
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
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="••••••••••••"
                className={`${inputClass} pl-9`}
              />
            </div>
          </FieldRow>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 mono-label cursor-pointer">
              <input type="checkbox" className="accent-signal h-3 w-3" />
              KEEP SESSION
            </label>
            <a className="mono-label text-signal hover:underline cursor-pointer">FORGOT KEY?</a>
          </div>

          <motion.button
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading !== null}
            className="w-full brick px-3 py-3 mono-label text-bone flex items-center justify-center gap-2 hover:bg-signal transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading === "email" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                AUTHENTICATING…
              </>
            ) : (
              <>
                <KeyRound className="h-4 w-4" />
                AUTHENTICATE · ENTER BASE
              </>
            )}
          </motion.button>
        </form>

        <div className="hairline-t border-ink/30 mt-6 pt-4 flex items-center justify-between mono-label">
          <span className="opacity-60">NEW OPERATOR?</span>
          <Link href="/register" className="text-signal hover:underline flex items-center gap-1">
            REQUEST CLEARANCE <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </AuthPanel>
    </AuthShell>
  );
}
