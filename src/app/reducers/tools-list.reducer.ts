import { Tool } from '../tool/shared/tool.interface';

export function toolsList(state: Tool[] = [], {type, payload}) {
  switch (type) {
    case 'SET_TOOLS':
      return payload;
    default:
      return state;
  }
};
