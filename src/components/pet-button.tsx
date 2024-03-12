import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';

type PetButtonProps = {
  actionType: 'add' | 'edit' | 'checkout';
  children?: React.ReactNode;
};

const PetButton = ({ actionType, children }: PetButtonProps) => {
  if (actionType === 'add') {
    return (
      <Button size='icon'>
        <PlusIcon className='h-5 w-5' />
      </Button>
    );
  }

  if (actionType === 'edit') {
    return <Button variant='secondary'>{children}</Button>;
  }

  if (actionType === 'checkout') {
    return <Button variant='secondary'>{children}</Button>;
  }
};

export default PetButton;