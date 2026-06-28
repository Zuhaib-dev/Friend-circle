import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convoy Tracking | Friend Circle",
  description: "Real-time convoy statuses and expedition fleet management.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/convoy",
  },
  openGraph: {
    title: "Convoy Tracking | Friend Circle",
    description: "Real-time convoy statuses and expedition fleet management.",
    url: "https://friendcirclee.netlify.app/convoy",
    images: [
      {
        url: "https://friendcirclee.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Convoy Tracking | Friend Circle",
      },
    ],
  },
  twitter: {
    title: "Convoy Tracking | Friend Circle",
    description: "Real-time convoy statuses and expedition fleet management.",
    images: ["https://friendcirclee.netlify.app/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
