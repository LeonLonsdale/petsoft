import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

import * as actions from '@/actions';

type AuthFormProps = {
  type: 'login' | 'signup';
};

const AuthForm = ({ type }: AuthFormProps) => {
  return (
    <form
      action={type === 'login' ? actions.login : actions.register}
      className='space-y-3'
    >
      <fieldset className='space-y-1'>
        <Label htmlFor='email'>Email</Label>
        <Input name='email' type='email' id='email' />
      </fieldset>
      <fieldset className='space-y-1'>
        <Label htmlFor='password'>Password</Label>
        <Input name='password' type='password' id='password' />
      </fieldset>
      <Button type='submit'>{type === 'login' ? 'Login' : 'Sign Up'}</Button>
    </form>
  );
};

export default AuthForm;
