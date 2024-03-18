'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';
import { usePetContext } from '@/contexts/pet-context-provider';
import { Pet } from '@/lib/types';
import * as actions from '@/actions';

type PetFormProps = {
  actionType: 'add' | 'edit';
  onFormSubmission: () => void;
};

const PetForm = ({ actionType, onFormSubmission }: PetFormProps) => {
  const { handleUpdatePet, selectedPet } = usePetContext();

  return (
    <form action={actions.addPet} className='flex flex-col'>
      <fieldset className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            type='text'
            name='name'
            required
            defaultValue={actionType === 'edit' ? selectedPet?.name : ''}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='ownerName'>Owner Name</Label>
          <Input
            id='ownerName'
            type='text'
            name='ownerName'
            required
            defaultValue={actionType === 'edit' ? selectedPet?.ownerName : ''}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='imageUrl'>Image Url</Label>
          <Input
            id='imageUrl'
            type='text'
            name='imageUrl'
            defaultValue={actionType === 'edit' ? selectedPet?.imageUrl : ''}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='age'>Age</Label>
          <Input
            id='age'
            type='number'
            name='age'
            required
            defaultValue={actionType === 'edit' ? selectedPet?.age : ''}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea
            id='notes'
            name='notes'
            required
            defaultValue={actionType === 'edit' ? selectedPet?.notes : ''}
          />
        </div>
      </fieldset>
      <Button type='submit' className='mt-5 self-end'>
        {actionType === 'add' ? 'Submit' : 'Update'}
      </Button>
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
