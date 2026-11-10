import { STATS, TICKER } from "@/data/home-data";

export function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="brick hairline-b border-ink overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="mono-label text-bone px-6 flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-signal rounded-full" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StatsRow() {
  return (
    <section className="px-4 md:px-8 py-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 hairline border-ink">
        {STATS.map((stat, index) => (
          <div key={stat.label} className={`p-5 ${index < STATS.length - 1 ? "lg:hairline-r" : ""} ${index < 2 ? "hairline-b lg:hairline-b-0" : ""} ${index === 0 ? "hairline-r" : ""} ${index === 2 ? "hairline-r" : ""} border-ink/40 bg-bone`}>
            <div className="mono-label">{stat.label}</div>
            <div className="display-num text-[44px] md:text-[64px] mt-1">{stat.value}</div>
            <div className="mono-label opacity-60">{stat.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
