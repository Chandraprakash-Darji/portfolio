/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/', '/pallete', '/guestbook', '/license'];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/error'];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard';

/**
 * List of routes that are opened
 * @type {string[]}
 */
export const OPENED_PREFIX = ['/api/auth', '/writing', '/snippet'];
