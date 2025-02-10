'use client';

import React from 'react';

import NextImage from '@/components/NextImage';
import { UnstyledLink } from '@/components/links';
import { IProject } from '@/constant/projects';

const ProjectCard = ({
  alt,
  description,
  src,
  title,
  href,
  tags,
}: IProject) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-card p-5">
      <div className="aspect-video relative mb-3 rounded-xl pt-16 group-hover:pt-14 p-10 overflow-hidden">
        <NextImage
          className="aspect-video w-full absolute inset-0 blur-lg"
          width={700}
          height={700}
          src={src}
          alt={alt}
        />
        <NextImage
          className="aspect-video w-full relative transition-all group-hover:-translate-y-4 overflow-hidden z-10 border-none "
          width={700}
          height={700}
          classNames={{
            image: 'h-full w-full object-cover rounded-2xl',
          }}
          src={src}
          alt={alt}
        />
      </div>
      <UnstyledLink
        href={href}
        className="h3 mt-6 flash-underline font-medium text-foreground flex items-center"
        trackEventTag={`Project Card - ${title}`}
        data-show-arrow={false}
      >
        {title}{' '}
        {tags.map((tag, index) => (
          <React.Fragment key={index}>
            <span key={index} className="ml-2 text-sm text-muted-foreground">
              {tag}
            </span>
            <span className="bg-primary rounded-full w-1 inline-block ml-2 h-1" />
          </React.Fragment>
        ))}
        <span className="absolute inset-0" aria-hidden="true"></span>
      </UnstyledLink>
      <p className="mt-3 text-muted-foreground">{description}</p>
    </article>
  );
};

export default ProjectCard;
