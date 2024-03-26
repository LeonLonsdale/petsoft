import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const AuthForm = () => {
  return (
    <form className='space-y-3'>
      <fieldset className='space-y-1'>
        <Label htmlFor='email'>Email</Label>
        <Input type='email' id='email' />
      </fieldset>
      <fieldset className='space-y-1'>
        <Label htmlFor='password'>Password</Label>
        <Input type='password' id='password' />
      </fieldset>
      <Button type='submit'>Login</Button>
    </form>
  );
};

export default AuthForm;
