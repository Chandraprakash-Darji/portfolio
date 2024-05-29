import { listProducts } from '@lemonsqueezy/lemonsqueezy.js';

type TReturnListProduct = Awaited<ReturnType<typeof listProducts>>;

export const getProduct = async (): Promise<{
  error: TReturnListProduct['error'];
  data: NonNullable<TReturnListProduct['data']>['data'] | undefined;
}> => {
  const res = await listProducts();

  return {
    error: res.error,
    data: res?.data?.data.filter(
      (d) => !d.attributes.price_formatted.includes('/')
    ),
  };
};
