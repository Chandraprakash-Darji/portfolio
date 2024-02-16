import { Home } from 'lucide-react';

import { UnstyledLink } from '@/components/links';
import { Button } from '@/components/ui/button';

import { UserNav } from './user-nav';

export default function Navbar() {
  return (
    <>
      <div className='fixed top-0 z-50 w-full'>
        <header className='bg-background relative h-16 shrink-0 border-b'>
          <div className='layout flex h-full max-w-[90rem] items-center'>
            <div className='text-foreground  mr-auto flex flex-shrink-0 items-center gap-1 font-medium'>
              <Button asChild variant='ghost' size='icon'>
                <UnstyledLink href='/'>
                  <Home className='inline-block h-5 w-5 shrink-0' />
                </UnstyledLink>
              </Button>
              Admin Panel
            </div>
            <div className='flex items-center space-x-4'>
              <UserNav />
            </div>
          </div>
        </header>
      </div>
      <div className='h-16'></div>
    </>
  );
}
