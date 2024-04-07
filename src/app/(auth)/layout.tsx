import Logo from '@/components/ui/logo';
import { Toaster } from '@/components/ui/sonner';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-center gap-y-5'>
      <Logo />
      {children}
    </div>
    <Toaster position='top-right' />
    </>
  );
};

export default Layout;
