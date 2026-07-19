import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials | Friend Circle",
  description: "Read stories and testimonials from our community members about their experiences on our adventures.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/testimonials",
  },
  openGraph: {
    title: "Testimonials | Friend Circle",
    description: "Read stories and testimonials from our community members about their experiences on our adventures.",
    url: "https://friendcirclee.netlify.app/testimonials",
    images: [
      {
        url: "https://friendcirclee.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Testimonials | Friend Circle",
      },
    ],
  },
  twitter: {
    title: "Testimonials | Friend Circle",
    description: "Read stories and testimonials from our community members about their experiences on our adventures.",
    images: ["https://friendcirclee.netlify.app/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
