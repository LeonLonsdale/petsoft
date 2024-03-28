import AuthForm from '@/components/auth-form';
import H1 from '@/components/h1';
import Link from 'next/link';

const Page = () => {
  return (
    <main className='space-y-5'>
      <H1 className='text-center'>Login</H1>
      <AuthForm type='login' />
      <p className='mt-6 text-sm text-zinc-500'>
        {`Don't have an account? `}
        <Link href='/signup' className='font-medium'>
          Sign Up
        </Link>
      </p>
    </main>
  );
};

export default Page;
