import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Post from '@/models/Post';
import Follow from '@/models/Follow';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    
    const { id } = await params;

    const user = await User.findById(id).select('name image role phone socialHandle bio');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const followersCount = await Follow.countDocuments({ following: id });
    const followingCount = await Follow.countDocuments({ follower: id });

    const posts = await Post.find({ author: id, status: 'APPROVED' })
      .sort({ createdAt: -1 })
      .populate('likes', 'name image');

    return NextResponse.json({
      user,
      stats: {
        followers: followersCount,
        following: followingCount,
        posts: posts.length,
      },
      posts,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Fetch profile error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
