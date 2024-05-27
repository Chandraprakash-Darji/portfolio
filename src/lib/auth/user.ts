import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

export const getUserByEmail = async (email: string) => {
  try {
    const user = (await db.select().from(users)).find(
      (user) => user.email === email
    );

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = (await db.select().from(users)).find((user) => user.id === id);
    return user;
  } catch {
    return null;
  }
};
