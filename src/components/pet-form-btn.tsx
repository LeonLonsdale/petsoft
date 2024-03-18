import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

type PetFormBtnProps = {
  actionType: 'add' | 'edit';
};

const PetFormButton = ({ actionType }: PetFormBtnProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' className='mt-5 self-end' disabled={pending}>
      {pending ? 'Working...' : actionType === 'add' ? 'Submit' : 'Update'}
    </Button>
  );
};

export default PetFormButton;
