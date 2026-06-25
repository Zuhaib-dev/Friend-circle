import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this if using another provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPVerificationEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: `"Friend Circle" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Friend Circle - Verify Your Email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #0f172a; color: #f8fafc;">
        <h2 style="color: #38bdf8; text-align: center;">Welcome to Friend Circle!</h2>
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">Thank you for registering. Please use the following 6-digit OTP to verify your email address. This OTP is valid for 10 minutes.</p>
        <div style="background-color: #1e293b; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <h1 style="color: #fbbf24; margin: 0; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p style="font-size: 14px; color: #94a3b8;">If you didn't request this email, please ignore it.</p>
        <hr style="border-color: #334155; margin: 20px 0;" />
        <p style="font-size: 12px; text-align: center; color: #64748b;">© 2026 Friend Circle</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return { success: false, error };
  }
};
