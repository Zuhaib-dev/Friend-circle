import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quranic Reflections | Friend Circle",
  description: "Recitations and reflections on the Quran as part of our Tazkiyah journey.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/tazkiyah/quran",
  },
  openGraph: {
    title: "Quranic Reflections | Friend Circle",
    description: "Recitations and reflections on the Quran as part of our Tazkiyah journey.",
    url: "https://friendcirclee.netlify.app/tazkiyah/quran",
    images: [
      {
        url: "https://friendcirclee.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Quranic Reflections | Friend Circle",
      },
    ],
  },
  twitter: {
    title: "Quranic Reflections | Friend Circle",
    description: "Recitations and reflections on the Quran as part of our Tazkiyah journey.",
    images: ["https://friendcirclee.netlify.app/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
