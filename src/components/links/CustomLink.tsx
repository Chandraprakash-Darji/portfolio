import { cn } from '@/lib/utils';

import UnstyledLink, { type UnstyledLinkProps } from './UnstyledLink';

export default function CustomLink({
  children,
  className = '',
  ...rest
}: UnstyledLinkProps) {
  return (
    <UnstyledLink
      {...rest}
      className={cn(
        'animated-underline custom-link inline-flex items-center font-medium',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary/80',
        'border-b border-dotted hover:border-black/0',
        className
      )}
    >
      <span className="bg-gradient-to-tr from-primary/60 to-primary bg-clip-text text-transparent">
        {children}
      </span>
    </UnstyledLink>
  );
}
