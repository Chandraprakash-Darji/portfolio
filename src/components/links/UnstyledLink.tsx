'use client';

import * as React from 'react';

import Link, { LinkProps } from 'next/link';

import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { ArrowUpRightIcon } from 'lucide-react';

export type UnstyledLinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
  nextLinkProps?: Omit<LinkProps, 'href'>;
  trackEventTag?: string;
} & React.ComponentPropsWithRef<'a'>;

const UnstyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  (
    {
      children,
      href,
      openNewTab,
      className,
      onClick,
      trackEventTag,
      nextLinkProps,
      ...rest
    },
    ref
  ) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href && !href.startsWith('/') && !href.startsWith('#');

    if (!isNewTab) {
      return (
        <Link
          href={href}
          ref={ref}
          className={cn(className)}
          onClick={(e) => {
            onClick && onClick(e);
            trackEventTag && trackEvent(trackEventTag);
          }}
          {...rest}
          {...nextLinkProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        {...rest}
        className={cn('cursor-newtab relative', className)}
        onClick={(e) => {
          onClick && onClick(e);
          trackEventTag && trackEvent(trackEventTag);
        }}
      >
        {children}{' '}
        <ArrowUpRightIcon className="inline-block w-3 absolute top-0 translate-x-full right-0 h-3 ml-1 text-primary" />
      </a>
    );
  }
);

export default UnstyledLink;
