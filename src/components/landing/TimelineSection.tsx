import { TIMELINE } from "@/data/home-data";
import { SectionHead } from "./primitives";

export function TimelineSection() {
  return (
    <section className="px-4 md:px-8 py-16 hairline-t border-ink">
      <SectionHead code="LEDG / 06" kicker="THE LEDGER" title="Eight years, on record" sub="Receipts. Re-runs. Rituals. The crew's mission log." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 hairline border-ink">
        {TIMELINE.map((e, i) => (
          <div
            key={e.y}
            className={`p-5 bg-bone ${i % 2 === 0 ? "md:hairline-r" : ""} ${i < TIMELINE.length - 2 ? "hairline-b" : "hairline-b md:hairline-b-0"} border-ink/50 relative`}
          >
            <div className="flex items-baseline justify-between">
              <span className="display-num text-5xl">{e.y}<span className="text-signal">.</span></span>
              <span className="mono-label">ENTRY/{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="mt-2 mono-label">{e.t}</div>
            <p className="mt-1 text-ink/80 leading-snug">{e.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
