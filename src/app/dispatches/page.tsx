import type { Metadata } from "next";
import connectToDatabase from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import DispatchesClient from "@/app/dispatches/components/DispatchesClient";

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

export default async function DispatchesPage() {
  let dispatches = [];

  try {
    await connectToDatabase();
    const docs = await BlogPost.find({ status: "PUBLISHED" })
      .select("title slug summary coverImage audioMemoUrl tags category author publishedAt createdAt updatedAt readTimeMinutes telemetry viewsCount likesCount featured")
      .populate("author", "name image role")
      .sort({ featured: -1, publishedAt: -1, createdAt: -1 })
      .limit(60)
      .lean();

    dispatches = JSON.parse(JSON.stringify(docs));
  } catch (error) {
    console.error("Failed to fetch dispatches for page:", error);
  }

  return <DispatchesClient initialDispatches={dispatches} />;
}
