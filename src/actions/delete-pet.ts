'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { petIdSchema } from '@/lib/validations';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/paths';
import { redirect } from 'next/navigation';

export const deletePet = async (petId: unknown) => {
  const session = await auth();

  if (!session?.user) {
    redirect(paths.login.path());
  }

  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success) {
    return {
      message: 'Invalid pet id.',
    };
  }

  const pet = await prisma.pet.findUnique({
    where: { id: validatedPetId.data },
    select: { userId: true },
  });

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

// const handleCheckout = (petId: string) => {
//   setPets((prev) => prev.filter((pet) => pet.id !== petId));
//   setSelectedPetId(null);
// };
