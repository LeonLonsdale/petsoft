'use server';

import { Pet } from '@/lib/types';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const addPet = async (formData: FormData) => {
  try {
    const pet = {
      name: formData.get('name') as string,
      ownerName: formData.get('ownerName') as string,
      imageUrl:
        (formData.get('imageUrl') as string) ||
        'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
      age: parseInt(formData.get('age') as string),
      notes: formData.get('notes') as string,
    };

    await prisma.pet.create({ data: pet });
  } catch (error) {
    return {
      message: 'Something went wrong while adding the pet. Please try again.',
    };
  }

  revalidatePath('/(application)/app', 'layout');
};
