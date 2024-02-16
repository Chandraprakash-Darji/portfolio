'use client';

import { Poppins } from 'next/font/google';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});
interface CardWrapperProps {
  heroLabel: string;
  showSocial?: boolean;
  children?: React.ReactNode;
}

export const CardWrapper = ({
  heroLabel,
  showSocial,
  children,
}: CardWrapperProps) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const onClick = (provider: 'google') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <Card className='w-full max-w-[400px] border-0 shadow-none'>
      <CardHeader>
        <div className='flex w-full flex-col items-center justify-center gap-y-4'>
          <h1 className={cn('text-3xl font-semibold', font.className)}>
            {heroLabel}
          </h1>
        </div>
      </CardHeader>
      {children}
      {showSocial && (
        <CardFooter className='flex w-full items-center'>
          <Button
            size='lg'
            className='w-full'
            variant='outline'
            onClick={() => onClick('google')}
          >
            <FcGoogle className='h-5 w-5' />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
