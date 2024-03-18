'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const deletePet = async (petId: string) => {
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
