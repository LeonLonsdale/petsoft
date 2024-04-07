'use client';

import { useTransition } from 'react';
import { Button } from './ui/button';
import * as actions from '@/actions';

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();
  return <Button
    onClick={
      async () =>
        startTransition(async () => await actions.logout())
    }
    disabled={isPending}
  >Logout</Button>;
};

export default LogoutButton;
