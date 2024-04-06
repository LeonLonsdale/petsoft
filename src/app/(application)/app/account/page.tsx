import ContentBlock from '@/components/content-block';
import H1 from '@/components/h1';
import LogoutButton from '@/components/logout-button';
import { authCheck } from '@/lib/server-utils';

const Page = async () => {
  const session = await authCheck();
  return (
    <main>
      <H1 className='my-8 text-white'>Your Account</H1>
      <ContentBlock className='flex h-[500px] flex-col items-center justify-center gap-3'>
        <p>Logged in as {session?.user.email}</p>
        <LogoutButton />
      </ContentBlock>
    </main>
  );
};

export default Page;
