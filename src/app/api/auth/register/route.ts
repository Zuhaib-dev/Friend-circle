import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { sendOTPVerificationEmail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    console.log("Registration started");
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      console.log("Missing fields");
      return NextResponse.json({ error: 'Please provide all fields' }, { status: 400 });
    }

    console.log("Connecting to DB");
    await connectToDatabase();
    console.log("Connected to DB, checking existing user");

    const existingUser = await User.findOne({ email });
    console.log("Existing user checked");

    if (existingUser) {
      if (existingUser.isVerified) {
        console.log("User already exists and is verified");
        return NextResponse.json({ error: 'User already exists and is verified' }, { status: 400 });
      }
      // If user exists but is not verified, we can resend the OTP or update their details
    }

    console.log("Hashing password");
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Password hashed, generating OTP");
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
      console.log("Creating new user in DB");
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        isVerified: false,
        otp,
        otpExpires,
        authProvider: 'credentials',
      });
      console.log("New user created");
    }

    console.log("Sending OTP verification email");
    const emailResponse = await sendOTPVerificationEmail(email, otp);
    console.log("Email response:", emailResponse);

    if (!emailResponse.success) {
      return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'User registered. Please check your email for OTP.', email }, { status: 201 });

  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'An error occurred during registration' }, { status: 500 });
  }
}
