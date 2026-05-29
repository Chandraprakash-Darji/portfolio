'use client';

import * as React from 'react';

import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { ArrowUpRightIcon } from 'lucide-react';

export type UnstyledLinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
  trackEventTag?: string;
} & React.ComponentPropsWithRef<'a'>;

const UnstyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  (
    { children, href, openNewTab, className, onClick, trackEventTag, ...rest },
    ref,
  ) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href && !href.startsWith('/') && !href.startsWith('#');

    if (!isNewTab) {
      return (
        <a
          href={href}
          ref={ref}
          className={cn(className)}
          onClick={(e) => {
            onClick?.(e);
            if (trackEventTag) trackEvent(trackEventTag);
          }}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        {...rest}
        className={cn('cursor-newtab pr-2 relative', className)}
        onClick={(e) => {
          onClick?.(e);
          if (trackEventTag) trackEvent(trackEventTag);
        }}
      >
        {children}{' '}
        <ArrowUpRightIcon className="inline-block w-3 absolute top-0 translate-x-full h-3 right-2 text-primary" />
      </a>
    );
  },
);

export default UnstyledLink;
