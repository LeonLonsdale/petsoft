'use client'

import { useFormState } from 'react-dom';
import AuthFormButton from './auth-form-button';
import { Input } from './ui/input';
import { Label } from './ui/label';

import * as actions from '@/actions';
import { useEffect } from 'react';
import { toast } from 'sonner';

type AuthFormProps = {
  type: 'login' | 'signup';
};

const AuthForm = ({ type }: AuthFormProps) => {

  const [registerErrorState, dispatchRegister] = useFormState(actions.register, undefined);
  const [loginErrorState, dispatchLogin] = useFormState(actions.login, undefined);

  useEffect(() => {
      if (registerErrorState?.message) toast.error(registerErrorState?.message)
  }, [registerErrorState ])

  useEffect(() => {
      if (loginErrorState?.message) toast.error(loginErrorState?.message) 
  }, [loginErrorState]) 

  return (
    <form
      action={type === 'login' ? dispatchLogin : dispatchRegister}
      className='space-y-3'
    >
      <fieldset className='space-y-1'>
        <Label htmlFor='email'>Email</Label>
        <Input name='email' type='email' id='email' required maxLength={100} />
      </fieldset>
      <fieldset className='space-y-1'>
        <Label htmlFor='password'>Password</Label>
        <Input name='password' type='password' id='password' required maxLength={100} />
      </fieldset>
      <AuthFormButton type={type} />
      {registerErrorState && <p className='text-red-500 mt-2 text-sm'>{registerErrorState.message}</p>}
    </form>

  );
};

export default AuthForm;
