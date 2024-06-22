import { auth } from '..';

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
