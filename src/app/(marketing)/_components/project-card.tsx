'use client';
import Image from 'next/image';
import React from 'react';

import { trackEvent } from '@/lib/analytics';

import { UnstyledLink } from '@/components/links';

import { IProject } from '@/constant/projects';

const ProjectCard = ({ alt, description, src, title, href }: IProject) => {
  return (
    <UnstyledLink
      href={href}
      className='group p-2 focus-visible:rounded-2xl'
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
    </UnstyledLink>
  );
};

export default ProjectCard;
