'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { petIdSchema } from '@/lib/validations';
import { authCheck, getPetByPetId } from '@/lib/server-utils';

export const deletePet = async (petId: unknown) => {
  const session = await authCheck();
  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success) {
    return {
      message: 'Invalid pet id.',
    };
  }

  const pet = await getPetByPetId(validatedPetId.data)

  if (!pet) return { message: 'Pet not found' };

  if (pet.userId !== session.user.id) return { message: 'Not authorised' };

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
