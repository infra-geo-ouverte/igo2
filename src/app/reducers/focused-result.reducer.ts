export const focusedResult = (state: any = null, {type, payload}) => {
  switch (type) {
    case 'FOCUS_RESULT':
      return Object.assign({}, payload);
    default:
      return state;
  }
};
