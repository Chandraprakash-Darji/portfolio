import * as React from 'react';

import { cn } from '@/lib/utils';

type SkeletonProps = React.ComponentPropsWithoutRef<'div'>;

export default function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <div
      className={cn('animate-shimmer bg-primary/10 rounded-md', className)}
      style={{
        backgroundImage:
          'linear-gradient(to right, hsl(var(--primary)/.1) 0%, hsl(var(--primary)/.1) 20%, hsl(var(--primary)/.1) 40%, hsl(var(--primary)/.1) 100%)',
        backgroundSize: '700px 100%',
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
      className={cn('bg-primary/10 animate-pulse rounded-md', className)}
      {...props}
    />
  );
}
