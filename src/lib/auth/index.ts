import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';

import authConfig from '@/lib/auth/config';
import { getUserById } from '@/lib/auth/user';
import { getAccountByUserId } from '@/lib/auth/utils/account';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { InferQueryModel } from '@/lib/db/types';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      if (!user.id) return;
      await db
        .update(users)
        .set({ emailVerified: new Date() })
        .where(eq(users.id, user.id));
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as InferQueryModel<'users'>['role'];
      }

      if (session.user && token.name && token.email) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      const updatedToken: typeof token = {
        ...token,
        isOAuth: !!existingAccount,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      };

      return updatedToken;
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: DrizzleAdapter(db) as any,
  session: { strategy: 'jwt' },
  ...authConfig,
});
