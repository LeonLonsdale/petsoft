'use server';

import { Pet } from '@/lib/types';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const addPet = async (petData) => {
  try {
    await prisma.pet.create({ data: petData });
  } catch (error) {
    return {
      message: 'Something went wrong while adding the pet. Please try again.',
    };
  }

  revalidatePath('/(application)/app', 'layout');
};
