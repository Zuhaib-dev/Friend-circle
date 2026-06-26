import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Convoy from '@/models/Convoy';

const SEED_DATA = [
  {
    convoyId: "alpha",
    callsign: "ALPHA-01",
    status: "ACTIVE",
    operators: 6,
    vehicles: ["THAR-4x4", "GYPSY", "ROYAL-ENFIELD x2"],
    start: "SRINAGAR",
    destination: "GUREZ VALLEY",
    path: [
      { lat: 34.0837, lon: 74.7973, label: "SRINAGAR", elev: 1585, t: "06:12" },
      { lat: 34.2000, lon: 74.8500, elev: 1820, t: "07:40" },
      { lat: 34.4225, lon: 74.6477, label: "BANDIPORA", elev: 1620, t: "08:55" },
      { lat: 34.5500, lon: 74.6900, elev: 2410, t: "10:22" },
      { lat: 34.6300, lon: 74.7500, label: "RAZDAN PASS", elev: 3300, t: "11:48" },
      { lat: 34.6800, lon: 74.8100, elev: 2780, t: "13:05" },
      { lat: 34.7500, lon: 74.8900, label: "DAWAR", elev: 2440, t: "14:30" },
    ],
    progress: 0.62,
    battery: 78,
    temp: 4,
    wind: 22,
    lastBeacon: "00:42 AGO",
  },
  {
    convoyId: "bravo",
    callsign: "BRAVO-02",
    status: "HOLD",
    operators: 4,
    vehicles: ["THAR-4x4", "HIMALAYAN x2"],
    start: "PAHALGAM",
    destination: "ARU MEADOWS",
    path: [
      { lat: 34.0148, lon: 75.3168, label: "PAHALGAM", elev: 2130, t: "07:00" },
      { lat: 34.0500, lon: 75.2900, elev: 2380, t: "08:15" },
      { lat: 34.0900, lon: 75.2600, label: "ARU", elev: 2414, t: "09:30" },
      { lat: 34.1200, lon: 75.2200, elev: 2780, t: "10:55" },
      { lat: 34.1500, lon: 75.1800, label: "LIDDERWAT", elev: 2900, t: "12:40" },
    ],
    progress: 0.45,
    battery: 54,
    temp: 8,
    wind: 11,
    lastBeacon: "02:18 AGO",
  },
  {
    convoyId: "charlie",
    callsign: "CHARLIE-03",
    status: "RTB",
    operators: 3,
    vehicles: ["GYPSY", "ROYAL-ENFIELD"],
    start: "SONMARG",
    destination: "ZOJI LA",
    path: [
      { lat: 34.3000, lon: 75.2800, label: "SONMARG", elev: 2730, t: "05:45" },
      { lat: 34.3200, lon: 75.3500, elev: 3100, t: "07:20" },
      { lat: 34.2800, lon: 75.4500, label: "ZOJI LA", elev: 3528, t: "09:10" },
      { lat: 34.3300, lon: 75.3800, elev: 3100, t: "11:00" },
      { lat: 34.3100, lon: 75.3200, elev: 2780, t: "12:15" },
    ],
    progress: 0.88,
    battery: 31,
    temp: -2,
    wind: 34,
    lastBeacon: "00:11 AGO",
  },
];

export async function GET() {
  try {
    await connectToDatabase();
    
    // Auto-seed if empty for demonstration
    const count = await Convoy.countDocuments();
    if (count === 0) {
      console.log('Seeding convoys...');
      await Convoy.insertMany(SEED_DATA);
    }
    
    const convoys = await Convoy.find().lean();
    return NextResponse.json(convoys, { status: 200 });
  } catch (error: any) {
    console.error('Fetch convoys error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    // Allow updating progress and telemetry for a specific convoy
    if (body.convoyId) {
      const updated = await Convoy.findOneAndUpdate(
        { convoyId: body.convoyId },
        { $set: body },
        { new: true }
      );
      return NextResponse.json(updated, { status: 200 });
    }

    return NextResponse.json({ error: 'Missing convoyId' }, { status: 400 });
  } catch (error: any) {
    console.error('Update convoy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
