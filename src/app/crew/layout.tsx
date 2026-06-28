import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Crew | Friend Circle",
  description: "Meet the operators, drivers, and adventurers who make up the Friend Circle brotherhood.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/crew",
  },
  openGraph: {
    title: "The Crew | Friend Circle",
    description: "Meet the operators, drivers, and adventurers who make up the Friend Circle brotherhood.",
    url: "https://friendcirclee.netlify.app/crew",
    images: [
      {
        url: "https://friendcirclee.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "The Crew | Friend Circle",
      },
    ],
  },
  twitter: {
    title: "The Crew | Friend Circle",
    description: "Meet the operators, drivers, and adventurers who make up the Friend Circle brotherhood.",
    images: ["https://friendcirclee.netlify.app/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
