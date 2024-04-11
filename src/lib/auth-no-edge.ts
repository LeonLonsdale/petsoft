import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './server-utils';
import { authSchema } from './validations';
import { nextAuthEdgeConfig } from './auth-edge';

const config = {
  ...nextAuthEdgeConfig,
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
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
