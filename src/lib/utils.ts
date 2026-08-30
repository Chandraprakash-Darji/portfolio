import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPostDate(value?: string) {
  if (!value) return '';

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  const monthName = date.toLocaleString('en-US', { month: 'short' });

  return `${date.getDate()} ${monthName}, ${date.getFullYear()}`;
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
    | string,
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
