import { type DefaultSession } from 'next-auth';

import { InferQueryModel } from '@/lib/db/types';

export type ExtendedUser = DefaultSession['user'] & {
  role: InferQueryModel<'users'>['role'];
  isOAuth: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
