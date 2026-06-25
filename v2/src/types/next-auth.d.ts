import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "TEAM_MEMBER" | "ADMIN";
      teamMemberStatus: "NONE" | "PENDING" | "APPROVED" | "REJECTED";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "USER" | "TEAM_MEMBER" | "ADMIN";
    teamMemberStatus: "NONE" | "PENDING" | "APPROVED" | "REJECTED";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "USER" | "TEAM_MEMBER" | "ADMIN";
    teamMemberStatus: "NONE" | "PENDING" | "APPROVED" | "REJECTED";
  }
}
