import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Ops | Friend Circle",
  description: "Secure terminal for Friend Circle operators.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/team",
  },
  openGraph: {
    title: "Team Ops | Friend Circle",
    description: "Secure terminal for Friend Circle operators.",
    url: "https://friendcirclee.netlify.app/team",
    images: [
      {
        url: "https://friendcirclee.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Team Ops | Friend Circle",
      },
    ],
  },
  twitter: {
    title: "Team Ops | Friend Circle",
    description: "Secure terminal for Friend Circle operators.",
    images: ["https://friendcirclee.netlify.app/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
