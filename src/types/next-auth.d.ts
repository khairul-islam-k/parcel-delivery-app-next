import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image?: string;
      role:string;
    } & DefaultSession["user"];
  }

  interface User {
    name: string;
    email: string;
    image?: string;
    role:string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    email: string;
    image?: string;
    role: string;
  }
}
