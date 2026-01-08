import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";



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
      

    const user = await User.findOne({email:credentials?.email});

    if (!credentials?.password) {
      return null;
    }

    // before validate
    const isPassword = await bcrypt.compare(credentials?.password ,user?.password);

    // const user = {name : "khairul", email: "khairul@gmail.com"};

      // If no error and we have user data, return it
      if ( isPassword ) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  }),
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string
  })

],
pages : {
  signIn: "/login"
},
callbacks: {
    async signIn({ user, account}) {
      if (account) {
        try {
          const {name, email, image} = user;
          const {provider, providerAccountId} = account;
          await dbConnect();
          const existingUser = await User.findOne({providerAccountId});
          
          if (!existingUser && (provider === "google" || provider === "github")) {
            const result = await User.create({
              provider,
              providerAccountId,
              email,
              fullName: name,
              image,
              role: "user",
            });
            
            if (provider === "google" || provider === "github") {
              user.fullName = name as string;
              user.role = "user";
            }

          } else {
            user.fullName = existingUser?.fullName;
            user.role = existingUser?.role;
          }

        }catch(error) {
          console.log(error);
        }
      }

      return true
    },
    async jwt({ token, user}) {
      if (user) {
        token.fullName = user.fullName;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.fullName = token.fullName;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.role = token.role;
      }
      return session
    }
}


}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }