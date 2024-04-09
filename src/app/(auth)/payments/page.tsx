import H1 from '@/components/h1';
import { Button } from '@/components/ui/button';
type PaymentsPageProps = {
  params: string;
};

const PaymentsPage = ({ params }: PaymentsPageProps) => {
  return (
    <main className='flex flex-col items-center space-y-10'>
      <H1>Petsoft access requires payment</H1>
      <Button>Buy lifetime access for $299</Button>
    </main>
  );
};

export default PaymentsPage;
