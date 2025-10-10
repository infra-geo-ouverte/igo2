import * as log from '../utils/log.mts';
import { getDuration } from '../utils/performance.utils.mts';

export const executor = async <T,>(
  title: string,
  fn: () => Promise<T>
): Promise<T> => {
  const startTime = performance.now();
  log.startMsg(title);

  try {
    const result = await fn();
    const duration = getDuration(startTime);
    log.info(`${title} in ${duration}`);
    return result;
  } catch (error) {
    const duration = getDuration(startTime);
    log.error(`${title} failed in ${duration}`);
    throw error;
  }
};
