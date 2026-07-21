import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IDispatchComment extends Document {
  dispatchId: Types.ObjectId;
  author: Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const DispatchCommentSchema: Schema = new Schema(
  {
    dispatchId: {
      type: Schema.Types.ObjectId,
      ref: 'BlogPost',
      required: true,
      index: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

if (mongoose.models.DispatchComment) {
  delete mongoose.models.DispatchComment;
}

export default mongoose.model<IDispatchComment>('DispatchComment', DispatchCommentSchema);
