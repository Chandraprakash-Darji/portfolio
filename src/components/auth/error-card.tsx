import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { CardWrapper } from '@/components/auth/card-wrapper';

export const ErrorCard = () => {
  return (
    <CardWrapper heroLabel='🔐 Auth'>
      <div className='flex w-full items-center justify-center'>
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
    </CardWrapper>
  );
};
