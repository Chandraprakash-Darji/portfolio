import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.ComponentPropsWithoutRef<'input'>;

export function Input({ id, className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={cn(
        'border-input flex h-9 w-full rounded-md border bg-background px-3 py-1 text-sm shadow-sm transition-colors',
        className
      )}
    />
  );
}
