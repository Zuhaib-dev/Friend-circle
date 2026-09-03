import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Follow from '@/models/Follow';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const followers = await Follow.find({ following: id })
      .populate('follower', 'name image role _id')
      .lean();

    const following = await Follow.find({ follower: id })
      .populate('following', 'name image role _id')
      .lean();

    return NextResponse.json({
      followers: followers.map(f => f.follower),
      following: following.map(f => f.following)
    }, { status: 200 });

  } catch (error: any) {
    console.error('Fetch followers error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
