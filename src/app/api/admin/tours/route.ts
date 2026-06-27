import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from "@/lib/mongodb";
import Tour from "@/models/Tour";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    const tours = await Tour.find().sort({ date: -1 });
    
    return NextResponse.json(tours);
  } catch (error) {
    console.error("Error fetching admin tours:", error);
    return NextResponse.json({ error: "Failed to fetch tours" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { name, place, date, description, status, coverImage, coordinates, distance, elevation, time, partySize } = data;

    if (!name || !place || !date) {
      return NextResponse.json({ error: "Name, place, and date are required" }, { status: 400 });
    }

    await connectToDatabase();
    
    const tour = await Tour.create({
      name,
      place,
      date: new Date(date),
      description,
      status: status || "UPCOMING",
      coverImage,
      coordinates,
      distance,
      elevation,
      time,
      partySize: partySize ? Number(partySize) : undefined,
    });
    
    return NextResponse.json(tour, { status: 201 });
  } catch (error) {
    console.error("Error creating tour:", error);
    return NextResponse.json({ error: "Failed to create tour" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, ...updates } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Tour ID is required" }, { status: 400 });
    }

    // Convert date string back to Date object if provided
    if (updates.date) {
      updates.date = new Date(updates.date);
    }

    await connectToDatabase();
    
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!updatedTour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }
    
    return NextResponse.json(updatedTour);
  } catch (error) {
    console.error("Error updating tour:", error);
    return NextResponse.json({ error: "Failed to update tour" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Tour ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    
    const deletedTour = await Tour.findByIdAndDelete(id);
    
    if (!deletedTour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tour:", error);
    return NextResponse.json({ error: "Failed to delete tour" }, { status: 500 });
  }
}
