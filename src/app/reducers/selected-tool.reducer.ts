import { Tool } from '../tool/shared/tool.interface';

export const selectedTool = (state: Tool = null, {type, payload}) => {
  switch (type) {
    case 'SELECT_TOOL':
      return Object.assign({}, payload);
    case 'UNSELECT_TOOL':
      return null;
    default:
      return state;
  }
};
