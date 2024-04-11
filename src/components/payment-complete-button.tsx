import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { paths } from '@/lib/paths';

const PaymentCompleteButton = () => {
  const { update, status, data: session } = useSession();
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await update(true);
        router.push(paths.app.dashboard.path());
      }}
      disabled={status === 'loading' || session?.user?.hasAccess}
    >
      Continue to PetSoft
    </Button>
  );
};

export default PaymentCompleteButton;
