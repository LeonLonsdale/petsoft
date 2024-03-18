'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const editPet = async (petId: string, formData: FormData) => {
  try {
    await prisma.pet.update({
      where: { id: petId },
      data: {
        name: formData.get('name') as string,
        ownerName: formData.get('ownerName') as string,
        imageUrl:
          (formData.get('imageUrl') as string) ||
          'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
        age: parseInt(formData.get('age') as string),
        notes: formData.get('notes') as string,
      },
    });
  } catch (error) {
    return {
      message: 'Something went wrong while updating the pet. Please try again.',
    };
  }

  revalidatePath('/(application)', 'layout');
};
