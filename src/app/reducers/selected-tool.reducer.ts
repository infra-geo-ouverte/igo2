import { Tool } from '../tool/shared/tool.interface';

export function selectedTool (state: Tool = null, {type, payload}) {
  switch (type) {
    case 'SELECT_TOOL':
      return Object.assign({}, payload);
    case 'UNSELECT_TOOL':
      return null;
    default:
      return state;
  }
};
