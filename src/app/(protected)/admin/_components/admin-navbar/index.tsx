import { UserNav } from '@/app/(protected)/admin/_components/admin-navbar/user-nav';
import { UnstyledLink } from '@/components/links';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function AdminNavbar() {
  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <header className="relative h-16 shrink-0 border-b bg-background">
          <div className="layout-wide flex h-full items-center">
            <div className="mr-auto  flex flex-shrink-0 items-center gap-1 font-medium text-foreground">
              <Button asChild variant="ghost" size="icon">
                <UnstyledLink href="/admin">
                  <Home className="inline-block h-5 w-5 shrink-0" />
                </UnstyledLink>
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <UnstyledLink href="/admin/writing">Writings</UnstyledLink>
              <UnstyledLink href="/admin/comments">Comments</UnstyledLink>
              <UserNav />
            </div>
          </div>
        </header>
      </div>
      <div className="h-16"></div>
    </>
  );
}
