'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import type { PetID } from '@/lib/types';

export const deletePet = async (petId: PetID) => {
  try {
    await prisma.pet.delete({
      where: { id: petId },
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
