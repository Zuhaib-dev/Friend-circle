"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Asterisk, MapPin, Phone, Mail, Clock } from "lucide-react";
import { TopNav } from "@/components/top-nav";

export default function ContactClient() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bone text-ink">
      <TopNav />

      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 pt-10 sm:pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 mono-label text-[10px] tracking-[0.18em] uppercase opacity-60 hairline-b border-ink/40 pb-4 mb-10">
          <Meta k="Logged" v="Srinagar / KMR" />
          <Meta k="Base" v="Camp / 01" />
          <Meta k="Channel" v="Open" />
          <Meta k="Response" v="< 24 hrs" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-9">
            <div className="mono-label tracking-[0.25em] uppercase text-signal mb-5 flex items-center gap-2">
              <Asterisk className="h-3 w-3" /> Connect with the Crew
            </div>
            <h1 className="font-display font-black leading-[0.86] tracking-[-0.045em] text-[58px] sm:text-[88px] lg:text-[124px] uppercase">
              Drop a <span className="italic text-signal font-serif normal-case">message</span><br />to basecamp<span className="text-signal">.</span>
            </h1>
          </div>
          <div className="lg:col-span-3">
            <p className="font-serif text-xl leading-snug">
              Got a question about a tour? Want to join the next ride? Reach out. <u className="decoration-signal decoration-2 underline-offset-4">No formalities.</u> Just pure adventure.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 pb-16 grid lg:grid-cols-[1.4fr_1fr] gap-8">
        <ContactForm />
        <FieldOfficeCard />
      </section>

    </div>
  );
}

type Status = "idle" | "sending" | "filed";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", callsign: "", subject: "", message: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("filed");
        setFormData({ name: "", email: "", callsign: "", subject: "", message: "" });
      } else {
        setStatus("idle");
        alert("Failed to send message. Please check your inputs.");
      }
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert("Network error. Could not send message.");
    }
  }

  return (
    <form onSubmit={submit} className="hairline border-ink bg-bone relative">
      <div className="brick mono-label tracking-[0.22em] uppercase py-2 px-4 flex items-center justify-between text-bone">
        <span className="flex items-center gap-2">
          <span className="text-signal animate-blink">●</span> Comms Channel · Active
        </span>
        <span className="text-bone/60">KMR / 24H</span>
      </div>

      <div className="p-6 sm:p-8 grid sm:grid-cols-2 gap-5">
        <Field label="Your Name" placeholder="Zuhaib Rashid" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} required />
        <Field label="Email" type="email" placeholder="zuhaibrashid01@gmail.com" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} required />
        <Field label="Callsign (opt.)" placeholder="ALPHA / WOLF" value={formData.callsign} onChange={(v) => setFormData({...formData, callsign: v})} />
        <div className="sm:col-span-2">
          <Field label="Subject" placeholder="Joining the Sonamarg Run" value={formData.subject} onChange={(v) => setFormData({...formData, subject: v})} required />
        </div>
        <div className="sm:col-span-2">
          <label className="block">
            <span className="mono-label tracking-[0.22em] uppercase opacity-60 block mb-1.5">Message</span>
            <textarea rows={6} placeholder="Tell us what's on your mind. Ride details, gear questions, or just saying hi." required
              value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full hairline border-ink bg-bone px-3 py-2.5 font-mono text-sm focus:outline-none focus:bg-acid/10 transition-colors placeholder:opacity-40 resize-none text-ink" />
          </label>
        </div>
      </div>

      <div className="hairline-t border-ink/40 p-6 sm:p-8 flex items-center justify-between gap-4 flex-wrap">
        <p className="mono-label text-[10px] tracking-[0.2em] uppercase opacity-60 max-w-md">
          We usually respond within a day unless we're out of coverage on a ridge.
        </p>

        <motion.button type="submit" disabled={status !== "idle"} whileTap={{ scale: 0.98 }}
          className={`group inline-flex items-center gap-3 pl-5 pr-2 py-2 mono-label tracking-[0.2em] uppercase transition-colors ${
            status === "filed" ? "bg-ink text-bone" : "bg-signal text-bone"
          } ${status !== "idle" ? "cursor-default opacity-80" : "cursor-pointer hover:bg-ink"}`}>
          {status === "idle" && (<>
            <span>Send Message</span>
            <span className="grid h-9 w-9 place-items-center bg-bone text-ink">
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </>)}
          {status === "sending" && (<>
            <span className="flex items-center gap-2"><span className="h-2 w-2 bg-bone animate-blink" />Transmitting…</span>
            <span className="grid h-9 w-9 place-items-center bg-bone text-ink">
              <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="h-3 w-3 border-2 border-ink border-t-transparent rounded-full" />
            </span>
          </>)}
          {status === "filed" && (<>
            <span>Message Sent</span>
            <span className="grid h-9 w-9 place-items-center bg-bone text-ink"><span className="font-display">✓</span></span>
          </>)}
        </motion.button>
      </div>
      <div className="h-2 tick border-t border-ink/20" />
    </form>
  );
}

