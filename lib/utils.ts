import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizeList = <T>(list: T[], divider: number): T[] => {
  if (divider <= 0) throw new Error('Divider must be a positive number.');
  if (list.length === 0) return list;

  const remainder = list.length % divider;
  if (remainder === 0) return list;

  return [...list, ...list.slice(0, divider - remainder)];
};
