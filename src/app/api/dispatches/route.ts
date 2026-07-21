import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import User from '@/models/User';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';
import { sendBlogPublishedEmail } from '@/lib/mailer';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://friendcirclee.netlify.app';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');
    const adminMode = searchParams.get('admin') === 'true';
    const limit = Math.min(Math.max(Number(searchParams.get('limit') || 24), 1), 60);
    const page = Math.max(Number(searchParams.get('page') || 1), 1);

    const session = await getServerSession(authOptions);

    const filter: Record<string, any> = {};

    if (!adminMode || !session?.user || session.user.role !== 'ADMIN') {
      filter.status = 'PUBLISHED';
    }

    if (category && category !== 'ALL') {
      filter.category = category;
    }

    if (tag) {
      filter.tags = tag;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    const query = BlogPost.find(filter)
      .populate('author', 'name image role')
      .sort({ featured: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    if (!adminMode || !session?.user || session.user.role !== 'ADMIN') {
      query.select('title slug summary coverImage audioMemoUrl tags category author publishedAt createdAt updatedAt readTimeMinutes telemetry viewsCount likesCount featured');
    }

    const dispatches = await query.lean();

    return NextResponse.json(dispatches, { status: 200 });
  } catch (error: any) {
    console.error('Fetch dispatches error:', error);
    return NextResponse.json({ error: 'Failed to fetch dispatches' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    await connectToDatabase();

    // Get Admin user document ID
    const dbUser = await User.findOne({ email: session.user.email?.toLowerCase() });
    if (!dbUser) {
      return NextResponse.json({ error: 'User record not found' }, { status: 404 });
    }

    const body = await req.json();
    const {
      title,
      slug: rawSlug,
      summary,
      content,
      coverImage,
      imageKitFileId,
      audioMemoUrl,
      tags,
      category,
      status,
      telemetry,
      featured,
    } = body;

    if (!title || !summary || !content) {
      return NextResponse.json({ error: 'Title, summary, and content are required' }, { status: 400 });
    }

    // Process Slug
    let slug = rawSlug ? slugify(rawSlug) : slugify(title);
    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const readTimeMinutes = calculateReadTime(content);
    const postStatus = status || 'DRAFT';

    const dispatch = await BlogPost.create({
      title,
      slug,
      summary,
      content,
      coverImage: coverImage || '',
      imageKitFileId: imageKitFileId || '',
      audioMemoUrl: audioMemoUrl || '',
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      category: category || 'FIELD_NOTES',
      author: dbUser._id,
      status: postStatus,
      publishedAt: postStatus === 'PUBLISHED' ? new Date() : undefined,
      readTimeMinutes,
      telemetry: {
        location: telemetry?.location || 'SRINAGAR / KMR',
        coordinates: telemetry?.coordinates || '34.0837°N · 74.7973°E',
        weather: telemetry?.weather || '4°C · NW 14KT',
        elevation: telemetry?.elevation || '1580 M',
      },
      featured: Boolean(featured),
    });

    const populated = await BlogPost.findById(dispatch._id).populate('author', 'name image role');

    if (postStatus === 'PUBLISHED') {
      const subscribers = await NewsletterSubscriber.find({ status: 'ACTIVE' }, 'email').lean();
      const recipients = subscribers.map((subscriber: any) => subscriber.email);
      await sendBlogPublishedEmail({
        recipients,
        title: dispatch.title,
        summary: dispatch.summary,
        url: `${BASE_URL}/dispatches/${dispatch.slug}`,
      });
    }

    return NextResponse.json(populated, { status: 201 });
  } catch (error: any) {
    console.error('Create dispatch error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create dispatch' }, { status: 500 });
  }
}
