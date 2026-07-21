import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized: Please log in to react' }, { status: 401 });
    }

    const { slug } = await params;
    const body = await req.json();
    const { type } = body; // 'roger' | 'acknowledged' | 'copied'

    if (!['roger', 'acknowledged', 'copied'].includes(type)) {
      return NextResponse.json({ error: 'Invalid reaction type' }, { status: 400 });
    }

    await connectToDatabase();

    const dbUser = await User.findOne({ email: session.user.email.toLowerCase() });
    if (!dbUser) {
      return NextResponse.json({ error: 'User account not found' }, { status: 404 });
    }

    const isId = mongoose.Types.ObjectId.isValid(slug);
    const query: Record<string, any> = isId ? { _id: slug, status: 'PUBLISHED' } : { slug, status: 'PUBLISHED' };

    const dispatch = await BlogPost.findOne(query);
    if (!dispatch) {
      return NextResponse.json({ error: 'Dispatch not found' }, { status: 404 });
    }

    if (!dispatch.userReactions) {
      dispatch.userReactions = [];
    }

    // Check existing user reaction
    const userIdStr = dbUser._id.toString();
    const existingIndex = dispatch.userReactions.findIndex(
      (ur: any) => ur.userId && ur.userId.toString() === userIdStr
    );

    let userReactionType: string | null = type;

    if (existingIndex > -1) {
      const prevType = dispatch.userReactions[existingIndex].type as 'roger' | 'acknowledged' | 'copied';

      if (prevType === type) {
        // Toggle OFF (User clicked the same reaction again)
        dispatch.reactions[prevType] = Math.max(0, (dispatch.reactions[prevType] || 0) - 1);
        dispatch.likesCount = Math.max(0, (dispatch.likesCount || 0) - 1);
        dispatch.userReactions.splice(existingIndex, 1);
        userReactionType = null;
      } else {
        // SWITCH reaction type (Decrements previous, increments new)
        dispatch.reactions[prevType] = Math.max(0, (dispatch.reactions[prevType] || 0) - 1);
        dispatch.reactions[type as 'roger' | 'acknowledged' | 'copied'] =
          (dispatch.reactions[type as 'roger' | 'acknowledged' | 'copied'] || 0) + 1;
        dispatch.userReactions[existingIndex].type = type;
      }
    } else {
      // NEW reaction from user
      dispatch.reactions[type as 'roger' | 'acknowledged' | 'copied'] =
        (dispatch.reactions[type as 'roger' | 'acknowledged' | 'copied'] || 0) + 1;
      dispatch.likesCount = (dispatch.likesCount || 0) + 1;
      dispatch.userReactions.push({ userId: dbUser._id, type });
    }

    await dispatch.save();

    return NextResponse.json({
      success: true,
      reactions: dispatch.reactions,
      userReaction: userReactionType,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Reaction error:', error);
    return NextResponse.json({ error: 'Failed to record reaction' }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { slug } = await params;
    await connectToDatabase();

    const isId = mongoose.Types.ObjectId.isValid(slug);
    const dispatch = await BlogPost.findOne(isId ? { _id: slug } : { slug }, 'reactions userReactions').lean();

    if (!dispatch) {
      return NextResponse.json({ error: 'Dispatch not found' }, { status: 404 });
    }

    let userReaction = null;
    if (session?.user?.email) {
      const dbUser = await User.findOne({ email: session.user.email.toLowerCase() }, '_id');
      if (dbUser) {
        const userIdStr = dbUser._id.toString();
        const found = (dispatch.userReactions || []).find(
          (ur: any) => ur.userId && ur.userId.toString() === userIdStr
        );
        if (found) userReaction = found.type;
      }
    }

    return NextResponse.json({
      reactions: dispatch.reactions || { roger: 0, acknowledged: 0, copied: 0 },
      userReaction,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Get reaction error:', error);
    return NextResponse.json({ error: 'Failed to get reactions' }, { status: 500 });
  }
}
