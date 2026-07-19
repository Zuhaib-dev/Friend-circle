import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Friend Circle",
  description: "Create an account with Friend Circle to join the community and access exclusive field reports.",
  alternates: {
    canonical: "https://friendcirclee.netlify.app/register",
  },
  openGraph: {
    title: "Register | Friend Circle",
    description: "Create an account with Friend Circle to join the community and access exclusive field reports.",
    url: "https://friendcirclee.netlify.app/register",
  },
  twitter: {
    title: "Register | Friend Circle",
    description: "Create an account with Friend Circle.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
