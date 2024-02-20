'use client';
import { SessionProvider } from 'next-auth/react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import * as React from 'react';

import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui/sonner';

export default function Provider({ children }: React.PropsWithChildren) {
  return (
    <SessionProvider>
      {children}
      <Toaster />
      <ProgressBar
        height='4px'
        color='#E11D48'
        options={{ showSpinner: false }}
        shallowRouting
      />
      <TailwindIndicator />
    </SessionProvider>
  );
}
