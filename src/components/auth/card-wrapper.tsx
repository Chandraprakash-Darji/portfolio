'use client';

import Link from 'next/link';

import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import { UnstyledLink } from '@/components/links';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

import { Button } from '../ui/button';

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  heroLabel: string;
  showSocial?: boolean;
} & (
  | {
      showBackButton: true;
      backButtonHref: string;
      backButtonLabel: string;
    }
  | {
      showBackButton: false;
      backButtonHref?: never;
      backButtonLabel?: never;
    }
);

export const CardWrapper = ({
  children,
  headerLabel,
  heroLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  showBackButton = true,
}: CardWrapperProps) => {
  return (
    <Card className="w-full max-w-[400px] border-0 shadow-none">
      <CardHeader>
        <Header label={headerLabel} hero={heroLabel} />
      </CardHeader>
      <CardContent className="pb-0">{children}</CardContent>
      {showSocial && (
        <>
          <div className="px-6 py-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
          </div>
          <CardFooter className="flex-col">
            <Social />
            <p className="mt-5 px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <UnstyledLink
                href="/terms"
                className="hover:text-brand underline underline-offset-4"
              >
                Terms of Service
              </UnstyledLink>{' '}
              and{' '}
              <UnstyledLink
                href="/privacy"
                className="hover:text-brand underline underline-offset-4"
              >
                Privacy Policy
              </UnstyledLink>
              .
            </p>
          </CardFooter>
        </>
      )}
      {showBackButton && backButtonHref && backButtonLabel && (
        <CardFooter>
          <Button
            variant="link"
            className="mx-auto max-w-max font-normal"
            size="sm"
            asChild
          >
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
