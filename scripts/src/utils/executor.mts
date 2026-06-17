import { getDuration } from '../utils/performance.utils.mts';

export const executor = async <T,>(
  title: string,
  fn: () => Promise<T>
): Promise<T> => {
  const startTime = performance.now();
  console.log(`${title}...`);

  try {
    const result = await fn();
    const duration = getDuration(startTime);
    console.log(`${title} in ${duration}`);
    return result;
  } catch (error) {
    const duration = getDuration(startTime);
    console.error(`${title} failed in ${duration}`);
    throw error;
  }
};
