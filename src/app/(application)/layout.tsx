import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import BackgroundPattern from '@/components/background-pattern';
import { PetContextProvider } from '@/contexts/pet-context-provider';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  // get pet data
  const response = await fetch(
    'https://bytegrad.com/course-assets/projects/petsoft/api/pets',
  );
  if (!response.ok) {
    throw new Error('Could not load pet information');
  }
  const data = await response.json();

  return (
    <>
      <BackgroundPattern />
      <div className='mx-auto flex min-h-screen max-w-[1050px] flex-col px-4'>
        <AppHeader />
        <PetContextProvider data={data}>{children}</PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
};

export default Layout;
