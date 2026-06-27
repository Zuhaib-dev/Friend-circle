import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import TripMemory from "@/models/TripMemory";

export async function GET(req: Request) {
  await connectToDatabase();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const memory = await TripMemory.findById(id);
      if (!memory) return NextResponse.json({ error: "Memory not found" }, { status: 404 });
      return NextResponse.json(memory);
    }

    const memories = await TripMemory.find().sort({ date: -1 });
    return NextResponse.json(memories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch memories" }, { status: 500 });
  }
}
