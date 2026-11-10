import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from "@/lib/mongodb";
import Mission from "@/models/Mission";
import Expense from "@/models/Expense";
import mongoose from "mongoose";

function canAccessMission(session: any, mission: any) {
  if (session?.user?.role === "ADMIN") return true;
  if (session?.user?.role !== "TEAM_MEMBER" || session.user.teamMemberStatus !== "APPROVED") return false;
  return mission.roster.some((member: any) => member.user.toString() === session.user.id);
}

async function getActiveMission() {
  return Mission.findOne({ status: { $in: ["PLANNING", "LIVE"] } })
    .sort({ createdAt: -1 })
    .select("missionId roster.user roster.callsign");
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const mission = await getActiveMission();

    if (!mission) {
      return NextResponse.json({ mission: null, expenses: [] });
    }

    if (!canAccessMission(session, mission)) {
      return NextResponse.json({ error: "Active mission roster access required" }, { status: 403 });
    }

    await mission.populate("roster.user", "name");

    const expenses = await Expense.find({ missionId: mission._id }).sort({ createdAt: -1 });

    return NextResponse.json({ mission, expenses });
  } catch (error: any) {
    console.error("GET /api/ledger error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    await connectToDatabase();

    const mission = await getActiveMission();
    if (!mission) return NextResponse.json({ error: "No active mission" }, { status: 400 });
    if (!canAccessMission(session, mission)) {
      return NextResponse.json({ error: "Active mission roster access required" }, { status: 403 });
    }

    const callsigns = new Set(mission.roster.map((member: any) => member.callsign).filter(Boolean));
    const categories = ["FUEL", "FOOD", "STAY", "GEAR", "SETTLEMENT"];
    const split = body.split;
    if (
      typeof body.ts !== "string" || body.ts.length > 80 ||
      !categories.includes(body.cat) ||
      typeof body.desc !== "string" || !body.desc.trim() || body.desc.length > 500 ||
      typeof body.paidBy !== "string" || !callsigns.has(body.paidBy) ||
      typeof body.amount !== "number" || !Number.isFinite(body.amount) || body.amount <= 0 || body.amount > 100_000_000 ||
      !Array.isArray(split) || split.length === 0 || split.length > callsigns.size ||
      split.some((call: unknown) => typeof call !== "string" || !callsigns.has(call))
    ) {
      return NextResponse.json({ error: "Invalid expense details" }, { status: 400 });
    }

    const newExpense = new Expense({
      missionId: mission._id,
      ts: body.ts,
      cat: body.cat,
      desc: body.desc.trim(),
      paidBy: body.paidBy,
      amount: body.amount,
      split,
      settled: body.cat === "SETTLEMENT",
    });
    const saved = await newExpense.save();

    return NextResponse.json(saved);
  } catch (error: any) {
    console.error("POST /api/ledger error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body) || typeof body.settled !== "boolean" || typeof body.id !== "string" || !mongoose.isValidObjectId(body.id)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    await connectToDatabase();

    const mission = await getActiveMission();
    if (!mission) return NextResponse.json({ error: "No active mission" }, { status: 404 });
    if (!canAccessMission(session, mission)) {
      return NextResponse.json({ error: "Active mission roster access required" }, { status: 403 });
    }

    const updated = await Expense.findOneAndUpdate(
      { _id: body.id, missionId: mission._id },
      { $set: { settled: body.settled } },
      { new: true, runValidators: true }
    );
    if (!updated) return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PATCH /api/ledger error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
