import type { Metadata } from "next";
import connectToDatabase from "@/lib/mongodb";
import TripMemory from "@/models/TripMemory";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  // Await the params object before using its properties
  const { id } = await params;
  let title = "Expedition Memory | Friend Circle";
  let description = "An archive of our past adventures, breathtaking landscapes, and tactical operations across Kashmir.";
  let ogImage = "https://friendcirclee.netlify.app/og.png";

  try {
    await connectToDatabase();
    const memory = await TripMemory.findById(id).lean();
    if (memory) {
      // Provide dynamic SEO properties
      title = `${memory.title} | Friend Circle`;
      description = memory.description || description;
      ogImage = memory.bannerImage || ogImage;
    }
  } catch (error) {
    console.error("Failed to fetch memory metadata", error);
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://friendcirclee.netlify.app/memory/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://friendcirclee.netlify.app/memory/${id}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function MemoryDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
