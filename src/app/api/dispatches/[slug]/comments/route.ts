import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import DispatchComment from '@/models/DispatchComment';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectToDatabase();

    const isId = mongoose.Types.ObjectId.isValid(slug);
    const dispatch = await BlogPost.findOne(isId ? { _id: slug } : { slug }, '_id').lean();

    if (!dispatch) {
      return NextResponse.json({ error: 'Dispatch not found' }, { status: 404 });
    }

    const comments = await DispatchComment.find({ dispatchId: dispatch._id })
      .populate('author', 'name image role teamMemberStatus bio')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(comments, { status: 200 });
  } catch (error: any) {
    console.error('Fetch dispatch comments error:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized: Please log in to post comments' }, { status: 401 });
    }

    const { slug } = await params;
    const body = await req.json();
    const { text } = body;

    const trimmedText = String(text || '').trim();
    if (!trimmedText) {
      return NextResponse.json({ error: 'Comment text cannot be empty' }, { status: 400 });
    }
    if (trimmedText.length > 1000) {
      return NextResponse.json({ error: 'Comment exceeds maximum length of 1000 characters' }, { status: 400 });
    }

    await connectToDatabase();

    const dbUser = await User.findOne({ email: session.user.email.toLowerCase() });
    if (!dbUser) {
      return NextResponse.json({ error: 'User account not found' }, { status: 404 });
    }

    const isId = mongoose.Types.ObjectId.isValid(slug);
    const dispatch = await BlogPost.findOne(isId ? { _id: slug } : { slug }, '_id').lean();

    if (!dispatch) {
      return NextResponse.json({ error: 'Dispatch not found' }, { status: 404 });
    }

    const newComment = await DispatchComment.create({
      dispatchId: dispatch._id,
      author: dbUser._id,
      text: trimmedText,
    });

    const populated = await DispatchComment.findById(newComment._id)
      .populate('author', 'name image role teamMemberStatus bio')
      .lean();

    return NextResponse.json(populated, { status: 201 });
  } catch (error: any) {
    console.error('Post dispatch comment error:', error);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized: Please log in' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get('commentId');

    if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
      return NextResponse.json({ error: 'Invalid comment ID' }, { status: 400 });
    }

    await connectToDatabase();

    const dbUser = await User.findOne({ email: session.user.email.toLowerCase() });
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const comment = await DispatchComment.findById(commentId);
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    const isAuthor = comment.author.toString() === dbUser._id.toString();
    const isAdmin = dbUser.role === 'ADMIN';

    if (!isAuthor && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden: You can only delete your own comments' }, { status: 403 });
    }

    await DispatchComment.findByIdAndDelete(commentId);

    return NextResponse.json({ success: true, commentId }, { status: 200 });
  } catch (error: any) {
    console.error('Delete comment error:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
