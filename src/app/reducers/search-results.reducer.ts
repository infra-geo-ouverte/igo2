import { SearchResult } from '../search/shared/search-result.interface';

export const searchResults = (state: SearchResult[] = [], {type, payload}) => {
  switch (type) {
    case 'UPDATE_SEARCH_RESULTS':
      return state
        .filter(result => result.source !== payload.source)
        .concat(payload.results);
    case 'CLEAR_SEARCH_RESULTS':
      return [];
    default:
      return state;
  }
};
