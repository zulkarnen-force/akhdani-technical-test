import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { Role } from "@/types";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const { username, password } = credentials || {};

        const user = await prisma.user.findFirst({
          where: {
            username,
          },
        });

        if (!user) {
          return null;
        }

        if (!password) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (isValid) {
          return {
            id: user.id,
            role: user.role as Role,
            username: user.username,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/sign-in",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role as Role;
        token.username = user.username;
        token.permissions =
          user.role === "SDM_DIVISION"
            ? ["read:any", "write:any", "delete:any"]
            : ["read:request", "write:request"];
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.username = token.username as string;
        session.user.permissions = token.permissions as string[];
      }
      return session;
    },
  },
};

export const handlers = NextAuth(authOptions);
