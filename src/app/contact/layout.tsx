import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Friend Circle",
  description: "Get in touch with the Friend Circle team for adventure inquiries, collaborations, and expedition details.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/contact",
  },
  openGraph: {
    title: "Contact Us | Friend Circle",
    description: "Get in touch with the Friend Circle team for adventure inquiries, collaborations, and expedition details.",
    url: "https://friendcirclee.netlify.app/contact",
    images: [
      {
        url: "https://friendcirclee.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Contact Us | Friend Circle",
      },
    ],
  },
  twitter: {
    title: "Contact Us | Friend Circle",
    description: "Get in touch with the Friend Circle team for adventure inquiries, collaborations, and expedition details.",
    images: ["https://friendcirclee.netlify.app/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
