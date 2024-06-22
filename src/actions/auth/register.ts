'use server';

import { sendVerificationEmail } from '@/lib/auth/mail';
import { getUserByEmail } from '@/lib/auth/queries/user';
import { generateVerificationToken } from '@/lib/auth/tokens';
import db from '@/lib/db';
import { RegisterSchema } from '@/schemas/auth';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

const ZRegistration = RegisterSchema.extend({
  token: z.string().optional(),
});

export const register = async (values: z.infer<typeof ZRegistration>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser && !values.token) {
    return { error: 'Email already in use!' };
  }

  if (!values.token)
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

  if (values.token) {
    await db.verificationToken.delete({
      where: {
        email,
        token: values.token,
      },
    });
    await db.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
        emailVerified: new Date(Date.now()),
      },
    });
  }

  if (!values.token) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: 'Confirmation email sent!' };
  }

  return {
    success: 'Account created!',
    code: 'account-created',
  };
};
