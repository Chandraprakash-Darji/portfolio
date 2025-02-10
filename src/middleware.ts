import authConfig from '@/lib/auth/config';
import {
  DEFAULT_LOGIN_REDIRECT,
  OPENED_PREFIX,
  authRoutes,
  publicRoutes,
} from '@/routes';
import NextAuth from 'next-auth';
import { NextAuthRequest } from 'node_modules/next-auth/lib';

const { auth } = NextAuth(authConfig);
export default auth((req: NextAuthRequest) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const openRoutes = OPENED_PREFIX.some((prefix) =>
    nextUrl.pathname.startsWith(prefix)
  );
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Don't invoke Middleware on API Auth routes
  if (openRoutes) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn && req.auth?.user?.role === 'ADMIN') {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
