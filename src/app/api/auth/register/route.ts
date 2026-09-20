import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { sendOTPVerificationEmail } from '@/lib/mailer';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import createLogger from '@/lib/logger';

export const runtime = 'nodejs';

const log = createLogger('AUTH/REGISTER');

// 5 registration attempts per IP per 15 minutes
const limiter = rateLimit('register', { limit: 5, windowMs: 15 * 60 * 1000 });

// Password must be ≥ 8 chars with at least one letter and one digit
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

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

    log.debug('Registration started');
    const { name, email, password } = await req.json();
    const normalizedName = typeof name === 'string' ? name.trim() : '';
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!normalizedName || !normalizedEmail || !password) {
      return NextResponse.json({ error: 'Please provide all fields' }, { status: 400 });
    }

    // LOW-02: Password complexity validation
    if (!PASSWORD_REGEX.test(password)) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters with at least one letter and one number' },
        { status: 400 }
      );
    }

    log.debug('Connecting to DB');
    await connectToDatabase();
    log.debug('Connected to DB, checking existing user');

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      if (existingUser.isVerified) {
        // LOW-03: Generic message — don't reveal whether the email is registered
        return NextResponse.json(
          { message: 'If this email is available, a verification OTP has been sent.' },
          { status: 200 }
        );
      }
      // If user exists but is not verified, we can resend the OTP or update their details
    }

    log.debug('Hashing password');
    const hashedPassword = await bcrypt.hash(password, 12);

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    // MED-01: Hash OTP before storing in database
    const hashedOtp = await bcrypt.hash(otp, 10);

    if (existingUser && !existingUser.isVerified) {
      // Update unverified user
      existingUser.name = normalizedName;
      existingUser.password = hashedPassword;
      existingUser.otp = hashedOtp;
      existingUser.otpExpires = otpExpires;
      await existingUser.save();
    } else {
      // Create new user
      log.debug('Creating new user in DB');
      await User.create({
        name: normalizedName,
        email: normalizedEmail,
        password: hashedPassword,
        isVerified: false,
        otp: hashedOtp,
        otpExpires,
        authProvider: 'credentials',
      });
      log.debug('New user created');
    }

    log.debug('Sending OTP verification email');
    // Send the plaintext OTP via email — only the hash is stored
    const emailResponse = await sendOTPVerificationEmail(normalizedEmail, otp);

    if (!emailResponse.success) {
      log.error('Failed to send verification email');
      return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
    }

    log.info('Registration OTP sent', { email: normalizedEmail });
    return NextResponse.json(
      { message: 'User registered. Please check your email for OTP.', email: normalizedEmail },
      { status: 201 }
    );

  } catch (error: any) {
    log.error('Registration error', { message: error.message });
    return NextResponse.json({ error: 'An error occurred during registration' }, { status: 500 });
  }
}
