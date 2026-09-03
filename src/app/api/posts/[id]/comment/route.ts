import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/mongodb';
import PostComment from '@/models/PostComment';
import Post from '@/models/Post';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params; // Post ID

    const comments = await PostComment.find({ post: id })
      .sort({ createdAt: 1 })
      .populate('author', 'name image');

    return NextResponse.json(comments, { status: 200 });
  } catch (error: any) {
    console.error('Fetch comments error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = params; // Post ID
    const currentUserId = (session.user as any).id;
    const { content, replyTo } = await req.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const newComment = await PostComment.create({
      post: id,
      author: currentUserId,
      content,
      replyTo: replyTo || undefined,
    });

    const populatedComment = await PostComment.findById(newComment._id).populate('author', 'name image');

    return NextResponse.json(populatedComment, { status: 201 });
  } catch (error: any) {
    console.error('Add comment error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const currentUserId = (session.user as any).id;
    const url = new URL(req.url);
    const commentId = url.searchParams.get('commentId');

    if (!commentId) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }

    const comment = await PostComment.findById(commentId);
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    const post = await Post.findById(comment.post);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Allow deletion if: User is comment author, User is post author, or User is Admin
    const isCommentAuthor = comment.author.toString() === currentUserId;
    const isPostAuthor = post.author.toString() === currentUserId;
    const isAdmin = (session.user as any).role === 'ADMIN';

    if (!isCommentAuthor && !isPostAuthor && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await PostComment.deleteOne({ _id: commentId });
    // Also delete any replies to this comment
    await PostComment.deleteMany({ replyTo: commentId });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Delete comment error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
