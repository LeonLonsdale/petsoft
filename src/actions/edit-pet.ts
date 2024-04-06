'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { petFormSchema, petIdSchema } from '@/lib/validations';
import { authCheck, getPetByPetId } from '@/lib/server-utils';

export const editPet = async (petId: unknown, petData: unknown) => {

  // authentication check
  const session = await authCheck()

  // validation  
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(petData);
  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: 'Invalid pet data',
    };
  }


  // authorisation check
  const pet = await getPetByPetId(validatedPetId.data);

  if (!pet) return { message: 'Pet not found' }

  if (pet.userId !== session.user.id) return { message: 'Not authorised' }


  // update db
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
