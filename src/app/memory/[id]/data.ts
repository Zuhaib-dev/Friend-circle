import { cache } from "react";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import TripMemory from "@/models/TripMemory";

export const getTripMemory = cache(async (id: string) => {
  if (!mongoose.isValidObjectId(id)) return null;

  await connectToDatabase();
  return TripMemory.findById(id)
    .select("title code date distance weather status coordinates elevation bannerImage description story bestMoment crew quotes media logistics waypoints")
    .lean();
});
