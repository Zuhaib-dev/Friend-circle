"use client";

import { useEffect, useState } from "react";
import { TopNav } from "@/components/top-nav";
import { EditorialHeader, HeroBanner } from "../components/hero";
import { CrewManifest } from "../components/crew";
import { IntelSection } from "../components/intel";
import { MediaGrid } from "../components/media";
import { RouteTraceSection } from "../components/trace";
import { LogisticsSummary, QuoteStrip, TerminalFooter } from "../components/footer";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { ITripMemory } from "@/models/TripMemory";

export default function MemoryDetailPage() {
  const { id } = useParams();
  const [memory, setMemory] = useState<ITripMemory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/memories?id=${id}`)
      .then(r => r.json())
      .then(data => {
        if (!data.error) setMemory(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-bone text-ink relative flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-signal animate-spin" />
      </main>
    );
  }

  if (!memory) {
    return (
      <main className="min-h-screen bg-bone text-ink relative flex items-center justify-center font-display text-4xl">
        RECORD PURGED OR INVALID.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bone text-ink relative">
      <TopNav />

      <div className="pointer-events-none fixed inset-y-0 left-0 w-6 tick-v opacity-20 z-0" />
      <div className="pointer-events-none fixed inset-y-0 right-0 w-6 tick-v opacity-20 z-0" />

      <EditorialHeader 
        title={memory.title}
        code={memory.code}
        date={memory.date}
        distance={memory.distance}
        weather={memory.weather}
        status={memory.status}
        description={memory.description}
      />

      <div className="px-4 md:px-8 mt-8">
        <HeroBanner 
          bannerImage={memory.bannerImage}
          coordinates={memory.coordinates}
          code={memory.code}
          elevation={memory.elevation}
        />
      </div>

      {memory.crew && memory.crew.length > 0 && (
        <CrewManifest crew={memory.crew} />
      )}
      
      <IntelSection 
        story={memory.story}
        bestMoment={memory.bestMoment}
        quotes={memory.quotes}
      />
      
      {memory.media && memory.media.length > 0 && (
        <MediaGrid media={memory.media} />
      )}
      
      {memory.waypoints && memory.waypoints.length > 0 && (
        <RouteTraceSection waypoints={memory.waypoints} />
      )}
      
      <LogisticsSummary logistics={memory.logistics} />
      
      <QuoteStrip />
      <TerminalFooter />
    </main>
  );
}
