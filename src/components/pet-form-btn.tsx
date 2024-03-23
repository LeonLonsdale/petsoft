import { Button } from './ui/button';

type PetFormBtnProps = {
  actionType: 'add' | 'edit';
};

const PetFormButton = ({ actionType }: PetFormBtnProps) => {
  return (
    <Button type='submit' className='mt-5 self-end'>
      {actionType === 'add' ? 'Submit' : 'Update'}
    </Button>
  );
};

export default PetFormButton;
