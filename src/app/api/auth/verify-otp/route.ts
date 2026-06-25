import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Please provide email and OTP' }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email, authProvider: 'credentials' });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ error: 'User is already verified' }, { status: 400 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    if (user.otpExpires && new Date() > user.otpExpires) {
      return NextResponse.json({ error: 'OTP has expired. Please register again to get a new one.' }, { status: 400 });
    }

    // Mark as verified and clear OTP fields
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully. You can now log in.' }, { status: 200 });

  } catch (error: any) {
    console.error('OTP Verification Error:', error);
    return NextResponse.json({ error: 'An error occurred during verification' }, { status: 500 });
  }
}
