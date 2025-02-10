import * as React from 'react';

import { notFound } from 'next/navigation';

import { currentRole } from '@/lib/auth/queries/current-role';
import { UserRole } from '@/lib/enums';

import AdminNavbar from './_components/admin-navbar';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const role = await currentRole();
  if (!role || role !== UserRole.ADMIN) {
    return notFound();
  }
  return (
    <>
      <AdminNavbar />
      <main className="layout max-w-[90rem] py-5">{children}</main>
    </>
  );
};

export default AdminLayout;
