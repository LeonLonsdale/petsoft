'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { usePetContext } from '@/contexts/pet-context-provider';
import PetFormButton from './pet-form-btn';
import { useForm } from 'react-hook-form';

type PetFormProps = {
  actionType: 'add' | 'edit';
  onFormSubmission: () => void;
};

type TPetForm = {
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
};

const PetForm = ({ actionType, onFormSubmission }: PetFormProps) => {
  const { selectedPet, handleAddPet, handleUpdatePet } = usePetContext();

  const {
    register,
    formState: { isSubmitting, errors },
  } = useForm<TPetForm>();

  return (
    <form
      action={async (formData: FormData) => {
        onFormSubmission();

        const petData = {
          name: formData.get('name') as string,
          ownerName: formData.get('ownerName') as string,
          imageUrl:
            (formData.get('imageUrl') as string) ||
            'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
          age: +(formData.get('age') as string),
          notes: formData.get('notes') as string,
        };

        if (actionType === 'add') handleAddPet(petData);

        if (actionType === 'edit') handleUpdatePet(selectedPet!.id, petData);
      }}
      className='flex flex-col'
    >
      <fieldset className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' {...register('name', { required: true })} />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='ownerName'>Owner Name</Label>
          <Input
            id='ownerName'
            {...register('ownerName', { required: true })}
          />
          {errors.ownerName && (
            <p className='text-red-500'>{errors.ownerName.message}</p>
          )}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='imageUrl'>Image Url</Label>
          <Input id='imageUrl' {...register('imageUrl', { required: true })} />
          {errors.imageUrl && (
            <p className='text-red-500'>{errors.imageUrl.message}</p>
          )}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='age'>Age</Label>
          <Input id='age' {...register('age', { required: true })} />
          {errors.age && <p className='text-red-500'>{errors.age.message}</p>}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea id='notes' {...register('notes', { required: true })} />
          {errors.notes && (
            <p className='text-red-500'>{errors.notes.message}</p>
          )}
        </div>
      </fieldset>
      <PetFormButton actionType={actionType} />
    </form>
  );
};

export default PetForm;

/*
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  // const pet = Object.fromEntries(formData.entries()); // typing issues
  const pet = {
    name: formData.get('name') as string,
    ownerName: formData.get('ownerName') as string,
    imageUrl:
      (formData.get('imageUrl') as string) ||
      'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
    age: +(formData.get('age') as string),
    notes: formData.get('notes') as string,
  };

  actionType === 'add'
    ? handleAddPet(pet)
    : handleUpdatePet(selectedPet!.id, pet);

  onFormSubmission();
};
*/
