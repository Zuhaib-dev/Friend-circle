import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

const ADMIN_USER_FIELDS = '_id name email image role teamMemberStatus teamMemberDetails phone socialHandle bio isSuspended createdAt updatedAt';

function serializeAdminUser(user: any) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
    teamMemberStatus: user.teamMemberStatus,
    teamMemberDetails: user.teamMemberDetails,
    phone: user.phone,
    socialHandle: user.socialHandle,
    bio: user.bio,
    isSuspended: user.isSuspended,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const view = searchParams.get('view');

    await connectToDatabase();
    
    let users;
    if (view === 'all') {
      users = await User.find().select(ADMIN_USER_FIELDS).lean();
    } else {
      // Default to pending
      users = await User.find({ teamMemberStatus: 'PENDING' }).select(ADMIN_USER_FIELDS).lean();
    }

    return NextResponse.json(users, { status: 200 });
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

    const { userId, action } = await req.json(); // action: 'APPROVE' | 'REJECT' | 'SUSPEND' | 'UNSUSPEND'

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
    } else if (action === 'SUSPEND') {
      user.isSuspended = true;
    } else if (action === 'UNSUSPEND') {
      user.isSuspended = false;
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await user.save();

    return NextResponse.json({ message: `User successfully ${action.toLowerCase()}d`, user: serializeAdminUser(user) }, { status: 200 });
  } catch (error: any) {
    console.error('Admin PATCH user error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
