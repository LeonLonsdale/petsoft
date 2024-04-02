'use server';

import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';
import { signIn } from '@/lib/auth';

export const register = async (formData: FormData) => {
  const user = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const response = await prisma.user.create({
    data: {
      email: user.email,
      hashedPassword: await bcrypt.hash(user.password, 10),
    },
  });

  // sign in and create token
  await signIn('credentials', user);
};
