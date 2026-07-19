import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About Us | Friend Circle",
  description: "Learn about the Friend Circle community, our history, and our mission to explore the Kashmir valley.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/about",
  },
  openGraph: {
    title: "About Us | Friend Circle",
    description: "Learn about the Friend Circle community, our history, and our mission to explore the Kashmir valley.",
    url: "https://friendcirclee.netlify.app/about",
    images: [
      {
        url: "https://friendcirclee.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "About Us | Friend Circle",
      },
    ],
  },
  twitter: {
    title: "About Us | Friend Circle",
    description: "Learn about the Friend Circle community, our history, and our mission to explore the Kashmir valley.",
    images: ["https://friendcirclee.netlify.app/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="about-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Friend Circle",
            "url": "https://friendcirclee.netlify.app/",
            "logo": "https://friendcirclee.netlify.app/icon.png",
            "description": "Friend Circle is a Kashmir-based adventure community.",
            "foundingDate": "2018",
            "founder": {
              "@type": "Person",
              "name": "Zuhaib Rashid"
            }
          }),
        }}
      />
      {children}
    </>
  );
}
