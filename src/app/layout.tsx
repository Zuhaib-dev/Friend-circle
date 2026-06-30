import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import OfflineSyncProvider from "@/components/OfflineSyncProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://friendcirclee.netlify.app"),
  title: "Friend Circle | Kashmir Adventures & Tactical Brotherhood",
  description: "Friend Circle – Kashmir-based adventure community exploring trekking, camping, offroading, fishing, and photography across Budgam, Srinagar, and Chadoora.",
  keywords: ["Friend Circle", "Kashmir adventures", "Budgam travel", "Srinagar trekking", "offroading", "camping", "fishing", "Zuhaib Rashid", "Kashmir tactical"],
  authors: [{ name: "Zuhaib Rashid", url: "https://www.zuhaibrashid.com" }],
  alternates: {
    canonical: "https://friendcirclee.netlify.app",
  },
  verification: {
    google: "PhC4G2XmPO_iZ5yQFaXvkOkJHHJEwRRJsjygMozyteA",
  },
  openGraph: {
    title: "Friend Circle - Kashmir Adventures & Brotherhood",
    description: "Join Zuhaib Rashid and team on Kashmir's most scenic and challenging adventures.",
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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Friend Circle - Kashmir Adventures",
    description: "Explore adventures across Kashmir with Zuhaib Rashid and friends.",
    creator: "@xuhaibx9",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900&family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500;700&family=Amiri:ital,wght@0,400;0,700;1,400&family=Scheherazade+New:wght@400;700&display=swap" />
      </head>
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
        <AuthProvider>
          <OfflineSyncProvider>{children}</OfflineSyncProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
