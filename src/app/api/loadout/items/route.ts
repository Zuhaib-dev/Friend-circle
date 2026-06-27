import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/mongodb';
import LoadoutItem from '@/models/LoadoutItem';

const SEED_ITEMS = [
  // SURVIVAL
  { itemId: "s1", name: "Emergency Bivvy Shelter", code: "SRV-001", category: "SURVIVAL", weight: 380, qty: 1, critical: true, packed: false },
  { itemId: "s2", name: "Tactical Med Kit", code: "SRV-002", category: "SURVIVAL", weight: 620, qty: 1, critical: true, packed: false },
  { itemId: "s3", name: "Firestarter Rod", code: "SRV-003", category: "SURVIVAL", weight: 90, qty: 1, critical: true, packed: true },
  { itemId: "s4", name: "Thermal Blanket", code: "SRV-004", category: "SURVIVAL", weight: 120, qty: 2, critical: false, packed: false },
  { itemId: "s5", name: "Multi-Tool / Knife", code: "SRV-005", category: "SURVIVAL", weight: 240, qty: 1, critical: true, packed: true },
  // NAV
  { itemId: "n1", name: "Magnetic Compass", code: "NAV-001", category: "NAV", weight: 60, qty: 1, critical: true, packed: true },
  { itemId: "n2", name: "Topo Map / Kashmir Grid", code: "NAV-002", category: "NAV", weight: 80, qty: 1, critical: true, packed: false },
  { itemId: "n3", name: "GPS Beacon", code: "NAV-003", category: "NAV", weight: 210, qty: 1, critical: false, packed: false },
  { itemId: "n4", name: "Altimeter Watch", code: "NAV-004", category: "NAV", weight: 75, qty: 1, critical: false, packed: true },
  // COMMS
  { itemId: "c1", name: "Handheld UHF Radio", code: "CMS-001", category: "COMMS", weight: 320, qty: 2, critical: true, packed: false },
  { itemId: "c2", name: "Satellite Messenger", code: "CMS-002", category: "COMMS", weight: 110, qty: 1, critical: true, packed: false },
  { itemId: "c3", name: "Whistle / Signal Mirror", code: "CMS-003", category: "COMMS", weight: 35, qty: 1, critical: false, packed: true },
  { itemId: "c4", name: "Power Bank 20Ah", code: "CMS-004", category: "COMMS", weight: 480, qty: 1, critical: false, packed: false },
  // SUSTENANCE
  { itemId: "f1", name: "Water Filter Pump", code: "SUS-001", category: "SUSTENANCE", weight: 290, qty: 1, critical: true, packed: false },
  { itemId: "f2", name: "Ration Pack 24h", code: "SUS-002", category: "SUSTENANCE", weight: 850, qty: 3, critical: true, packed: false },
  { itemId: "f3", name: "Hydration Bladder 3L", code: "SUS-003", category: "SUSTENANCE", weight: 220, qty: 1, critical: false, packed: true },
  { itemId: "f4", name: "Compact Stove / Fuel", code: "SUS-004", category: "SUSTENANCE", weight: 410, qty: 1, critical: false, packed: false },
  // OPTICS
  { itemId: "o1", name: "Binoculars 10x42", code: "OPT-001", category: "OPTICS", weight: 680, qty: 1, critical: false, packed: false },
  { itemId: "o2", name: "Headlamp / 800lm", code: "OPT-002", category: "OPTICS", weight: 95, qty: 2, critical: true, packed: true },
  { itemId: "o3", name: "Action Cam 4K", code: "OPT-003", category: "OPTICS", weight: 175, qty: 1, critical: false, packed: false },
  { itemId: "o4", name: "Night Vision Monocular", code: "OPT-004", category: "OPTICS", weight: 340, qty: 1, critical: false, packed: false },
];

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== 'ADMIN' && (session.user as any).role !== 'TEAM_MEMBER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await connectToDatabase();
    const count = await LoadoutItem.countDocuments();
    if (count === 0) {
      await LoadoutItem.insertMany(SEED_ITEMS);
    }
    
    const items = await LoadoutItem.find().lean();
    return NextResponse.json(items, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // TEAM_MEMBERs can update packing status. ADMIN can update everything.
    if (!session || ((session.user as any).role !== 'ADMIN' && (session.user as any).role !== 'TEAM_MEMBER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await connectToDatabase();
    const body = await req.json();
    
    // For mass updates (e.g., pack all critical)
    if (Array.isArray(body)) {
      const updates = body.map((update) => 
        LoadoutItem.findOneAndUpdate({ itemId: update.itemId }, { $set: update }, { new: true })
      );
      const results = await Promise.all(updates);
      return NextResponse.json(results, { status: 200 });
    }
    
    if (body.itemId) {
      const updated = await LoadoutItem.findOneAndUpdate(
        { itemId: body.itemId },
        { $set: body },
        { new: true, upsert: true }
      );
      return NextResponse.json(updated, { status: 200 });
    }

    return NextResponse.json({ error: 'Missing itemId' }, { status: 400 });
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
    const itemId = searchParams.get('itemId');
    if (!itemId) {
      return NextResponse.json({ error: 'Missing itemId' }, { status: 400 });
    }
    
    await LoadoutItem.findOneAndDelete({ itemId });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
