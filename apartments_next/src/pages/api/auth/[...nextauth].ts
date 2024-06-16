// /Users/thomasbui/Desktop/apartments_next/apartments_next/src/pages/api/auth/[...nextauth].ts

import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
            throw new Error('Email and Password are required');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        });

        if (user && await bcrypt.compare(credentials?.password, user.password)) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],

  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return await token;
    },
    async session({session, token}) {
      session.user = token
      session.user.id = token.id;
      session.user.email = token.email;
      return await session;
    }
  }
});
