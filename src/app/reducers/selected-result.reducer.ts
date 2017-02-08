export const selectedResult = (state: any = null, {type, payload}) => {
  switch (type) {
    case 'SELECT_RESULT':
      return Object.assign({}, payload);
    default:
      return state;
  }
};
