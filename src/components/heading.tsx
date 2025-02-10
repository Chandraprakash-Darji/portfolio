import React, { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { CloudRainWind } from 'lucide-react';

const Heading = ({
  children,
  className,
  ...rest
}: PropsWithChildren & React.ButtonHTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'flex items-center gap-2 font-mono tracking-wider',
        className
      )}
      {...rest}
    >
      <CloudRainWind className="h-4 w-4 text-foreground" />
      {children}
    </span>
  );
};

export default Heading;
