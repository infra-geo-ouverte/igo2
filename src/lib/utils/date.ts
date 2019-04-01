/**
 * Format a date string by removing it's hours, minutes and seconds parts.
 * @param date Date string
 * @returns Formatted date string
 */
export function formatDate(date: string): string {
  return date.split(/[ T]+/)[0];
}
