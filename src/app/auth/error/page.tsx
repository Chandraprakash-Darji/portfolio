import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { CardWrapper } from '@/components/auth/card-wrapper';
import { UnstyledLink } from '@/components/links';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Authentication Error',
  description: 'Authentication Error',
};

const AuthErrorPage = ({
  searchParams = {},
}: {
  searchParams?: {
    error?: string;
  };
}) => {
  return (
    <CardWrapper heroLabel='🔐 Auth'>
      <p className='text-destructive text-center'>{searchParams?.error}</p>
      <div className='mt-3 flex w-full items-center justify-center'>
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
      <Button asChild className='mt-4 w-full'>
        <UnstyledLink href='/auth/login'>Login</UnstyledLink>
      </Button>
    </CardWrapper>
  );
};

export default AuthErrorPage;
