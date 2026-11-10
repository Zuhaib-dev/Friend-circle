import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch users who are either ADMIN or APPROVED TEAM_MEMBER
    // Return only fields intended for the public roster.
    const crewMembers = await User.find({
      $or: [
        { role: 'ADMIN' },
        { role: 'TEAM_MEMBER', teamMemberStatus: 'APPROVED' }
      ]
    }).select('name image role socialHandle bio').lean();

    return NextResponse.json(crewMembers, { status: 200 });
  } catch (error: any) {
    console.error('Fetch crew error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
