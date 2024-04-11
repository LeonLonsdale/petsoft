import { NextAuthConfig } from 'next-auth';
import { paths } from './paths';
import { getUserByEmail } from './server-utils';

export const nextAuthEdgeConfig = {
  pages: {
    signIn: paths.login.path(),
  },
  callbacks: {
    // runs on every request with middleware
    authorized: ({ auth, request }) => {
      const requestedPath = request.nextUrl.pathname;
      const isAccessingApp = requestedPath.includes('/app');
      const isLoggedIn = Boolean(auth?.user);
      const hasAccess = auth?.user.hasAccess;
      const { login, signup, app, payments } = paths;

      // Not logged in, accessing public page
      if (!isLoggedIn && !isAccessingApp) return true;

      // Not logged in, accessing private page
      if (!isLoggedIn && isAccessingApp)
        return Response.redirect(new URL(paths.login.path(), request.nextUrl));

      // Logged in, accessing private page, has not paid
      // Redirect to payments page.
      if (isLoggedIn && isAccessingApp && !hasAccess) {
        console.log('logged in and accessing app has not paid');
        return Response.redirect(new URL(payments.path(), request.nextUrl));
      }

      // Logged in, accessing pricate page, has paid
      if (isLoggedIn && isAccessingApp && hasAccess) {
        console.log('logged in accessing app, and has paid');
        return true;
      }

      // Logged in, accessing login or signup page, has paid
      // Redirect to dashboard
      if (isLoggedIn && !isAccessingApp && hasAccess) {
        if (
          requestedPath.includes(login.path()) ||
          requestedPath.includes(signup.path())
        ) {
          console.log('Logged in, paid, accessing login or signup');
          return Response.redirect(
            new URL(app.dashboard.path(), request.nextUrl),
          );
        }
        console.log('logged in, paid, accessing landing');
        return true;
      }

      // Logged in, accessing public page, has not paid
      if (isLoggedIn && !isAccessingApp && !hasAccess) {
        console.log('is logged in but is not accessing the app');
        // if user is accessing login or signup page, redirect to payments
        if (
          requestedPath.includes(login.path()) ||
          requestedPath.includes(signup.path())
        ) {
          return Response.redirect(new URL(payments.path(), request.nextUrl));
        }
        // if it's the landing page, allow it.
        return true;
      }

      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      // add the user id to the token
      if (
        user !== undefined &&
        user.id !== undefined &&
        user.email !== undefined &&
        user.email !== null
      ) {
        token.userId = user.id;
        token.hasAccess = user.hasAccess;
        token.email = user.email;
      }
      if (trigger === 'update') {
        const userFromDb = await getUserByEmail(token.email);
        if (userFromDb) token.hasAccess = userFromDb.hasAccess;
      }
      return token;
    },
    session: ({ session, token }) => {
      // add the user id to the session - need to access the id to retrieve pets
      session.user.id = token.userId;
      session.user.hasAccess = token.hasAccess;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
