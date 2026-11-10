import { Suspense } from "react";
import CrewPageData from "./CrewPageData";

function CrewPageFallback() {
  return (
    <main className="min-h-screen px-4 md:px-8 py-16 bg-bone text-ink">
      <div className="mb-8 h-24 animate-pulse bg-ink/5" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 hairline border-ink">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="p-5 hairline-b border-ink/50">
            <div className="aspect-4/5 animate-pulse bg-ink/5" />
          </div>
        ))}
      </div>
    </main>
  );
}

export default function CrewPage() {
  return (
    <Suspense fallback={<CrewPageFallback />}>
      <CrewPageData />
    </Suspense>
  );
}
