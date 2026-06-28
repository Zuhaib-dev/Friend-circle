import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Ops Tracker | Friend Circle",
  description: "Live telemetry, tracking, and operational statuses of active Friend Circle expeditions in the Kashmir theater.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/live-ops",
  },
  openGraph: {
    title: "Live Ops Tracker | Friend Circle",
    description: "Live telemetry, tracking, and operational statuses of active Friend Circle expeditions in the Kashmir theater.",
    url: "https://friendcirclee.netlify.app/live-ops",
    images: [
      {
        url: "https://friendcirclee.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Live Ops Tracker | Friend Circle",
      },
    ],
  },
  twitter: {
    title: "Live Ops Tracker | Friend Circle",
    description: "Live telemetry, tracking, and operational statuses of active Friend Circle expeditions in the Kashmir theater.",
    images: ["https://friendcirclee.netlify.app/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
