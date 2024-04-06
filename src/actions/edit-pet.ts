'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { petFormSchema, petIdSchema } from '@/lib/validations';
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
import { paths } from '@/lib/paths';

export const editPet = async (petId: unknown, petData: unknown) => {

  // authentication check
  const session = await auth();
  if (!session?.user) redirect(paths.login.path())

  // validation  
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(petData);
  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: 'Invalid pet data',
    };
  }


  // authorisation check
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    }
  })

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
