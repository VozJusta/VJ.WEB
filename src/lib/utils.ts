import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseApiDate(dateStr: string): Date {
  const normalized = dateStr.replace(' ', 'T');
  const hasTimezone = /[Z+\-]\d{2}:?\d{2}$/.test(normalized) || normalized.endsWith('Z');
  return new Date(hasTimezone ? normalized : normalized + 'Z');
}
