'use client';

import { sharedEmptyConfig } from '@/config/shared';

type Props = {
  action?: React.ReactNode;
};

const TableEmpty: React.FC<Props> = ({ action }) => {
  return (
    <>
      <main className="grid min-h-full place-items-center rounded-lg border-2 border-dashed bg-muted px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            {sharedEmptyConfig.title}
          </h1>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            {sharedEmptyConfig.description}.
          </p>
          {action && (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {action}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default TableEmpty;
