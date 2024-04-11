'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { usePetContext } from '@/hooks/pet-context-hook';
import PetFormButton from './pet-form-btn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_PET_IMAGE } from '@/lib/constants';
import { TPetForm, petFormSchema } from '@/lib/validations';
import { PetWithoutDBFields } from '@/lib/types';

type PetFormProps = {
  actionType: 'add' | 'edit';
  onFormSubmission: () => void;
};

const PetForm = ({ actionType, onFormSubmission }: PetFormProps) => {
  const { selectedPet, handleAddPet, handleUpdatePet } = usePetContext();

  const {
    register,
    trigger,
    formState: { errors },
    getValues, // get all form values
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType === 'edit'
        ? {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            imageUrl: selectedPet?.imageUrl,
            age: selectedPet?.age,
            notes: selectedPet?.notes,
          }
        : undefined,
  });

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;

        onFormSubmission();

        const petData: PetWithoutDBFields = getValues();
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

        if (actionType === 'add') handleAddPet(petData);

        if (actionType === 'edit') handleUpdatePet(selectedPet!.id, petData);
      }}
      className='flex flex-col'
    >
      <fieldset className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters long',
              },
            })}
          />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='ownerName'>Owner Name</Label>
          <Input id='ownerName' {...register('ownerName')} />
          {errors.ownerName && (
            <p className='text-red-500'>{errors.ownerName.message}</p>
          )}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='imageUrl'>Image Url</Label>
          <Input id='imageUrl' {...register('imageUrl')} />
          {errors.imageUrl && (
            <p className='text-red-500'>{errors.imageUrl.message}</p>
          )}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='age'>Age</Label>
          <Input id='age' {...register('age')} />
          {errors.age && <p className='text-red-500'>{errors.age.message}</p>}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea id='notes' {...register('notes')} />
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
