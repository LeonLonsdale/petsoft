'use client';

import { usePetContext } from '@/contexts/pet-context-provider';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const PetList = () => {
  const { pets, selectedPetId, handleSelectPet } = usePetContext();

  const petListItems = pets.map((pet) => (
    <li key={pet.id}>
      <button
        onClick={() => handleSelectPet(pet.id)}
        className={cn(
          'flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base transition hover:bg-[#EFF1F2] focus:bg-[#EFF1F2]',
          {
            'bg-[#EFF1F2]': selectedPetId === pet.id,
          },
        )}
      >
        <Image
          src={pet.imageUrl}
          alt={`${pet.name} Image`}
          width={45}
          height={45}
          className='h-[45px] w-[45px] rounded-full object-cover'
        />
        <p className='font-semibold'>{pet.name}</p>
      </button>
    </li>
  ));

  return (
    <section className='border-light border-b bg-white'>
      <ul>{petListItems}</ul>
    </section>
  );
};

export default PetList;
