import mongoose, { Schema, Document } from 'mongoose';

export interface ILoadoutTrip extends Document {
  tripId: string;
  name: string;
  code: string;
  terrain: string;
  duration: string;
  hazard: 'LOW' | 'MED' | 'HIGH';
}

const LoadoutTripSchema: Schema = new Schema(
  {
    tripId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    code: { type: String, required: true },
    terrain: { type: String, required: true },
    duration: { type: String, required: true },
    hazard: { type: String, enum: ['LOW', 'MED', 'HIGH'], required: true },
  },
  { timestamps: true }
);

if (mongoose.models.LoadoutTrip) {
  delete mongoose.models.LoadoutTrip;
}

export default mongoose.model<ILoadoutTrip>('LoadoutTrip', LoadoutTripSchema);
