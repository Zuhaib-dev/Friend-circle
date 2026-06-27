import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  missionId: mongoose.Types.ObjectId;
  ts: string;
  cat: "FUEL" | "FOOD" | "STAY" | "GEAR" | "SETTLEMENT";
  desc: string;
  paidBy: string; // callsign
  amount: number;
  split: string[]; // array of callsigns
  settled: boolean; // UI flag (for visual settled state of single txns)
}

const ExpenseSchema: Schema = new Schema(
  {
    missionId: { type: Schema.Types.ObjectId, ref: 'Mission', required: true },
    ts: { type: String, required: true },
    cat: { type: String, enum: ["FUEL", "FOOD", "STAY", "GEAR", "SETTLEMENT"], required: true },
    desc: { type: String, required: true },
    paidBy: { type: String, required: true },
    amount: { type: Number, required: true },
    split: [{ type: String }],
    settled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

if (mongoose.models.Expense) {
  delete mongoose.models.Expense;
}

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
