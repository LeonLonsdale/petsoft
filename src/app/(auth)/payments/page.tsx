'use client';

import H1 from '@/components/h1';
import MakePaymentButton from '@/components/make-payment-button';
import PaymentCompleteButton from '@/components/payment-complete-button';

type PaymentsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const PaymentsPage = ({ searchParams }: PaymentsPageProps) => {
  return (
    <main className='flex flex-col items-center space-y-10'>
      {!searchParams.success && !searchParams.cancelled && (
        <H1>Petsoft access requires payment</H1>
      )}
      {searchParams.success && (
        <>
          <H1 className='text-green-700'>Your payment was successful</H1>
          <p>You now have lifetime access</p>
        </>
      )}
      {searchParams.cancelled && (
        <>
          <H1 className='text-red-700'>You cancelled your payment</H1>
          <p className='mx-2 text-center'>
            We are re very sorry you have decided not to join us. You can start
            again whenever you are ready.
          </p>
        </>
      )}
      {!searchParams.success && <MakePaymentButton />}
      {searchParams.success && <PaymentCompleteButton />}
    </main>
  );
};
export default PaymentsPage;
