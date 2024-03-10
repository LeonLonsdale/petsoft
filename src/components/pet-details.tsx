'use client';

import { usePetContext } from '@/contexts/pet-context-provider';
import Image from 'next/image';

const PetDetails = () => {
  const { selectedPet } = usePetContext();

  return (
    <section className='flex h-full w-full flex-col'>
      <div className='flex items-center border-b border-black/[0.08] bg-white px-8 py-5'>
        <Image
          src={selectedPet?.imageUrl}
          alt=''
          height={75}
          width={75}
          className='h-[75px] w-[75px] rounded-full object-cover'
        />
        <h2 className='ml-5 text-3xl font-semibold leading-7'>
          {selectedPet?.name}
        </h2>
      </div>
      <div className='flex items-center justify-around gap-4 px-5 py-10 text-center'>
        <div>
          <h3 className='text-[13px] font-medium uppercase text-zinc-700'>
            Owner Name:
          </h3>
          <p className='text-zing-800 mt-1 text-lg'>{selectedPet?.ownerName}</p>
        </div>
        <div>
          <h3 className='text-[13px] font-medium uppercase text-zinc-700'>
            Age:
          </h3>
          <p className='text-zing-800 mt-1 text-lg'>{selectedPet?.age}</p>
        </div>
      </div>

      <section className='mx-8 mb-9 flex-1 rounded-md border border-black/[0.08] bg-white px-7 py-5'>
        {selectedPet?.notes}
      </section>
    </section>
  );
};

export default PetDetails;
