import 'server-only';
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { paths } from "./paths";
import { Pet, User } from '@prisma/client';
import prisma from './db';

export const authCheck = async () => {
  const session = await auth();

  if (!session?.user) redirect(paths.login.path())

  return session
}

export const getPetByPetId = async (petId: Pet['id']) => {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    }
  })

  return pet;
}

export const getPetsByUserId = async (userId: User['id']) => {
  const pets = await prisma.pet.findMany({
    where: { userId }
  })

  return pets;
}

export const getUserByEmail = async (email: User['email']) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    }
  })
  return user;
}
