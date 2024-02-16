import * as React from 'react';

import { cn } from '@/lib/utils';
export type InputProps = {
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
} & React.ComponentPropsWithoutRef<'input'>;

export function Input({
  id,
  className,
  readOnly = false,
  ...rest
}: InputProps) {
  return (
    <input
      {...rest}
      readOnly={readOnly}
      className={cn(
        'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
        readOnly
          ? 'cursor-not-allowed focus:ring-0'
          : 'placeholder:text-muted-foreground focus-visible:ring-ring file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      aria-describedby={id}
    />
  );
}
