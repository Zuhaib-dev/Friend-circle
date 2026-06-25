import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    await connectToDatabase();
    
    // Fetch pending posts and populate author details
    const pendingPosts = await Post.find({ status: 'PENDING' })
      .populate('author', 'name email image')
      .sort({ createdAt: -1 });

    return NextResponse.json(pendingPosts, { status: 200 });
  } catch (error: any) {
    console.error('Admin GET posts error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { postId, action } = await req.json(); // action: 'APPROVE' | 'REJECT'

    if (!postId || !action) {
      return NextResponse.json({ error: 'Post ID and action are required' }, { status: 400 });
    }

    await connectToDatabase();

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (action === 'APPROVE') {
      post.status = 'APPROVED';
    } else if (action === 'REJECT') {
      post.status = 'REJECTED';
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await post.save();

    return NextResponse.json({ message: `Post successfully ${action.toLowerCase()}d`, post }, { status: 200 });
  } catch (error: any) {
    console.error('Admin PATCH post error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post permanently deleted' }, { status: 200 });
  } catch (error: any) {
    console.error('Admin DELETE post error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
