import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { sendOTPVerificationEmail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Please provide all fields' }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json({ error: 'User already exists and is verified' }, { status: 400 });
      }
      // If user exists but is not verified, we can resend the OTP or update their details
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let user;

    if (existingUser && !existingUser.isVerified) {
      // Update unverified user
      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.otp = otp;
      existingUser.otpExpires = otpExpires;
      await existingUser.save();
      user = existingUser;
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        isVerified: false,
        otp,
        otpExpires,
        authProvider: 'credentials',
      });
    }

    const emailResponse = await sendOTPVerificationEmail(email, otp);

    if (!emailResponse.success) {
      return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'User registered. Please check your email for OTP.', email }, { status: 201 });

  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'An error occurred during registration' }, { status: 500 });
  }
}
