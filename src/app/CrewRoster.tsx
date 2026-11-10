import { CrewSection } from "@/components/landing/CrewSection";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export default async function CrewRoster() {
  try {
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

    return <CrewSection initialCrew={initialCrew} />;
  } catch (error) {
    console.error("Failed to load crew roster", error);
    return <CrewSection initialCrew={[]} />;
  }
}
