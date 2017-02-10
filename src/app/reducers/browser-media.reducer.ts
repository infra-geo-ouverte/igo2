export const browserMedia = (state: any = null, {type, payload}) => {
  switch (type) {
    case 'SET_MEDIA':
      return payload;
    default:
      return state;
  }
};
