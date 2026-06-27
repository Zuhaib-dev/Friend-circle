import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from "@/lib/mongodb";
import Mission from "@/models/Mission";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    // Fetch the currently active or planning mission
    const mission = await Mission.findOne({ status: { $in: ["PLANNING", "LIVE"] } }).sort({ createdAt: -1 })
      .populate("roster.user", "name email phone image teamMemberDetails bio callsign")
      .populate("foodDuties.who", "name callsign");

    if (!mission) {
      return NextResponse.json({ message: "No active mission" }, { status: 404 });
    }

    return NextResponse.json(mission);
  } catch (error: any) {
    console.error("GET /api/convoys/active error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
