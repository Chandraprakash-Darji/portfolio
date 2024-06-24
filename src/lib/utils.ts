import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const keyboardKey = (
  key:
    | 'Control'
    | 'Shift'
    | 'Escape'
    | 'Tab'
    | 'Delete'
    | 'Meta'
    | 'Option'
    | 'Windows'
    | 'Return'
    | string
) => {
  switch (key) {
    case 'Control':
      return '^';
    case 'Shift':
      return '⇧';
    case 'Meta':
      return '⌘';
    case 'Option':
      return '⌥';
    case 'Return':
      return '↩';
    case 'Escape':
      return '⎋';
    case 'Delete':
      return '⌫';
    case 'Tab':
      return '⇥';
    case 'Windows':
      return '⊞';
    default:
      return key;
  }
};

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString();
    }
  } catch (e) {
    return null;
  }
}

// Open Graph Images for Twitter and Facebook
export function getOgImageUrl(
  title: string,
  subTitle: string,
  tags: Array<string>,
  slug: string
) {
  const uri = [
    `?title=${encodeURIComponent(title)}`,
    `&subTitle=${encodeURIComponent(subTitle)}`,
    `${tags.map((tag) => `&tags=${encodeURIComponent(tag)}`).join('')}`,
    `&slug=${encodeURIComponent(slug)}`,
    // Joining a multiline string for readability.
  ].join('');

  return `${getUrl()}/api/og${uri}`;
}

export function getUrl() {
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  } else {
    return (
      process.env.NEXT_PUBLIC_WEB_URL || 'https://chandraprakash.vercel.app'
    );
  }
}

export function getMinutes(minutes: number) {
  const roundedMinutes = Math.round(minutes);
  return `${roundedMinutes} min`;
}

export function isValidJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function isValidImageLink(url: string) {
  const isValid = isValidUrl(url);

  if (!isValid) return false;

  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}
