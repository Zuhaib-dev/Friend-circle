import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';
import { sendWelcomeNewsletterEmail } from '@/lib/mailer';

function isValidEmail(email: string) {
  // Strict email regex validation
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address (e.g. user@domain.com)' }, { status: 400 });
    }

    await connectToDatabase();

    const existing = await NewsletterSubscriber.findOne({ email: normalizedEmail });

    await NewsletterSubscriber.findOneAndUpdate(
      { email: normalizedEmail },
      {
        email: normalizedEmail,
        status: 'ACTIVE',
        subscribedAt: new Date(),
        $unset: { unsubscribedAt: '' },
      },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    // Send welcome email if new subscriber or reactivated
    if (!existing || existing.status !== 'ACTIVE') {
      // Send welcome email asynchronously
      sendWelcomeNewsletterEmail(normalizedEmail).catch((err) =>
        console.error('Welcome email sending error:', err)
      );
    }

    return NextResponse.json({ success: true, message: 'Welcome email dispatched! You are now subscribed.' }, { status: 201 });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Failed to join newsletter' }, { status: 500 });
  }
}
