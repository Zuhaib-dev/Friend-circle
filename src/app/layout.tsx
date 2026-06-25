import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Friend Circle | Kashmir Adventures & Tactical Brotherhood",
  description: "Friend Circle – Kashmir-based adventure community exploring trekking, camping, offroading, fishing, and photography across Budgam, Srinagar, and Chadoora.",
  keywords: ["Friend Circle", "Kashmir adventures", "Budgam travel", "Srinagar trekking", "offroading", "camping", "fishing", "Zuhaib Rashid", "Kashmir tactical"],
  authors: [{ name: "Zuhaib Rashid", url: "https://www.zuhaibrashid.com" }],
  verification: {
    google: "PhC4G2XmPO_iZ5yQFaXvkOkJHHJEwRRJsjygMozyteA",
  },
  openGraph: {
    title: "Friend Circle - Kashmir Adventures & Brotherhood",
    description: "Join Zuhaib Rashid and team on Kashmir’s most scenic and challenging adventures.",
    url: "https://friendcirclee.netlify.app/",
    siteName: "Friend Circle",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Friend Circle Team in Kashmir",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Friend Circle - Kashmir Adventures",
    description: "Explore adventures across Kashmir with Zuhaib Rashid and friends.",
    creator: "@xuhaibx9",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "name": "Friend Circle",
                "url": "https://friendcirclee.netlify.app/",
                "description": "Friend Circle – Adventurers from Kashmir exploring trekking, offroading, and photography. A digital showcase of travel stories and friendship."
              },
              {
                "@type": "Person",
                "name": "Zuhaib Rashid",
                "url": "https://www.zuhaibrashid.com/",
                "sameAs": [
                  "https://github.com/Zuhaib-dev",
                  "https://x.com/xuhaibx9",
                  "https://www.linkedin.com/in/zuhaib-rashid-661345318/"
                ]
              }
            ]
          })
        }} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
