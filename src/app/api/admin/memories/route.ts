import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import TripMemory from "@/models/TripMemory";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return false;
  }
  return true;
}

export async function GET() {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  try {
    const memories = await TripMemory.find().sort({ date: -1 });
    return NextResponse.json(memories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch memories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  try {
    const data = await req.json();
    const memory = await TripMemory.create(data);
    return NextResponse.json(memory, { status: 201 });
  } catch (error: any) {
    console.error("POST Memory error:", error);
    return NextResponse.json({ error: error.message || "Failed to create memory" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  try {
    const data = await req.json();
    const { id, ...updateData } = data;
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });
    
    const memory = await TripMemory.findByIdAndUpdate(id, updateData, { new: true });
    if (!memory) return NextResponse.json({ error: "Memory not found" }, { status: 404 });
    return NextResponse.json(memory);
  } catch (error: any) {
    console.error("PATCH Memory error:", error);
    return NextResponse.json({ error: error.message || "Failed to update memory" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });
    
    const memory = await TripMemory.findByIdAndDelete(id);
    if (!memory) return NextResponse.json({ error: "Memory not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete memory" }, { status: 500 });
  }
}
