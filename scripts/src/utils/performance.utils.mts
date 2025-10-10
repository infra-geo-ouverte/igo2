/** Duration in ms */
export function getDuration(startTime: number): string {
  const duration = Math.round(performance.now() - startTime);
  return `${duration}ms`;
}
