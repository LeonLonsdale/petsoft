'use server';

import { signIn } from '@/lib/auth-no-edge';
import { AuthError } from 'next-auth';

export const login = async (_: unknown, formData: unknown) => {
  if (!(formData instanceof FormData)) return { message: 'Invalid data' };

  // pass in the provider name first, then the data
  // lets the authjs authorize func know which provider type
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Invalid Credentials' };
        default:
          return { message: 'Unable to sign in' };
      }
    }
    // Next JS Redirect uses a thrown error.
    // Rethrow to stop catching successful login.
    throw error;
  }
};
