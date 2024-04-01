import { Pet } from '@prisma/client';

export type PetWithoutDBFields = Omit<
  Pet,
  'id' | 'userId' | 'createdAt' | 'updatedAt'
>;
export type PetID = Pet['id'];
