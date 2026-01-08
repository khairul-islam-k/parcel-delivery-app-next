import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      fullName: string;
      email: string;
      photoUrl?: string;
    } & DefaultSession["user"];
  }

  interface User {
    fullName: string;
    email: string;
    photoUrl?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    fullName: string;
    email: string;
    photoUrl?: string;
  }
}
