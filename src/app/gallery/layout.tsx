import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Friend Circle",
  description: "Visual intel and high-resolution captures from Friend Circle expeditions and off-grid missions.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/gallery",
  },
  openGraph: {
    title: "Photo Gallery | Friend Circle",
    description: "Visual intel and high-resolution captures from Friend Circle expeditions and off-grid missions.",
    url: "https://friendcirclee.netlify.app/gallery",
    images: [
      {
        url: "https://friendcirclee.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Photo Gallery | Friend Circle",
      },
    ],
  },
  twitter: {
    title: "Photo Gallery | Friend Circle",
    description: "Visual intel and high-resolution captures from Friend Circle expeditions and off-grid missions.",
    images: ["https://friendcirclee.netlify.app/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
