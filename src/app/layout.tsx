import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Fraunces, Inter, JetBrains_Mono, Amiri, Scheherazade_New } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { SessionTracker } from "@/components/SessionTracker";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import NextTopLoader from 'nextjs-toploader';
import CommandMenu from "@/components/command-menu";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import QueryProvider from "@/components/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const scheherazadeNew = Scheherazade_New({
  variable: "--font-scheherazade-new",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} ${amiri.variable} ${scheherazadeNew.variable} h-full antialiased`}
    >
      <head>
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
        <QueryProvider>
          <NuqsAdapter>
            <AuthProvider>
              <NextTopLoader 
                color="#E53E1F"
                initialPosition={0.2}
                crawlSpeed={150}
                height={4}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={150}
                shadow="0 0 10px #E53E1F,0 0 5px #E53E1F"
                zIndex={1600}
              />
              <SessionTracker />
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
                <CommandMenu />
                <Toaster position="bottom-right" richColors />
              </ThemeProvider>
            </AuthProvider>
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
