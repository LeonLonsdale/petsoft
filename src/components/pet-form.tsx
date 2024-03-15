import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';

type PetFormProps = {
  actionType: 'add' | 'edit';
};

const PetForm = ({ actionType }: PetFormProps) => {
  return (
    <form className='flex flex-col'>
      <fieldset className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' type='text' />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='ownerName'>Owner Name</Label>
          <Input id='ownerName' type='text' />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='imageUrl'>Image Url</Label>
          <Input id='imageUrl' type='text' />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='age'>Age</Label>
          <Input id='age' type='text' />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea id='notes' />
        </div>
      </fieldset>
      <Button type='submit' className='mt-5 self-end'>
        {actionType === 'add' ? 'Submit' : 'Update'}
      </Button>
    </form>
  );
};

export default PetForm;
