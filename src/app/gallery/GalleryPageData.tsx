import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import { GalleryClient } from "./GalleryClient";

export default async function GalleryPageData() {
  const [session] = await Promise.all([
    getServerSession(authOptions),
    connectToDatabase(),
  ]);
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  const posts = await Post.find({ imageUrl: { $exists: true, $ne: "" } })
    .select("imageUrl caption author createdAt")
    .populate("author", "name")
    .sort({ createdAt: -1 })
    .lean();

  const initialFrames = posts.map((post: any) => ({
    id: `INTEL-${post._id.toString().slice(-5).toUpperCase()}`,
    rawId: post._id.toString(),
    src: post.imageUrl,
    uploader: post.author?.name?.split(" ")[0].toUpperCase() || "UNKNOWN",
    caption: post.caption || "NO CAPTION PROVIDED",
    date: post.createdAt.getTime(),
    sizeMB: 1.2,
    w: 800,
    h: 600,
  }));

  return <GalleryClient initialFrames={initialFrames} isAdmin={isAdmin} />;
}
