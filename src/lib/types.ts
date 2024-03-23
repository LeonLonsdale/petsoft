import { Pet } from '@prisma/client';

export type PetWithoutDBFields = Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>;
export type PetID = Pet['id'];
