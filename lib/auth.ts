import prisma from "./prisma";
import { compare } from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (
          !user ||
          !(await compare(credentials.password, user.passwordHash))
        ) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          randomKey: "Hey cool",
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      //console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
          firstName: token.firstName,
          lastName: token.lastName,
        },
      };
    },
    jwt: ({ token, user }) => {
      //console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
          firstName: u.firstName,
          lastName: u.lastName,
        };
      }
      return token;
    },
  },
};
