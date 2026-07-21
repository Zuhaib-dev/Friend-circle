import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    await connectToDatabase();

    await NewsletterSubscriber.findOneAndUpdate(
      { email: normalizedEmail },
      {
        email: normalizedEmail,
        status: 'ACTIVE',
        subscribedAt: new Date(),
        $unset: { unsubscribedAt: '' },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Failed to join newsletter' }, { status: 500 });
  }
}
