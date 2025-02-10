import UnstyledLink from '@/components/links/UnstyledLink';
import NavbarMenu from '@/components/navbar/menu';
import CalBtn from '@/components/ui/CalBtn';
import { Button } from '@/components/ui/button';
import { CloudRainWind, Menu } from 'lucide-react';

export const Navbar = () => {
  return (
    <>
      <header className="fixed z-50 flex w-full items-center justify-center overflow-hidden p-2">
        <div className="layout w-11/12 md:w-max flex border bg-card/40 backdrop-blur rounded-xl p-2 items-center shadow-[2px_4px_20px_0px_hsl(var(--muted-foreground)/.1)_inset] gap-2">
          <Button
            asChild
            variant={'outline'}
            size={'icon'}
            className="shadow-[2px_4px_20px_0px_hsl(var(--muted-foreground)/.1)_inset] rounded-xl"
          >
            <UnstyledLink
              href="/"
              className="flex-shrink-0 self-center font-mono capitalize text-foreground transition-colors hover:text-primary"
            >
              <CloudRainWind />
            </UnstyledLink>
          </Button>
          <nav className="md:flex gap-2 hidden">
            {links.map((link) => (
              <UnstyledLink
                key={link.href}
                href={link.href}
                className="flex items-center px-3 font-mono text-sm capitalize text-foreground hover:text-primary focus-visible:bg-muted focus-visible:ring-0"
              >
                {link.name}
              </UnstyledLink>
            ))}
          </nav>
          <CalBtn
            data-cal-namespace=""
            data-cal-link="chandra-prakash/15min"
            data-cal-config='{"layout":"month_view"}'
            variant={'outline'}
            size={'lg'}
            className="ml-auto shadow-[2px_4px_20px_0px_hsl(var(--muted-foreground)/.1)_inset] rounded-xl"
          >
            Work with me
          </CalBtn>
          <NavbarMenu />
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
  { name: 'Process', href: '/#how-it-works' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'FAQ', href: '/#faq' },
];
