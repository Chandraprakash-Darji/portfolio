import React from 'react';

import NextImage from '@/components/NextImage';
import { UnstyledLink } from '@/components/links';
import { cn } from '@/lib/utils';
import { Product } from '@lemonsqueezy/lemonsqueezy.js';

const ShopCard = ({
  attributes: {
    name,
    price_formatted,
    price,
    buy_now_url,
    large_thumb_url,
    description,
  },
}: Product['data']) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-card p-2 pb-3">
      {large_thumb_url && (
        <NextImage
          width={300}
          height={300}
          className="mb-3 aspect-square w-full overflow-hidden rounded-xl"
          classNames={{
            image:
              'w-full object-center object-cover transition-all group-hover:scale-110',
          }}
          useSkeleton
          src={large_thumb_url}
          alt={name}
        />
      )}
      <UnstyledLink
        href={buy_now_url}
        className="h3 flash-underline font-medium text-foreground"
        trackEventTag={`Shop Card - ${name}`}
      >
        {name}
        <span className="absolute inset-0" aria-hidden="true"></span>
      </UnstyledLink>

      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className="mt-3 line-clamp-3 text-xs text-muted-foreground"
      ></div>

      <p
        className={cn(
          'mt-5 text-sm font-bold text-foreground',
          price === 0 && 'text-emerald-500'
        )}
      >
        {price === 0 ? 'Free' : price_formatted}
      </p>
    </article>
  );
};

export default ShopCard;
