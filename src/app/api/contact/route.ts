import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    // Ensure environment variables are loaded
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_EMAIL, ADMIN_EMAIL } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM_EMAIL || !ADMIN_EMAIL) {
      console.error("Missing SMTP credentials in environment variables.");
      return NextResponse.json(
        { error: "Server misconfiguration. Cannot send email." },
        { status: 500 }
      );
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT || "465"),
      secure: parseInt(SMTP_PORT || "465") === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // 1. Alert Admin Email
    const adminMailOptions = {
      from: `Friend Circle Communications <${SMTP_FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `[TRX 7 UPLINK] New Coordinate Dropped by ${email}`,
      text: `TRANSMISSION INTERCEPTED:\n\nSender: ${email}\n\nMessage:\n${message}`,
    };

    // 2. Auto-reply to User Email
    const userMailOptions = {
      from: `Friend Circle <${SMTP_FROM_EMAIL}>`,
      to: email,
      subject: "Transmission Received — Friend Circle",
      text: `OPEN CHANNEL · TRX 7\n\nYour transmission has been securely logged.\n\nWe don't promise a reply — we promise we'll read it by the fire.\n\nStay sharp.\n\n— Friend Circle Core Unit\n34.0837°N · 74.7973°E`,
    };

    // Dispatch both emails asynchronously
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ success: true, message: "Transmission sent." });
  } catch (error: any) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to transmit message.", details: error.message },
      { status: 500 }
    );
  }
}
