import { RegisterForm } from '@/components/auth/register-form';
import db from '@/lib/db';

type Props = {
  searchParams?: {
    token?: string;
    callbackUrl?: string;
  };
};

const RegisterPage = async ({ searchParams = {} }: Props) => {
  let email;
  let name;
  if (searchParams.token) {
    const verifiedToken = await db.verificationToken.findUnique({
      where: {
        token: searchParams.token,
      },
    });
    if (verifiedToken) {
      const user = await db.user.findUnique({
        where: { email: verifiedToken.email },
      });
      if (user) {
        email = user.email;
        name = user.name;
      }
    }
  }

  return (
    <RegisterForm
      prefill={{ name, email, token: searchParams.token }}
      callbackUrl={searchParams.callbackUrl}
    />
  );
};

export default RegisterPage;
