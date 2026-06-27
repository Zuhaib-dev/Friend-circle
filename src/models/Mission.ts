import mongoose, { Schema, Document } from 'mongoose';

export interface IMission extends Document {
  missionId: string;
  name: string;
  description: string;
  date: Date;
  status: 'PLANNING' | 'LIVE' | 'COMPLETED';
  roster: {
    user: mongoose.Types.ObjectId;
    callsign: string;
    role: "LEAD" | "TAIL" | "MEDIC" | "NAV" | "SIGNALS" | "MECH" | "MEDIA";
    rig: "BIKE" | "CAR" | "TRUCK";
    vehicle: string;
    plate: string;
    pickup: string;
  }[];
  waypoints: {
    code: string;
    name: string;
    time: string;
    km: number;
    kind: "RALLY" | "PICKUP" | "FUEL" | "BREAK" | "OBJ";
  }[];
  foodDuties: {
    item: string;
    who: mongoose.Types.ObjectId;
    crit: boolean;
  }[];
  gearPersonal: string[];
  gearConvoy: string[];
  prayers: {
    code: string;
    time: string;
    wp: string;
    status: string;
  }[];
}

const MissionSchema: Schema = new Schema(
  {
    missionId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    status: {
      type: String,
      enum: ['PLANNING', 'LIVE', 'COMPLETED'],
      default: 'PLANNING',
    },
    roster: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        callsign: { type: String },
        role: { type: String, enum: ["LEAD", "TAIL", "MEDIC", "NAV", "SIGNALS", "MECH", "MEDIA"] },
        rig: { type: String, enum: ["BIKE", "CAR", "TRUCK"] },
        vehicle: { type: String },
        plate: { type: String },
        pickup: { type: String },
      },
    ],
    waypoints: [
      {
        code: { type: String },
        name: { type: String },
        time: { type: String },
        km: { type: Number },
        kind: { type: String, enum: ["RALLY", "PICKUP", "FUEL", "BREAK", "OBJ"] },
      },
    ],
    foodDuties: [
      {
        item: { type: String },
        who: { type: Schema.Types.ObjectId, ref: 'User' },
        crit: { type: Boolean, default: false },
      },
    ],
    gearPersonal: [{ type: String }],
    gearConvoy: [{ type: String }],
    prayers: [
      {
        code: { type: String },
        time: { type: String },
        wp: { type: String },
        status: { type: String },
      },
    ],
  },
  { timestamps: true }
);

if (mongoose.models.Mission) {
  delete mongoose.models.Mission;
}

export default mongoose.model<IMission>('Mission', MissionSchema);
