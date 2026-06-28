import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tazkiyah (Purification) | Friend Circle",
  description: "Spiritual reflections, discipline, and purification of the soul alongside our physical journeys.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/tazkiyah",
  },
  openGraph: {
    title: "Tazkiyah (Purification) | Friend Circle",
    description: "Spiritual reflections, discipline, and purification of the soul alongside our physical journeys.",
    url: "https://friendcirclee.netlify.app/tazkiyah",
    images: [
      {
        url: "https://friendcirclee.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Tazkiyah (Purification) | Friend Circle",
      },
    ],
  },
  twitter: {
    title: "Tazkiyah (Purification) | Friend Circle",
    description: "Spiritual reflections, discipline, and purification of the soul alongside our physical journeys.",
    images: ["https://friendcirclee.netlify.app/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
