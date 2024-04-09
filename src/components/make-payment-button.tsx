'use client';
import { Button } from '@/components/ui/button';
import * as actions from '@/actions';
import { useTransition } from 'react';

const MakePaymentButton = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      onClick={async () => {
        startTransition(async () => {
          await actions.createCheckoutSession();
        });
      }}
      disabled={isPending}
    >
      Buy lifetime access for $299
    </Button>
  );
};

export default MakePaymentButton;
