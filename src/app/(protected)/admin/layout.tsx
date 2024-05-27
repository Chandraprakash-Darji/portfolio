import { notFound } from 'next/navigation';
import * as React from 'react';

import { currentRole } from '@/lib/auth/utils/auth';
import { userRoleEnum } from '@/lib/db/schema';

import Navbar from './_components/Navbar';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const role = await currentRole();
  if (role && role !== userRoleEnum.enumValues[0]) {
    return notFound();
  }
  return (
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
  );
};

export default AdminLayout;
