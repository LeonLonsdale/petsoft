'use server';

import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';
import { signIn } from '@/lib/auth';
import { authSchema } from '@/lib/validations';

export const register = async (formData: unknown) => {
  // check type of formData is FormData
  // convert to object so it can be parsed
  // parse with zod
  if (!(formData instanceof FormData)) return { message: 'Invalid credentials' };
  const formDataObject = Object.fromEntries(formData.entries());
  const validatedFormData = authSchema.safeParse(formDataObject);
  if (!validatedFormData.success) return { message: 'Invalid credentials' }
 
  const { email, password } = validatedFormData.data;
  await prisma.user.create({
    data: {
      email,
      hashedPassword: await bcrypt.hash(password, 10),
    },
  });

  // sign in and create token
  await signIn('credentials', {email, password});
};
