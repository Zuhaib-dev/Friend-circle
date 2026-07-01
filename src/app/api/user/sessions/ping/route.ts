import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).sessionId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionId = (session.user as any).sessionId;
    const userAgent = req.headers.get("user-agent") || "Unknown Device";
    
    // Attempt to get IP address from various headers (Vercel/Netlify specific headers)
    const ip = req.headers.get("x-forwarded-for") || 
               req.headers.get("x-real-ip") || 
               req.headers.get("cf-connecting-ip") || 
               "Unknown IP";

    await connectToDatabase();

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const sessionIndex = user.activeSessions?.findIndex((s: any) => s.sessionId === sessionId);
    
    if (sessionIndex !== undefined && sessionIndex !== -1) {
      // Update existing session
      user.activeSessions[sessionIndex].userAgent = userAgent;
      user.activeSessions[sessionIndex].ip = ip;
      user.activeSessions[sessionIndex].lastActive = new Date();
    } else {
      // Insert if not found (fallback)
      user.activeSessions.push({
        sessionId,
        userAgent,
        ip,
        lastActive: new Date(),
        status: 'ACTIVE'
      } as any);
    }

    await user.save();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error pinging session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
