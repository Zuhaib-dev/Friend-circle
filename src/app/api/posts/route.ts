import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/mongodb';
import Post from '@/models/Post';

// Public endpoint to fetch all approved posts
export async function GET() {
  try {
    await connectToDatabase();
    
    const posts = await Post.find({ status: 'APPROVED' })
      .populate('author', 'name image')
      .sort({ createdAt: -1 });

    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    console.error('Fetch posts error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Protected endpoint to create a new post
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const role = (session.user as any).role;
    
    if (role !== 'TEAM_MEMBER' && role !== 'ADMIN') {
      return NextResponse.json({ error: 'Only Team Members and Admins can create posts' }, { status: 403 });
    }

    const { imageUrl, caption, imageKitFileId } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    await connectToDatabase();

    // Posts created by admins are auto-approved. Team member posts require review.
    const initialStatus = role === 'ADMIN' ? 'APPROVED' : 'PENDING';

    const newPost = await Post.create({
      author: (session.user as any).id,
      imageUrl,
      imageKitFileId,
      caption,
      status: initialStatus,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    console.error('Create post error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Protected endpoint to update a post's caption
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { postId, caption } = await req.json();

    if (!postId || caption === undefined) {
      return NextResponse.json({ error: 'Post ID and caption are required' }, { status: 400 });
    }

    await connectToDatabase();

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Only the author or an Admin can edit the caption
    if (post.author.toString() !== (session.user as any).id && (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    post.caption = caption;
    await post.save();

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    console.error('Update post error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
