import { MetadataRoute } from "next";
import connectToDatabase from "@/lib/mongodb";
import TripMemory from "@/models/TripMemory";
import BlogPost from "@/models/BlogPost";

const BASE_URL = "https://friendcirclee.netlify.app";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/testimonials`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/team`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/crew`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tours`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/apply-team`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/live-ops`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/convoy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/memory`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tazkiyah`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tazkiyah/quran`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/dispatches`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/loadout`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    await connectToDatabase();
    const [memories, dispatches] = await Promise.all([
      TripMemory.find({}, "_id updatedAt").lean(),
      BlogPost.find({ status: "PUBLISHED" }, "slug updatedAt publishedAt").lean(),
    ]);
    
    const memoryRoutes: MetadataRoute.Sitemap = memories.map((memory: any) => ({
      url: `${BASE_URL}/memory/${memory._id}`,
      lastModified: memory.updatedAt || now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    const dispatchRoutes: MetadataRoute.Sitemap = dispatches.map((dispatch: any) => ({
      url: `${BASE_URL}/dispatches/${dispatch.slug}`,
      lastModified: dispatch.updatedAt || dispatch.publishedAt || now,
      changeFrequency: "weekly",
      priority: 0.85,
    }));

    dynamicRoutes = [...memoryRoutes, ...dispatchRoutes];
  } catch (error) {
    console.error("Failed to fetch memories for sitemap:", error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
