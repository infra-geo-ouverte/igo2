import { SearchSource } from './sources/source';

export function sourceCanSearch(source: SearchSource) {
  return (source as any).search !== undefined;
}

export function sourceCanReverseSearch(source: SearchSource) {
  return (source as any).reverseSearch !== undefined;
}
