'use client';

import { Pet } from '@/lib/types';
import { createContext, useContext, useState } from 'react';

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleSelectPet: (id: string) => void;
  handleAddPet: (pet: Pet) => void;
  selectedPet: Pet | undefined;
  numberOfPets: number;
};

type TPetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

const PetContext = createContext<TPetContext | null>(null);

const PetContextProvider = ({ children, data }: TPetContextProviderProps) => {
  // state
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  // handlers
  const handleSelectPet = (id: string) => setSelectedPetId(id);
  const handleAddPet = (pet: Pet) => setPets((prev) => [...prev, pet]);

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleSelectPet,
        handleAddPet,
        selectedPet,
        numberOfPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

const usePetContext = () => {
  const value = useContext(PetContext);
  if (!value)
    throw new Error(
      'You have used PetContext outside of its Provider. PetContext can only be used within a child of the PetContextProvider',
    );
  return value;
};

export { PetContextProvider, usePetContext };
