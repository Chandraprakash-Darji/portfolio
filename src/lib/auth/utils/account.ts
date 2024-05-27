import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = (await db.select().from(users)).find(
      (user) => user.id === userId
    );
    return account;
  } catch {
    return null;
  }
};
