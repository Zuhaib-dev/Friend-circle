"use client";

import { useState } from "react";
import { Radio, CircleDot, ArrowUpRight } from "lucide-react";
import { Crosshairs } from "./primitives";

export function JoinSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to transmit.");

      setStatus("success");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Unknown error occurred.");
    }
  };

  return (
    <section id="join" className="px-4 md:px-8 py-16 hairline-t border-ink">
      <div className="hairline border-ink crosshair p-6 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start bg-bone">
        <Crosshairs />
        <div>
          <div className="mono-label flex items-center gap-2"><Radio className="h-3.5 w-3.5 text-signal animate-blink" /> OPEN CHANNEL · TRX 7</div>
          <h3 className="display-num text-[clamp(40px,7vw,84px)] mt-2 leading-none">Send a signal<span className="text-signal">.</span></h3>
          <p className="font-display italic text-xl text-ink/70 max-w-xl mt-4">Drop a coordinate. We don't promise a reply — we promise we'll read it by the fire.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-0 hairline border-ink w-full md:w-[400px]">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="YOU@RIDGE.IN"
            required
            disabled={status === "loading" || status === "success"}
            className="bg-bone px-4 py-3 mono-label outline-none w-full hairline-b border-ink focus:bg-ink/5 disabled:opacity-50"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="ENTER COORDINATE OR MESSAGE..."
            required
            disabled={status === "loading" || status === "success"}
            className="bg-bone px-4 py-3 mono-label outline-none w-full h-32 resize-none hairline-b border-ink focus:bg-ink/5 disabled:opacity-50"
          />
          <button 
            disabled={status === "loading" || status === "success"}
            className="brick px-5 py-4 mono-label text-bone hover:bg-signal transition-colors flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {status === "loading" ? (
              <><span className="h-3.5 w-3.5 border-2 border-bone/30 border-t-bone rounded-full animate-spin" /> TRANSMITTING...</>
            ) : status === "success" ? (
              <><CircleDot className="h-3.5 w-3.5 text-emerald-400" /> TRANSMISSION LOGGED</>
            ) : (
              <>TRANSMIT <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></>
            )}
          </button>
          {status === "error" && (
            <div className="bg-red-950 text-red-400 px-4 py-2 mono-label text-[10px] text-center uppercase tracking-wider">
              {errorMsg}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
