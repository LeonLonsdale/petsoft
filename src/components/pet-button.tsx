'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import PetForm from './pet-form';
import { useState } from 'react';
import { flushSync } from 'react-dom';

type PetButtonProps = {
  actionType: 'add' | 'edit' | 'checkout';
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const PetButton = ({
  actionType,
  children,
  onClick,
  disabled = false,
}: PetButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (actionType === 'checkout') {
    return (
      <Button variant='secondary' onClick={onClick} disabled={disabled}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {actionType === 'add' ? (
          <Button size='icon' onClick={onClick}>
            <PlusIcon className='h-5 w-5' />
          </Button>
        ) : (
          <Button variant='secondary' onClick={onClick}>
            {children}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === 'add' ? 'Add a new' : 'Edit'} pet
          </DialogTitle>
        </DialogHeader>
        <PetForm
          actionType={actionType}
          onFormSubmission={() => flushSync(() => setIsDialogOpen(false))}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PetButton;
