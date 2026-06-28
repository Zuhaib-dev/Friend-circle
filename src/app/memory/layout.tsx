import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expedition Memories | Friend Circle",
  description: "An archive of our past adventures, breathtaking landscapes, and tactical operations across Kashmir.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/memory",
  },
  openGraph: {
    title: "Expedition Memories | Friend Circle",
    description: "An archive of our past adventures, breathtaking landscapes, and tactical operations across Kashmir.",
    url: "https://friendcirclee.netlify.app/memory",
    images: [
      {
        url: "https://friendcirclee.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Expedition Memories | Friend Circle",
      },
    ],
  },
  twitter: {
    title: "Expedition Memories | Friend Circle",
    description: "An archive of our past adventures, breathtaking landscapes, and tactical operations across Kashmir.",
    images: ["https://friendcirclee.netlify.app/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
