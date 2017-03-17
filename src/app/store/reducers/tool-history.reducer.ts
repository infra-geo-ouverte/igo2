import { Tool } from '../../tool/shared/tool.interface';

export function toolHistory(state: Tool[] = [], {type, payload}) {
  switch (type) {
    case 'SELECT_TOOL':
      const currentTool = state[state.length - 1];
      if (currentTool && payload.name === currentTool.name) {
        return state;
      }

      return new Array(...state, Object.assign({}, payload));
    case 'SELECT_PREVIOUS_TOOL':
      return state.slice(0, -1);
    case 'UNSELECT_TOOL':
      return [];
    default:
      return state;
  }
};
