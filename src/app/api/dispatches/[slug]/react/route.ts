import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import mongoose from 'mongoose';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const { type } = body; // 'roger' | 'acknowledged' | 'copied'

    if (!['roger', 'acknowledged', 'copied'].includes(type)) {
      return NextResponse.json({ error: 'Invalid reaction type' }, { status: 400 });
    }

    await connectToDatabase();

    const isId = mongoose.Types.ObjectId.isValid(slug);
    const query = isId ? { _id: slug } : { slug };

    const updateField = `reactions.${type}`;

    const updated = await BlogPost.findOneAndUpdate(
      query,
      {
        $inc: {
          [updateField]: 1,
          likesCount: 1,
        },
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Dispatch not found' }, { status: 404 });
    }

    return NextResponse.json({
      reactions: updated.reactions,
      likesCount: updated.likesCount,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Reaction error:', error);
    return NextResponse.json({ error: 'Failed to record reaction' }, { status: 500 });
  }
}
