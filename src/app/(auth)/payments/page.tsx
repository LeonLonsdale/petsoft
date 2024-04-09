import H1 from '@/components/h1';
import { Button } from '@/components/ui/button';
import * as actions from '@/actions';
import MakePaymentButton from '@/components/make-payment-button';

type PaymentsPageProps = {
  params: string;
};

const PaymentsPage = ({ params }: PaymentsPageProps) => {
  return (
    <main className='flex flex-col items-center space-y-10'>
      <H1>Petsoft access requires payment</H1>
      <MakePaymentButton />
    </main>
  );
};

export default PaymentsPage;
