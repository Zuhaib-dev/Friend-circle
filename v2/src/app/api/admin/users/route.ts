import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    await connectToDatabase();
    
    // Fetch users who applied to be team members
    const pendingUsers = await User.find({ teamMemberStatus: 'PENDING' }).select('-password');

    return NextResponse.json(pendingUsers, { status: 200 });
  } catch (error: any) {
    console.error('Admin GET users error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { userId, action } = await req.json(); // action: 'APPROVE' | 'REJECT'

    if (!userId || !action) {
      return NextResponse.json({ error: 'User ID and action are required' }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (action === 'APPROVE') {
      user.teamMemberStatus = 'APPROVED';
      user.role = 'TEAM_MEMBER';
    } else if (action === 'REJECT') {
      user.teamMemberStatus = 'REJECTED';
      // keeping role as USER
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await user.save();

    return NextResponse.json({ message: `User successfully ${action.toLowerCase()}d`, user }, { status: 200 });
  } catch (error: any) {
    console.error('Admin PATCH user error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
