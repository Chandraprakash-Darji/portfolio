import * as React from 'react';

import { cn } from '@/lib/utils';

type SkeletonProps = React.ComponentPropsWithoutRef<'div'>;

export default function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <div
      className={cn('animate-shimmer rounded-md bg-primary/10', className)}
      style={{
        backgroundImage:
          'linear-gradient(to right, hsl(var(--primary)/0) 0%, hsl(var(--primary)/.05) 20%, hsl(var(--primary)/.1) 40%,hsl(var(--primary)/.1) 60%,hsl(var(--primary)/.05) 80%, hsl(var(--primary)/0) 100%)',
        backgroundSize: '1000px 100%',
        backgroundRepeat: 'no-repeat',
      }}
      {...rest}
    />
  );
}

export function SkeletonPulse({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      {...props}
    />
  );
}