function Field({ label, placeholder, type = "text", value, onChange, required = false }: { label: string; placeholder: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean; }) {
  return (
    <label className="block">
      <span className="mono-label tracking-[0.22em] uppercase opacity-60 block mb-1.5">{label}</span>
      <input type={type} placeholder={placeholder} required={required}
        value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full hairline border-ink bg-bone px-3 py-2.5 font-mono text-sm focus:outline-none focus:bg-acid/10 transition-colors placeholder:opacity-40 text-ink" />
    </label>
  );
}

function FieldOfficeCard() {
  return (
    <aside className="space-y-4">
      <div className="hairline border-ink bg-bone">
        <div className="brick mono-label tracking-[0.22em] uppercase py-2 px-4 flex items-center justify-between text-bone">
          <span>Basecamp</span><span className="text-bone/60">Kashmir</span>
        </div>

        <div className="p-6 sm:p-7">
          <div className="mono-label tracking-[0.22em] uppercase text-signal mb-2">↳ Crew Status</div>
          <div className="flex items-center gap-3 mb-5">
            <span className="h-2.5 w-2.5 rounded-full bg-signal animate-blink" />
            <span className="font-display text-3xl font-black tracking-tight uppercase">Ready</span>
            <span className="ml-auto mono-label tracking-[0.22em] uppercase opacity-60">Srinagar</span>
          </div>

          <div className="hairline-t border-ink/40 pt-5 space-y-4">
            <Line icon={MapPin}>Friend Circle Basecamp<br />Srinagar 190001<br />Jammu & Kashmir</Line>
            <Line icon={Phone}>+91 6006414088</Line>
            <Line icon={Mail}>hello@friendcircle.in</Line>
            <Line icon={Clock}>We ride often. Responses may take time.</Line>
          </div>
        </div>
        <div className="h-2 tick border-t border-ink/20" />
      </div>

      <div className="hairline border-ink p-5 bg-acid/10">
        <div className="mono-label tracking-[0.22em] uppercase opacity-60 mb-2">Common Routes</div>
        <ul className="grid grid-cols-2 gap-y-1.5 font-serif text-base text-ink">
          <li>Sonamarg</li><li>Gulmarg</li><li>Pahalgam</li><li>Gurez</li>
          <li>Doodhpathri</li><li>Sinthan Top</li><li>Yusmarg</li><li>Peer Ki Gali</li>
        </ul>
      </div>

      <div className="brick text-bone p-5">
        <div className="mono-label tracking-[0.22em] uppercase text-bone/60 mb-2">Join the crew</div>
        <p className="font-serif text-lg leading-snug">
          We're always open to new riders joining our convoys. Hit us up with your machine specs and riding experience.
        </p>
      </div>
    </aside>
  );
}

function Line({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 mt-1 text-signal shrink-0" strokeWidth={1.5} />
      <div className="font-serif text-base leading-snug">{children}</div>
    </div>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="opacity-40">{k}</span><span>—</span><span className="text-ink">{v}</span>
    </div>
  );
}
