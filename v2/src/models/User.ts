import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  isVerified: boolean;
  otp?: string;
  otpExpires?: Date;
  authProvider: 'google' | 'credentials';
  role: 'USER' | 'TEAM_MEMBER' | 'ADMIN';
  teamMemberStatus: 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED';
  teamMemberDetails?: string;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      // Not required because Google Auth users won't have a password
    },
    image: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    authProvider: {
      type: String,
      enum: ['google', 'credentials'],
      required: true,
    },
    role: {
      type: String,
      enum: ['USER', 'TEAM_MEMBER', 'ADMIN'],
      default: 'USER',
    },
    teamMemberStatus: {
      type: String,
      enum: ['NONE', 'PENDING', 'APPROVED', 'REJECTED'],
      default: 'NONE',
    },
    teamMemberDetails: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
