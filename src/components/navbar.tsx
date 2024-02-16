import { UnderlineLink } from '@/components/links';
import UnstyledLink from '@/components/links/UnstyledLink';

export const Navbar = () => {
  return (
    <>
      <header className='bg-background/60 fixed z-10 flex h-14 w-full items-center justify-center overflow-hidden border-b backdrop-blur'>
        <div className='layout flex justify-between'>
          <UnstyledLink
            href='/'
            className='text-foreground hover:text-primary flex-shrink-0 self-center font-mono capitalize transition-colors'
          >
            <span className='mr-2 inline-block h-2 w-2 rounded-full bg-current'></span>
            Chandraprakash Darji
          </UnstyledLink>
          <nav className='flex'>
            {links.map((link) => (
              <UnderlineLink
                key={link.href}
                href={link.href}
                className='text-foreground hover:text-primary flex h-14 items-center px-3 font-mono text-sm capitalize'
              >
                {link.name}
              </UnderlineLink>
            ))}
          </nav>
        </div>
      </header>
      <div className='h-14'></div>
    </>
  );
};

const links = [
  {
    name: 'Work',
    href: '/work',
  },
  { name: 'Writing', href: '/writing' },
  { name: 'Info', href: '/info' },
  { name: 'Work with me', href: '/work-with-me' },
  // guest book
  // color pallete
  // anyalatics
  // source -code
];
