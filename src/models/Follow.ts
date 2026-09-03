import mongoose, { Schema, Document } from 'mongoose';

export interface IFollow extends Document {
  follower: mongoose.Types.ObjectId;
  following: mongoose.Types.ObjectId;
}

const FollowSchema: Schema = new Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate follows
FollowSchema.index({ follower: 1, following: 1 }, { unique: true });

if (mongoose.models.Follow) {
  delete mongoose.models.Follow;
}

export default mongoose.model<IFollow>('Follow', FollowSchema);
