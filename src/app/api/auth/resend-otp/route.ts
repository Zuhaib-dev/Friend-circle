import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { sendOTPVerificationEmail } from '@/lib/mailer';
import otpGenerator from 'otp-generator';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Please provide email' }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email, authProvider: 'credentials' });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ error: 'User is already verified' }, { status: 400 });
    }

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const emailResponse = await sendOTPVerificationEmail(email, otp);

    if (!emailResponse.success) {
      return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'OTP resent successfully.' }, { status: 200 });
  } catch (error: any) {
    console.error('Resend OTP Error:', error);
    return NextResponse.json({ error: 'An error occurred while resending OTP' }, { status: 500 });
  }
}
