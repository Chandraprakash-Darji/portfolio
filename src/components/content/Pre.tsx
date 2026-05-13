import * as React from 'react';

import { cn } from '@/lib/utils';

export function Pre({
  className,
  children,
  ...rest
}: React.ComponentPropsWithRef<'pre'>) {
  return (
    <pre
      {...rest}
      className={cn(['group relative', className])}
    >
      {children}
    </pre>
  );
}
