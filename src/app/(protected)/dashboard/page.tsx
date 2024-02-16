import { LogoutButton } from '@/components/auth/logout-button';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
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

export default LoginPage;
