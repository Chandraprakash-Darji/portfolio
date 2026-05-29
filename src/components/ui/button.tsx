import * as React from 'react';

import { ICON_SIZE } from '@/constant/env';
import { cn } from '@/lib/utils';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
  'disabled:cursor-disabled inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'border border-destructive bg-destructive/30 text-foreground shadow-sm hover:bg-destructive/60',
        outline:
          'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        text: '!h-auto !px-0 !py-0 text-primary hover:text-primary/80',
        tab: 'relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-muted-foreground shadow-none transition-none hover:text-foreground/80 focus:text-foreground/80 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none',
        expandIcon:
          'group relative bg-primary text-primary-foreground hover:bg-primary/90',
        ringHover:
          'bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:ring-2 hover:ring-primary/90 hover:ring-offset-2',
        shine:
          'animate-shine bg-gradient-to-r from-primary via-primary/75 to-primary bg-[length:400%_100%] text-primary-foreground ',
        gooeyRight:
          'relative z-0 overflow-hidden bg-foreground from-zinc-400 text-background transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r before:transition-transform before:duration-300  hover:before:translate-x-[0%] hover:before:translate-y-[0%] ',
        linkHover1:
          'relative !h-auto !px-0 !py-0  after:absolute after:bottom-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-100 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-right hover:after:scale-x-0',
        linkHover2:
          'relative !h-auto !px-0 !py-0  after:absolute after:bottom-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100',
        none: '',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-8 rounded-md px-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-xs': 'h-7 w-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface IconProps {
  Icon: React.ElementType;
  iconPlacement: 'left' | 'right';
}

interface IconRefProps {
  Icon?: never;
  iconPlacement?: undefined;
}

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export type ButtonIconProps = IconProps | IconRefProps;

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonIconProps
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      Icon,
      iconPlacement,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn('group', buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {Icon && iconPlacement === 'left' && (
          <div className="translate-x-0 pr-2 opacity-100  transition-all duration-200 group-hover:translate-x-[100%] group-hover:pr-2 group-hover:opacity-100 group-focus-visible:translate-x-[100%] group-focus-visible:pr-2 group-focus-visible:opacity-100 md:translate-x-[0%] md:pr-0 md:opacity-0">
            <Icon size={ICON_SIZE} />
          </div>
        )}
        <Slottable>{props.children}</Slottable>
        {Icon && iconPlacement === 'right' && (
          <div className="translate-x-0 pl-2 opacity-100 transition-all duration-200 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:pl-2 group-focus-visible:opacity-100 md:translate-x-[100%] md:pl-0 md:opacity-0">
            <Icon size={ICON_SIZE} />
          </div>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
