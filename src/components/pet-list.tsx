'use client';

import { usePetContext } from '@/contexts/pet-context-provider';
import Image from 'next/image';

const PetList = () => {
  const { pets } = usePetContext();

  const petListItems = pets.map((pet) => (
    <li key={pet.id}>
      <button className='flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base transition hover:bg-[#EFF1F2] focus:bg-[#EFF1F2]'>
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
    <section className='border-b border-black/[0.08] bg-white'>
      <ul>{petListItems}</ul>
    </section>
  );
};

export default PetList;
