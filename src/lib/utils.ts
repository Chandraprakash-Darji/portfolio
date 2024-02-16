import { type ClassValue, clsx } from 'clsx';
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
