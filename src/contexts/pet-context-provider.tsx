'use client';

import { Pet } from '@/lib/types';
import { createContext, useContext, useState } from 'react';

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleSelectPet: (id: string) => void;
  handleAddPet: (pet: Pet) => void;
};

type TPetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

const PetContext = createContext<TPetContext | null>(null);

const PetContextProvider = ({ children, data }: TPetContextProviderProps) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const handleSelectPet = (id: string) => setSelectedPetId(id);

  const handleAddPet = (pet: Pet) => setPets((prev) => [...prev, pet]);

  return (
    <PetContext.Provider
      value={{ pets, selectedPetId, handleSelectPet, handleAddPet }}
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
