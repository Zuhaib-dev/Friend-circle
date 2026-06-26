import { TopBar, Hero, Ticker, StatsRow } from "@/components/landing/HeroSection";
import { CrewSection } from "@/components/landing/CrewSection";
import { ToursSection } from "@/components/landing/ToursSection";
import { SurveillanceSection } from "@/components/landing/SurveillanceSection";
import { TelemetrySection } from "@/components/landing/TelemetrySection";
import { LoadoutSection } from "@/components/landing/LoadoutSection";
import { TazkiyahSection } from "@/components/landing/TazkiyahSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { TimelineSection } from "@/components/landing/TimelineSection";
import { VoicesSection } from "@/components/landing/VoicesSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { JoinSection } from "@/components/landing/JoinSection";
import { FooterSection } from "@/components/landing/FooterSection";

export default function LandingPage() {
  return (
    <main className="text-ink">
      <TopBar />
      <Hero />
      <Ticker />
      <StatsRow />
      <CrewSection />
      <ToursSection />
      <SurveillanceSection />
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
