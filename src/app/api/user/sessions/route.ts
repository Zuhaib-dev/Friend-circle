import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

// GET all active sessions
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findById(session.user.id);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Filter out revoked sessions
    const activeSessions = user.activeSessions?.filter((s: any) => s.status === 'ACTIVE') || [];
    
    // Sort so current session is first, then by lastActive
    const currentSessionId = (session.user as any).sessionId;
    
    activeSessions.sort((a: any, b: any) => {
      if (a.sessionId === currentSessionId) return -1;
      if (b.sessionId === currentSessionId) return 1;
      return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
    });

    return NextResponse.json({ sessions: activeSessions, currentSessionId });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE (Revoke) a specific session
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const sessionIdToRevoke = searchParams.get('sessionId');

    if (!sessionIdToRevoke) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    await connectToDatabase();
    
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const sessionIndex = user.activeSessions?.findIndex((s: any) => s.sessionId === sessionIdToRevoke);
    
    if (sessionIndex !== undefined && sessionIndex !== -1) {
      user.activeSessions[sessionIndex].status = 'REVOKED';
      await user.save();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Session not found" }, { status: 404 });

  } catch (error) {
    console.error("Error revoking session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
