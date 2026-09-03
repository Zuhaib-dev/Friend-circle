import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Post from "@/models/Post";
import Follow from "@/models/Follow";
import { PublicProfileClient } from "./PublicProfileClient";
import { redirect } from "next/navigation";

export default async function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const user = session?.user;

  await connectToDatabase();

  const profileDoc = await User.findById(id).select('name image role phone socialHandle bio').lean();
  
  if (!profileDoc) {
    return (
      <main className="min-h-screen bg-bone text-ink flex flex-col items-center justify-center">
        <div className="text-red-500 font-display text-2xl">
          OPERATOR NOT FOUND OR ACCESS DENIED
        </div>
      </main>
    );
  }

  const profile = {
    _id: profileDoc._id.toString(),
    name: profileDoc.name,
    role: profileDoc.role,
    image: profileDoc.image || null,
    bio: profileDoc.bio || null,
    socialHandle: profileDoc.socialHandle || null,
  };

  const followersCount = await Follow.countDocuments({ following: id });
  const followingCount = await Follow.countDocuments({ follower: id });
  const postsDocs = await Post.find({ author: id, status: 'APPROVED' })
    .sort({ createdAt: -1 })
    .populate('likes', 'name image')
    .lean();

  const posts = postsDocs.map((p: any) => ({
    ...p,
    _id: p._id.toString(),
    author: p.author.toString(),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    likes: (p.likes || []).map((l: any) => ({
      _id: l._id.toString(),
      name: l.name,
      image: l.image || null
    }))
  }));

  const stats = {
    followers: followersCount,
    following: followingCount,
    posts: posts.length,
  };

  let isFollowing = false;
  if (user) {
    const currentUserId = (user as any).id;
    const follow = await Follow.findOne({ follower: currentUserId, following: id });
    isFollowing = !!follow;
  }

  return (
    <PublicProfileClient 
      id={id}
      initialProfile={profile}
      initialStats={stats}
      initialPosts={posts}
      initialIsFollowing={isFollowing}
      user={user}
    />
  );
}
