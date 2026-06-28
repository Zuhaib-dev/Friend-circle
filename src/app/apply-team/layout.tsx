import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Team | Friend Circle",
  description: "Apply to become part of the Friend Circle tactical brotherhood and join our future expeditions.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/apply-team",
  },
  openGraph: {
    title: "Join the Team | Friend Circle",
    description: "Apply to become part of the Friend Circle tactical brotherhood and join our future expeditions.",
    url: "https://friendcirclee.netlify.app/apply-team",
    images: [
      {
        url: "https://friendcirclee.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Join the Team | Friend Circle",
      },
    ],
  },
  twitter: {
    title: "Join the Team | Friend Circle",
    description: "Apply to become part of the Friend Circle tactical brotherhood and join our future expeditions.",
    images: ["https://friendcirclee.netlify.app/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
