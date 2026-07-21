"use client";

import { useState } from "react";
import { Mail, Radio, CheckCircle2, Loader2, AlertTriangle } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to join newsletter");
      }

      setEmail("");
      setStatus("success");
      setMessage("Subscribed! Check your inbox for your welcome dispatch.");
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Unable to join newsletter");
    }
  };

  return (
    <section className="hairline border-ink bg-bone crosshair p-6 md:p-8 shadow-[4px_4px_0_0_oklch(0.13_0.01_60)]">
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-3">
          <div className="mono-label text-signal flex items-center gap-2 text-xs">
            <Radio className="h-3.5 w-3.5 animate-blink" /> NEWSLETTER UPLINK
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase leading-tight">
            Join newsletter
          </h2>
          <p className="font-serif text-ink/75 text-base md:text-lg max-w-2xl">
            Get a direct email whenever a fresh Field Dispatch goes live.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full md:w-[360px] space-y-2">
          <div className="flex hairline border-ink bg-paper">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="grid place-items-center px-3">
              <Mail className="h-4 w-4 text-signal" />
            </div>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="YOUR@EMAIL.COM"
              className="min-w-0 flex-1 bg-transparent py-3 pr-3 mono-label text-xs outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="brick px-4 mono-label text-bone hover:bg-signal transition-colors disabled:opacity-60"
            >
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "JOIN"}
            </button>
          </div>

          {message && (
            <div
              className={`mono-label text-[11px] flex items-center gap-1.5 ${
                status === "error" ? "text-signal" : "text-ink/70"
              }`}
            >
              {status === "error" ? <AlertTriangle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5 text-signal" />}
              {message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
