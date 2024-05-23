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
    <div className='bg-card group relative overflow-hidden rounded-xl'>
      {large_thumb_url && (
        <NextImage
          width={300}
          height={300}
          className='w-full'
          classNames={{
            image: 'rounded-md aspect-square w-full object-center',
          }}
          useSkeleton
          src={large_thumb_url}
          alt={name}
        />
      )}
      <div className='px-6 py-4'>
        <h3 className='text-secondary-foreground h3 font-medium'>
          <UnstyledLink href={buy_now_url}>
            {name}
            <span className='absolute inset-0' aria-hidden='true'></span>
          </UnstyledLink>
        </h3>

        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className='text-muted-foreground mt-3 text-sm'
        ></div>

        <p
          className={cn(
            'text-foreground mt-5 text-sm font-bold',
            price === 0 && 'text-emerald-500'
          )}
        >
          {price === 0 ? 'Free' : price_formatted}
        </p>
      </div>
    </div>
  );
};

export default ShopCard;
