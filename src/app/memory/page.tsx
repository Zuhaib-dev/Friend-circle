"use client";

import { TopNav } from "@/components/top-nav";
import { EditorialHeader, HeroBanner } from "./components/hero";
import { CrewManifest } from "./components/crew";
import { IntelSection } from "./components/intel";
import { MediaGrid } from "./components/media";
import { RouteTraceSection } from "./components/trace";
import { LogisticsSummary, QuoteStrip, TerminalFooter } from "./components/footer";

export default function MemoryPage() {
  return (
    <main className="min-h-screen bg-bone text-ink relative">
      <TopNav />

      <div className="pointer-events-none fixed inset-y-0 left-0 w-6 tick-v opacity-20 z-0" />
      <div className="pointer-events-none fixed inset-y-0 right-0 w-6 tick-v opacity-20 z-0" />

      <EditorialHeader />

      <div className="px-4 md:px-8 mt-8">
        <HeroBanner />
      </div>

      <CrewManifest />
      <IntelSection />
      <MediaGrid />
      <RouteTraceSection />
      <LogisticsSummary />
      <QuoteStrip />
      <TerminalFooter />
    </main>
  );
}
