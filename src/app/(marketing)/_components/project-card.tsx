'use client';
import Image from 'next/image';
import React from 'react';

import { trackEvent } from '@/lib/analytics';

type Props = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

const ProjectCard = ({ alt, description, src, title }: Props) => {
  return (
    <a
      href='#'
      className='focus:ring-primary focus:ring-offset-background group rounded-md focus:outline-none focus:ring-2 focus:ring-offset-4'
      onClick={() => trackEvent('Project Card', { title })}
    >
      <div className='aspect-video overflow-hidden rounded-xl'>
        <Image
          className='h-full w-full object-cover transition-all group-hover:scale-110'
          width={1000}
          height={1800}
          src={src}
          alt={alt}
        />
      </div>

      <p className='h4 after:bg-light after:dark:bg-primary relative mt-2 max-w-max font-normal after:absolute after:bottom-0 after:right-0 after:h-[2px] after:w-0 after:transition-all after:duration-200 group-hover:after:left-0 group-hover:after:right-auto group-hover:after:w-full'>
        {title}
      </p>
      <p className='text-accent-foreground mt-1 text-xs opacity-0 transition-all group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100'>
        {description}
      </p>
    </a>
  );
};

export default ProjectCard;
