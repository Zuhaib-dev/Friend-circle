import connectToDatabase from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import DispatchesClient from "@/app/dispatches/components/DispatchesClient";

export default async function DispatchesPageData() {
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
