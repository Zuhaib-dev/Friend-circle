import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import mongoose from 'mongoose';
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

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === 'ADMIN';

    // Query by slug or ObjectId
    const isId = mongoose.Types.ObjectId.isValid(slug);
    const query: Record<string, any> = isId ? { _id: slug } : { slug };
    if (!isAdmin) {
      query.status = 'PUBLISHED';
    }

    const dispatch = await BlogPost.findOneAndUpdate(
      query,
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    ).populate('author', 'name image role bio socialHandle');

    if (!dispatch) {
      return NextResponse.json({ error: 'Dispatch not found' }, { status: 404 });
    }

    return NextResponse.json(dispatch, { status: 200 });
  } catch (error: any) {
    console.error('Fetch single dispatch error:', error);
    return NextResponse.json({ error: 'Failed to fetch dispatch' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const { slug: slugOrId } = await params;
    await connectToDatabase();

    const isId = mongoose.Types.ObjectId.isValid(slugOrId);
    const query = isId ? { _id: slugOrId } : { slug: slugOrId };

    const existing = await BlogPost.findOne(query);
    if (!existing) {
      return NextResponse.json({ error: 'Dispatch not found' }, { status: 404 });
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

    const updateData: Record<string, any> = {};

    if (title) updateData.title = title;
    if (summary) updateData.summary = summary;
    if (content) {
      updateData.content = content;
      updateData.readTimeMinutes = calculateReadTime(content);
    }
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (imageKitFileId !== undefined) updateData.imageKitFileId = imageKitFileId;
    if (audioMemoUrl !== undefined) updateData.audioMemoUrl = audioMemoUrl;
    if (category) updateData.category = category;
    if (tags !== undefined) {
      updateData.tags = Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim()).filter(Boolean);
    }
    if (status) {
      updateData.status = status;
      if (status === 'PUBLISHED' && !existing.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    if (telemetry) {
      updateData.telemetry = {
        location: telemetry.location || existing.telemetry?.location || 'SRINAGAR / KMR',
        coordinates: telemetry.coordinates || existing.telemetry?.coordinates || '34.0837°N · 74.7973°E',
        weather: telemetry.weather || existing.telemetry?.weather || '4°C · NW 14KT',
        elevation: telemetry.elevation || existing.telemetry?.elevation || '1580 M',
      };
    }
    if (featured !== undefined) updateData.featured = Boolean(featured);

    if (rawSlug && rawSlug !== existing.slug) {
      const newSlug = slugify(rawSlug);
      const conflict = await BlogPost.findOne({ slug: newSlug, _id: { $ne: existing._id } });
      if (conflict) {
        updateData.slug = `${newSlug}-${Date.now().toString().slice(-4)}`;
      } else {
        updateData.slug = newSlug;
      }
    }

    const shouldNotifySubscribers = status === 'PUBLISHED' && existing.status !== 'PUBLISHED';

    const updated = await BlogPost.findByIdAndUpdate(existing._id, updateData, {
      returnDocument: 'after',
      runValidators: true,
    })
      .populate('author', 'name image role');

    if (shouldNotifySubscribers && updated) {
      const subscribers = await NewsletterSubscriber.find({ status: 'ACTIVE' }, 'email').lean();
      const recipients = subscribers.map((subscriber: any) => subscriber.email);
      await sendBlogPublishedEmail({
        recipients,
        title: updated.title,
        summary: updated.summary,
        url: `${BASE_URL}/dispatches/${updated.slug}`,
      });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error('Update dispatch error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update dispatch' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const { slug: slugOrId } = await params;
    await connectToDatabase();

    const isId = mongoose.Types.ObjectId.isValid(slugOrId);
    const query = isId ? { _id: slugOrId } : { slug: slugOrId };

    const deleted = await BlogPost.findOneAndDelete(query);
    if (!deleted) {
      return NextResponse.json({ error: 'Dispatch not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: deleted._id }, { status: 200 });
  } catch (error: any) {
    console.error('Delete dispatch error:', error);
    return NextResponse.json({ error: 'Failed to delete dispatch' }, { status: 500 });
  }
}
