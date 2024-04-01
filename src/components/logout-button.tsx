'use client';

import { Button } from './ui/button';
import * as actions from '@/actions';

const LogoutButton = () => {
  return <Button onClick={async () => await actions.logout()}>Logout</Button>;
};

export default LogoutButton;
