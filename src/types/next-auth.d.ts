import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      fullName: string;
      email: string;
      image?: string;
      role:string;
    } & DefaultSession["user"];
  }

  interface User {
    fullName: string;
    email: string;
    image?: string;
    role:string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    fullName: string;
    email: string;
    image?: string;
    role: string;
  }
}
