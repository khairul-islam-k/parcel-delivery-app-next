import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";



const authOptions:NextAuthOptions = {
  secret: process.env.AUTH_SECRET as string,
    providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    
    credentials: {
      email: { label: "email", type: "email", placeholder: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {

      await dbConnect();
      

    const user = await User.findOne({email:credentials?.email, password: credentials?.password});

    // const user = {name : "khairul", email: "khairul@gmail.com"};

      // If no error and we have user data, return it
      if ( user) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  })
],
pages : {
  signIn: "/login"
},
callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async jwt({ token, user}) {
      if (user) {
        token.fullName = user.fullName;
        token.email = user.email;
        token.photoUrl = user.photoUrl;
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.fullName = token.fullName;
        session.user.email = token.email;
        session.user.photoUrl = token.photoUrl;
      }
      return session
    }
}


}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }