import { Product } from '@lemonsqueezy/lemonsqueezy.js';
import React from 'react';

import { cn } from '@/lib/utils';

import { UnstyledLink } from '@/components/links';
import NextImage from '@/components/NextImage';

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
    <article className='group relative overflow-hidden rounded-2xl border p-2 pb-3'>
      {large_thumb_url && (
        <NextImage
          width={300}
          height={300}
          className='mb-3 aspect-square w-full overflow-hidden rounded-xl'
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
        className='h3 flash-underline text-secondary-foreground font-medium'
        trackEventTag={`Shop Card - ${name}`}
      >
        {name}
        <span className='absolute inset-0' aria-hidden='true'></span>
      </UnstyledLink>

      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className='text-muted-foreground mt-3 line-clamp-3 text-xs'
      ></div>

      <p
        className={cn(
          'text-foreground mt-5 text-sm font-bold',
          price === 0 && 'text-emerald-500'
        )}
      >
        {price === 0 ? 'Free' : price_formatted}
      </p>
    </article>
  );
};

export default ShopCard;
