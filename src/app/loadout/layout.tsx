import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gear & Loadout | Friend Circle",
  description: "Check out the tactical gear, vehicles, and equipment used by Friend Circle for survival and exploration.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/loadout",
  },
  openGraph: {
    title: "Gear & Loadout | Friend Circle",
    description: "Check out the tactical gear, vehicles, and equipment used by Friend Circle for survival and exploration.",
    url: "https://friendcirclee.netlify.app/loadout",
    images: [
      {
        url: "https://friendcirclee.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Gear & Loadout | Friend Circle",
      },
    ],
  },
  twitter: {
    title: "Gear & Loadout | Friend Circle",
    description: "Check out the tactical gear, vehicles, and equipment used by Friend Circle for survival and exploration.",
    images: ["https://friendcirclee.netlify.app/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
