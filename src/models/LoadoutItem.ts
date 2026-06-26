import mongoose, { Schema, Document } from 'mongoose';

export interface ILoadoutItem extends Document {
  itemId: string;
  name: string;
  code: string;
  category: 'SURVIVAL' | 'NAV' | 'COMMS' | 'SUSTENANCE' | 'OPTICS';
  weight: number;
  qty: number;
  critical: boolean;
  packed: boolean;
}

const LoadoutItemSchema: Schema = new Schema(
  {
    itemId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    code: { type: String, required: true },
    category: { type: String, enum: ['SURVIVAL', 'NAV', 'COMMS', 'SUSTENANCE', 'OPTICS'], required: true },
    weight: { type: Number, required: true },
    qty: { type: Number, required: true },
    critical: { type: Boolean, default: false },
    packed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

if (mongoose.models.LoadoutItem) {
  delete mongoose.models.LoadoutItem;
}

export default mongoose.model<ILoadoutItem>('LoadoutItem', LoadoutItemSchema);
