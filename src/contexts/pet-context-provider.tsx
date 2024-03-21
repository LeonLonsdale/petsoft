'use client';

import { Pet } from '@/lib/types';
import { createContext, useContext, useOptimistic, useState } from 'react';
import * as actions from '@/actions';
import { toast } from 'sonner';

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleSelectPet: (id: string) => void;
  handleAddPet: (petData: Omit<Pet, 'id'>) => Promise<void>;
  handleUpdatePet: (petId: string, petData: Omit<Pet, 'id'>) => Promise<void>;
  handleCheckoutPet: (petId: string) => Promise<void>;
};

type TPetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

const PetContext = createContext<TPetContext | null>(null);

const PetContextProvider = ({
  children,
  data: pets,
}: TPetContextProviderProps) => {
  // state
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    pets,
    optimisticReducer,
  );

  function optimisticReducer(
    state: Pet[],
    { action, payload }: { action: string; payload: any },
  ) {
    switch (action) {
      case 'add':
        return [...state, { ...payload, id: Date.now().toString() }];
      case 'edit':
        return state.map((pet) =>
          pet.id === payload.id ? { ...pet, ...payload.petData } : pet,
        );
      case 'delete':
        return state.filter((pet) => pet.id !== payload);
      default:
        return state;
    }
  }

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // handlers
  const handleSelectPet = (id: string) => setSelectedPetId(id);

  const handleAddPet = async (petData: Omit<Pet, 'id'>) => {
    setOptimisticPets({ action: 'add', payload: petData });
    const error = await actions.addPet(petData);
    if (error) {
      displayError(error);
      return;
    }
    toast.success('Pet added successfully');
  };

  const handleUpdatePet = async (petId: string, petData: Omit<Pet, 'id'>) => {
    setOptimisticPets({ action: 'edit', payload: { id: petId, petData } });
    const error = await actions.editPet(petId, petData);
    if (error) {
      displayError(error);
      return;
    }
    toast.success('Pet updated successfully');
  };

  const handleCheckoutPet = async (petId: string) => {
    setOptimisticPets({ action: 'delete', payload: petId });
    const error = await actions.deletePet(petId);
    if (error) {
      displayError(error);
      return;
    }
    toast.success('Pet removed successfully');
    setSelectedPetId(null);
  };

  // funcs
  function displayError(error: { message: string }): void {
    toast.warning(error.message);
  }

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleSelectPet,
        handleAddPet,
        handleUpdatePet,
        handleCheckoutPet,
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

/*
const handleAddPet = (newPet: Omit<Pet, 'id'>) =>
setPets((prev) => [
  ...prev,
  {
    ...newPet,
    id: Date.now().toString(),
  },
]);

const handleAddPet = async (newPet: Omit<Pet, 'id'>) =>
await actions.addPet(newPet);

const handleCheckout = (petId: string) => {
  setPets((prev) => prev.filter((pet) => pet.id !== petId));
  setSelectedPetId(null);
};
const handleUpdatePet = (petId: string, updatedPet: Omit<Pet, 'id'>) =>
setPets((prev) =>
prev.map((pet) =>
pet.id === petId ? { id: petId, ...updatedPet } : pet,
),
);
*/
