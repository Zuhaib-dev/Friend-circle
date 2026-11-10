import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';
import { sendWelcomeNewsletterEmail } from '@/lib/mailer';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

const ipLimiter = rateLimit('newsletter-ip', { limit: 5, windowMs: 15 * 60 * 1000 });
const addressLimiter = rateLimit('newsletter-address', { limit: 3, windowMs: 60 * 60 * 1000 });

function isValidEmail(email: string) {
  // Strict email regex validation
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export async function POST(req: Request) {
  try {
    const ipCheck = ipLimiter.check(getClientIp(req));
    if (!ipCheck.success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const { email } = await req.json();
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail || normalizedEmail.length > 254 || !isValidEmail(normalizedEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address (e.g. user@domain.com)' }, { status: 400 });
    }

    if (!addressLimiter.check(normalizedEmail).success) {
      return NextResponse.json({ error: 'Too many requests for this address. Please try again later.' }, { status: 429 });
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
