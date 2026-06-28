import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours & Expeditions | Friend Circle",
  description: "Discover our upcoming trekking, offroading, and camping expeditions across the Kashmir valley.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/tours",
  },
  openGraph: {
    title: "Tours & Expeditions | Friend Circle",
    description: "Discover our upcoming trekking, offroading, and camping expeditions across the Kashmir valley.",
    url: "https://friendcirclee.netlify.app/tours",
    images: [
      {
        url: "https://friendcirclee.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Tours & Expeditions | Friend Circle",
      },
    ],
  },
  twitter: {
    title: "Tours & Expeditions | Friend Circle",
    description: "Discover our upcoming trekking, offroading, and camping expeditions across the Kashmir valley.",
    images: ["https://friendcirclee.netlify.app/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
