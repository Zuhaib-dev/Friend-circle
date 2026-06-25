import mongoose, { Document, Model, Types } from "mongoose";

export interface ITourComment extends Document {
  tourId: Types.ObjectId;
  author: Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const TourCommentSchema = new mongoose.Schema<ITourComment>(
  {
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const TourComment: Model<ITourComment> =
  mongoose.models.TourComment || mongoose.model<ITourComment>("TourComment", TourCommentSchema);

export default TourComment;
