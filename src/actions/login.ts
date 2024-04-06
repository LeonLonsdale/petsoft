'use server';

import { signIn } from '@/lib/auth';
import { authSchema } from '@/lib/validations';

export const login = async (formData: unknown) => {
  
  if (!(formData instanceof FormData)) return { message: 'Invalid data' };

  // pass in the provider name first, then the data
  // lets the authjs authorize func know which provider type
  await signIn('credentials', formData);
};
