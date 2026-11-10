import type { Metadata } from "next";
import { Suspense } from "react";
import DispatchesPageData from "./DispatchesPageData";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://friendcirclee.netlify.app";

export const revalidate = 300;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Field Dispatches | Friend Circle",
  description:
    "Read Friend Circle field dispatches, Kashmir expedition stories, outdoor guides, reflections, and tactical notes from the road.",
  alternates: {
    canonical: `${BASE_URL}/dispatches`,
  },
  openGraph: {
    title: "Field Dispatches | Friend Circle",
    description:
      "Kashmir expedition stories, outdoor guides, and field notes from Friend Circle.",
    url: `${BASE_URL}/dispatches`,
    siteName: "Friend Circle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Dispatches | Friend Circle",
    description:
      "Kashmir expedition stories, outdoor guides, and field notes from Friend Circle.",
  },
};

function DispatchesFallback() {
  return (
    <main className="min-h-screen bg-bone text-ink px-4 md:px-8 py-12">
      <div className="mb-8 h-28 animate-pulse bg-ink/5" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-80 animate-pulse bg-ink/5 hairline border-ink/20" />
        ))}
      </div>
    </main>
  );
}

export default function DispatchesPage() {
  return (
    <Suspense fallback={<DispatchesFallback />}>
      <DispatchesPageData />
    </Suspense>
  );
}
