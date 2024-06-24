import React from 'react';

import Skeleton from '@/components/ui/skeleton';
import { getProduct } from '@/lib/query/lemon-squeezy/get-product';

import ShopCard from './shop-card';

const ShopSection = async () => {
  const { data, error } = await getProduct();
  return (
    <>
      {!data && !error && <ShopLoading />}
      {error && <div className="text-red-500">Error: {error.message}</div>}
      {data && data.map((d) => <ShopCard key={d.id} {...d} />)}
    </>
  );
};

export default ShopSection;

export const ShopLoading = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-96" />
      ))}
    </>
  );
};
