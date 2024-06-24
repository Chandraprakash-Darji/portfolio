import { UnderlineLink } from '@/components/links';
import UnstyledLink from '@/components/links/UnstyledLink';

export const Navbar = () => {
  return (
    <>
      <header className="fixed z-50 flex h-14 w-full items-center justify-center overflow-hidden border-b bg-background/60 backdrop-blur">
        <div className="layout flex justify-between">
          <UnstyledLink
            href="/"
            className="flex-shrink-0 self-center font-mono capitalize text-foreground transition-colors hover:text-primary"
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-current"></span>
            Chandra
          </UnstyledLink>
          <nav className="flex">
            {links.map((link) => (
              <UnderlineLink
                key={link.href}
                href={link.href}
                className="flex h-14 items-center px-3 font-mono text-sm capitalize text-foreground hover:text-primary focus-visible:bg-muted focus-visible:ring-0"
              >
                {link.name}
              </UnderlineLink>
            ))}
          </nav>
        </div>
      </header>
      <div className="h-14"></div>
    </>
  );
};

const links = [
  {
    name: 'Work',
    href: '/#sec-work',
  },
  { name: 'Writing', href: '/writing' },
  { name: 'Info', href: '/#sec-about' },
  { name: 'Work with me', href: '/#sec-contact' },
];
