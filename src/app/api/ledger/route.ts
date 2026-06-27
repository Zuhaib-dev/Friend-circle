import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import Mission from "@/models/Mission";
import Expense from "@/models/Expense";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const mission = await Mission.findOne({ status: { $in: ["PLANNING", "LIVE"] } })
      .populate("roster.user", "name email");

    if (!mission) {
      return NextResponse.json({ mission: null, expenses: [] });
    }

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
    await connectToDatabase();

    const mission = await Mission.findOne({ status: { $in: ["PLANNING", "LIVE"] } });
    if (!mission) return NextResponse.json({ error: "No active mission" }, { status: 400 });
    
    body.missionId = mission._id;

    const newExpense = new Expense(body);
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
    await connectToDatabase();
    
    // For marking an expense settled in UI
    if (body.id && typeof body.settled === "boolean") {
      const updated = await Expense.findByIdAndUpdate(body.id, { settled: body.settled }, { new: true });
      return NextResponse.json(updated);
    }
    
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  } catch (error: any) {
    console.error("PATCH /api/ledger error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
