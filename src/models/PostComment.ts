import mongoose, { Schema, Document } from 'mongoose';

export interface IPostComment extends Document {
  post: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  content: string;
  replyTo?: mongoose.Types.ObjectId; // ID of another PostComment if this is a reply
}

const PostCommentSchema: Schema = new Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PostComment',
    },
  },
  { timestamps: true }
);

if (mongoose.models.PostComment) {
  delete mongoose.models.PostComment;
}

export default mongoose.model<IPostComment>('PostComment', PostCommentSchema);
