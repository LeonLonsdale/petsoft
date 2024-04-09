'use client';
import { Button } from '@/components/ui/button';
import * as actions from '@/actions';

const MakePaymentButton = () => {
  return (
    <Button
      onClick={async () => {
        await actions.createCheckoutSession();
      }}
    >
      Buy lifetime access for $299
    </Button>
  );
};

export default MakePaymentButton;
