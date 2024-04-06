import NextAuth, { NextAuthConfig } from 'next-auth';
import { paths } from './paths';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './server-utils';

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
        const user = await getUserByEmail(email)

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
        return user;
      },
    }),
  ],
  callbacks: {
    // runs on every request with middleware
    authorized: ({ auth, request }) => {
      const isAccessingApp = request.nextUrl.pathname.includes('/app');
      const isLogged = Boolean(auth?.user);
      if (!isLogged && isAccessingApp) {
        return false;
      }

      if (isLogged && isAccessingApp) {
        return true;
      }

      if (isLogged && !isAccessingApp) {
        return Response.redirect(
          new URL(paths.app.dashboard.path(), request.nextUrl),
        );
      }

      if (!isLogged && !isAccessingApp) {
        return true;
      }

      return false;
    },
    jwt: ({ token, user }) => {
      // add the user id to the token
      if (user) token.userId = user.id;
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        // add the user id to the session - need to access the id to retrieve pets
       session.user.id = token.userId;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
