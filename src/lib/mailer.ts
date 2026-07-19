import nodemailer from 'nodemailer';

const getMailerConfig = () => {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.replace(/\s+/g, '');
  const host = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : port === 465;

  if (!user || !pass) {
    throw new Error('Missing EMAIL_USER or EMAIL_PASS environment variable');
  }

  return { user, pass, host, port, secure };
};

export const sendOTPVerificationEmail = async (email: string, otp: string) => {
  const to = email.trim().toLowerCase();
  console.log('[MAILER] Starting OTP email send...');
  console.log('[MAILER] Sending to:', to);

  let config;
  try {
    config = getMailerConfig();
  } catch (error) {
    console.error('[MAILER] Configuration error:', error);
    return { success: false, error };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  // Verify SMTP connection first
  try {
    await transporter.verify();
    console.log('[MAILER] SMTP connection verified successfully');
  } catch (verifyError) {
    console.error('[MAILER] SMTP verification FAILED:', verifyError);
    return { success: false, error: verifyError };
  }

  const mailOptions = {
    from: `"Friend Circle" <${config.user}>`,
    to,
    subject: 'Friend Circle - Verify Your Email',
    text: `Your Friend Circle verification OTP is ${otp}. This OTP is valid for 10 minutes.`,
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
    const info = await transporter.sendMail(mailOptions);
    console.log('[MAILER] Email sent successfully!');
    console.log('[MAILER] Message ID:', info.messageId);
    console.log('[MAILER] Accepted:', info.accepted);
    console.log('[MAILER] Rejected:', info.rejected);
    console.log('[MAILER] Response:', info.response);
    return { success: true };
  } catch (error) {
    console.error('[MAILER] Error sending OTP email:', error);
    return { success: false, error };
  }
};
