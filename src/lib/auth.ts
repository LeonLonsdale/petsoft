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
        // extract credentials from arguments (form data or similar)
        const { email, password } = credentials;
        // check if the user exists
        const user = await prisma.user.findUnique({ where: { email } });

        // handle no user
        if (!user) {
          console.log('no user found');
          return null;
        }

        // check if the password is correct
        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        );

        // handle invalid password
        if (!passwordsMatch) {
          console.log('Invalid credentials');
          return null;
        }

        // return the user object if everything is correct
        console.log('Logged in');
        return user;
      },
    }),
  ],
  callbacks: {
    // runs on every request with middleware
    authorized: ({ auth, request }) => {
      const isAccessingApp = request.nextUrl.pathname.includes('/app');
      const isLogged = Boolean(auth?.user);
      if (isAccessingApp && !isLogged) {
        return false;
      }

      if (isLogged && isAccessingApp) {
        return true;
      }

      if (isLogged && !isAccessingApp) {
        return Response.redirect(new URL('/app/dashboard', request.nextUrl));
      }

      if (!isLogged && !isAccessingApp) {
        return true;
      }

      return false;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
