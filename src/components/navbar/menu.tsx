'use client';

import React from 'react';

import { UnstyledLink } from '@/components/links';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Menu } from 'lucide-react';

const NavbarMenu = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          size={'icon'}
          className="shadow-[2px_4px_20px_0px_hsl(var(--muted-foreground)/.1)_inset] rounded-xl md:hidden"
        >
          <Menu />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={15}
        alignOffset={-8}
        className="max-w-none w-full rounded-xl"
      >
        <nav className="flex gap-1">
          {links.map((link) => (
            <UnstyledLink
              key={link.href}
              href={link.href}
              className="flex items-center px-2 font-mono text-sm capitalize text-foreground hover:text-primary focus-visible:bg-muted focus-visible:ring-0"
            >
              {link.name}
            </UnstyledLink>
          ))}
        </nav>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarMenu;

const links = [
  {
    name: 'Work',
    href: '/#sec-work',
  },
  { name: 'Process', href: '/#how-it-works' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'FAQ', href: '/#faq' },
];
