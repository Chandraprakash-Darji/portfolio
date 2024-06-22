import * as React from 'react';

import Skeleton from '@/components/ui/skeleton';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <React.Suspense
        fallback={
          <div className="w-full max-w-[400px] items-center">
            <Skeleton className="mx-auto h-[41px] w-[80%]" />
            <Skeleton className="mx-auto mt-1 h-[20px] w-[80%]" />
            <Skeleton className="mt-5 h-[20px] w-[12%]" />
            <Skeleton className="mx-auto mt-1 h-[45px] w-full" />
            <Skeleton className="mt-5 h-[20px] w-[12%]" />
            <Skeleton className="mx-auto mt-1 h-[45px] w-full" />
            <Skeleton className="mt-2 h-[20px] w-[25%]" />
            <Skeleton className="mx-auto mt-10 h-[45px] w-full" />
            <div className="px-6 py-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
              </div>
            </div>
            <div className="flex w-full items-center gap-x-2">
              <Skeleton className="mt-2 h-[50px] flex-1" />
              <Skeleton className="mt-2 h-[50px] flex-1" />
              <Skeleton className="mt-2 h-[50px] flex-1" />
            </div>
            <Skeleton className="mx-auto mt-5 h-[20px] w-[75%]" />
            <Skeleton className="mx-auto mt-2 h-[20px] w-[65%]" />
            <Skeleton className="mx-auto mt-7 h-[20px] w-[45%]" />
          </div>
        }
      >
        {children}
      </React.Suspense>
    </div>
  );
};

export default AuthLayout;
