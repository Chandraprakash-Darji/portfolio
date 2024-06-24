'use client';

import React from 'react';

import NextImage from '@/components/NextImage';
import { UnstyledLink } from '@/components/links';
import { IProject } from '@/constant/projects';

const ProjectCard = ({ alt, description, src, title, href }: IProject) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-card p-2 pb-3">
      <NextImage
        className="mb-3 aspect-video w-full overflow-hidden rounded-xl"
        width={300}
        height={300}
        classNames={{
          image:
            'h-full w-full object-cover transition-all group-hover:scale-110',
        }}
        src={src}
        alt={alt}
      />

      <UnstyledLink
        href={href}
        className="h3 flash-underline font-medium text-foreground"
        trackEventTag={`Project Card - ${title}`}
      >
        {title}
        <span className="absolute inset-0" aria-hidden="true"></span>
      </UnstyledLink>
      <p className="mt-3 text-xs text-muted-foreground">{description}</p>
    </article>
  );
};

export default ProjectCard;
