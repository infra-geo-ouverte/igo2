import { SearchSource } from './sources';

/**
 * Function that checks whether a search source implements TextSearch
 * @param source Search source
 * @returns True if the search source implements TextSearch
 */
export function sourceCanSearch(source: SearchSource): boolean {
  return (source as any).search !== undefined;
}

/**
 * Function that checks whether a search source implements ReverseSearch
 * @param source Search source
 * @returns True if the search source implements ReverseSearch
 */
export function sourceCanReverseSearch(source: SearchSource): boolean {
  return (source as any).reverseSearch !== undefined;
}
