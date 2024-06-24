import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.ComponentPropsWithoutRef<'input'>;

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={cn(
        'focus-me flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm outline-none transition-colors',
        className
      )}
    />
  );
}
