import { SearchResult } from '../search/shared/search-result.interface';

export const searchResults = (state: SearchResult[] = [], {type, payload}) => {
  switch (type) {
    case 'SET_SEARCH_RESULTS':
      return payload;
    case 'CLEAR_SEARCH_RESULTS':
      return [];
    default:
      return state;
  }
};
