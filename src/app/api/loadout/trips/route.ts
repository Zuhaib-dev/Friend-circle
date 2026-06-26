import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import LoadoutTrip from '@/models/LoadoutTrip';

const SEED_TRIPS = [
  { tripId: "sonamarg", name: "SONAMARG // GLACIER PASS", code: "SM-04", terrain: "ALPINE / SCREE", duration: "3D-2N", hazard: "MED" },
  { tripId: "gurez", name: "GUREZ // RAZDAN RIDGE", code: "GZ-11", terrain: "HIGH ALT / BORDER", duration: "5D-4N", hazard: "HIGH" },
  { tripId: "pahalgam", name: "PAHALGAM // LIDDER CAMP", code: "PG-02", terrain: "FOREST / RIVER", duration: "2D-1N", hazard: "LOW" },
];

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== 'ADMIN' && (session.user as any).role !== 'TEAM_MEMBER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await connectToDatabase();
    const count = await LoadoutTrip.countDocuments();
    if (count === 0) {
      await LoadoutTrip.insertMany(SEED_TRIPS);
    }
    
    const trips = await LoadoutTrip.find().lean();
    return NextResponse.json(trips, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin required.' }, { status: 403 });
    }

    await connectToDatabase();
    const body = await req.json();
    
    if (body.tripId) {
      const updated = await LoadoutTrip.findOneAndUpdate(
        { tripId: body.tripId },
        { $set: body },
        { new: true, upsert: true }
      );
      return NextResponse.json(updated, { status: 200 });
    }

    return NextResponse.json({ error: 'Missing tripId' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin required.' }, { status: 403 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const tripId = searchParams.get('tripId');
    if (!tripId) {
      return NextResponse.json({ error: 'Missing tripId' }, { status: 400 });
    }
    
    await LoadoutTrip.findOneAndDelete({ tripId });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
