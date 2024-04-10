import NextAuth, { NextAuthConfig } from 'next-auth';
import { paths } from './paths';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './server-utils';
import { authSchema } from './validations';

const config = {
  pages: {
    signIn: paths.login.path(),
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFormData = authSchema.safeParse(credentials);
        if (!validatedFormData.success) return null;

        // extract credentials from arguments (form data or similar)
        const { email, password } = validatedFormData.data;
        // check if the user exists
        const user = await getUserByEmail(email);

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

      if (isLogged && isAccessingApp && !auth?.user.hasAccess) {
        return Response.redirect(
          new URL(paths.payments.path(), request.nextUrl),
        );
      }

      if (isLogged && isAccessingApp && auth?.user.hasAccess) {
        return true;
      }

      if (isLogged && !isAccessingApp) {
        if (
          (request.nextUrl.pathname.includes(paths.login.path()) ||
            request.nextUrl.pathname.includes(paths.signup.path())) &&
          !auth?.user.hasAccess
        ) {
          return Response.redirect(
            new URL(paths.payments.path(), request.nextUrl),
          );
        }
        return true;
      }

      if (!isLogged && !isAccessingApp) {
        return true;
      }

      return false;
    },
    jwt: ({ token, user }) => {
      // add the user id to the token
      if (user) {
        token.userId = user.id;
        token.hasAccess = user.hasAccess;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        // add the user id to the session - need to access the id to retrieve pets
        session.user.id = token.userId;
        session.user.hasAccess = token.hasAccess;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
