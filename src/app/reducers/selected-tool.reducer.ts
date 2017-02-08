export const selectedTool = (state: any = null, {type, payload}) => {
  switch (type) {
    case 'SELECT_TOOL':
      return Object.assign({}, payload);
    case 'UNSELECT_TOOL':
      return null;
    default:
      return state;
  }
};
