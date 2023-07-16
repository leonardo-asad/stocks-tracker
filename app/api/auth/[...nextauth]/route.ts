import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { compare, hash } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              email,
              passwordHash: await hash(password, 12),
            },
          });

          return {
            id: newUser.id,
            email,
          };
        }

        const isValid = await compare(password, user.passwordHash);

        if (!isValid) {
          throw new Error("Wrong credentials. Try again.");
        }

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);
