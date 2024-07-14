'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { sharedEmptyConfig } from '@/config/shared';

const SharedError = () => {
  const router = useRouter();

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-foreground">
          {sharedEmptyConfig.sorry}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-muted-foreground sm:text-5xl">
          {sharedEmptyConfig.error}
        </h1>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            type="button"
            onClick={() => router.refresh()}
            variant="gooeyRight"
          >
            {sharedEmptyConfig.tryAgain}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default SharedError;
