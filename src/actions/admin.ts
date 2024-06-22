'use server';

import { currentRole } from '@/lib/auth/queries/current-role';
import { UserRole } from '@/lib/enums';

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: 'Allowed Server Action!' };
  }

  return { error: 'Forbidden Server Action!' };
};
