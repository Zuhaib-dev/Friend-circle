import mongoose, { Schema, Document } from 'mongoose';

export interface IWaypoint {
  lat: number;
  lon: number;
  label?: string;
  elev: number;
  t: string;
}

export interface IConvoy extends Document {
  convoyId: string;
  callsign: string;
  status: 'ACTIVE' | 'HOLD' | 'RTB';
  operators: number;
  vehicles: string[];
  start: string;
  destination: string;
  path: IWaypoint[];
  progress: number;
  battery: number;
  temp: number;
  wind: number;
  lastBeacon: string;
}

const ConvoySchema = new Schema(
  {
    convoyId: { type: String, required: true, unique: true },
    callsign: { type: String, required: true },
    status: { type: String, enum: ['ACTIVE', 'HOLD', 'RTB'], required: true, default: 'ACTIVE' },
    operators: { type: Number, required: true },
    vehicles: [{ type: String }],
    start: { type: String, required: true },
    destination: { type: String, required: true },
    path: [
      {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true },
        label: { type: String },
        elev: { type: Number, required: true },
        t: { type: String, required: true },
      },
    ],
    progress: { type: Number, required: true, default: 0 },
    battery: { type: Number, required: true, default: 100 },
    temp: { type: Number, required: true, default: 0 },
    wind: { type: Number, required: true, default: 0 },
    lastBeacon: { type: String, required: true, default: "00:00 AGO" },
  },
  { timestamps: true }
);

if (mongoose.models.Convoy) {
  delete mongoose.models.Convoy;
}
export default mongoose.model<IConvoy>('Convoy', ConvoySchema);
