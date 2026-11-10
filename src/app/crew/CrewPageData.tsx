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
    .select("name image role socialHandle bio")
    .lean();

  const initialCrew = crewDocs.map((member) => ({
    _id: member._id.toString(),
    name: member.name,
    role: member.role as "TEAM_MEMBER" | "ADMIN",
    image: member.image || undefined,
    bio: member.bio || undefined,
    socialHandle: member.socialHandle || undefined,
  }));

  return <CrewClient initialCrew={initialCrew} sessionUserId={session?.user?.id || null} />;
}
