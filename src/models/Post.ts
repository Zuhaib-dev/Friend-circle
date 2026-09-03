import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  imageUrl: string;
  imageKitFileId?: string;
  caption?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  likes: mongoose.Types.ObjectId[];
}

const PostSchema: Schema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageKitFileId: {
      type: String,
    },
    caption: {
      type: String,
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  { timestamps: true }
);

if (mongoose.models.Post) {
  delete mongoose.models.Post;
}

export default mongoose.model<IPost>('Post', PostSchema);
