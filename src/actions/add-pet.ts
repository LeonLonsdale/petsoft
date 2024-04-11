'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { petFormSchema } from '@/lib/validations';
import { authCheck } from '@/lib/server-utils';

export const addPet = async (petData: unknown) => {
  const session = await authCheck();
  const validatedPetData = petFormSchema.safeParse(petData);

  if (!validatedPetData.success) {
    return {
      message: validatedPetData.error.errors[0].message,
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPetData.data,
        user: { connect: { id: session.user.id } },
      },
    });
  } catch (error) {
    return {
      message: 'Something went wrong while adding the pet. Please try again.',
    };
  }

  revalidatePath('/(application)/app', 'layout');
};
