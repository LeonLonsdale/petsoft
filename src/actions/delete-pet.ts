'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import type { PetID } from '@/lib/types';
import { petIdSchema } from '@/lib/validations';

export const deletePet = async (petId: unknown) => {
  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success) {
    return {
      message: 'Invalid pet id.',
    };
  }

  try {
    await prisma.pet.delete({
      where: { id: validatedPetId.data },
    });
  } catch (error) {
    return {
      message: 'Something went wrong while removing the pet. Please try again.',
    };
  }

  revalidatePath('/(application)', 'layout');
};

// const handleCheckout = (petId: string) => {
//   setPets((prev) => prev.filter((pet) => pet.id !== petId));
//   setSelectedPetId(null);
// };
