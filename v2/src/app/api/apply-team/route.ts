import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { details } = await req.json();

    if (!details) {
      return NextResponse.json({ error: 'Please provide application details' }, { status: 400 });
    }

    await connectToDatabase();
    
    // Using explicit typing or asserting session user ID
    const userId = (session.user as any).id;

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.role === 'TEAM_MEMBER' || user.role === 'ADMIN') {
      return NextResponse.json({ error: 'You are already a team member or admin' }, { status: 400 });
    }

    user.teamMemberStatus = 'PENDING';
    user.teamMemberDetails = details;
    user.phone = details; // Also save it to the official phone field
    await user.save();

    return NextResponse.json({ message: 'Application submitted successfully', status: user.teamMemberStatus }, { status: 200 });
  } catch (error: any) {
    console.error('Apply team error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
