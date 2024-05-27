'use server';

import { currentRole } from '@/lib/auth/utils/auth';
import { userRoleEnum } from '@/lib/db/schema';

export const admin = async () => {
  const role = await currentRole();

  if (role === userRoleEnum.enumValues[0]) {
    return { success: 'Allowed Server Action!' };
  }

  return { error: 'Forbidden Server Action!' };
};
