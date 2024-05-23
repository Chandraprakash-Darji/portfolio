import { listProducts } from '@lemonsqueezy/lemonsqueezy.js';

export const getProduct = async (): Promise<
  ReturnType<typeof listProducts>
> => {
  const res = await listProducts();

  return res;
};
