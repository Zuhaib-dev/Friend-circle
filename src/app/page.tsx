import { TopBar, Hero } from "@/components/landing/HeroSection";
import { Ticker, StatsRow } from "@/components/landing/StaticHeroSections";
import { BentoSection } from "@/components/landing/BentoSection";
import { ToursSection } from "@/components/landing/ToursSection";
import { TelemetrySection } from "@/components/landing/TelemetrySection";
import { LoadoutSection } from "@/components/landing/LoadoutSection";
import { TazkiyahSection } from "@/components/landing/TazkiyahSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { TimelineSection } from "@/components/landing/TimelineSection";
import { VoicesSection } from "@/components/landing/VoicesSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { JoinSection } from "@/components/landing/JoinSection";
import { FooterSection } from "@/components/landing/FooterSection";
import { Suspense } from "react";
import CrewRoster from "./CrewRoster";

function CrewFallback() {
  return (
    <section id="crew" className="px-4 md:px-8 py-16" aria-label="Crew">
      <div className="mb-8 h-24 animate-pulse bg-ink/5" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 hairline border-ink">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="p-5 hairline-b border-ink/50">
            <div className="aspect-4/5 animate-pulse bg-ink/5" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <main className="text-ink">
      <TopBar />
      <Hero />
      <Ticker />
      <StatsRow />
      <Suspense fallback={<CrewFallback />}>
        <CrewRoster />
      </Suspense>
      <ToursSection />
      <BentoSection />
      <TelemetrySection />
      <LoadoutSection />
      <TazkiyahSection />
      <GallerySection />
      <TimelineSection />
      <VoicesSection />
      <FAQSection />
      <JoinSection />
      <FooterSection />
    </main>
  );
}
