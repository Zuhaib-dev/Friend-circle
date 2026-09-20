import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { sendOTPVerificationEmail } from '@/lib/mailer';
import otpGenerator from 'otp-generator';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import createLogger from '@/lib/logger';

export const runtime = 'nodejs';

const log = createLogger('AUTH/RESEND-OTP');

// HIGH-01: 3 resends per IP per 60 minutes
const limiter = rateLimit('resend-otp', { limit: 3, windowMs: 60 * 60 * 1000 });

export async function POST(req: Request) {
  try {
    // Rate limit check
    const ip = getClientIp(req);
    const { success } = limiter.check(ip);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { email } = await req.json();
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!normalizedEmail) {
      return NextResponse.json({ error: 'Please provide email' }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: normalizedEmail, authProvider: 'credentials' });

    if (!user) {
      // LOW-03: Generic message — don't reveal whether the account exists
      return NextResponse.json({ message: 'If an account exists, a new OTP has been sent.' }, { status: 200 });
    }

    if (user.isVerified) {
      // LOW-03: Generic message
      return NextResponse.json({ message: 'If an account exists, a new OTP has been sent.' }, { status: 200 });
    }

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // MED-01: Hash OTP before storing in database
    user.otp = await bcrypt.hash(otp, 10);
    user.otpExpires = otpExpires;
    await user.save();

    // Send the plaintext OTP via email — only the hash is stored
    const emailResponse = await sendOTPVerificationEmail(normalizedEmail, otp);

    if (!emailResponse.success) {
      log.error('Failed to send OTP email');
      return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
    }

    log.info('OTP resent', { email: normalizedEmail });
    return NextResponse.json({ message: 'OTP resent successfully.' }, { status: 200 });
  } catch (error: any) {
    log.error('Resend OTP error', { message: error.message });
    return NextResponse.json({ error: 'An error occurred while resending OTP' }, { status: 500 });
  }
}
