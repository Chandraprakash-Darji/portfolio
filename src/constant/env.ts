export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

/**
 * Show command service on contents
 * @see Comment.tsx
 */
export const commentFlag =
  isProd || process.env.NEXT_PUBLIC_FLAG_COMMENT === 'true';

export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;

export const DOMAIN = process.env.NEXT_PUBLIC_APP_URL;
