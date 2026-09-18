import { TopBar, Hero, Ticker, StatsRow } from "@/components/landing/HeroSection";
import { BentoSection } from "@/components/landing/BentoSection";
import { CrewSection } from "@/components/landing/CrewSection";
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

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  
  await connectToDatabase();
  const crewDocs = await User.find({
    $or: [
      { role: 'ADMIN' },
      { role: 'TEAM_MEMBER', teamMemberStatus: 'APPROVED' }
    ]
  }).select('name email image role socialHandle bio').lean();
  
  const initialCrew = crewDocs.map(c => ({
    _id: c._id.toString(),
    name: c.name,
    email: c.email,
    role: c.role as "TEAM_MEMBER" | "ADMIN",
    image: c.image || undefined,
    bio: c.bio || undefined,
    socialHandle: c.socialHandle || undefined,
  }));

  return (
    <main className="text-ink">
      <TopBar />
      <Hero />
      <Ticker />
      <StatsRow />
      <CrewSection initialCrew={initialCrew} sessionEmail={session?.user?.email || null} />
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
