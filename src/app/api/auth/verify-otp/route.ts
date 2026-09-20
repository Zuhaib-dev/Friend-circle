import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import createLogger from '@/lib/logger';

export const runtime = 'nodejs';

const log = createLogger('AUTH/VERIFY-OTP');

// HIGH-01: 5 OTP attempts per IP per 15 minutes
const limiter = rateLimit('verify-otp', { limit: 5, windowMs: 15 * 60 * 1000 });

export async function POST(req: Request) {
  try {
    // Rate limit check
    const ip = getClientIp(req);
    const { success } = limiter.check(ip);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const { email, otp } = await req.json();
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const normalizedOtp = typeof otp === 'string' ? otp.trim() : '';

    if (!normalizedEmail || !normalizedOtp) {
      return NextResponse.json({ error: 'Please provide email and OTP' }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: normalizedEmail, authProvider: 'credentials' });

    if (!user) {
      // LOW-03: Generic message — don't reveal whether the account exists
      return NextResponse.json({ error: 'Invalid email or OTP' }, { status: 400 });
    }

    if (user.isVerified) {
      return NextResponse.json({ error: 'User is already verified' }, { status: 400 });
    }

    // MED-01: Compare with bcrypt instead of plain string
    if (!user.otp || !(await bcrypt.compare(normalizedOtp, user.otp))) {
      return NextResponse.json({ error: 'Invalid email or OTP' }, { status: 400 });
    }

    if (user.otpExpires && new Date() > user.otpExpires) {
      return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 });
    }

    // Mark as verified and clear OTP fields
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    log.info('Email verified', { email: normalizedEmail });
    return NextResponse.json({ message: 'Email verified successfully. You can now log in.' }, { status: 200 });

  } catch (error: any) {
    log.error('OTP verification error', { message: error.message });
    return NextResponse.json({ error: 'An error occurred during verification' }, { status: 500 });
  }
}
