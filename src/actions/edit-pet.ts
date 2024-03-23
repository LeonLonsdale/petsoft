'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import type { PetWithoutDBFields, PetID } from '@/lib/types';

export const editPet = async (petId: PetID, petData: PetWithoutDBFields) => {
  try {
    await prisma.pet.update({
      where: { id: petId },
      data: petData,
    });
  } catch (error) {
    return {
      message: 'Something went wrong while updating the pet. Please try again.',
    };
  }

  revalidatePath('/(application)', 'layout');
};
