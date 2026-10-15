export type ClassValue = string | false | null | undefined;

/** Minimal class-name joiner; avoids pulling in a dependency for one concern. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}

const PLACEHOLDER_PATTERN = /^\[Add .+\]$/;

export function isPlaceholder(value: unknown): value is string {
  return typeof value === 'string' && PLACEHOLDER_PATTERN.test(value.trim());
}

/** Returns the value when supplied, otherwise the fallback (never a raw placeholder). */
export function orFallback(value: string, fallback: string): string {
  return isPlaceholder(value) ? fallback : value;
}

export function initials(name: string): string {
  return name
    .replace(/^\s*dr\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function formatDateRange(start: string, end: string): string {
  if (isPlaceholder(start) && isPlaceholder(end)) return 'Dates to be added';
  if (isPlaceholder(start)) return `Until ${end}`;
  if (isPlaceholder(end)) return `${start} – present`;
  return `${start} – ${end}`;
}
