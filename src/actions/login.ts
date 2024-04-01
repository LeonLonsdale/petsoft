'use server';

import { signIn } from '@/lib/auth';

export const login = async (formData: FormData) => {
  const authData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // pass in the provider name first, then the data
  // lets the authjs authorize func know which provider type
  await signIn('credentials', authData);
};
