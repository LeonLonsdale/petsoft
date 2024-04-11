'use client';

import { usePetContext } from '@/hooks/pet-context-hook';
import Image from 'next/image';
import PetButton from './pet-button';
import { useTransition } from 'react';
import { Pet } from '@prisma/client';

const PetDetails = () => {
  const { selectedPet } = usePetContext();

  return (
    <section className='flex h-full w-full flex-col'>
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <PetInfo pet={selectedPet} />
          <PetNotes pet={selectedPet} />
        </>
      )}
    </section>
  );
};

type PetDetailsPartProps = {
  pet: Pet;
};

const TopBar = ({ pet }: PetDetailsPartProps) => {
  const { handleCheckoutPet } = usePetContext();
  const [_, startTransition] = useTransition();

  return (
    <div className='flex items-center border-b border-light bg-white px-8 py-5'>
      <Image
        src={pet.imageUrl}
        alt=''
        height={75}
        width={75}
        className='h-[75px] w-[75px] rounded-full object-cover'
      />
      <h2 className='ml-5 text-3xl font-semibold leading-7'>{pet?.name}</h2>

      <div className='ml-auto flex gap-2'>
        <PetButton actionType='edit'>Edit</PetButton>
        <PetButton
          actionType='checkout'
          onClick={() =>
            startTransition(async () => {
              handleCheckoutPet(pet.id);
            })
          }
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
};

const PetInfo = ({ pet }: PetDetailsPartProps) => {
  return (
    <div className='flex items-center justify-around gap-4 px-5 py-10 text-center'>
      <div>
        <h3 className='text-[13px] font-medium uppercase text-zinc-700'>
          Owner Name:
        </h3>
        <p className='text-zing-800 mt-1 text-lg'>{pet?.ownerName}</p>
      </div>
      <div>
        <h3 className='text-[13px] font-medium uppercase text-zinc-700'>
          Age:
        </h3>
        <p className='text-zing-800 mt-1 text-lg'>{pet?.age}</p>
      </div>
    </div>
  );
};

const PetNotes = ({ pet }: PetDetailsPartProps) => {
  return (
    <section className='mx-8 mb-9 flex-1 rounded-md border border-light bg-white px-7 py-5'>
      {pet?.notes}
    </section>
  );
};

const EmptyView = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <p className='text-2xl font-medium'>{`You haven't selected a pet`}</p>
      <p className='text-black/50'>
        Select a pet from the menu on the left, or add a new pet
      </p>
    </div>
  );
};

export default PetDetails;
