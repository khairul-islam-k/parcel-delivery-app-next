import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";



const authOptions: NextAuthOptions = {
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


        const user = await User.findOne({ email: credentials?.email });


        if (!credentials?.password) {
          return null;
        }

        // before validate
        const isPassword = await bcrypt.compare(credentials?.password, user?.password);

        // const user = {name : "khairul", email: "khairul@gmail.com"};

        // If no error and we have user data, return it
        if (isPassword) {
          return {
            id : user?._id.toString(),
            name: user?.name,
            email: user?.email,
            image: user?.image,
            role: user?.role
          }
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
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account) {
        try {
          const { name, email, image } = user;
          const { provider, providerAccountId } = account;

          console.log("provider",provider);

          if (provider === "credentials") {
            return true;
          }

          await dbConnect();
          const existingUser = await User.findOne({ providerAccountId });
          
          if (!existingUser) {
            console.log("provider inside")
            const result = await User.create({
              provider,
              providerAccountId,
              email,
              name,
              image,
              role: "user",
            });

            if (provider === "google" || provider === "github") {
              user.name = name as string;
              user.role = "user";
            }

          } else {
            user.name = existingUser?.name;
            user.role = existingUser?.role;
          }

        } catch (error) {
          console.log(error);
        }
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
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