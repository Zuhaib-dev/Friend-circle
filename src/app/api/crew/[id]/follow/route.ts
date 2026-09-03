import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/mongodb';
import Follow from '@/models/Follow';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ isFollowing: false }, { status: 200 });
    }

    await connectToDatabase();
    const { id } = await params;
    const currentUserId = (session.user as any).id;

    const follow = await Follow.findOne({ follower: currentUserId, following: id });
    return NextResponse.json({ isFollowing: !!follow }, { status: 200 });
  } catch (error: any) {
    console.error('Check follow error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await params; // Target user to follow
    const currentUserId = (session.user as any).id;

    if (id === currentUserId) {
      return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 });
    }

    await Follow.updateOne(
      { follower: currentUserId, following: id },
      { $setOnInsert: { follower: currentUserId, following: id } },
      { upsert: true }
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Follow error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await params;
    const currentUserId = (session.user as any).id;

    await Follow.deleteOne({ follower: currentUserId, following: id });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Unfollow error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
