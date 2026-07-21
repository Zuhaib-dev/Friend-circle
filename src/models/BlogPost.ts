import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  imageKitFileId?: string;
  audioMemoUrl?: string;
  tags: string[];
  category: 'EXPEDITION' | 'FIELD_NOTES' | 'TECH' | 'REFLECTIONS' | 'GUIDES';
  author: mongoose.Types.ObjectId;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt?: Date;
  readTimeMinutes: number;
  telemetry: {
    location?: string;
    coordinates?: string;
    weather?: string;
    elevation?: string;
  };
  viewsCount: number;
  likesCount: number;
  reactions: {
    roger: number;
    acknowledged: number;
    copied: number;
  };
  userReactions?: {
    userId: mongoose.Types.ObjectId;
    type: 'roger' | 'acknowledged' | 'copied';
  }[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: '',
    },
    imageKitFileId: {
      type: String,
      default: '',
    },
    audioMemoUrl: {
      type: String,
      default: '',
    },
    tags: [{ type: String, trim: true }],
    category: {
      type: String,
      enum: ['EXPEDITION', 'FIELD_NOTES', 'TECH', 'REFLECTIONS', 'GUIDES'],
      default: 'FIELD_NOTES',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
      default: 'DRAFT',
    },
    publishedAt: {
      type: Date,
    },
    readTimeMinutes: {
      type: Number,
      default: 3,
    },
    telemetry: {
      location: { type: String, default: 'SRINAGAR / KMR' },
      coordinates: { type: String, default: '34.0837°N · 74.7973°E' },
      weather: { type: String, default: '4°C · NW 14KT' },
      elevation: { type: String, default: '1580 M' },
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    reactions: {
      roger: { type: Number, default: 0 },
      acknowledged: { type: Number, default: 0 },
      copied: { type: Number, default: 0 },
    },
    userReactions: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        type: { type: String, enum: ['roger', 'acknowledged', 'copied'] },
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.BlogPost) {
  delete mongoose.models.BlogPost;
}

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
