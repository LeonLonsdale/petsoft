import NextAuth, { NextAuthConfig } from 'next-auth';
import { paths } from './paths';

const config = {
  pages: {
    signIn: paths.login.path(),
  },
  providers: [],
  callbacks: {
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

export const { auth } = NextAuth(config);
