import { cn } from '@/lib/utils';

import UnstyledLink, { UnstyledLinkProps } from './UnstyledLink';

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
        'border-dark border-b border-dotted hover:border-black/0',
        className
      )}
    >
      <span className="dark:bg-gradient-to-tr dark:from-primary/80 dark:to-primary dark:bg-clip-text dark:text-transparent">
        {children}
      </span>
    </UnstyledLink>
  );
}
