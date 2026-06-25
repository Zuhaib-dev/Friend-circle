import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Tour from "@/models/Tour";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch all tours, sorting by date descending
    const tours = await Tour.find().sort({ date: -1 });
    
    return NextResponse.json(tours);
  } catch (error) {
    console.error("Error fetching tours:", error);
    return NextResponse.json({ error: "Failed to fetch tours" }, { status: 500 });
  }
}
