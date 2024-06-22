'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentUserDB = async (id: string) => {
  const user = await db.user.findFirstOrThrow({ where: { id } });

  return user;
};
