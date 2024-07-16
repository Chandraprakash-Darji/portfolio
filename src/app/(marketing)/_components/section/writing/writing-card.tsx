import React from 'react';

import NextImage from '@/components/NextImage';
import { UnstyledLink } from '@/components/links';
import { Card } from '@/components/ui/card';
import { TGetAllPostSlugs } from '@/lib/query/writing/get-posts';
import {
  ChartLine,
  ChatTeardrop,
  Heart,
  ShareNetwork,
} from '@phosphor-icons/react/dist/ssr';

const WritingCard = ({
  description,
  image,
  slug,
  title,
  views,
  type,
  _count: { comments, likes, shares },
}: TGetAllPostSlugs[number]) => {
  return (
    <Card
      spotlight
      className="max-w-sm w-full mx-auto p-2 rounded-2xl border bg-card shadow-[2px_4px_16px_0px_hsl(var(--muted-foreground)/.1)_inset] group relative"
    >
      {type === 'BLOG' && (
        <NextImage
          width={300}
          height={300}
          className="mb-3 aspect-[1060/400] w-full overflow-hidden rounded-xl"
          classNames={{
            image:
              'w-full object-center object-cover transition-all group-hover:scale-110',
          }}
          src={image}
          alt={title}
        />
      )}

      <UnstyledLink
        href={`/writing/${slug}`}
        className="h3 font-medium text-foreground"
        trackEventTag={`${type} - ${slug}`}
      >
        {title}
        <span className="absolute inset-0" aria-hidden="true"></span>
      </UnstyledLink>

      <div
        dangerouslySetInnerHTML={{ __html: description || '' }}
        className="mt-3 line-clamp-3 text-xs text-muted-foreground"
      ></div>
      <div className="flex items-center pt-2">
        <Heart className="inline-block h-3 w-3" />
        <span className="ml-1 text-sm text-muted-foreground">
          {likes} Likes{' '}
        </span>
        <ChartLine className="ml-2 inline-block h-3 w-3" />
        <span className="ml-1 text-sm text-muted-foreground">
          {views} Views
        </span>
        <ChatTeardrop className="ml-2 inline-block h-3 w-3" />
        <span className="ml-1 text-sm text-muted-foreground">{comments}</span>
        <ShareNetwork className="ml-2 inline-block h-3 w-3" />
        <span className="ml-1 text-sm text-muted-foreground">{shares}</span>
      </div>
    </Card>
  );
};

export default WritingCard;
