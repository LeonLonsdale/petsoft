'use server';

import { signIn } from '@/lib/auth';

export const login = async (formData: FormData) => {
  const authData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  // pass in the provider name first, then the data
  await signIn('credentials', authData);
};
