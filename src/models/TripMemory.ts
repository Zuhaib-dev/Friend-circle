import mongoose, { Document, Model } from "mongoose";

export interface ITripMemory extends Document {
  title: string;
  code: string;
  date: string;
  distance: string;
  weather: string;
  status: string;
  coordinates: string;
  elevation: string;
  bannerImage: string;
  description: string;
  story: string;
  bestMoment: string;
  crew: Array<{ callsign: string; name: string; rig: string; }>;
  quotes: Array<{ time: string; callsign: string; message: string; }>;
  media: Array<{ url: string; featured: boolean; }>;
  logistics: Array<{ label: string; value: string; code: string; }>;
  waypoints: Array<{ id: string; name: string; time: string; km: number; elev: number; }>;
  createdAt: Date;
  updatedAt: Date;
}

const TripMemorySchema = new mongoose.Schema<ITripMemory>(
  {
    title: { type: String, required: true },
    code: { type: String, required: true },
    date: { type: String, required: true },
    distance: { type: String, required: true },
    weather: { type: String, required: true },
    status: { type: String, required: true },
    coordinates: { type: String, required: true },
    elevation: { type: String, required: true },
    bannerImage: { type: String, required: true },
    description: { type: String, required: true },
    story: { type: String, required: true },
    bestMoment: { type: String, required: true },
    crew: [
      {
        callsign: { type: String, required: true },
        name: { type: String, required: true },
        rig: { type: String, required: true },
      },
    ],
    quotes: [
      {
        time: { type: String, required: true },
        callsign: { type: String, required: true },
        message: { type: String, required: true },
      },
    ],
    media: [
      {
        url: { type: String, required: true },
        featured: { type: Boolean, default: false },
      },
    ],
    logistics: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
        code: { type: String, required: true },
      },
    ],
    waypoints: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        time: { type: String, required: true },
        km: { type: Number, required: true },
        elev: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const TripMemory: Model<ITripMemory> =
  mongoose.models.TripMemory || mongoose.model<ITripMemory>("TripMemory", TripMemorySchema);

export default TripMemory;
