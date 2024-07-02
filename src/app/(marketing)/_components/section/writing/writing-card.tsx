import React from 'react';

import NextImage from '@/components/NextImage';
import { UnstyledLink } from '@/components/links';
import { TGetAllPostSlugs } from '@/lib/query/writing/get-posts';
import { BarChart, HeartIcon } from 'lucide-react';

const WritingCard = ({
  description,
  image,
  slug,
  title,
  likes,
  views,
  type,
}: TGetAllPostSlugs[number]) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-card p-2 pb-3">
      {type === 'BLOG' && (
        <NextImage
          width={300}
          height={300}
          className="mb-3 aspect-[1060/400] w-full overflow-hidden rounded-xl"
          classNames={{
            image:
              'w-full object-center object-cover transition-all group-hover:scale-110',
          }}
          useSkeleton
          src={image}
          alt={title}
        />
      )}

      <UnstyledLink
        href={`/${type.toLowerCase()}/${slug}`}
        className="h3 flash-underline font-medium text-foreground"
        trackEventTag={`${type} - ${slug}`}
      >
        {title}
        <span className="absolute inset-0" aria-hidden="true"></span>
      </UnstyledLink>

      <div
        dangerouslySetInnerHTML={{ __html: description || '' }}
        className="mt-3 line-clamp-3 text-xs text-muted-foreground"
      ></div>
      <div className="flex items-center gap-2 pt-2">
        <HeartIcon className="inline-block h-3 w-3" />
        <span className="mr-3 text-sm text-muted-foreground">
          {likes} Likes
        </span>
        <BarChart className="inline-block h-3 w-3" />
        <span className="text-sm text-muted-foreground">{views} Views</span>
      </div>
    </article>
  );
};

export default WritingCard;
