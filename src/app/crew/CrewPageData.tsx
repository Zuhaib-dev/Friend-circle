import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { CrewClient } from "./CrewClient";

export default async function CrewPageData() {
  const session = await getServerSession(authOptions);

  await connectToDatabase();
  const crewDocs = await User.find({
    $or: [
      { role: "ADMIN" },
      { role: "TEAM_MEMBER", teamMemberStatus: "APPROVED" },
    ],
  })
    .select("name email image role socialHandle bio")
    .lean();

  const initialCrew = crewDocs.map((member) => ({
    _id: member._id.toString(),
    name: member.name,
    email: member.email,
    role: member.role,
    image: member.image || null,
    bio: member.bio || null,
    socialHandle: member.socialHandle || null,
  }));

  return <CrewClient initialCrew={initialCrew} sessionEmail={session?.user?.email || null} />;
}
