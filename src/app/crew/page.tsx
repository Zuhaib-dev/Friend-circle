import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { CrewClient } from "./CrewClient";

export default async function CrewPage() {
  const session = await getServerSession(authOptions);
  
  await connectToDatabase();
  const crewDocs = await User.find({
    $or: [
      { role: 'ADMIN' },
      { role: 'TEAM_MEMBER', teamMemberStatus: 'APPROVED' }
    ]
  }).select('name email image role socialHandle bio').lean();

  const initialCrew = crewDocs.map((c: any) => ({
    _id: c._id.toString(),
    name: c.name,
    email: c.email,
    role: c.role,
    image: c.image || null,
    bio: c.bio || null,
    socialHandle: c.socialHandle || null,
  }));

  return (
    <CrewClient initialCrew={initialCrew} sessionEmail={session?.user?.email || null} />
  );
}
