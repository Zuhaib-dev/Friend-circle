import mongoose, { Document, Model } from "mongoose";

export interface ITour extends Document {
  name: string;
  place: string;
  date: Date;
  description?: string;
  status: "UPCOMING" | "COMPLETED" | "CANCELLED";
  coverImage?: string;
  coordinates?: string;
  distance?: string;
  elevation?: string;
  time?: string;
  partySize?: number;
  createdAt: Date;
  updatedAt: Date;
}

const TourSchema = new mongoose.Schema<ITour>(
  {
    name: { type: String, required: true },
    place: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["UPCOMING", "COMPLETED", "CANCELLED"],
      default: "UPCOMING",
    },
    coverImage: { type: String },
    coordinates: { type: String },
    distance: { type: String },
    elevation: { type: String },
    time: { type: String },
    partySize: { type: Number },
  },
  { timestamps: true }
);

const Tour: Model<ITour> =
  mongoose.models.Tour || mongoose.model<ITour>("Tour", TourSchema);

export default Tour;
