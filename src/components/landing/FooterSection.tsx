"use client";

import { Circle, ArrowUpRight, Gauge } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="brick hairline-t border-ink mt-0">
      <div className="px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="mono-label text-bone/60">SIGN-OFF</div>
          <div className="display-num text-bone text-5xl md:text-6xl mt-2">FRIEND<br />CIRCLE<span className="text-signal">.</span></div>
          <p className="font-display italic text-bone/70 mt-3 max-w-md">Six kings, one ridge, infinite chai. Built in Kashmir, broadcast from the bench.</p>
        </div>
        <div>
          <div className="mono-label text-bone/60 mb-3">CHANNELS</div>
          <ul className="space-y-2">
            {[
              { i: Circle, l: "PORTFOLIO", href: "https://www.zuhaibrashid.com/" },
              { i: Circle, l: "GITHUB", href: "https://github.com/Zuhaib-dev" },
              { i: Circle, l: "X / TWITTER", href: "https://x.com/xuhaibx9" },
              { i: Circle, l: "LINKEDIN", href: "https://www.linkedin.com/in/zuhaib-rashid-661345318/" },
              { i: Circle, l: "DISPATCH TICKET", href: "/contact" },
            ].map(({ i: Icon, l, href }) => (
              <li key={l}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="mono-label text-bone hover:text-signal flex items-center gap-2 group">
                  <Icon className="h-3.5 w-3.5" /> {l}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mono-label text-bone/60 mb-3">REGISTRY</div>
          <ul className="space-y-1 mono-label text-bone">
            <li>EST. 2018 · CHADOORA</li>
            <li>UNITS / 19</li>
            <li>CORE / 06</li>
            <li>REV 02.6</li>
          </ul>
        </div>
      </div>
      <div className="hairline-t border-bone/30 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-2 mono-label text-bone/70">
        <span>© 2026 FRIEND CIRCLE — NO RIGHTS RESERVED, ALL WRONGS REMEMBERED.</span>
        <span className="flex items-center gap-2"><Gauge className="h-3.5 w-3.5 text-signal" /> CHAI BILL: PENDING ON FURQAN SINCE 2019</span>
      </div>
    </footer>
  );
}
