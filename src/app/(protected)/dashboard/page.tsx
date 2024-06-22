import { LogoutButton } from '@/components/auth/logout-button';
import { UnstyledLink } from '@/components/links';
import { Button } from '@/components/ui/button';
import { currentUser } from '@/lib/auth/queries/current-user';
import { UserRole } from '@/lib/enums';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

const DashboardPage = async () => {
  const user = await currentUser();

  return (
    <div className="mx-auto flex min-h-screen max-w-xs flex-col items-center justify-center gap-2">
      {user?.role === UserRole.ADMIN && (
        <Button size="lg" asChild className="w-full" variant="outline">
          <UnstyledLink href="/admin">Admin</UnstyledLink>
        </Button>
      )}

      <LogoutButton>
        <Button size="lg" className="w-full" variant="outline">
          Logout
        </Button>
      </LogoutButton>
    </div>
  );
};

export default DashboardPage;
