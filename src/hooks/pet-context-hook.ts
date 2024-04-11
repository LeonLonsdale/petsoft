import { PetContext } from '@/contexts/pet-context-provider';
import { useContext } from 'react';

export const usePetContext = () => {
  const value = useContext(PetContext);
  if (!value)
    throw new Error(
      'You have used PetContext outside of its Provider. PetContext can only be used within a child of the PetContextProvider',
    );
  return value;
};
