import NextAuth, { NextAuthConfig } from 'next-auth';
import { paths } from './paths';
import Credentials from 'next-auth/providers/credentials';
import prisma from './db';
import bcrypt from 'bcryptjs';

const config = {
  pages: {
    signIn: paths.login.path(),
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on every login attempt.
        const { email, password } = credentials;
        // does the user exist in the db?
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          console.log('no user found');
          return null;
        }

        // const match = await bcrypt.compare(password, user.hashedPassword);
        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        );

        if (!passwordsMatch) {
          console.log('Invalid credentials');
          return null;
        }

        console.log('Logged in');
        return user;
      },
    }),
  ],
  callbacks: {
    // runs on every request with middleware
    authorized: ({ request }) => {
      const isAccessingApp = request.nextUrl.pathname.includes('/app');
      if (isAccessingApp) {
        return false;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn } = NextAuth(config);
