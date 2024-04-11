'use client';

import { createContext, useOptimistic, useState } from 'react';
import * as actions from '@/actions';
import { toast } from 'sonner';
import { Pet } from '@prisma/client';
import type { PetWithoutDBFields, PetID } from '@/lib/types';

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleSelectPet: (id: string) => void;
  handleAddPet: (petData: PetWithoutDBFields) => Promise<void>;
  handleUpdatePet: (petId: PetID, petData: PetWithoutDBFields) => Promise<void>;
  handleCheckoutPet: (petId: string) => Promise<void>;
};

type TPetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

export const PetContext = createContext<TPetContext | null>(null);

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

  const handleAddPet = async (petData: PetWithoutDBFields) => {
    setOptimisticPets({ action: 'add', payload: petData });
    const error = await actions.addPet(petData);
    if (error) {
      displayError(error);
      return;
    }
    toast.success('Pet added successfully');
  };

  const handleUpdatePet = async (petId: PetID, petData: PetWithoutDBFields) => {
    setOptimisticPets({ action: 'edit', payload: { id: petId, petData } });
    const error = await actions.editPet(petId, petData);
    if (error) {
      displayError(error);
      return;
    }
    toast.success('Pet updated successfully');
  };

  const handleCheckoutPet = async (petId: PetID) => {
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

export { PetContextProvider };
