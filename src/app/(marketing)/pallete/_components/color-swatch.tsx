import clsx from 'clsx';
import * as React from 'react';

type ColorSwatchProps = {
  title: string;
  subTitle: string;
  colorClassName: string;
} & React.ComponentPropsWithoutRef<'div'>;

export default function ColorSwatch({
  className,
  colorClassName,
  title,
  subTitle,
  ...rest
}: ColorSwatchProps) {
  return (
    <div className={clsx('mt-4 flex items-center gap-2', className)} {...rest}>
      <div
        className={clsx(
          'h-10 w-10 rounded',
          'shadow-sm dark:shadow-none',
          'border',
          'shrink-0',
          colorClassName
        )}
      />
      <div className='flex flex-col'>
        <p>{title}</p>
        <p className='text-muted-foreground text-sm tracking-wide'>
          {subTitle}
        </p>
      </div>
    </div>
  );
}
