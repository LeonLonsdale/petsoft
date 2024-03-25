'use server';

import type { PetWithoutDBFields } from '@/lib/types';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { petFormSchema } from '@/lib/validations';

export const addPet = async (petData: PetWithoutDBFields) => {
  const validatedPetData = petFormSchema.safeParse(petData);
  if (!validatedPetData.success) {
    return {
      message: validatedPetData.error.errors[0].message,
    };
  }

  try {
    await prisma.pet.create({ data: validatedPetData.data });
  } catch (error) {
    return {
      message: 'Something went wrong while adding the pet. Please try again.',
    };
  }

  revalidatePath('/(application)/app', 'layout');
};
