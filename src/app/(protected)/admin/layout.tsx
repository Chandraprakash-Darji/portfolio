import { UserRole } from '@prisma/client';
import { redirect } from 'next/navigation';
import * as React from 'react';

import { currentRole } from '@/lib/auth/auth';

import { RoleGate } from '@/components/auth/role-gate';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import Navbar from './_components/Navbar';

/**
 * AdminLayout component renders the layout for the admin dashboard pages.
 *
 * It checks if the user is authenticated, and redirects to /login if not.
 *
 * It displays a loading state while fetching session status.
 *
 * It renders the navbar and main content area with tabs for navigation.
 *
 * The main content is passed in via the children prop.
 */
const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const role = await currentRole();
  if (role && role !== UserRole.ADMIN) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }
  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
      <div className='bg-background'>
        <Navbar />
        <main className='z-10'>
          <div className='layout max-w-[90rem] pt-10'>
            <h1 className='h3'>Admin Panel</h1>
            <p className='text-muted-foreground mt-1'>
              All sections of this area are protected and only accessible by
              Application Admins
            </p>
          </div>
          <div className='layout max-w-[90rem] py-5'>{children}</div>
        </main>
      </div>
    </RoleGate>
  );
};

export default AdminLayout;
