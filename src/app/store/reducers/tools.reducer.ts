import { Tool } from '../../tool/shared/tool.interface';

export function tools(state: Tool[] = [], {type, payload}) {
  switch (type) {
    case 'SET_TOOLS':
      return payload;
    default:
      return state;
  }
};
