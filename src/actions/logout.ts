'use server';

import { signOut } from '@/lib/auth-no-edge';

export const logout = async () => {
  await signOut({
    redirectTo: '/',
  });
};
