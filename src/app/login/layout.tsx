import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Friend Circle",
  description: "Login to your Friend Circle account to access secure tactical comms and field reports.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/login",
  },
  openGraph: {
    title: "Login | Friend Circle",
    description: "Login to your Friend Circle account to access secure tactical comms and field reports.",
    url: "https://friendcirclee.netlify.app/login",
  },
  twitter: {
    title: "Login | Friend Circle",
    description: "Login to your Friend Circle account.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
