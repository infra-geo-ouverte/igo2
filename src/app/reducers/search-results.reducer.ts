const initialState = {results: [], count: 0};

export const searchResults = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'SET_SEARCH_RESULTS':
      return Object.assign({}, payload);
    case 'CLEAR_SEARCH_RESULTS':
      return Object.assign({}, initialState);
    default:
      return state;
  }
};
