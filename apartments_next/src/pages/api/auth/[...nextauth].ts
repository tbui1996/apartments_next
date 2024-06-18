import NextAuth, { User, type DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

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
        console.log('what is user here: ', user)

        if (user && await bcrypt.compare(credentials?.password, user.password)) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],

  callbacks: {
    async redirect({url, baseUrl}){
      console.log('what is url: ', url)
      console.log('what is baseURL: ', baseUrl)
      if (url === '/api.auth/logout') {
        return '/login'
      }
      return baseUrl + '/login'
    },
    async jwt({token, user}) {
      if (user) {
        token.role = user.role
      }
      return token;
    },
    async session({session, token}) {

      console.log('sess: ', session)
      console.log('token: ',token)
      if (session?.user) {
        session.user.id = token.role
      }
      return session
    }
  }
});
