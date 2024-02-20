import { LogoutButton } from '@/components/auth/logout-button';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

const DasboardPage = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <LogoutButton>
        <Button size='lg' className='w-full' variant='outline'>
          Logout
        </Button>
      </LogoutButton>
    </div>
  );
};

export default DasboardPage;
