'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { petFormSchema, petIdSchema } from '@/lib/validations';

export const editPet = async (petId: unknown, petData: unknown) => {
  const validatedPetId = petIdSchema.safeParse(petId);

  const validatedPet = petFormSchema.safeParse(petData);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: 'Invalid pet data',
    };
  }

  try {
    await prisma.pet.update({
      where: { id: validatedPetId.data },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: 'Something went wrong while updating the pet. Please try again.',
    };
  }

  revalidatePath('/(application)', 'layout');
};
