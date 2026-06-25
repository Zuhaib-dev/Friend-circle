import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import TourComment from "@/models/TourComment";
import User from "@/models/User";

// Get comments for a tour
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.teamMemberStatus !== "APPROVED")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    // We populate the author to show name and image in the UI
    const comments = await TourComment.find({ tourId: id })
      .populate({ path: "author", select: "name image", model: User })
      .sort({ createdAt: 1 }); // Chronological order
      
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// Post a comment to a tour
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.teamMemberStatus !== "APPROVED")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Comment text is required" }, { status: 400 });
    }

    await connectToDatabase();

    const newComment = await TourComment.create({
      tourId: id,
      author: session.user.id,
      text: text.trim(),
    });

    const populatedComment = await TourComment.findById(newComment._id).populate({
      path: "author",
      select: "name image",
      model: User
    });

    return NextResponse.json(populatedComment, { status: 201 });
  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
