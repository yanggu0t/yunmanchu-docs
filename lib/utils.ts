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

// ====== ROOM PRICING UTILITIES ======

export type PricingPeriod = 'weekday' | 'weekend' | 'lunar';

// Centralized period labels
export const PERIOD_LABELS: Record<PricingPeriod, string> = {
  weekday: '平日',
  weekend: '假日',
  lunar: '過年',
} as const;

// Centralized period colors for styling
export const PERIOD_COLORS: Record<PricingPeriod, string> = {
  weekday: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  weekend: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  lunar: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
} as const;

// Centralized NumberFlow configuration for price formatting
export const PRICE_FORMAT_CONFIG = {
  style: 'currency' as const,
  currency: 'TWD',
  trailingZeroDisplay: 'stripIfInteger' as const,
};

/**
 * Format room capacity display consistently
 * @param capacity - Base capacity of the room
 * @param isFullHouse - Whether this is the full house package
 * @returns Formatted capacity string (e.g., "4人房" or "基本14人")
 */
export function formatRoomCapacity(
  capacity: number,
  isFullHouse: boolean = false
): string {
  return isFullHouse ? `基本${capacity}人` : `${capacity}人房`;
}

/**
 * Format room capacity badge display
 * @param capacity - Base capacity of the room
 * @param roomId - Room identifier to determine if it's full house
 * @returns Formatted capacity string for badges
 */
export function formatCapacityBadge(capacity: number, roomId?: string): string {
  const isFullHouse = roomId === 'full-house';
  return isFullHouse ? `基本${capacity}人` : `${capacity}人房`;
}

/**
 * Format max capacity display
 * @param capacity - Base capacity
 * @param maxCapacity - Maximum capacity
 * @returns Formatted max capacity string or null if no additional capacity
 */
export function formatMaxCapacity(
  capacity: number,
  maxCapacity?: number
): string | null {
  if (!maxCapacity || maxCapacity <= capacity) return null;
  return `最多可住${maxCapacity}人`;
}

/**
 * Format additional capacity info
 * @param capacity - Base capacity
 * @param maxCapacity - Maximum capacity
 * @returns Formatted additional capacity string or null
 */
export function formatAdditionalCapacity(
  capacity: number,
  maxCapacity?: number
): string | null {
  if (!maxCapacity || maxCapacity <= capacity) return null;
  const additional = maxCapacity - capacity;
  return `可加${additional}人`;
}

/**
 * Calculate price per person
 * @param totalPrice - Total room price
 * @param capacity - Room capacity to divide by
 * @returns Price per person rounded to nearest integer
 */
export function calculatePricePerPerson(
  totalPrice: number,
  capacity: number
): number {
  return Math.round(totalPrice / capacity);
}

/**
 * Format period label with context
 * @param period - Pricing period
 * @param context - Additional context like "價格" or "入住"
 * @returns Formatted period label
 */
export function formatPeriodLabel(
  period: PricingPeriod,
  context?: string
): string {
  const base = PERIOD_LABELS[period];
  return context ? `${base}${context}` : base;
}

/**
 * Get period color classes
 * @param period - Pricing period
 * @returns Tailwind CSS classes for the period
 */
export function getPeriodColorClasses(period: PricingPeriod): string {
  return PERIOD_COLORS[period];
}

/**
 * Format extra bed price range
 * @param extraBedPricing - Extra bed pricing object
 * @returns Formatted price range string
 */
export function formatExtraBedPriceRange(extraBedPricing: {
  weekday: number;
  weekend: number;
  lunar: number;
}): string {
  const { weekday, lunar } = extraBedPricing;
  return `$${weekday}-${lunar}`;
}

/**
 * Check if room is full house package
 * @param roomId - Room identifier
 * @returns Boolean indicating if it's full house
 */
export function isFullHouseRoom(roomId?: string): boolean {
  return roomId === 'full-house';
}

/**
 * Format capacity range for display
 * @param capacity - Base capacity
 * @param maxCapacity - Maximum capacity
 * @returns Formatted capacity range (e.g., "4~6人")
 */
export function formatCapacityRange(
  capacity: number,
  maxCapacity?: number
): string {
  if (!maxCapacity || maxCapacity <= capacity) {
    return `${capacity}人`;
  }
  return `${capacity}~${maxCapacity}人`;
}
