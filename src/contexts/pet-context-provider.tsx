'use client';

import { Pet } from '@/lib/types';
import { createContext, useContext, useState } from 'react';

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
};

type TPetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

const PetContext = createContext<TPetContext | null>(null);

const PetContextProvider = ({ children, data }: TPetContextProviderProps) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState(null);

  return (
    <PetContext.Provider value={{ pets, selectedPetId }}>
      {children}
    </PetContext.Provider>
  );
};

const usePetContext = () => {
  const value = useContext(PetContext);
  if (!value)
    throw new Error(
      'You have used PetContext outside of Provider. The context can only be used within a child of the PetContextProvider',
    );
  return value;
};
