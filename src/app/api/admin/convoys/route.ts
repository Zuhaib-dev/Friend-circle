import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import Mission from "@/models/Mission";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    // Fetch the currently active or planning mission
    const mission = await Mission.findOne({ status: { $in: ["PLANNING", "LIVE"] } }).sort({ createdAt: -1 })
      .populate("roster.user", "name email phone image teamMemberDetails bio callsign")
      .populate("foodDuties.who", "name callsign");

    return NextResponse.json(mission || null);
  } catch (error: any) {
    console.error("GET /api/admin/convoys error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectToDatabase();

    if (body._id) {
      // Update existing
      const updated = await Mission.findByIdAndUpdate(body._id, body, { new: true });
      return NextResponse.json(updated);
    } else {
      // Create new
      // If there is already an active mission, we might want to mark it COMPLETED first, 
      // but for simplicity, we just create the new one.
      const newMission = new Mission(body);
      const saved = await newMission.save();
      return NextResponse.json(saved);
    }
  } catch (error: any) {
    console.error("POST /api/admin/convoys error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
