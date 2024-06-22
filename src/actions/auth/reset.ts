'use server';

import { sendPasswordResetEmail } from '@/lib/auth/mail';
import { getUserByEmail } from '@/lib/auth/queries/user';
import { generatePasswordResetToken } from '@/lib/auth/tokens';
import { ResetSchema } from '@/schemas/auth';
import * as z from 'zod';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid emaiL!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email not found!' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: 'Reset email sent!' };
};
