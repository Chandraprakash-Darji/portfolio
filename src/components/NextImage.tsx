'use client';

import * as React from 'react';

import Image, { ImageProps } from 'next/image';

import { cn } from '@/lib/utils';

type NextImageProps = {
  classNames?: {
    image?: string;
  };
  alt: string;
} & (
  | { width: string | number; height: string | number }
  | { layout: 'fill'; width?: string | number; height?: string | number }
) &
  ImageProps;

/**
 *
 * @description Must set width using `w-` className
 */
export default function NextImage({
  src,
  width,
  height,
  alt,
  className,
  classNames,
  ...rest
}: NextImageProps) {
  const [status, setStatus] = React.useState('loading');
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      <Image
        className={cn(
          classNames?.image,
          status === 'loading' ? 'scale-105 blur-lg' : 'scale-100 blur-0'
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoad={() => setStatus('complete')}
        {...rest}
      />
    </figure>
  );
}
