import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, dispatchId, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // Sending to the admin email
      subject: `[FC Dispatch] ${subject} ${dispatchId ? `(${dispatchId})` : ""}`,
      text: `Dispatch Ticket: ${dispatchId || "N/A"}\nFrom: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: monospace; padding: 20px; border: 1px solid #1c1917; background: #f5f5f4; color: #1c1917;">
          <h2 style="text-transform: uppercase; border-bottom: 1px solid #1c1917; padding-bottom: 10px;">DISPATCH TICKET ${dispatchId ? `(${dispatchId})` : ""}</h2>
          <p><strong>OPERATOR:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>SUBJECT:</strong> ${subject}</p>
          <p><strong>MESSAGE:</strong></p>
          <div style="background: #ffffff; padding: 15px; border: 1px solid #1c1917; white-space: pre-wrap;">${message}</div>
          <p style="margin-top: 20px; font-size: 10px; color: #78716c;">Filed via Friend Circle HQ</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Nodemailer error:", err);
    return NextResponse.json({ error: "Failed to process ticket" }, { status: 500 });
  }
}
