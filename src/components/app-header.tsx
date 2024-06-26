'use client';

import { paths } from '@/lib/paths';
import Link from 'next/link';
import Logo from './ui/logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const AppHeader = () => {
  const { app } = paths;
  const activePathname = usePathname();

  const navLinks = Object.values(app).map((link) => (
    <li key={link.label}>
      <Link
        className={cn(
          'rounded-sm px-2 py-1 text-white/70 transition hover:text-white focus:text-white',
          {
            'bg-black/10 text-white': activePathname === link.path(),
          },
        )}
        href={link.path()}
      >
        {link.label}
      </Link>
    </li>
  ));

  return (
    <header className='flex items-center justify-between  border-b border-white/10 py-2'>
      <Logo />
      <nav>
        <ul className='flex gap-2'>{navLinks}</ul>
      </nav>
    </header>
  );
};

export default AppHeader;
