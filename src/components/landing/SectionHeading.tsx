import { Activity } from "lucide-react";

export function SectionHeading({
  code,
  kicker,
  title,
  sub,
}: {
  code: string;
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="hairline-b border-ink pb-4 mb-6 flex items-end justify-between gap-4 flex-wrap">
      <div>
        <div className="flex items-center gap-3 mono-label">
          <span className="signal-chip">{code}</span>
          <span>{kicker}</span>
        </div>
        <h2 className="display-num text-[clamp(40px,7vw,96px)] mt-2 text-ink">
          {title}<span className="text-signal">.</span>
        </h2>
        {sub && <p className="font-display italic text-xl md:text-2xl text-ink/70 max-w-2xl mt-1">{sub}</p>}
      </div>
      <div className="flex items-center gap-2 mono-label">
        <Activity className="h-3.5 w-3.5 text-signal" />
        <span>SYS / NOMINAL</span>
      </div>
    </div>
  );
}
