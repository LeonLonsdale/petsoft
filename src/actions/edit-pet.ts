'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const editPet = async (petId: string, petData) => {
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
