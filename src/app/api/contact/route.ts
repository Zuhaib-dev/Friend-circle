import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import createLogger from "@/lib/logger";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const log = createLogger("CONTACT");

// 5 submissions per 15 minutes per IP
const limiter = rateLimit("contact-form", { limit: 5, windowMs: 15 * 60 * 1000 });

function isValidEmail(email: string) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

/** Strip CR/LF to prevent SMTP header injection */
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]/g, "").trim();
}

export async function POST(req: Request) {
  try {
    // Rate limit check
    const ip = getClientIp(req);
    const { success } = limiter.check(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, dispatchId, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Sanitize header-injectable fields
    const safeName = sanitizeHeader(name).slice(0, 200);
    const safeEmail = sanitizeHeader(email);
    const safeSubject = sanitizeHeader(subject).slice(0, 300);
    const safeDispatchId = dispatchId ? sanitizeHeader(String(dispatchId)).slice(0, 50) : "";
    // Message body is not header-injected but cap it at a reasonable size
    const safeMessage = String(message).slice(0, 5000);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      // Use our own address as `from` — put the user's email in `replyTo`
      from: `"Friend Circle Contact" <${process.env.EMAIL_USER}>`,
      replyTo: safeEmail,
      to: process.env.EMAIL_USER, // Sending to the admin email
      subject: `[FC Dispatch] ${safeSubject} ${safeDispatchId ? `(${safeDispatchId})` : ""}`,
      text: `Dispatch Ticket: ${safeDispatchId || "N/A"}\nFrom: ${safeName} (${safeEmail})\nSubject: ${safeSubject}\n\nMessage:\n${safeMessage}`,
      html: `
        <div style="font-family: monospace; padding: 20px; border: 1px solid #1c1917; background: #f5f5f4; color: #1c1917;">
          <h2 style="text-transform: uppercase; border-bottom: 1px solid #1c1917; padding-bottom: 10px;">DISPATCH TICKET ${safeDispatchId ? `(${safeDispatchId})` : ""}</h2>
          <p><strong>OPERATOR:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
          <p><strong>SUBJECT:</strong> ${safeSubject}</p>
          <p><strong>MESSAGE:</strong></p>
          <div style="background: #ffffff; padding: 15px; border: 1px solid #1c1917; white-space: pre-wrap;">${safeMessage}</div>
          <p style="margin-top: 20px; font-size: 10px; color: #78716c;">Filed via Friend Circle HQ</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    log.info("Contact form submitted", { ip });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    log.error("Contact form error", { message: err.message });
    return NextResponse.json({ error: "Failed to process ticket" }, { status: 500 });
  }
}
